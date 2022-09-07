FROM williamyeh/java8:latest
MAINTAINER wuhao<wuhao.cosmo@haier.com>
WORKDIR /dt-co
COPY target/dt-os-plat-0.0.1-SNAPSHOT.jar ./dt-co.jar
ENV LANG=zh_CN.UTF-8 LANGUAGE=zh_CN:zh LC_ALL=zh_CN.UTF-8
# 启动命令
EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Dfile.encoding=UTF8 -Dsun.jnu.encoding=UTF8 -jar /dt-co/dt-co.jar" ]
CMD ["-Xmx512M","-Xms256M","-Xmn192M","-XX:MaxMetaspaceSize=192M","-XX:MetaspaceSize=192M"]


