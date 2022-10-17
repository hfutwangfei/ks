## etcd备份

### 服务器上
- 存储目录：/var/lib/etcd/
- 备份目录：/var/backups/kube_etcd/

### 备份命令
```shell
etcdctl snapshot save  etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

各个集群备份命令：

10.206.68.1:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --cert=/etc/ssl/etcd/ssl/node-tcosmo-sh01.pem --key=/etc/ssl/etcd/ssl/node-tcosmo-sh01-key.pem snapshot save  etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

10.206.73.136:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --key=/etc/ssl/etcd/ssl/node-test-master-key.pem --cert=/etc/ssl/etcd/ssl/node-test-master.pem snapshot save  etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

10.206.114.4:
```shell
etcdctl --cacert=/etc/ssl/etcd/ssl/ca.pem --key=/etc/ssl/etcd/ssl/node-master-key.pem --cert=/etc/ssl/etcd/ssl/node-master.pem snapshot save  etcd-snapshot-`date +%Y%m%d%H%M%S`.db
```

### 导入命令：导入备份数据（需要先删除/Users/wangfei/default.etcd下的数据）
```shell
etcdutl snapshot restore etcd-snapshot-20220921141816.db --data-dir=/Users/wangfei/default.etcd
```

### 停止etcd服务：
```shell
systemctl stop etcd
```

### 启动etcd：
```shell
systemctl start etcd
```
