# helm 打包

> 注意: 首次创建`helm chart`按以下步骤执行，之后就只需修改版本，或者`postgresql`连接参数即可。

## 1. 初始化 `helm chart`

执行`make create-login-center-web`

## 2. 修改镜像、版本等信息

执行`make sed-chart-login-center-web`

> 注意

1. `values.yaml`中`port`改成`80`（已通过`Makefile`中命令修改）。

```yaml
service:
  type: ClusterIP
  port: 80
```

2. `values.yaml`中定义环境变量，在`deployment.yaml`中引用（已通过`Makefile`中命令添加），部署时添加如下的`url`。

```yaml
env:
  backendServiceUrl: 'http://10.206.73.136:32136/center/'
```

3.`deployment.yaml`中修改`containerPort`，添加`env`，如下：

```yaml
          ports:
            - name: http
              containerPort: {{ .Values.service.port | default 80 }}
              protocol: TCP
```

```yaml
          env:
            - name: BACKEND_SERVICE_URL
              value: {{ .Values.env.dataResourceUrl  | quote }}
```

> 注意：
> > 注释掉`deployment.yaml`中探针。

## 3. 打包

执行`make package-login-center-web`

## 4. 清除`chart`

执行`make clean-all`
