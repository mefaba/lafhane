# Use an official OpenJDK runtime as a parent image
# Step 1: Build the application
FROM maven:3.9.8-amazoncorretto-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Step 2: Create the final image
FROM amazoncorretto:17
WORKDIR /app

# Copy the jar file from your local machine to the container
COPY --from=build /app/target/LafhaneServer-1.1.2-VESAIRE.jar /app/LafhaneServerApp.jar

# Expose the port your Spring Boot application is running on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "/app/LafhaneServerApp.jar"]


#How to run this docker file to create docker image
#docker build -t <image-name>:tagname .

#Change tag name of image
#docker tag <existing-image> <new-image>:<new-tag>

#To push a new tag to this repository:
#docker push <existing-image>:tagname

#run container using the image
#sudo docker run -d -p 80:8080 <existing-image>
#sudo docker run -d --name lafhaneserver-app <existing-image>

#delete stopped containers
#sudo docker container prune

#see container logs
#sudo docker logs -f <container-name>

#docker run -d -p 80:80 -p 443:443 --name nginx-ssl --link lafhaneserver-app:lafhaneserver-app nginx-ssl