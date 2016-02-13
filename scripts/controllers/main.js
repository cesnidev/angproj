'use strict';
eventica
.controller('MainCtrl',function($scope,cssInjector,$location,$routeParams,EventicaLogin,Upload,$timeout){
	
	//Notify CSS
	cssInjector.add("assets/css/notify/bootstrap-notify.css");
	cssInjector.add("assets/css/notify/notify.css");
	cssInjector.add("assets/css/notify/styles/alert-bangtidy.css");
	cssInjector.add("assets/css/notify/styles/alert-blackgloss.css");
	cssInjector.add("assets/css/proyecto.form.css");
	cssInjector.add("assets/css/fileup/dropzone.css");

	if(EventicaLogin.isAuthenticated()&&!$location.absUrl().indexOf("home")>-1)
		$location.path("/home");//checar el issue cuando te llevan a home y necesitas dar back
	if(!EventicaLogin.isAuthenticated())
		$location.path("/login");



	$scope.msj=$routeParams.message;
	$scope.submitlogin = function(){
		if($scope.flogin.$valid)
		{
			var response = EventicaLogin.login($scope.login);
			//console.log(JSON.stringify(response));
			notificar("hi from angular: "+JSON.stringify($scope.login),3000);
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
		/*
		var response = EventicaLogin.login($scope.login);
		console.log(JSON.stringify(response));
		//$location.path('/signup');
		$('.top-left').notify({
                message: { text: response },
                type:'blackgloss'
              }).show();*/

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
    
	
});



