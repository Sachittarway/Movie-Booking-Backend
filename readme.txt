Run the Dockerfile not the docker-compose

docker build -t movie-booking-backend . 
docker run -p 4000:4000 movie-booking-backend

docker push <acc_name>/<image_name> to push it to registry

to run in k8

kubectl apply -f backend-deployment.yaml 
kubectl apply -f frontend-deployment.yaml 
kubectl get svc frontend-service
kubectl port-forward svc/backend-service 4000:4000

to run hpa
Create a metrics server
optional:kubectl get deployment metrics-server -n kube-system -o yaml > metrics-server.yaml


Thing that works:
https://ramesh-sahoo.medium.com/kubernetes-dashboard-and-metrics-server-installation-on-docker-desktop-minikube-5c46997120ca

to check kubetcl get top pod -A


