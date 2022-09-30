# helm 打包

> 注意: 首次创建`helm chart`按以下步骤执行，之后就只需修改版本，或者`postgresql`连接参数即可。

## 1. 初始化 `helm chart`

执行`make create-login-center`

## 2. 修改镜像、版本等信息

执行`make sed-chart-login-center`

> 注意

1. `values.yaml`中`port`改成`8069`（已通过`Makefile`中命令修改）。

```yaml
service:
  type: ClusterIP
  port: 8081
```

2. `values.yaml`中定义环境变量，在`deployment.yaml`中引用（已通过`Makefile`中命令添加），部署时添加如下的`url`。

```yaml
env:
  dataResourceUrl: 10.206.114.8:3306
  dataResourceUsername: root
  dataResourcePassword: FviqAJDYbu
  redisUrl: 10.233.105.181
  redisPort: 6379
  redisPassword:
  deadlineTime: 6
  open: true
  tenantId: 53837240-3025-11ed-a60b-5f28a72be0bf
  iotUsername: sysadmin@haier.com
  iotPassword: sysadmin
```

3. `deployment.yaml`中修改`containerPort`，添加`env`，如下：

```yaml
          env:
            - name: DATASOURCE_URL
              value: {{ .Values.env.dataResourceUrl  | quote }}
            - name: DATASOURCE_USERNAME
              value: {{ .Values.env.dataResourceUsername  | quote }}
            - name: DATASOURCE_PASSWORD
              value: {{ .Values.env.dataResourcePassword  | quote }}
            - name: REDIS_URL
              value: {{ .Values.env.redisUrl  | quote }}
            - name: REDIS_PORT
              value: {{ .Values.env.redisPort  | quote }}
            - name: REDIS_PASSWORD
              value: {{ .Values.env.redisPassword  | quote }}
            - name: DEADLINE_TIME
              value: {{ .Values.env.deadlineTime  | quote }}
            - name: OPEN
              value: {{ .Values.env.open  | quote }}
            - name: TENANT_ID
              value: {{ .Values.env.tenantId  | quote }}
            - name: IOT_USERNAME
              value: {{ .Values.env.iotUsername  | quote }}
            - name: IOT_PASSWORD
              value: {{ .Values.env.iotPassword  | quote }}
```

> 注意：
> > 注释掉`deployment.yaml`中探针。

## 3. 打包

执行`make package-login-center`

## 4. 清除`chart`

执行`make clean-all`
