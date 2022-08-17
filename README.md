# Helm 开发者指南


## 1. 创建本地仓库

执行以下命令在您的机器上创建仓库。

```shell
$ mkdir helm-repo
$ cd helm-repo
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
