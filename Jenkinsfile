void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: env.GIT_URL],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "Jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {
  agent { label 'ops' }

  stages {
    stage('Build') {
      steps {
        echo 'Building...'
        setBuildStatus('Starting build', 'PENDING')
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
      when {
        branch 'master'
      }
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
        build job: 'Deploy/deploy-from-image', propagate: true, wait: true, parameters: [[$class: 'StringParameterValue', name: 'GIT_REPO', value: 'route-rating-web-app'], [$class: 'StringParameterValue', name: 'DOCKER_REPO', value: 'route-rating-web-app']]
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
  }
  post {
    success {
      setBuildStatus('Pipeline succeeded', 'SUCCESS');
      sh 'rm -rf dist node_modules coverage'
    }
    failure {
      setBuildStatus('Pipeline failed', 'FAILURE');
      sh 'rm -rf dist node_modules coverage'
    }
  }
}
