var paas = angular.module('PaaS', ['ui.router']);

paas.controller('PController', function($scope, $state, $timeout, $stateParams) {
  $scope.sendBestRegards = function(target) {
    $state.go('targeting', {target: target}).then(function() {
      $timeout(function() {
        $state.go('completed');
      }, 5000);
    });
  }
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
          templateUrl: '/templates/targeting.html',
          controller: 'PController'
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
