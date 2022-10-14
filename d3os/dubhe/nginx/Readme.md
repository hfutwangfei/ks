nginx-1.3.5.tgz.tgz是官方helm chart

这里做了以下修改：
1. `dubhe`项目的`nginx`服务定义为`dubhe-nginx`。
2. 在`values.yaml`里定义`configurationFile`，通过`configmap`将`nginx.conf`挂载到容器。
3. 在`values.yaml`里定义`extraVolumes`, `extraVolumeMounts`，通过`configmap`将`dubhe-nginx`主机配置挂载到容器。