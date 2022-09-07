.prepare-docker-build:
	@echo Preparing image files...
	@mkdir -p _output/docker
	@cp docker/* _output/docker/

# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
IMAGE_NAME ?= dt-studio-frontend
IMAGE_VERSION ?= v1.9.0
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}

# make docker-build: Build image into local docker daemon.
docker-build: .prepare-docker-build
	@echo Building image for Image Manager into local docker daemon...
	docker build --pull -t ${IMAGE}:${IMAGE_VERSION} _output/docker

# helm create
create-chart:
	helm create ${IMAGE_NAME}

SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME}/g"
# make sed-chart: modify chart information.
sed-chart:
	sed -i '' ${SED_REPO} ${IMAGE_NAME}/values.yaml
	sed -i '' ${SED_TAG} ${IMAGE_NAME}/values.yaml
	sed -i '' ${SED_DESC} ${IMAGE_NAME}/Chart.yaml

# helm package
package-chart:
	helm package ${IMAGE_NAME}

# remove _output.
clean:
	rm -rf _output
