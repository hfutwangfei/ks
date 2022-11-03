# [如何用Dockerfile构建mysql镜像并实现数据的初始化及权限设置](https://www.yisu.com/zixun/580954.html)


## 注意项

### 1. 账号密码

- 在`privileges.sql`添加账号密码
- 并授权访问的数据库

### 2. Makefile

- 不同的`mysql`，只需修改`Makefile`的`IMAGE_NAME`即可

### 3. sql 文件

- 可在 sql 目录下添加初始化 sql 文件
- 
- 在`setup.sh`里添加初始化 sql 脚本
