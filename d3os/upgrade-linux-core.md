

## 2、更新yum仓库

### 2.1、替换阿里云yum源，并升级

```shell
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

yum clean all && yum -y update
```


### 2.2、启用elrepo仓库

```shell
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org

rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-3.el7.elrepo.noarch.rpm
```


## 3、升级内核

### 3.1、安装最新版本内核

```shell
yum --enablerepo=elrepo-kernel install kernel-lt-devel kernel-lt -y
```


## 4.查看现有内核启动顺序

```shell
awk -F\' '$1=="menuentry " {print $2}' /etc/grub2.cfg
```


## 5、修改默认启动项


### 查看内核启动序号

```shell
awk -F\' '$1=="menuentry " {print $2}' /etc/grub2.cfg

CentOS Linux (4.4.179-1.el7.elrepo.x86_64) 7 (Core)
CentOS Linux (3.10.0-693.el7.x86_64) 7 (Core)
CentOS Linux (0-rescue-6d4c599606814867814f1a8eec7bfd1e) 7 (Core)
```

xxx 为序号数字，以指定启动列表中第x项为启动项，x从0开始计数

```shell
grub2-set-default xxxx
```

> 例如设置以4.4内核启动
>
> 则直接输入“grub2-set-default 0”，下次启动即可从4.4启动


### 设置启动序号

```shell
grub2-set-default 0
```

### 重启

```shell
reboot
```

### 检查内核版本

```shell
uname -r
```

```shell
yum -y install ipvsadm socat conntrack
```


Console: http://192.168.0.128:30880
Account: admin
Password: P@88w0rd
