# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
# low-code
IMAGE_NAME_LOW_CODE ?= low-code
IMAGE_VERSION_LOW_CODE ?= v0.0.1
IMAGE_LOW_CODE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME_LOW_CODE}

# helm create
create-low-code:
	helm create ${IMAGE_NAME_LOW_CODE}

# modify chart information.
SED_REPO_LOW_CODE ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME_LOW_CODE}/g"
SED_TAG_LOW_CODE ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION_LOW_CODE}\"/g"
PORT_LOW_CODE ?= 8069
SED_PORT_LOW_CODE ?= "s/port: 80/port: ${PORT_LOW_CODE}/g"
SED_DESC_LOW_CODE ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME_LOW_CODE}/g"
CONTAINER_PORT_LOW_CODE ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT_LOW_CODE ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT_LOW_CODE}/g"

sed-chart-low-code:
	sed -i '' ${SED_REPO_LOW_CODE} ${IMAGE_NAME_LOW_CODE}/values.yaml
	sed -i '' ${SED_TAG_LOW_CODE} ${IMAGE_NAME_LOW_CODE}/values.yaml
	sed -i '' ${SED_PORT_LOW_CODE} ${IMAGE_NAME_LOW_CODE}/values.yaml
	sed -i '' ${SED_DESC_LOW_CODE} ${IMAGE_NAME_LOW_CODE}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT_LOW_CODE} ${IMAGE_NAME_LOW_CODE}/templates/deployment.yaml

# helm package
package-low-code:
	helm package ${IMAGE_NAME_LOW_CODE}

# make clean: remove charts.
clean-low-code:
	rm -rf low-code
	rm low-code-*.tgz
clean-all: clean-low-code
