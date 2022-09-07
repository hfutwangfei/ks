准备工作:

安装redis服务 

安装mysql5.7，其中mysql的配置文件可以参考my.cnf,创建dataease数据库
CREATE DATABASE `dataease` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

安装minio 最新版本，参考命令:
docker run -d \
  -p 9000:9000 \
  -p 9001:9001 \
  --name minio1 \
  -v /home/minio/data:/data \
  -e "MINIO_ROOT_USER=admin" \
  -e "MINIO_ROOT_PASSWORD=12345678" \
  minio/minio server /data --console-address ":9001"


将jar包文件打成docker镜像

docker build xxxxxx


运行docker镜像并带上环境变量



