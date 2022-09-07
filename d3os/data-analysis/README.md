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
  port: 8081
```

`deployment.yaml`中修改`containerPort`，根据已部署的mysql、minio、redis等添加`env`，如下：

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
            - name: mysql_user
              value: root
            - name: mysql_password
              value: FviqAJDYbu
            - name: mysql_ip_port
              value: '10.233.68.52:3306'
            - name: mysql_database
              value: dataease
            - name: minio_bucket
              value: dataease
            - name: minio_host
              value: 'http://10.206.68.1:30290'
            - name: dt_studio_host
              value: 'http://dt-co-server-test.hdt.cosmoplat.com'
            - name: share_address_url
              value: 'http://dataease-dev.hdt.cosmoplat.com/link/'
            - name: redis_host
              value: 10.233.68.32
            - name: redis_port
              value: '6379'
            - name: redis_password
              value: 5yiTQj@Iki
            - name: redis_database
              value: '0'
```

## 3. 打包

执行`make package-chart`

## 4. 清除`chart`

执行`make clean`
