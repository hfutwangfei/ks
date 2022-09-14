# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
# login-center
IMAGE_NAME_LOGIN_CENTER ?= login-center
IMAGE_VERSION_LOGIN_CENTER ?= v0.0.1
IMAGE_LOGIN_CENTER ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME_LOGIN_CENTER}

# helm create
create-login-center:
	helm create ${IMAGE_NAME_LOGIN_CENTER}

# modify chart information.
SED_REPO_LOGIN_CENTER ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME_LOGIN_CENTER}/g"
SED_TAG_LOGIN_CENTER ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION_LOGIN_CENTER}\"/g"
PORT_LOGIN_CENTER ?= 8081
SED_PORT_LOGIN_CENTER ?= "s/port: 80/port: ${PORT_LOGIN_CENTER}/g"
SED_DESC_LOGIN_CENTER ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME_LOGIN_CENTER}/g"
CONTAINER_PORT_LOGIN_CENTER ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT_LOGIN_CENTER ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT_LOGIN_CENTER}/g"

sed-chart-login-center:
	sed -i '' ${SED_REPO_LOGIN_CENTER} ${IMAGE_NAME_LOGIN_CENTER}/values.yaml
	sed -i '' ${SED_TAG_LOGIN_CENTER} ${IMAGE_NAME_LOGIN_CENTER}/values.yaml
	sed -i '' ${SED_PORT_LOGIN_CENTER} ${IMAGE_NAME_LOGIN_CENTER}/values.yaml
	sed -i '' ${SED_DESC_LOGIN_CENTER} ${IMAGE_NAME_LOGIN_CENTER}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT_LOGIN_CENTER} ${IMAGE_NAME_LOGIN_CENTER}/templates/deployment.yaml

ENV ?= "env: \n  dataResourceUrl: \n  dataResourceUsername: \n  dataResourcePassword: \n  redisUrl: \n  redisPort: \n  redisPassword: \n  deadlineTime: \n  open: \n  tenantId: \n  iotUsername: \n  iotPassword: \n"
append-env:
	echo ${ENV} >> ${IMAGE_NAME_LOGIN_CENTER}/values.yaml

# helm package
package-login-center:
	helm package ${IMAGE_NAME_LOGIN_CENTER}

# make clean: remove charts.
clean-login-center:
	rm -rf ${IMAGE_NAME_LOGIN_CENTER}
clean-tgz:
	rm ${IMAGE_NAME_LOGIN_CENTER}*.tgz
clean-all: clean-login-center clean-tgz
