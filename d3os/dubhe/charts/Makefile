create-chart:
	cd admin && make create-chart
	cd algorithm && make create-chart
	cd auth && make create-chart
	cd data && make create-chart
	cd data-dcm && make create-chart
	cd data-task && make create-chart
	cd gateway && make create-chart
	cd image && make create-chart
	cd k8s && make create-chart
	cd measure && make create-chart
	cd model && make create-chart
	cd notebook && make create-chart
	cd optimize && make create-chart
	cd serving && make create-chart
	cd serving-gateway && make create-chart
	cd tadl && make create-chart
	cd terminal && make create-chart
	cd train && make create-chart

sed-chart:
	cd admin && make sed-chart
	cd algorithm && make sed-chart
	cd auth && make sed-chart
	cd data && make sed-chart
	cd data-dcm && make sed-chart
	cd data-task && make sed-chart
	cd gateway && make sed-chart
	cd image && make sed-chart
	cd k8s && make sed-chart
	cd measure && make sed-chart
	cd model && make sed-chart
	cd notebook && make sed-chart
	cd optimize && make sed-chart
	cd serving && make sed-chart
	cd serving-gateway && make sed-chart
	cd tadl && make sed-chart
	cd terminal && make sed-chart
	cd train && make sed-chart

package-chart:
	cd admin && make package-chart
	cd algorithm && make package-chart
	cd auth && make package-chart
	cd data && make package-chart
	cd data-dcm && make package-chart
	cd data-task && make package-chart
	cd gateway && make package-chart
	cd image && make package-chart
	cd k8s && make package-chart
	cd measure && make package-chart
	cd model && make package-chart
	cd notebook && make package-chart
	cd optimize && make package-chart
	cd serving && make package-chart
	cd serving-gateway && make package-chart
	cd tadl && make package-chart
	cd terminal && make package-chart
	cd train && make package-chart

chart: create-chart sed-chart package-chart
	@mkdir tgz && cp */*.tgz tgz/

clean-all:
	cd admin && make clean-all
	cd algorithm && make clean-all
	cd auth && make clean-all
	cd data && make clean-all
	cd data-dcm && make clean-all
	cd data-task && make clean-all
	cd gateway && make clean-all
	cd image && make clean-all
	cd k8s && make clean-all
	cd measure && make clean-all
	cd model && make clean-all
	cd notebook && make clean-all
	cd optimize && make clean-all
	cd serving && make clean-all
	cd serving-gateway && make clean-all
	cd tadl && make clean-all
	cd terminal && make clean-all
	cd train && make clean-all
	rm -rf tgz
