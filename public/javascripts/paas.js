var paas = angular.module('PaaS', ['ui.router']);

paas.controller('PController', function($scope, $state, $timeout) {
  $scope.sendBestRegards = function(target) {
    $state.transitionTo('targeting');

    $timeout(function() {
      $state.transitionTo('completed', {
        target: target
      });
    }, 5000);
  }
});

paas.config(function($stateProvider) {
  $stateProvider
    .state('form', {
      url: '',
      templateUrl: '/templates/form.html',
      controller: 'PController'
    })
    .state('targeting', {
      url: 'targeting',
      templateUrl: '/templates/targeting.html',
      controller: 'PController'
    })
    .state('completed', {
      url: 'completed',
      templateUrl: '/templates/completed.html',
      controller: 'PController'
    })
});