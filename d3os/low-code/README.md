# helm 打包

> 注意: 首次创建`helm chart`按以下步骤执行，之后就只需修改版本，或者`postgresql`连接参数即可。

## 1. 初始化 `helm chart`

执行`make create-low-code`

## 2. 修改镜像、版本等信息

执行`make sed-chart-low-code`

> 注意

`values.yaml`中`port`改成`8069`(已在`Makefile`里执行)。

```yaml
service:
  type: ClusterIP
  port: 8069
```

`deployment.yaml`中修改`containerPort`(已在`Makefile`里执行)。

添加`env`，如下：

```yaml
          env:
          - name: DB_PORT_5432_TCP_ADDR
            value: "10.233.68.192"
          - name: DB_PORT_5432_TCP_PORT
            value: "5432"
          - name: DB_ENV_POSTGRES_USER
            value: "wangfei-postgres"
          - name: DB_ENV_POSTGRES_PASSWORD
            value: "Haier2022"
```

## 3. 打包

执行`make package-low-code`

## 4. 清除`chart`

执行`make clean-all`
