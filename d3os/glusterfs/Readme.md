## bug

### 虚拟磁盘创建法则

```shell
mkdir -p /mnt/sdb/vdisk
mkdir -p /mnt/vloop
dd if=/dev/zero of=raw.img bs=1G count=50
mkfs.xfs -q raw.img
mount -o loop /mnt/sdb/vdisk/raw.img /mnt/vloop
```

会报错误

```shell
Unable to add device: Initializing device /dev/sdb failed (already initialized or contains data?)
```

这时先

```shell
umount /dev/loop0
losetup /dev/loop0 raw.img
```

如果是缺少命令的话 在 lvm2 包里。
然后执行
```shell
parted /dev/loop0
pvcreate /dev/loop0
```

### glusterfs-daemonset.yaml

缺少下面字段，必须加上

```shell
spec:
  # 需添加该字段
  selector:
    matchLabels:
      glusterfs-node: pod
```

### storageclass-gluster-heketi.yaml

参考[https://blog.csdn.net/qq_15138049/article/details/122450353](https://blog.csdn.net/qq_15138049/article/details/122450353)

1. 添加`Secret`, `StorageClass`中`parameters`: `restauthenabled`, `volumetype`等。这样`pvc`状态才`Bound`, 否则一直`Pending`.

```shell
---
apiVersion: v1
kind: Secret
type: kubernetes.io/glusterfs
metadata:
  name: heketi-secret
  #namespace: kube-system
data:
  # base64 encoded. key=My Secret
  key: TXkgU2VjcmV0

---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gluster-heketi
provisioner: kubernetes.io/glusterfs
parameters:
  resturl: "http://10.233.22.219:8080"
  restauthenabled: "true"
  volumetype: "none"
  restuser: "admin"
  secretName: "heketi-secret"
  secretNamespace: "default"
  clusterid: "cfb5c3eb1d34ae61668eb3da475d23d0"
```

2. 所有节点!!!

```shell
modprobe dm_snapshot
modprobe dm_mirror
modprobe dm_thin_pool
```

### 相关操作命令

1. 进入`heketi`的`pod`内
```shell
[root@tcosmo-sh05 ~]# kubectl exec -it heketi-868879cf95-zc445 -- /bin/sh
sh-5.1# export HEKETI_CLI_SERVER=http://localhost:8080
```

2. 查看heketi的topology info
```shell
sh-5.1# heketi-cli -s $HEKETI_CLI_SERVER --user admin --secret 'My Secret' topology info

Cluster Id: cfb5c3eb1d34ae61668eb3da475d23d0

    File:  true
    Block: true

    Volumes:

        Name: vol_4756c3ac5f250b63a2b72561d838e825
        Size: 1
        Id: 4756c3ac5f250b63a2b72561d838e825
        Cluster Id: cfb5c3eb1d34ae61668eb3da475d23d0
        Mount: 10.206.68.5:vol_4756c3ac5f250b63a2b72561d838e825
        Mount Options: backup-volfile-servers=10.206.68.6,10.206.68.1
        Durability Type: none
        Snapshot: Enabled
        Snapshot Factor: 1.00

                Bricks:
                        Id: 699ce82575c13fd9475e6d4c97bebf6d
                        Path: /var/lib/heketi/mounts/vg_8a654e0bafddfc54e571a6b62c43189c/brick_699ce82575c13fd9475e6d4c97bebf6d/brick
                        Size (GiB): 1
                        Node: 826d48510645f91f6d678951bb68b890
                        Device: 8a654e0bafddfc54e571a6b62c43189c



    Nodes:

        Node Id: 826d48510645f91f6d678951bb68b890
        State: online
...
```

3. 查看heketi的volume list
```shell
sh-5.1# heketi-cli -s $HEKETI_CLI_SERVER --user admin --secret 'My Secret' volume list  
Id:4756c3ac5f250b63a2b72561d838e825    Cluster:cfb5c3eb1d34ae61668eb3da475d23d0    Name:vol_4756c3ac5f250b63a2b72561d838e825
```

4. 查看heketi的volume info
```shell
sh-5.1# heketi-cli -s $HEKETI_CLI_SERVER --user admin --secret 'My Secret' volume info 4756c3ac5f250b63a2b72561d838e825 
Name: vol_4756c3ac5f250b63a2b72561d838e825
Size: 1
Volume Id: 4756c3ac5f250b63a2b72561d838e825
Cluster Id: cfb5c3eb1d34ae61668eb3da475d23d0
Mount: 10.206.68.5:vol_4756c3ac5f250b63a2b72561d838e825
Mount Options: backup-volfile-servers=10.206.68.6,10.206.68.1
Block: false
Free Size: 0
Reserved Size: 0
Block Hosting Restriction: (none)
Block Volumes: []
Durability Type: none
Distribute Count: 1
Snapshot Factor: 1.00
```

5. 创建、进入使用pvc的pod中
```shell
[root@tcosmo-sh05 ~]# kubectl exec -it pod-use-pvc -- /bin/sh
/ # ls
bin      dev      etc      home     proc     pv-data  root     sys      tmp      usr      var
/ # cd /pv-data/
/pv-data # ls
/pv-data # touch a
/pv-data # echo 'hello' > b
/pv-data # ls
a  b
```

6. 挂载成功
```shell
[root@tcosmo-sh05 testpvc]# mount -t glusterfs 10.206.68.5:vol_4756c3ac5f250b63a2b72561d838e825 /root/KubeSphere/glusterfs/testpvc
[root@tcosmo-sh05 glusterfs]# tree testpvc/
testpvc/
├── a
└── b

0 directories, 2 files
```
