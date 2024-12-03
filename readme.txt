Run the Dockerfile not the docker-compose

docker build -t movie-booking-backend . 
docker run -p 4000:4000 movie-booking-backend

docker push <acc_name>/<image_name> to push it to registry