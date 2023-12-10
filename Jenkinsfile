pipeline {
    agent any

    environment {
        GITHUB_REPO = 'https://github.com/jana-srour/Log_Page_API.git'
        DOCKER_REGISTRY = 'janasrour99'
        JENKINS_ENVIRONMENT = 'true'
		KUBE_NAMESPACE = 'default' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Checkout code from GitHub repository
                    git branch: 'main', url: GITHUB_REPO
                }
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Build and test using Docker Compose
                    bat 'docker-compose build'
                    bat 'docker-compose up -d' // Start services in detached mode
                    // Wait for the services to be ready
                    def maxAttempts = 30
                    def attempt = 0

                    while (attempt < maxAttempts) {
                        // Use a simple check to see if the service is running
                        def isServiceRunning = bat(script: 'docker-compose ps --services | findstr /R "^webapi$"', returnStatus: true)

                        if (isServiceRunning == 0) {
                            echo 'Service "webapi" is running!'
                            break
                        }

                        sleep(time: 10, unit: 'SECONDS')
                        attempt++
                    }
                    // Test the services
                    bat 'docker-compose exec webapi dotnet test'
                    bat 'docker-compose exec reactapp npm test'
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    // Log in to Docker registry (using Docker Hub credentials)
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials-id', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        bat "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                    }

                    // Push Docker images to registry
                    bat "docker-compose push"
                }
            }
        }
		
		stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Deploy to Kubernetes using kubectl apply
                    bat "kubectl apply -f log-app-deployment.yaml -n ${KUBE_NAMESPACE}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Deployment complete.'
        }
        failure {
            echo 'Pipeline failed! Deployment unsuccessful.'
        }
    }
}
