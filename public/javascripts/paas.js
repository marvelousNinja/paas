var paas = angular.module('PaaS', ['ui.router']);

paas.controller('FormController', function($scope, $state, target) {
  $scope.$watch(function() { return target.value }, function(t) { $scope.target = t });
  $scope.$watch('target', function(t) { target.value = t });
});

paas.controller('TargetingController', function($scope, $state, $timeout, target) {
  $scope.$watch(function() { return target.value }, function(t) { $scope.target = t });
});

paas.value('target', { value: '' });

paas.config(function($stateProvider) {
  $stateProvider
    .state('form', {
      url: '',
      views: {
        main: {
          templateUrl: '/templates/form.html',
          controller: 'FormController'
        }
      }
    })
    .state('targeting', {
      url: 'targeting',
      views: {
        main: {
          templateUrl: '/templates/form.html',
          controller: 'FormController'
        },
        header: {
          templateUrl: '/templates/targeting.html',
          controller: 'TargetingController'
        }
      }
    })
    .state('completed', {
      url: 'completed',
      views: {
        main: {
          templateUrl: '/templates/completed.html',
          controller: 'PController'
        }
      }
    })
});

//  => You're on a home page =>  You Enter the link => System parses the link and tries to acquire a target =>
//  => It prints suggestable target => You click on the button and the process starts =>
//  => You see some kind of loading screen => Then you see completion message with link to go back =>
//  => You're on a home page
//                  |------------------|
//                  | Targeting widget |
//                  |------------------|
//        /------/       /------/                /---------/          /--------------------/
//  =>   / Form /  ===> / Form / ============>  / Spinner / =======> / Completion Message / =====\\
// ||   /------/       /------/                /---------/          /--------------------/        ||
// ||                                                                                            //
// \\ ===========================================================================================
