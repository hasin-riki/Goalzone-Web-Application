pipeline {
    environment {
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
        stage('Push images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-pwd') {
                        bat 'docker push hasinzmn/goalzone-backend'
                        bat 'docker push hasinzmn/goalzone-frontend'
                    }
                    // withCredentials([string(credentialsId: 'docker-hub-pwd', variable: 'docker-hub-pwd')]) {
                    //     bat "echo ${docker-hub-pwd} | docker login -u hasinzmn --password-stdin"
                    //     // bat 'docker login -u hasinzmn -p ${docker-hub-pwd}'
                    // }
                    // bat 'docker push hasinzmn/goalzone-backend'
                    // bat 'docker push hasinzmn/goalzone-frontend'
                }
            }
        }   
        stage('Deploy on minikube'){
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