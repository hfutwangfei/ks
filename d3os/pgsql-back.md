## pgsql导出备份

目标数据库生成dump文件：

### 查找pgsql的docker镜像名称：
```shell
docker ps|grep pg
```

### 生成dump文件：

#### 进入docker容器

```shell
docker exec -it xxx bash
```

#### 切换至postgres用户

```shell
su postgres
```

#### 进入数据所在目录

```shell
cd /var/lib/postgresql/data
```

#### 生成dump文件

```shell
pg_dump -U postgres -d 数据库名 -f 路径+文件名称
```

> 一般情况下，数据库备份文件都比较大，可以选择将文件压缩成压缩包
>
> tar -zcvf  xxxx.tar.gz 路径+文件名称