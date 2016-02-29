'use strict';
calcomm
.controller('MainCtrl',function($scope,cssInjector,$location,$routeParams,CalcommLogin,Upload,$timeout,Session,CalcommConfig,GooglePlus,$rootScope){
	$scope.credentials={app_id:CalcommConfig.AppId,auth:{info:{}}};
	cssInjector.add("assets/css/proyecto.form.css");
	cssInjector.add("assets/css/fileup/dropzone.css");

	if(CalcommLogin.isAuthenticated())
	{
		$scope.user = Session.getSession();
		if($scope.user.provider=='facebook'||$scope.user.provider=='google')
			$scope.img = $scope.user.image;
	}

	if(CalcommLogin.isAuthenticated()&&!$location.absUrl().indexOf("home")>-1)
		$location.path("/home");
	if(!CalcommLogin.isAuthenticated())
		$location.path("/login");



	$scope.msj=$routeParams.message;
	$scope.submitlogin = function(provider){
		$scope.credentials.auth.provider='angular';
		if($scope.flogin.$valid)
		{
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
            notificar('User cancelled login or did not fully authorize.');
        });
	};
	$scope.infacebook = function(){
		$scope.credentials.auth.provider="facebook";
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
                notificar('User cancelled login, not signed at facebook.com or did not fully authorize.');
            }
        },
        {scope:'email,public_profile'}
        );
	};

	$scope.upload = function (dataUrl) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

    $scope.logout = function(){
	    	if(Session.closeSession())
	    		$location.path('/login');
	    	else
	    		$location.path('/login');
	    };
    
	
});



