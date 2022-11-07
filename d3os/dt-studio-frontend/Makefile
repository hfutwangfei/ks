.prepare-docker-build:
	@echo Preparing image files...
	@mkdir -p _output/docker
	@cp -r docker/* _output/docker/

# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
IMAGE_NAME ?= dt-studio-frontend
IMAGE_VERSION ?= 202210081022
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}

CHART_VERSION ?= 0.1.1
CHART_NAME ?= dt-studio-frontend

# make docker-build: Build image into local docker daemon.
docker-build: .prepare-docker-build
	@echo Building image for Image Manager into local docker daemon...
	docker build --pull -t ${IMAGE}:${IMAGE_VERSION} _output/docker

# helm create
create-chart:
	helm create ${CHART_NAME}

SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
PORT ?= 80
SED_PORT ?= "s/port: 80/port: ${PORT}/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${CHART_NAME}/g"
SED_CHART_VERSION ?= "s/version: 0.1.0/version: ${CHART_VERSION}/g"
CONTAINER_PORT ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT}/g"
# remove probes in deployment.yaml
SED_DELETE_PROBE :=
LIVENESS_PROBE ?= livenessProbe:
SED_DELETE_PROBE := /${LIVENESS_PROBE}/d
READINESS_PROBE ?= readinessProbe:
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${READINESS_PROBE}/d
PROBE_HTTP_GET ?= httpGet:
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${PROBE_HTTP_GET}/d
PROBE_PATH ?= path:\ \/
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${PROBE_PATH}/d
PROBE_PORT ?= port:\ http
SED_DELETE_PROBE := ${SED_DELETE_PROBE};/${PROBE_PORT}/d
# make sed-chart: modify chart information.
sed-chart:
	sed -i '' ${SED_REPO} ${CHART_NAME}/values.yaml
	sed -i '' ${SED_TAG} ${CHART_NAME}/values.yaml
	sed -i '' ${SED_PORT} ${CHART_NAME}/values.yaml
	sed -i '' ${SED_DESC} ${CHART_NAME}/Chart.yaml
	sed -i '' ${SED_CHART_VERSION} ${CHART_NAME}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT} ${CHART_NAME}/templates/deployment.yaml
	sed -i '' "${SED_DELETE_PROBE}" ${CHART_NAME}/templates/deployment.yaml

# helm package
package-chart:
	helm package ${CHART_NAME}

chart: create-chart sed-chart package-chart

# remove _output.
clean:
	rm -rf _output
	rm -rf ${CHART_NAME}
