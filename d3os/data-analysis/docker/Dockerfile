FROM williamyeh/java8:latest
COPY backend-1.9.0.jar ./dataease.jar
# 启动命令
EXPOSE 8081
ENTRYPOINT [ "sh", "-c", "java -jar ./dataease.jar"]