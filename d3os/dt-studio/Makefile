.prepare-docker-build:
	@echo Preparing image files...
	@mkdir -p _output/docker
	@mkdir -p _output/docker/target
	@cp docker/Dockerfile _output/docker/
	@cp docker/dt-os-plat-0.0.1-SNAPSHOT.jar _output/docker/target/

# Identify the image that will be built and deployed.
IMAGE_ADDRESS ?= registry-edge.cosmoplat.com
IMAGE_PROJECT ?= kubesphere
IMAGE_NAME ?= dt-studio
IMAGE_VERSION ?= v0.0.2
IMAGE ?= ${IMAGE_ADDRESS}/${IMAGE_PROJECT}/${IMAGE_NAME}

# make docker-build: Build image into local docker daemon.
docker-build: .prepare-docker-build
	@echo Building image for Image Manager into local docker daemon...
	docker build --pull -t ${IMAGE}:${IMAGE_VERSION} _output/docker

SED_REPO ?= "s/repository:\ nginx/repository:\ ${IMAGE_ADDRESS}\/${IMAGE_PROJECT}\/${IMAGE_NAME}/g"
SED_TAG ?= "s/tag: \"\"/tag: \"${IMAGE_VERSION}\"/g"
SED_DESC ?= "s/description: A Helm chart for Kubernetes/description: ${IMAGE_NAME}/g"
# make sed-chart: modify chart information.
sed-chart:
	sed -i '' ${SED_REPO} dt-studio/values.yaml
	sed -i '' ${SED_TAG} dt-studio/values.yaml
	sed -i '' ${SED_DESC} dt-studio/Chart.yaml

# make clean: remove _output.
clean:
	rm -rf _output
