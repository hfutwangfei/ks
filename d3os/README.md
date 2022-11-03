# 数据恢复

1. iot  有数据库 init 脚本
2. datathread    （一个docker镜像，mysql里有管道的关联关系，minio或者本地存的本地配置）
3. data analyse  （redis,mysql,minio,  (怎么连接，mysql参数配置，已经有一个数据恢复脚本)）
4. 用户中心       （redis,mysql,minio, sql恢复脚本已经存在，只要配置新的域名）
5. eim              （有一个数据库备份文件）
6. dt 后端         （redis,mysql,minio, sql恢复脚本已经存在）

---

## 各个应用及所需数据库脚本情况一览：

1. iot-plat

| 数据库  | 描述 |
| :---: | :---: |
| redis  | 用系统自带即可  |
|postgresql |用cdcpgsqliotplat，已打包应用，直接部署使用 |


2. data-space(datathread)

| 数据库  | 描述 |
| :---: | :---: |
| redis  | 用系统自带即可  |
| mysql | 有sql脚本，需初始化sql，创建库datathread |
| minio | 本地服务，需创建桶名称data-thread |

3. data-analysis

| 数据库  | 描述 |
| :---: | :---: |
| redis | 用系统自带即可 |
| mysql | 有sql脚本，需初始化sql，创建库dataease（dataease_dev.sql, init_dataease.sql两个文件，现用前者开发环境数据 |
| minio | 本地服务，需创建桶名称dataease |

4. login-center

| 数据库  | 描述 |
| :---: | :---: |
| redis | 用系统自带即可 |
| mysql | 有sql脚本，需初始化sql，创建库login-center（login-center-test-202209141004.sql初始化表, login-center.sql插入数据，服务启动成功后，需`吴昊`同学配合初始化帐号及相关数据 |

5. eim-plat

| 数据库  | 描述 |
| :---: | :---: |
| postgresql | 用cdc-postgresql，已打包应用，直接部署使用 |

6. dt-studio

| 数据库  | 描述 |
| :---: | :---: |
| redis | 用系统自带即可 |
| mysql | 有sql脚本，需初始化sql，创建库dt-commercialization |
| minio | 本地服务，需创建桶名称 model-file-bucket |

---

> 从容器生成镜像
```shell
docker commit 是从容器生成镜像的意思，例如
docker commit --change='CMD ["/run/workspace/start.sh"]' -c "EXPOSE 8092" 59b36049348c simulate:100
--chang 是覆盖启动脚本，你可以不要
-c "EXPOSE 8092"  是开放端口，数据库一般是3306
59b36049348c  是容器id
simulate:100 是镜像名称和版本号
```
