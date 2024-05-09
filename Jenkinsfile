pipeline {
    environment {
        dockerimagebe = 'hasinzmn/goalzone-backend-image'
        dockerImageBackend = ""
        dockerimagefe = 'hasinzmn/goalzone-backend-image'
        dockerImageFrontend = ""
        registryCredential = credentials('docker-hub-access-token')   
    }
    agent any

    stages {
        stage('Build Docker images') {
            steps {
                script {
                    bat 'docker build -t hasinzmn/goalzone-backend ./Backend'
                    bat 'docker build -t hasinzmn/goalzone-frontend ./Frontend'
                }
            }
        }   
        stage('deploy on minikube'){
            steps {                
                bat 'kubectl apply -f ./Kubernetes/backend-deployment.yaml'
                bat 'kubectl apply -f ./Kubernetes/frontend-deployment.yaml'
                bat 'kubectl get pods'
                bat 'kubectl get deployments'
                bat 'kubectl get services'                            
            }
        }     
    }
    post {
        success {
            echo 'Build successful!'
        }        
        failure {
            echo 'Build failed!'
        }
    }
}