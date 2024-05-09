pipeline {
    environment {
        dockerimagebe = 'hasinzmn/goalzone-backend-image'
        dockerImageBackend = ""
        dockerimagefe = 'hasinzmn/goalzone-backend-image'
        dockerImageFrontend = ""
        registryCredential = credentials('docker-hub-access-token')
        // kubeconfigSecret = 'cubesecret'
        // kubeconfigPath = 'C:/Users/AuroobaParker/.kube/config'    
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
        // stage('Build Docker Images') {
        //     steps {
        //         echo 'Building Docker Image...'                
        //         script {
        //             dockerImageBackend = docker.build("${dockerimagebe}","./Backend")
        //             dockerImageFrontend = docker.build("${dockerimagefe}","./Frontend")
        //         }                          
        //     }
        // }
        stage('Push Docker Images') {             
            steps {
                echo 'Pushing Docker Image...'          
                script {
                    docker.withRegistry( '', registryCredential) {
                        dockerImageBackend.push("latest")
                        dockerImageFrontend.push("latest")
                    }
                }                          
            }
        }
        // stage('minikube config') {
        //     steps {
        //         echo 'Starting minikube...'
        //         bat 'minikube delete'
        //         bat "docker context use default"
        //         bat 'minikube config set driver docker'
        //         bat 'minikube start --driver docker'
        //         powershell 'minikube docker-env | Invoke-Expression'
        //         bat 'minikube status'                                                                             
        //     }
        // }
        // stage('deploy on Kubernetes') {
        //     steps {
        //         echo 'Deploying on kubernetes'
        //         bat "kubectl apply -f ./Kubernetes/mongo-deployment.yaml --validate=false"
        //         bat "kubectl apply -f ./Kubernetes/backend-deployment.yaml --validate=false"
        //         bat "kubectl apply -f ./Kubernetes/frontend-deployment.yaml --validate=false"
        //         }
            
        // } 
        // stage('Port forwarding...') {
        //     steps{
        //         echo 'port forwarding task being done'
        //         echo 'frontend will be running on port 3000!'
        //         bat 'start cmd /c kubectl port-forward service/backend 5000:5000'
        //         bat 'start cmd /c kubectl port-forward service/frontend 3000:3000'                
        //     }
        // }       
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