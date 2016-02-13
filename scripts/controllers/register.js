'use strict';

eventica.controller('RegisterCtrl', function($scope,EventicaConfig,$rootScope,EventicaLogin,$location,GooglePlus) {

	$scope.credentials={app_id:EventicaConfig.AppId,auth:{info:{}}};

	$scope.email = function(){
		$scope.credentials.auth.provider="angular";
		if($scope.flogin.$valid)
		{
			$scope.credentials.auth.uid='12345';
            $scope.credentials.auth.info.name=$scope.login.username;
            $scope.credentials.auth.info.email=$scope.login.email;
            $scope.credentials.auth.info.password=$scope.login.password;
			console.log("JSON: "+JSON.stringify($scope.credentials));
			var response = EventicaLogin.login($scope.credentials);
			console.log(JSON.stringify(response));
			if(response.errors=='')
			{
				//exito
				$location.path('/signup');
			}
			else
			{
				//fallo
				console.log(response.errors);
			}
		}
		else
		{
			//forma invalida
		}
		
		

	};
	$scope.facebook = function(){
		$scope.credentials.auth.provider="facebook";
		FB.login(
        function(response) {
            if (response.authResponse) {

               var url = '/me';
                    FB.api(url,{fields:'email,picture,birthday,name'} ,function (response) {
                  
                        $scope.credentials.auth.uid=response.id;
                        $scope.credentials.auth.info.name=response.name;
                        $scope.credentials.auth.info.email=response.email;
                         console.log("JSON: "+JSON.stringify($scope.credentials));
                        var response = EventicaLogin.login($scope.credentials);
						console.log(JSON.stringify(response));
                    });
                    
            } else {
                $scope.msj='User cancelled login or did not fully authorize.';
            }
        },
        {scope:'email,public_profile,user_friends,email,user_about_me'}
        );
	};
	$scope.google = function(){
			$scope.credentials.auth.provider="google";
			 GooglePlus.login().then(function (response) {
            console.log(response);
            

            GooglePlus.getUser().then(function (user) {
            			$scope.credentials.auth.uid=user.id;
                        $scope.credentials.auth.info.name=user.name;
                        $scope.credentials.auth.info.email=user.email;
                        console.log("JSON: "+JSON.stringify($scope.credentials));
                		var response = EventicaLogin.login($scope.credentials);
						console.log(JSON.stringify(response));
            });
        }, function (err) {
            console.log(err);
        });
	};

});