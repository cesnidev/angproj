'use strict';

angular.module('Client',['ngFileUpload', 'ngImgCrop','ng-file-model','ngResource','ngRoute','ngMessages','ui.materialize','ui.mask','ngAnimate','angular.css.injector','angularLocalStorage','dropzone','googleplus'])
.constant('EVENTICA_ROLES', {
  admin: 'admin',
  user: 'user',
  guest: 'guest'
})
.constant('Stats',{
	notlogin:"You are not Signed",
	notallowed:"You are not allowed",
	missed:"Unrecognized Error",
	expired:"Your session has been expired,please login again"
})
.constant('EventicaConfig',{
	AppId:"a556e38454da7a7d6ce2be1954222fed",
	Min_Age:19,
	Max_Age:30,
	IP:'localhost'
})
.config(function($routeProvider, $locationProvider,cssInjectorProvider,EventicaLoginProvider,Stats,GooglePlusProvider){
		cssInjectorProvider.setSinglePageMode(true);

		GooglePlusProvider.init({
        clientId: '328036840034-ffmkskqmfrt3kn7tj167qa7d1b57hom5.apps.googleusercontent.com',
        apiKey: 'UuOPEsw-fKItFCvrERj89HUR'
     });

		/*.when('/signup',{
			templateUrl: function(params){
				if(EventicaLoginProvider.$get().isAuthenticated()==false){params.message=Stats.notlogin;notificar(Stats.notlogin,6000);return 'views/login.html';}
				else
					return 'views/signup.html';
			},
			controller: 'SignUpCtrl'
		})*/

		/**/
        $routeProvider
		.when('/signup',{
			templateUrl: function(params){
				if(EventicaLoginProvider.$get().isAuthenticated()==false){params.message=Stats.notlogin;notificar(Stats.notlogin,6000);return 'views/login.html';}
				else
					return 'views/signup.html';
			},
			controller: 'SignUpCtrl'
		})
		.when('/show',{
			templateUrl: function(params){
				if(EventicaLoginProvider.$get().isAuthenticated()==false){params.message=Stats.notlogin;notificar(Stats.notlogin,6000);return 'views/login.html';}
				else
					return 'views/signup.html';
			},
			controller: 'SignUpCtrl'
		})
		.when('/login',{
			templateUrl: 'views/login.html',
			controller: 'MainCtrl'
		}).when('/register',{
			templateUrl: 'views/register.html',
			controller: 'RegisterCtrl'
		}).when('/view',{
			templateUrl: function(params){
				if(EventicaLoginProvider.$get().isAuthenticated()==false){params.message=Stats.notlogin;notificar(Stats.notlogin,6000);return 'views/login.html';}
				else
					return 'views/view.html';
			},
			controller: 'ViewCtrl'
		}).when('/',{
			templateUrl: 'views/welcome.html',
			controller: 'IndexCtrl'
		}).otherwise({
			redirectTo: '/'
		}).when('/home',{
			templateUrl: function(params){
				if(EventicaLoginProvider.$get().isAuthenticated()==false){notificar(Stats.notlogin);return 'views/login.html';}
				else
					return 'views/home.html';
			},
			controller: 'MainCtrl'
		})
    
	});

window.fbAsyncInit = function() {
    FB.init({
      appId      : '867706610008739',
      status	  :true,
      cookie	  :true,
      xfbml      : true,
      version    : 'v2.1'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));