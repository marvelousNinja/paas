var paas = angular.module('PaaS', ['ui.router']);

paas.controller('FormController', function($scope, $state, target) {
  $scope.$watch(function() { return target }, function(t) {
    $scope.target = t.value;
    $scope.social = t.social;

    t.value ? $state.go('targeting') : $state.go('form');
  }, true);
  $scope.$watch('target', function(t) { target.value = t });
  $scope.$watch('social', function(s) { target.social = s });
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

paas.value('target', { 
  value: '',
  social: '', 
  reset: function() {
    this.value = '';
    this.social = '';
  }
});

paas.config(function($stateProvider) {
  $stateProvider
    .state('form', {
      url: '',
      views: {
        header: {
          templateUrl: '/templates/header.html'
        },
        main: {
          templateUrl: '/templates/form.html',
          controller: 'FormController'
        },
        aside: {
          templateUrl: '/templates/quote.html'
        },
        footer: {
          templateUrl: '/templates/footer.html'
        }
      },
      onEnter: function(target) { 
        target.reset(); 
      }
    })
    .state('targeting', {
      url: 'targeting',
      views: {
        main: {
          templateUrl: '/templates/form.html',
          controller: 'FormController'
        },
        aside: {
          templateUrl: '/templates/quote.html',
        },
        header: {
          templateUrl: '/templates/targeting.html',
          controller: 'TargetingController'
        },
        footer: {
          templateUrl: '/templates/footer.html'
        }
      }
    })
    .state('progress', {
      url: 'progress',
      views: {
        main: {
          templateUrl: '/templates/progress.html',
          controller: 'ProgressController'
        },
        footer: {
          templateUrl: '/templates/footer.html'
        }
      }
    })
    .state('completed', {
      url: 'completed',
      views: {
        main: {
          templateUrl: '/templates/completed.html',
          controller: 'CompletedController'
        },
        footer: {
          templateUrl: '/templates/footer.html'
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
