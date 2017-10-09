;(function(){
    
        angular.module('planet-api', ['ui.router'])
    
            .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    
            $urlRouterProvider.otherwise('/');
    
            $stateProvider
                .state('home', {
                    url: '/',
                    component: 'universeComponent'
                })
                // .state('search', {
                //     url: '/search/:query',
                //     component: 'search'
                // })


            $locationProvider.html5Mode(true);                
        });
    
    }());