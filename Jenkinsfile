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

        stage('package mac') {
            sh 'npm run package:mac'
            dir('build/TimeTrack-darwin-x64') {
                sh 'zip -r TimeTrack.zip TimeTrack.app'
                archiveArtifacts 'TimeTrack.zip'
            }
        }
    }
    cleanWs()
}