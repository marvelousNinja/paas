var paas = angular.module('PaaS', ['ui.router']);

paas.controller('PController', function($scope) {

});

paas.config(function($stateProvider) {
  $stateProvider
    .state('form', {
      url: '',
      templateUrl: '/templates/form.html',
      controller: 'PController'
    })
});