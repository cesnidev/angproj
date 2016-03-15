'use strict';
calcomm
.controller('LoginCtrl',function($scope,cssInjector,$location,$routeParams,CalcommLogin,Upload,$timeout,Session,CalcommConfig,GooglePlus,$rootScope){
	$scope.credentials={app_id:CalcommConfig.AppId,auth:{info:{}}};
	$scope.loading=false;
	cssInjector.add("assets/css/proyecto.form.css");
	cssInjector.add("assets/css/fileup/dropzone.css");
//	$scope.key = CalcommConfig.AppId;//only dev 
	
	if(CalcommLogin.isAuthenticated())
	{
		$scope.user = Session.getSession();
		if($scope.user.provider=='facebook'||$scope.user.provider=='google')
			$scope.img = $scope.user.image;
	}
	
	if(CalcommLogin.isAuthenticated()&&!$location.absUrl().indexOf("home")>-1)
	{
		if($scope.user.forms.basic && $scope.user.forms.profile && $scope.user.forms.experience && $scope.user.forms.availability && $scope.user.forms.legal || CalcommLogin.isAdmin())
			$location.path("/home");
		else
			$location.path('/signup');
	}
		
	if(!CalcommLogin.isAuthenticated())
		$location.path("/login");
	
	document.onkeydown = function(){
		if(event.keyCode==13)
		{
			if($scope.flogin.$valid)
				$scope.submitlogin();
		}	
	}
	
	
	
	$scope.msj=$routeParams.message;
	$scope.submitlogin = function(provider){
		$scope.credentials.auth.provider='angular';
		if($scope.flogin.$valid)
		{
	
			$("#loginp").removeClass("ng-hide").addClass('ng-show');
			$scope.credentials.auth.uid='12345';
            $scope.credentials.auth.email=$scope.log.email;
            $scope.credentials.auth.password=$scope.log.password;
			var response = CalcommLogin.login($scope.credentials,false);
		}
		else
		{
			notificar("incomplete information for login.");
		}
		
	};
	$scope.ingoogle = function() {
		$scope.credentials.auth.provider="google";
		$("#loginp").removeClass("ng-hide").addClass('ng-show');
		GooglePlus.login().then(function (response) {
			GooglePlus.getUser().then(function (user) {
				$scope.credentials.auth.uid=user.id;
				$scope.credentials.auth.info.name=user.name;
				$scope.credentials.auth.info.email=user.email;
				$scope.credentials.auth.info.picture=user.picture;
				$scope.credentials.auth.info.password='google';
				var response = CalcommLogin.login($scope.credentials,true);
			});
			}, function (err) {
			$("#loginp").removeClass("ng-show").addClass('ng-hide');
            notificar('User cancelled login or did not fully authorize.');
		});
	};
	$scope.infacebook = function(){
		$scope.credentials.auth.provider="facebook";
		$("#loginp").removeClass("ng-hide").addClass('ng-show');
		FB.login(
        function(response) {
            if (response.authResponse) {
				var url = '/me';
				
				FB.api(url,{fields:'email,picture,birthday,name'} ,function (response) {
					$scope.credentials.auth.uid=response.id;
					$scope.credentials.auth.info.name=response.name;
					$scope.credentials.auth.info.email=response.email;
					$scope.credentials.auth.info.password='facebook';
					var response = CalcommLogin.login($scope.credentials,true);
					
				}); 
				
				} else {
				$("#loginp").removeClass("ng-show").addClass('ng-hide');
                notificar('User cancelled login, not signed at facebook.com or did not fully authorize.');
			}
		},
        {scope:'email,public_profile'}
        );
	};
	
    $scope.logout = function(){
		Session.remove("completeforms");
		if(Session.closeSession())
			$location.path('/login');
		else
			$location.path('/login');
	};
    
	
});



