var paas = angular.module('PaaS', ['ui.router']);

paas.controller('PController', function($scope, $state, $timeout, $stateParams) {
  $scope.$on('$viewContentLoaded', function(e, state) {
    $scope.target = $stateParams.target;
  });
});

paas.controller('TargetingController', function($scope, $state, $timeout, $stateParams) {
  $scope.$on('$viewContentLoaded', function(e, state) {
    // some stuff here to load the target image
  });
});

paas.config(function($stateProvider) {
  $stateProvider
    .state('form', {
      url: '',
      views: {
        main: {
          templateUrl: '/templates/form.html',
          controller: 'PController'
        }
      }
    })
    .state('targeting', {
      url: 'targeting/:target',
      views: {
        main: {
          templateUrl: '/templates/form.html',
          controller: 'PController'
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
