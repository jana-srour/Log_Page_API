# Introduction

> This Login Sample Page is designed with React for front-end and used C# .NET Core Web API for getting data for login and registration forms from postgres database.

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

## License

Copyright © 2023 Jana Srour.