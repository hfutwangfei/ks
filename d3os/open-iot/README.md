> 注意：

1. `values.yaml`中定义环境变量如下，在`deployment.yaml`中引用。提前部署`postgresql`、`redis`。

> 目前暂使用固定的`kafka`（`10.206.68.1`、`10.206.73.136`两台机器）。

```yaml
global:
  postgresUrl: jdbc:postgresql://10.206.68.1:32662/iotplat
  postgresUsername: wangfei-postgres
  postgresPassword: Haier2022
  #redis or caffeine
  cacheType: redis
  redisConnectionType: standalone
  redisHost: 10.233.118.96
  redisPort: 6379
  redisNodes:
  redisPassword: Haier2022
  #kafka or in-memory
  iotQueueType: kafka
  iotKafkaServers: 10.206.68.1:9092
  useUuc: false
  uucAuthUrl: 
```

2. 使用本地`kafka`时，需要在`deployment.yaml`中添加如下字段（与`containers` 同级）。

> 目前暂使用固定的`kafka`（`10.206.68.1`、`10.206.73.136`两台机器）。

```yaml
      hostAliases:
        - ip: 10.206.73.136
          hostnames:
            - localhost.localdomain
```
