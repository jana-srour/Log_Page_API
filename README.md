# Introduction

> This Login Sample Page is designed with ReactJS for front-end and used C# .NET Core Web API for getting data for login and registration forms from postgres database.

## Installation

Clone the project repository:

```bash
git clone https://github.com/jana-srour/Log_Page_API.git
```

## Usage

#### Method 1:
Build the docker compose and run it to test the project.

```bash
docker-compose build
docker-compose up
```

#### Method 2:
Create a Jenkins pipeline to automate the process that will build the docker-compose and bring it up and deploy to kubernetes default cluster created by minikube using kubectl.

Jenkinsfile is found with the project files and the kubernetes deployement file as well.

## Testing
For testing the application, after the project is up, you need to register a user to be able to login otherwise it will give you error username does not exist. Once user is registered, you will be logged in.

## Pipeline Working
Jenkinsfile is defined to execute stages according to the following:
  1. _Pull the latest code from Git._
  2. _Build the Docker images for frontend and backend._
  3. _Run any available tests._
  4. _Push Docker images to a container registry._
  5. _Deploy to Kubernetes using kubectl apply._
 
Post the stage execution, it will log out the success or failure of the pipeline.

## License

Copyright © 2023 Jana Srour.