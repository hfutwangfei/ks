## bug

### storageclass-gluster-heketi.yaml

参考[https://blog.csdn.net/qq_15138049/article/details/122450353](https://blog.csdn.net/qq_15138049/article/details/122450353)

1. 添加`Secret`

2. 所有节点!!!

```shell
modprobe dm_snapshot
modprobe dm_mirror
modprobe dm_thin_pool
```

### 相关操作命令

1. 进入`heketi`的`pod`内
```shell
kubectl exec -it heketi-868879cf95-zc445 -- /bin/sh
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
