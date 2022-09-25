.prepare-docker-build:
	@echo Preparing image files...
	@mkdir -p _output/docker
	@mkdir -p _output/docker/target
	@cp docker/Dockerfile _output/docker/
	@cp docker/dt-os-plat-0.0.1-SNAPSHOT.jar _output/docker/target/

# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
IMAGE_NAME ?= dt-studio
IMAGE_VERSION ?= v0.0.2
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}

CHART_VERSION ?= 0.1.0
CHART_NAME ?= dt-studio

# make docker-build: Build image into local docker daemon.
docker-build: .prepare-docker-build
	@echo Building image for Image Manager into local docker daemon...
	docker build --pull -t ${IMAGE}:${IMAGE_VERSION} _output/docker

# helm create
create-chart:
	helm create ${CHART_NAME}

SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
PORT ?= 8080
SED_PORT ?= "s/port: 80/port: ${PORT}/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${CHART_NAME}/g"
SED_CHART_VERSION ?= "s/version: 0.1.0/version: ${CHART_VERSION}/g"
CONTAINER_PORT ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT}/g"

# make sed-chart: modify chart information.
sed-chart:
	sed -i '' ${SED_REPO} ${CHART_NAME}/values.yaml
	sed -i '' ${SED_TAG} ${CHART_NAME}/values.yaml
	sed -i '' ${SED_PORT} ${CHART_NAME}/values.yaml
	sed -i '' ${SED_DESC} ${CHART_NAME}/Chart.yaml
	sed -i '' ${SED_CHART_VERSION} ${CHART_NAME}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT} ${CHART_NAME}/templates/deployment.yaml

# helm package
package-chart:
	helm package ${CHART_NAME}

chart: create-chart sed-chart package-chart

# make clean: remove _output.
clean:
	rm -rf _output
