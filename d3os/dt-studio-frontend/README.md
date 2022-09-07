# dt-studio-frontend 部署

> 注意
> > 需要初始化数据库表
> > 首次创建`helm chart`按以下步骤执行，之后就只需修改版本，或者mysql、minio、redis等环境变量参数即可。

## 1. 初始化 `helm chart`

执行`make create-chart`

## 2. 修改镜像、版本等信息

执行`make sed-chart`

## 3. 打包

执行`make package-chart`

## 4. 清除`chart`

执行`make clean`
