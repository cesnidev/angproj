'use strict';
eventica
.controller('MainCtrl',function($scope,cssInjector,$location,$routeParams,EventicaLogin,Upload,$timeout,Session){
	
	cssInjector.add("assets/css/proyecto.form.css");
	cssInjector.add("assets/css/fileup/dropzone.css");

	if(EventicaLogin.isAuthenticated())
	{
		$scope.user = Session.getSession();
		if($scope.user.provider=='facebook'||$scope.user.provider=='google')
			$scope.img = $scope.user.image;
	}

	if(EventicaLogin.isAuthenticated()&&!$location.absUrl().indexOf("home")>-1)
		$location.path("/home");//checar el issue cuando te llevan a home y necesitas dar back
	if(!EventicaLogin.isAuthenticated())
		$location.path("/login");



	$scope.msj=$routeParams.message;
	$scope.submitlogin = function(){
		notificar('Working...');
	}

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



