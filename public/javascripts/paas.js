var paas = angular.module('PaaS', ['ui.router']);

paas.controller('FormController', function($scope, $state,target) {
  $scope.$watch(function() { return target.value }, function(t) {
    $scope.target = t;
    t ? $state.go('targeting') : $state.go('form');
  });
  $scope.$watch('target', function(t) { target.value = t });
});

paas.controller('TargetingController', function($scope, target) {
  $scope.$watch(function() { return target.value }, function(t) { $scope.target = t });
});

paas.controller('ProgressController', function($scope, $state, $timeout) {
  $timeout(function() { $state.go('completed') }, 2000);
});

paas.controller('CompletedController', function($scope, target) {
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
    .state('progress', {
      url: 'progress',
      views: {
        main: {
          templateUrl: '/templates/progress.html',
          controller: 'ProgressController'
        }
      }
    })
    .state('completed', {
      url: 'completed',
      views: {
        main: {
          templateUrl: '/templates/completed.html',
          controller: 'CompletedController'
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
