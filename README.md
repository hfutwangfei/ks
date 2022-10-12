# Helm 开发者指南

## 1. 创建本地仓库

执行以下命令在您的机器上创建仓库。

```shell
mkdir helm-repo
cd helm-repo
```

## 2. 创建应用

使用`helm create`创建一个名为`nginx`的文件夹，它会自动为您的应用创建`YAML`模板和目录。一般情况下，不建议修改顶层目录中的文件名和目录名。

```shell
$ helm create nginx
$ tree nginx/
nginx/
├── charts
├── Chart.yaml
├── templates
│   ├── deployment.yaml
│   ├── _helpers.tpl
│   ├── ingress.yaml
│   ├── NOTES.txt
│   └── service.yaml
└── values.yaml
```

`Chart.yaml`用于定义`Chart`的基本信息，包括名称、API和应用版本。

```yaml
...
name: nginx
...
version: 0.1.0
...
```

当您向`Kubernetes`部署基于`Helm`的应用时，可以直接在`KubeSphere`控制台上编辑values.yaml 文件。

```yaml
...
service:
  type: ClusterIP
  port: 80
...
```

## 3. 打包 Chart

前往`nginx`的上一个目录，执行以下命令打包您的`Chart`，这会创建一个`.tgz`包。

```shell
$ helm package nginx
$ ls
nginx  nginx-0.1.0.tgz
```

> 注意：
> postgres启动环境变量需要添加[`POSTGRES_DB=postgres`](https://github.com/odoo/odoo/issues/27447)
> 否则odoo无法连接postgres
> > 参考:
> > [Odoo Docker安装&部署](https://zhuanlan.zhihu.com/p/377799674)
> > [odoo环境变量配置](https://github.com/jeffery9/kubernetes-odoo/blob/master/odoo.yaml)

> 关于删除探针`probe`可参考``，如下

```makefile
# remove probes in deployment.yaml
SED_DELETE_PROBE :=
LIVENESS_PROBE ?= livenessProbe:
SED_DELETE_PROBE := /${LIVENESS_PROBE}/d
READINESS_PROBE ?= readinessProbe:
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${READINESS_PROBE}/d
PROBE_HTTP_GET ?= httpGet:
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${PROBE_HTTP_GET}/d
PROBE_PATH ?= path:\ \/
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${PROBE_PATH}/d
PROBE_PORT ?= port:\ http
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${PROBE_PORT}/d

sed-chart:
    sed -i '' "${SED_DELETE_PROBE}" ${CHART_NAME}/templates/deployment.yaml
```