# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
# odoo
IMAGE_NAME_ODOO ?= odoo
IMAGE_VERSION_ODOO ?= v0.1.0
IMAGE_ODOO ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME_ODOO}

# helm create
create-odoo:
	helm create ${IMAGE_NAME_ODOO}

# modify chart information.
SED_REPO_ODOO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME_ODOO}/g"
SED_TAG_ODOO ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION_ODOO}\"/g"
PORT_ODOO ?= 8069
SED_PORT_ODOO ?= "s/port: 80/port: ${PORT_ODOO}/g"
SED_DESC_ODOO ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME_ODOO}/g"
CONTAINER_PORT_ODOO ?= {{ .Values.service.port | default 80 }}
SED_CONTAINER_PORT_ODOO ?= "s/containerPort: 80/containerPort: ${CONTAINER_PORT_ODOO}/g"

sed-chart-odoo:
	sed -i '' ${SED_REPO_ODOO} ${IMAGE_NAME_ODOO}/values.yaml
	sed -i '' ${SED_TAG_ODOO} ${IMAGE_NAME_ODOO}/values.yaml
	sed -i '' ${SED_PORT_ODOO} ${IMAGE_NAME_ODOO}/values.yaml
	sed -i '' ${SED_DESC_ODOO} ${IMAGE_NAME_ODOO}/Chart.yaml
	sed -i '' ${SED_CONTAINER_PORT_ODOO} ${IMAGE_NAME_ODOO}/templates/deployment.yaml

# helm package
package-odoo:
	helm package ${IMAGE_NAME_ODOO}

# make clean: remove charts.
clean-odoo:
	rm -rf odoo
	rm odoo-*.tgz
clean-all: clean-odoo
