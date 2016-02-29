'use strict';

calcomm.controller('RegisterCtrl', function($scope,CalcommConfig,$rootScope,CalcommLogin,$location,GooglePlus) {

	$scope.credentials={app_id:CalcommConfig.AppId,auth:{info:{}}};

	$scope.email = function(){
		$scope.credentials.auth.provider="angular";
		if($scope.flogin.$valid)
		{
			$scope.credentials.auth.uid='12345';
            $scope.credentials.auth.info.name=$scope.reg.username;
            $scope.credentials.auth.info.email=$scope.reg.email;
            $scope.credentials.auth.info.password=$scope.reg.password;
			var response = CalcommLogin.register($scope.credentials,false);
		}
		else
		{
			notificar("you must complete the register.");
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
                        $scope.credentials.auth.info.password='facebook';
                        var response = CalcommLogin.register($scope.credentials,true);
                        
                    });
                    
            } else {
                notificar('User cancelled login or did not fully authorize.');
            }
        },
        {scope:'email,public_profile'}
        );
	};
	$scope.google = function(){
			$scope.credentials.auth.provider="google";
			 GooglePlus.login().then(function (response) {
            GooglePlus.getUser().then(function (user) {
            			$scope.credentials.auth.uid=user.id;
                        $scope.credentials.auth.info.name=user.name;
                        $scope.credentials.auth.info.email=user.email;
                        $scope.credentials.auth.info.picture=user.picture;
                        $scope.credentials.auth.info.password='google';
                		var response = CalcommLogin.register($scope.credentials,true);
            });
        }, function (err) {
            notificar('User cancelled login or did not fully authorize.');
        });
	};


});