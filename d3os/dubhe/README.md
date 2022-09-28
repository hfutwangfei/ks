# data-analysis 部署

> 注意
> > 需要初始化数据库表
> > 首次创建`helm chart`按以下步骤执行，之后就只需修改版本，或者mysql、minio、redis等环境变量参数即可。

## 1. 初始化 `helm chart`

执行`make create-chart`

## 2. 修改镜像、版本等信息

执行`make sed-chart`

> 注意

`values.yaml`中`port`改成`8081`


```yaml
service:
  type: ClusterIP
#  port:
  ports:
    - 8011
    - 8081
    - 8800
    - 8821
    - 8822
    - 8823
    - 8863
    - 8864
    - 8866
    - 8870
    - 8888
    - 8889
    - 8890
    - 8898
    - 8899
    - 8960
    - 8970
```

`deployment.yaml`中修改`containerPort`，根据已部署的mysql、minio、redis等添加`env`，如下：

```yaml
          { { - if .Values.service.ports } }
          ports:
            { { - range .Values.service.ports } }
            - name: http
              containerPort: { { . | quote } }
              protocol: TCP
            { { - end } }
          { { - end } }
```


```yaml
  { { - if .Values.service.ports } }
  ports:
    { { - range .Values.service.ports } }
    - port: { { . | quote } }
      targetPort: http
      protocol: TCP
      name: http
    { { - end } }
  { { - end } }
```

## 3. 打包

执行`make package-chart`

## 4. 清除`chart`

执行`make clean`

