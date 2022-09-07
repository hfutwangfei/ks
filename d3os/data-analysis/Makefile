IMAGE_DIR ?= _output
.prepare-docker-build:
	@echo Preparing image files...
	@mkdir -p ${IMAGE_DIR}/docker
	@cp docker/Dockerfile ${IMAGE_DIR}/docker/
	@cp docker/backend-1.9.0.jar ${IMAGE_DIR}/docker/

# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
IMAGE_NAME ?= data-analysis
IMAGE_VERSION ?= v1.9.0
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}

# make docker-build: Build image into local docker daemon.
docker-build: .prepare-docker-build
	@echo Building image for Image Manager into local docker daemon...
	docker build --pull -t ${IMAGE}:${IMAGE_VERSION} ${IMAGE_DIR}/docker

# helm create
create-chart:
	helm create ${IMAGE_NAME}

SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
PORT ?= 8081
SED_PORT ?= "s/port: 80/port: ${PORT}/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME}/g"
CONTAINER_PORT ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT}/g"
# make sed-chart: modify chart information.
sed-chart:
	sed -i '' ${SED_REPO} ${IMAGE_NAME}/values.yaml
	sed -i '' ${SED_TAG} ${IMAGE_NAME}/values.yaml
	sed -i '' ${SED_PORT} ${IMAGE_NAME}/values.yaml
	sed -i '' ${SED_DESC} ${IMAGE_NAME}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT} ${IMAGE_NAME}/templates/deployment.yaml

# helm package
package-chart:
	helm package ${IMAGE_NAME}

# remove _output.
clean-image:
	rm -rf ${IMAGE_DIR}

clean-chart:
	rm -rf ${IMAGE_NAME}