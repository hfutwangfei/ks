# `d3os`系统部署、安装、使用过程中的问题及解决方案

## 1. 登录页报错

### 1.1 [kubesphere安装后登录报错token failed, reason: getaddrinfo EAI_AGAIN ks-apiserver](https://blog.csdn.net/bear6/article/details/126281485?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-126281485-blog-118053239.pc_relevant_multi_platform_whitelistv4&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-126281485-blog-118053239.pc_relevant_multi_platform_whitelistv4&utm_relevant_index=5)

找到coredns服务
```shell
kubectl get pods -n kube-system
coredns-5bb9675886-gxc5t                       1/1     Running   26 (2m49s ago)   75m
coredns-5bb9675886-sq66r                       1/1     Running   26 (3m7s ago)    75m
```

删除即重启这两个`pod`
```shell
kubectl delete pod coredns-5bb9675886-gxc5t -n kube-system
kubectl delete pod coredns-5bb9675886-sq66r -n kube-system
```


### 1.2 另一种报token错误？？

删除即重启ks-apiserver
```shell
kubectl delete pod ks-apiserver-**** -n kubesphere-system
```

## 2. 服务部署过程报错及解决方案

### 2.1 部署redis

```
running PreBind plugin "VolumeBinding": binding volumes: timed out waiting for the condition
```


