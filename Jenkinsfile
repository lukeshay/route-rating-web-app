pipeline {
  agent { label 'master' }

  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        sh 'make prebuild'
      }
    }
    stage('Lint') {
      steps {
        echo 'Linting...'
        sh 'npm run validate'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing...'
        sh 'npm run test'
      }
    }
    stage('Coverage') {
      steps {
        echo 'Getting coverage...'
      }
    }
    stage('Build image') {
      steps {
        echo 'Building image...'
        sh 'make'
        sh 'make push'
        sh 'make push-latest'
      }
    }
    stage('Deploy') {
      when {
        branch 'master'
      }
      steps {
        echo 'Triggering deploy job...'
        // build job: '', propagate: true, wait: true
        // Pass in the repository to get proper deploy files
        build job: 'Deploy/deploy', propagate: true, wait: true, parameters: [[$class: 'StringParameterValue', name: 'GIT_REPO', value: 'route-rating-web-app']]
      }
    }
    stage('Smoke test') {
      when {
        branch 'master'
      }
      steps {
        echo 'Running post deploy smoke test...'
        build job: 'Test/post-release-app', propagate: true, wait: true
      }
    }
    stage('Clean') {
      when {
        branch 'master'
      }
      steps {
        echo 'Cleaning hanging images...'
        sh 'docker rmi $(docker images -q) || exit 0'
        sh 'docker rm $(docker ps -aq) || exit 0'
      }
    }
  }
  post {
    success {
      sh 'rm -rf dist node_modules coverage'
    }
    failure {
      sh 'rm -rf dist node_modules coverage'
    }
  }
}
