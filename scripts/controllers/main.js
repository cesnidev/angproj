'use strict';
eventica
.controller('MainCtrl',function($scope,cssInjector,$location,$routeParams,EventicaLogin,Upload,$timeout,Session,EventicaConfig,GooglePlus,$rootScope){
	$scope.credentials={app_id:EventicaConfig.AppId,auth:{info:{}}};
	cssInjector.add("assets/css/proyecto.form.css");
	cssInjector.add("assets/css/fileup/dropzone.css");

	if(EventicaLogin.isAuthenticated())
	{
		$scope.user = Session.getSession();
		if($scope.user.provider=='facebook'||$scope.user.provider=='google')
			$scope.img = $scope.user.image;
	}

	//if(EventicaLogin.isAuthenticated()&&!$location.absUrl().indexOf("home")>-1)
	//	$location.path("/home");//checar el issue cuando te llevan a home y necesitas dar back
	if(!EventicaLogin.isAuthenticated())
		$location.path("/login");



	$scope.msj=$routeParams.message;
	$scope.submitlogin = function(provider){
		$scope.credentials.auth.provider='angular';
		if($scope.flogin.$valid)
		{
			$scope.credentials.auth.uid='12345';
            $scope.credentials.auth.email=$scope.log.email;
            $scope.credentials.auth.password=$scope.log.password;
			console.log("JSON: "+JSON.stringify($scope.credentials));
			var response = EventicaLogin.login($scope.credentials,false);
		}
		else
		{
			notificar("incomplete information for login.");
		}
	};
	$scope.ingoogle = function() {
		$scope.credentials.auth.provider="google";
			 GooglePlus.login().then(function (response) {
            console.log(response);
            

            GooglePlus.getUser().then(function (user) {
            			$scope.credentials.auth.uid=user.id;
                        $scope.credentials.auth.info.name=user.name;
                        $scope.credentials.auth.info.email=user.email;
                        $scope.credentials.auth.info.picture=user.picture;
                        $scope.credentials.auth.info.password='google';
                        //console.log("JSON: "+JSON.stringify($scope.credentials));
                		var response = EventicaLogin.login($scope.credentials,true);
						console.log("USER: "+JSON.stringify(user));
            });
        }, function (err) {
            console.log(err);
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
                  		console.log("JSON: "+JSON.stringify(response));
                        $scope.credentials.auth.uid=response.id;
                        $scope.credentials.auth.info.name=response.name;
                        $scope.credentials.auth.info.email=response.email;
                        $scope.credentials.auth.info.password='facebook';
                        // console.log("JSON: "+JSON.stringify($scope.credentials));
                        var response = EventicaLogin.login($scope.credentials,true);
                        
                    });
                    
            } else {
                notificar('User cancelled login, not signed at facebook.com or did not fully authorize.');
            }
        },
        {scope:'email,public_profile,user_friends,email,user_about_me'}
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
	    	//checar si es sesion por social media o email
	    	if(Session.closeSession())
	    		$location.path('/login');
	    	else
	    		$location.path('/login');
	    };
    
	
});



