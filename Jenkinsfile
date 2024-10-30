pipeline {
    agent any
    environment {
        NODEJS_HOME = tool name: 'nodejs'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/SAIEE12/React-Testing-Library-Net-Ninja.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm cache clean --force'
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'NODE_OPTIONS="--max_old_space_size=4096" npm run build'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'build/**'
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
