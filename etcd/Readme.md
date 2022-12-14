## etcd备份

### 服务器上
- 存储目录：/var/lib/etcd/
- 备份目录：/var/backups/kube_etcd/

### 查看etcd的`env`

```shell
[root@tcosmo-sh05 KubeSphere]# cat /etc/etcd.env 
# Environment file for etcd v3.4.13
ETCD_DATA_DIR=/var/lib/etcd
ETCD_ADVERTISE_CLIENT_URLS=https://10.206.68.5:2379
ETCD_INITIAL_ADVERTISE_PEER_URLS=https://10.206.68.5:2380
ETCD_INITIAL_CLUSTER_STATE=existing
ETCD_METRICS=basic
ETCD_LISTEN_CLIENT_URLS=https://10.206.68.5:2379,https://127.0.0.1:2379
ETCD_ELECTION_TIMEOUT=5000
ETCD_HEARTBEAT_INTERVAL=250
ETCD_INITIAL_CLUSTER_TOKEN=k8s_etcd
ETCD_LISTEN_PEER_URLS=https://10.206.68.5:2380
ETCD_NAME=etcd1
ETCD_PROXY=off
ETCD_ENABLE_V2=true
ETCD_INITIAL_CLUSTER=etcd1=https://10.206.68.5:2380
ETCD_AUTO_COMPACTION_RETENTION=8
ETCD_SNAPSHOT_COUNT=10000

# TLS settings
ETCD_TRUSTED_CA_FILE=/etc/ssl/etcd/ssl/ca.pem
ETCD_CERT_FILE=/etc/ssl/etcd/ssl/member-tcosmo-sh05.pem
ETCD_KEY_FILE=/etc/ssl/etcd/ssl/member-tcosmo-sh05-key.pem
ETCD_CLIENT_CERT_AUTH=true

ETCD_PEER_TRUSTED_CA_FILE=/etc/ssl/etcd/ssl/ca.pem
ETCD_PEER_CERT_FILE=/etc/ssl/etcd/ssl/member-tcosmo-sh05.pem
ETCD_PEER_KEY_FILE=/etc/ssl/etcd/ssl/member-tcosmo-sh05-key.pem
ETCD_PEER_CLIENT_CERT_AUTH=True

# CLI settings
ETCDCTL_ENDPOINTS=https://127.0.0.1:2379
ETCDCTL_CA_FILE=/etc/ssl/etcd/ssl/ca.pem
ETCDCTL_KEY_FILE=/etc/ssl/etcd/ssl/admin-tcosmo-sh05-key.pem
ETCDCTL_CERT_FILE=/etc/ssl/etcd/ssl/admin-tcosmo-sh05.pem
```

### 备份命令
```shell
etcdctl snapshot save etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

各个集群备份命令：

10.206.68.1:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --cert=/etc/ssl/etcd/ssl/node-tcosmo-sh01.pem --key=/etc/ssl/etcd/ssl/node-tcosmo-sh01-key.pem snapshot save etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

10.206.68.5:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --cert=/etc/ssl/etcd/ssl/node-tcosmo-sh05.pem --key=/etc/ssl/etcd/ssl/node-tcosmo-sh05-key.pem snapshot save etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

10.206.73.136:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --key=/etc/ssl/etcd/ssl/node-test-master-key.pem --cert=/etc/ssl/etcd/ssl/node-test-master.pem snapshot save etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

10.206.114.4:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --key=/etc/ssl/etcd/ssl/node-master-key.pem --cert=/etc/ssl/etcd/ssl/node-master.pem snapshot save etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

### 导入命令：导入备份数据（需要先删除/Users/wangfei/default.etcd下的数据）

本地：
```shell
etcdutl snapshot restore etcd-snapshot-20220921141816.db --data-dir=/Users/wangfei/default.etcd
```

10.206.73.136:
```shell
etcdutl snapshot restore etcd-snapshot-20220921141816.db --data-dir=/var/lib/etcd --cacert=/etc/ssl/etcd/ssl/ca.pem --key=/etc/ssl/etcd/ssl/node-test-master-key.pem --cert=/etc/ssl/etcd/ssl/node-test-master.pem
```

其中参数`data-dir`是上述etcd环境变量`env`中的`ETCD_DATA_DIR=/var/lib/etcd`

### 停止etcd服务：
```shell
systemctl stop etcd
```

### 启动etcd：
```shell
systemctl start etcd
```

> 备份示例效果：
> > 1.创建企业空间test、项目空间test-1
> 
> > 2.备份数据
> 
> > 3.在企业空间test、项目空间test-1下创建应用nginx-ovqrj8
> 
> > 4.恢复备份数据
> 
> > 5.etcd中有nginx-ovqrj8相关的数据，但查不到相关k8s资源信息，页面查看service, deployment, pod都不存在

上面步骤5，查看docker容器：
```shell
[root@test-node1 ~]# docker ps -a | grep nginx-ovqrj8
27b4154d0bf8   684dbf9f01f3                                                 "/docker-entrypoint.…"   4 seconds ago        Up 3 seconds                                                                                                           k8s_nginx_nginx-ovqrj8-f9c7dd4cc-w48sn_test-1_cae46102-a782-46eb-a1c3-6289413460b9_22
4606234f9484   684dbf9f01f3                                                 "/docker-entrypoint.…"   5 minutes ago        Exited (0) 5 minutes ago                                                                                               k8s_nginx_nginx-ovqrj8-f9c7dd4cc-w48sn_test-1_cae46102-a782-46eb-a1c3-6289413460b9_21
c49f5cee621d   kubesphere/pause:3.2                                         "/pause"                 About an hour ago    Up About an hour                                                                                                       k8s_POD_nginx-ovqrj8-f9c7dd4cc-w48sn_test-1_cae46102-a782-46eb-a1c3-6289413460b9_0
[root@test-node1 ~]#
```

参考：
第5章 核心组件的运行机制

---

上述步骤4恢复备份前，对步骤3应用所在节点systemctl stop kubelet