# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
# eim-plat
IMAGE_NAME ?= low-code
IMAGE_VERSION ?= v0.0.2
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}
CHART_VERSION ?= 0.2.0

CHART_NAME ?= eim-plat

# helm create
create-chart:
	helm create ${CHART_NAME}

# modify chart information.
SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
PORT ?= 8069
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

ADD_DEPLOYMENT_ENV_BEFORE ?= imagePullPolicy:\ {{\ .Values.image.pullPolicy\ }}
ADD_DEPLOYMENT_WAP ?= \\n
ADD_DEPLOYMENT_SPACE ?= ' '
ADD_DEPLOYMENT_SPACE_10 ?= '          '
ADD_DEPLOYMENT_SPACE_12 ?= '            '
ADD_DEPLOYMENT_SPACE_14 ?= '              '
ADD_DEPLOYMENT_ENV_ENV ?= env:
ADD_DEPLOYMENT_ENV_NAME ?= -\ name:
ADD_DEPLOYMENT_ENV_VALUE ?= value:
ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_ADDR_NAME ?= DB_PORT_5432_TCP_ADDR
ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_ADDR_VALUE ?= {{\ .Values.env.DB_PORT_5432_TCP_ADDR\ }}
ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_PORT_NAME ?= DB_PORT_5432_TCP_PORT
ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_PORT_VALUE ?= {{\ .Values.env.DB_PORT_5432_TCP_PORT\ }}
ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_USER_NAME ?= DB_ENV_POSTGRES_USER
ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_USER_VALUE ?= {{\ .Values.env.DB_ENV_POSTGRES_USER\ }}
ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_PASSWORD_NAME ?= DB_ENV_POSTGRES_PASSWORD
ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_PASSWORD_VALUE ?= {{\ .Values.env.DB_ENV_POSTGRES_PASSWORD\ }}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_BEFORE}
# env:
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_10}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_ENV}
# DB_PORT_5432_TCP_ADDR
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_12}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_ADDR_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_14}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_ADDR_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_ADDR}
# DB_PORT_5432_TCP_PORT
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_12}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_PORT_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_14}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_PORT_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_PORT_5432_TCP_PORT}
# ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_USER
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_12}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_USER_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_14}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_USER_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_USER}
# ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_PASSWORD
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_12}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_PASSWORD_NAME}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_WAP}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE_14}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_PASSWORD_VALUE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_SPACE}
ADD_DEPLOYMENT_ENV_AFTER := ${ADD_DEPLOYMENT_ENV_AFTER}${ADD_DEPLOYMENT_ENV_DB_ENV_POSTGRES_PASSWORD}
#
ADD_DEPLOYMENT_ENV ?= s/${ADD_DEPLOYMENT_ENV_BEFORE}/${ADD_DEPLOYMENT_ENV_AFTER}/g

ADD_VALUES_WAP ?= \\n
ADD_VALUES_SPACE ?= ' '
ADD_VALUES_SPACE_2 ?= '  '
ADD_VALUES_ENV_ENV ?= env:
ADD_VALUES_ENV_NAME_DB_PORT_5432_TCP_ADDR ?= DB_PORT_5432_TCP_ADDR:
ADD_VALUES_ENV_NAME_DB_PORT_5432_TCP_PORT ?= DB_PORT_5432_TCP_PORT:
ADD_VALUES_ENV_NAME_DB_ENV_POSTGRES_USER ?= DB_ENV_POSTGRES_USER:
ADD_VALUES_ENV_NAME_DB_ENV_POSTGRES_PASSWORD ?= DB_ENV_POSTGRES_PASSWORD:
# env:
ADD_VALUES_ENV := ${ADD_VALUES_ENV_ENV}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_WAP}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE_2}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_ENV_NAME_DB_PORT_5432_TCP_ADDR}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_WAP}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE_2}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_ENV_NAME_DB_PORT_5432_TCP_PORT}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_WAP}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE_2}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_ENV_NAME_DB_ENV_POSTGRES_USER}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_WAP}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE_2}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_ENV_NAME_DB_ENV_POSTGRES_PASSWORD}
ADD_VALUES_ENV := ${ADD_VALUES_ENV}${ADD_VALUES_SPACE}

add-env:
	sed -i '' ${ADD_DEPLOYMENT_ENV} ${CHART_NAME}/templates/deployment.yaml
	echo ${ADD_VALUES_ENV} >> ${CHART_NAME}/values.yaml

# helm package
package-chart:
	helm package ${CHART_NAME}

chart: create-chart sed-chart add-env package-chart

# make clean: remove charts.
clean-chart:
	rm -rf eim-plat
clean-tgz:
	rm eim-plat-*.tgz
clean-all: clean-chart clean-tgz
