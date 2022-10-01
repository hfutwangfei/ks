CHARTS ?= project

start:
	@echo "start..."
	@go run *.go
	@cd ${CHARTS} && make start
	@cd ${CHARTS} && mkdir tgz && mv *.tgz tgz

clean:
	@echo "clean project..."
	rm -rf ${CHARTS}
