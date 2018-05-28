@Library('pipeline') _

node('nodejs') {
    useNodeJs('10.2.1', '6.1.0')
    
    dir('build') {
        stage('checkout') {
            checkout scm
        }

        stage('npm install') {
            sh "npm install --ignore-scripts"
        }

        stage('build') {
            sh "npm run build"
        }
    }
    cleanWs()
}