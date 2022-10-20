## 创建工作空间`etcd-workspace`

创建项目`etcd-project`，在其下创建两个`nginx`应用，备份及恢复流程如下。

### 后台查看：

![readme](./etcd-backup-demo-picture/etcd-project-pods-cmd.png)

### 页面查看

![readme](./etcd-backup-demo-picture/etcd-project-pods-page.png)

### etcd备份前的状态

![readme](./etcd-backup-demo-picture/etcd-staus-before-backup.png)

### `systemctl stop etcd`

页面仍可访问，初步判断，有缓存数据

![readme](./etcd-backup-demo-picture/WechatIMG593.png)

### stop etcd后，无法查看k8s信息、无法查看etcd数据

![readme](./etcd-backup-demo-picture/WechatIMG599.png)

### 停掉etcd后，发现自动启动了备份脚本，且此时无法etcd查看数据

![readme](./etcd-backup-demo-picture/WechatIMG601.png)

### 查看页面有数据，但不完整，有错误提示

初步判断，有缓存数据，但不完整仍需访问etcd中完整数据

![readme](./etcd-backup-demo-picture/WechatIMG603.png)

### 无法创建企业空间

![readme](./etcd-backup-demo-picture/WechatIMG606.png)

### 无法创建项目

![readme](./etcd-backup-demo-picture/WechatIMG608.png)

### 无法查看应用

![readme](./etcd-backup-demo-picture/WechatIMG610.png)

### 无法添加用户

![readme](./etcd-backup-demo-picture/WechatIMG612.png)

### 删除db

![readme](./etcd-backup-demo-picture/WechatIMG614.png)

### 每30分钟做一次备份

![readme](./etcd-backup-demo-picture/WechatIMG616.png)

### 导入备份数据

![readme](./etcd-backup-demo-picture/WechatIMG618.png)

### 重新启动etcd

![readme](./etcd-backup-demo-picture/WechatIMG620.png)

### 定时备份停止了

![readme](./etcd-backup-demo-picture/WechatIMG622.png)

### k8s自启动？

![readme](./etcd-backup-demo-picture/WechatIMG624.png)

### 下面开始，删掉企业空间etcd-project、创建新的企业空间etcd-project-after

企业空间、及其应用一直是Terminating状态，可能跟137机器内存资源不足有关，而部署应用在137上后，应用一直重启

![readme](./etcd-backup-demo-picture/WechatIMG627.png)

### 页面删除项目时一直不成功，通过后台kubectl delete项目命名空间也不成功，先删掉下面的两个pod后，项目也被删除了

这样，就把原项目etcd-project删除了，接下来清除数据，备份远包含项目etcd-project、不包含etcd-project-after的数据

![readme](./etcd-backup-demo-picture/WechatIMG629.png)

### 此时，停掉etcd后，未删除etcd数据，没有启动备份脚本

![readme](./etcd-backup-demo-picture/WechatIMG633.png)

### 删掉数据后，登录报错

![readme](./etcd-backup-demo-picture/WechatIMG635.png)

### 恢复备份后，自动启动了备份脚本，此时并未重启etcd

![readme](./etcd-backup-demo-picture/WechatIMG638.png)

![readme](./etcd-backup-demo-picture/WechatIMG639.png)

### systemctl start etcd后，自动备份脚本停掉，etcd启动，过段时间，k8s自启动成功

并且页面可正常登录
注意：曾经页面报上述登录错误后，通过删除kubesphere-system的ks-apiserver pod后，可正常登录

![readme](./etcd-backup-demo-picture/WechatIMG641.png)

### 此时，恢复数据后，项目etcd-project恢复，且其下两个pod仍在正常运行

![readme](./etcd-backup-demo-picture/WechatIMG644.png)
