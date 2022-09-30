DIR ?= _output
BINARY ?= cmd
CHARTS ?= project

build:
	@echo "start build go file..."
	@go build -o ${DIR}/${BINARY} getApacheProjectName.go

create:
	@echo "start create helm charts..."
	@cd ${DIR} && ./${BINARY} -act=create
sed:
	@echo "start sed helm charts..."
	@cd ${DIR} && ./${BINARY} -act=sed
	@cd ${DIR}/${CHARTS} && make sed
package:
	@echo "start package helm charts..."
	@cd ${DIR} && ./${BINARY} -act=package
	@cd ${DIR} && mkdir tgz && mv *.tgz tgz/

start: build create sed package

clean:
	@echo "start clean project..."
	rm -rf ${DIR}
