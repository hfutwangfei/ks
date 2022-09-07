# dt-studio 部署

> 注意：
> > 注释掉探针，才能启动成功

## 1. 创建 dt-studio 镜像

> 目录下已包含所需要的文件及`Makefile`。
> > `make docker-build`打docker镜像。
> > `docker push XXX`上传至远端镜像仓库。
> > `make clean`删除_output目录。

## 2. helm 打包

首先，创建应用，`helm create dt-studio`。

其次，注意: 初始化的chart中的默认镜像、版本等信息，需修改成新镜像的信息。
> 执行命令`make sed-chart`。

然后，打包，`helm package dt-studio`。

## 3. 部署

部署应用时，参考[环境参数](docs/dt-studio环境参数.txt)，具体如下描述。

- 根据已知的redis、minio、mysql等, 程序中写死了环境变量, 只需添加'DEPLOY=demo'。
- 实际部署时，最好添加所有环境变量。
- 另外需要初始化数据库表dt-commercialization。
- 以下为deployment.yaml中对应的启动变量，填写实际参数值。

          env:
            - name: DATASOURCE_URL
              value: 10.206.97.170:3386/dt-commercialization
            - name: DATASOURCE_USERNAME
              value: 
            - name: DATASOURCE_PASSWORD
              value: 
            - name: REDIS_HOST
              value: 
            - name: REDIS_PORT
              value: 
            - name: REDIS_PASSWORD
              value: 
            - name: REDIS_DATABASE
              value: 
            - name: MINIO_BUCKET
              value: 
            - name: MINIO_HOST
              value: 
            - name: MINIO_ACCESS_KEY
              value: 
            - name: MINIO_SECRET_KEY
              value: 
            - name: DATAEASE_ADDR
              value: 
