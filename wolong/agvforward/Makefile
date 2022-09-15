# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
# image
IMAGE_NAME ?= wl-agvforward
IMAGE_VERSION ?= latest
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}

# helm create
create-chart:
	helm create ${IMAGE_NAME}

# modify chart information.
SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
###########
# PORT to be confirmed.
###########
PORT ?= 2684
SED_PORT ?= "s/port: 80/port: ${PORT}/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME}/g"
CONTAINER_PORT ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT}/g"

SED_PREFIX ?= sed -i ''

sed-chart:
	${SED_PREFIX} ${SED_REPO} ${IMAGE_NAME}/values.yaml
	${SED_PREFIX} ${SED_TAG} ${IMAGE_NAME}/values.yaml
	${SED_PREFIX} ${SED_PORT} ${IMAGE_NAME}/values.yaml
	${SED_PREFIX} ${SED_DESC} ${IMAGE_NAME}/Chart.yaml
	${SED_PREFIX} ${SED_CONTAINER_PORT} ${IMAGE_NAME}/templates/deployment.yaml

# helm package
package-chart:
	helm package ${IMAGE_NAME}

# make clean: remove charts.
clean-chart:
	rm -rf ${IMAGE_NAME}
clean-tgz:
	rm ${IMAGE_NAME}-*.tgz
clean-all: clean-chart clean-tgz
