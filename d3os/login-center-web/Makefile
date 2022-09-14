# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
# login-center-web
IMAGE_NAME_LOGIN_CENTER_WEB ?= login-center-web
IMAGE_VERSION_LOGIN_CENTER_WEB ?= v0.0.1
IMAGE_LOGIN_CENTER_WEB ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME_LOGIN_CENTER_WEB}

# helm create
create-login-center-web:
	helm create ${IMAGE_NAME_LOGIN_CENTER_WEB}

# modify chart information.
SED_REPO_LOGIN_CENTER_WEB ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME_LOGIN_CENTER_WEB}/g"
SED_TAG_LOGIN_CENTER_WEB ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION_LOGIN_CENTER_WEB}\"/g"
SED_DESC_LOGIN_CENTER_WEB ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME_LOGIN_CENTER_WEB}/g"
CONTAINER_PORT_LOGIN_CENTER_WEB ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT_LOGIN_CENTER_WEB ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT_LOGIN_CENTER_WEB}/g"

sed-chart-login-center-web:
	sed -i '' ${SED_REPO_LOGIN_CENTER_WEB} ${IMAGE_NAME_LOGIN_CENTER_WEB}/values.yaml
	sed -i '' ${SED_TAG_LOGIN_CENTER_WEB} ${IMAGE_NAME_LOGIN_CENTER_WEB}/values.yaml
	sed -i '' ${SED_DESC_LOGIN_CENTER_WEB} ${IMAGE_NAME_LOGIN_CENTER_WEB}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT_LOGIN_CENTER_WEB} ${IMAGE_NAME_LOGIN_CENTER_WEB}/templates/deployment.yaml

ENV ?= "env:\n  backendServiceUrl: \n"
append-env:
	echo ${ENV} >> ${IMAGE_NAME_LOGIN_CENTER_WEB}/values.yaml

# helm package
package-login-center-web:
	helm package ${IMAGE_NAME_LOGIN_CENTER_WEB}

# make clean: remove charts.
clean-login-center-web:
	rm -rf ${IMAGE_NAME_LOGIN_CENTER_WEB}

	rm ${IMAGE_NAME_LOGIN_CENTER_WEB}*.tgz
clean-all: clean-login-center-web
