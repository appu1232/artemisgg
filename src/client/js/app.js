var app = angular.module('artemisgg', [
  "ui.router",
  "ngAnimate",
  "ngTouch",
  "restangular"
]);


app.config(function($stateProvider, $urlRouterProvider)  {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('primary', {
            url: '/',
            templateUrl: 'views/primary.html',
            controller: 'mainController'
        })
        .state('user', {
          url: '/user',
          templateUrl: 'views/user.html',
          controller: 'userController',
          resolve: {
            users: function(api){
              return api.getUsers(true);
            }
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'loginController',
          resolve: {}
        })
});

//restangular
app.config(function(RestangularProvider){
  RestangularProvider.setBaseUrl("/api");

  RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
    if(data.data){
      return data.data;
    }
    //for now just logging and failing
    else if(data.error) {
      console.error(data.error);
      return false;
    }
  });
});
