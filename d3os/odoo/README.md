# helm 打包

> 注意: 首次创建`helm chart`按以下步骤执行，之后就只需修改版本，或者`postgresql`连接参数即可。

## 1. 初始化 `helm chart`

执行`make create-odoo`

## 2. 修改镜像、版本等信息

执行`make sed-chart-odoo`

> 注意

`values.yaml`中`port`改成`8069`

```yaml
service:
  type: ClusterIP
  port: 8069
```

`deployment.yaml`中修改`containerPort`，添加`env`，如下：

```yaml
          ports:
            - name: http
              containerPort: {{ .Values.service.port | default 80 }}
              protocol: TCP
          livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          env:
          - name: DB_PORT_5432_TCP_ADDR
            value: "10.233.68.192" # postgresql的容器组IP
          - name: DB_PORT_5432_TCP_PORT
            value: "5432" # postgresql默认端口
          - name: DB_ENV_POSTGRES_USER
            value: "wangfei-postgres" # postgresql账号
          - name: DB_ENV_POSTGRES_PASSWORD
            value: "Haier2022" # postgresql密码
```

## 3. 打包

执行`make package-odoo`

## 4. 清除`chart`

执行`make clean-all`
