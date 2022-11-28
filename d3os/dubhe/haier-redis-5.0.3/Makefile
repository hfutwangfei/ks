# todo: to be added as image repository
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
# todo: to be added as image project
IMAGE_PROJECT ?= haier-redis-5.0.3
# todo: to be added as image name
IMAGE_NAME ?= redis
# todo: to be added as image version
IMAGE_VERSION ?= v2.0
# todo: to be added as helm chart version
CHART_VERSION ?= 0.1.0
# todo: to be added as helm chart project
CHART_NAME ?= haier-redis

# helm create
create-chart:
	@helm create ${CHART_NAME}
# image repository address
SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
# image version
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
# server port
PORT ?= 6379
SED_PORT ?= "s/port: 80/port: ${PORT}/g"
# helm chart description
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${CHART_NAME}/g"
# helm chart version
SED_CHART_VERSION ?= "s/version: 0.1.0/version: ${CHART_VERSION}/g"
# app version
SED_CHART_APP_VERSION ?= "s/appVersion: \"1.16.0\"/appVersion: \"${IMAGE_VERSION}\"/g"
# container port
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
	sed -i '' ${SED_CHART_APP_VERSION} ${CHART_NAME}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT} ${CHART_NAME}/templates/deployment.yaml
	sed -i '' "${SED_DELETE_PROBE}" ${CHART_NAME}/templates/deployment.yaml

# add env
ADD_DEPLOYMENT_ENV_BEFORE ?= imagePullPolicy:\ {{\ .Values.image.pullPolicy\ }}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_BEFORE}
ADD_DEPLOYMENT_WAP ?= \\n
ADD_DEPLOYMENT_SPACE ?= ' '
ADD_DEPLOYMENT_SPACE_10 ?= '          '
ADD_DEPLOYMENT_SPACE_12 ?= '            '
ADD_DEPLOYMENT_SPACE_14 ?= '              '
ADD_DEPLOYMENT_ENV_ENV ?= env:
ADD_DEPLOYMENT_ENV_NAME ?= -\ name:
ADD_DEPLOYMENT_ENV_VALUE ?= value:
# env name:
ENV_TZ_NAME ?= TZ
ENV_TZ_VALUE ?= Asia\\/Shanghai
# env:
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_10}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_ENV}
# - name: TZ
#   value: Asia/Shanghai
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_12}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ENV_TZ_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_14}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ENV_TZ_VALUE}

# env in deployment
ADD_DEPLOYMENT_ENV ?= s/${ADD_DEPLOYMENT_ENV_BEFORE}/${ADD_DEPLOYMENT_ENV_AFTER}/g

add-env:
	sed -i '' ${ADD_DEPLOYMENT_ENV} ${CHART_NAME}/templates/deployment.yaml

# helm package
package-chart:
	helm package ${CHART_NAME}

chart: create-chart sed-chart add-env package-chart

clean:
	rm -rf ${CHART_NAME}*