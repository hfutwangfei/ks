# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= haier-dubhe
IMAGE_NAME ?= dubhe-k8s
IMAGE_VERSION ?= v2.0

CHART_VERSION ?= 0.2.0
CHART_NAME ?= k8s

# helm create
create-chart:
	helm create ${CHART_NAME}

SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
PORT ?= 8960
SED_PORT ?= "s/port: 80/port: ${PORT}/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${CHART_NAME}/g"
SED_CHART_VERSION ?= "s/version: 0.1.0/version: ${CHART_VERSION}/g"
CONTAINER_PORT ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT}/g"

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

# make clean: remove charts.
clean-chart:
	rm -rf ${CHART_NAME}
clean-tgz:
	rm ${CHART_NAME}-*.tgz
clean-all: clean-chart clean-tgz
