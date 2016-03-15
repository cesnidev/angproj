calcomm.controller('CalcommCtrl',function($scope,Session,CalcommLogin,$location){
	
	$scope.GoTo = function(url){
		$location.path(url);
	};
	$scope.showImg = function(url){
		if(url.indexOf('base'))
			return url;
		else
			return 'http://'+CalcommConfig.IP+url;
		}
	if(CalcommLogin.isAuthenticated())
	{
		$scope.user = Session.getSession();
		//console.debug($scope.user);
		if(CalcommLogin.isAuthenticated()&&!$location.absUrl().indexOf("home")>-1&&!CalcommLogin.isAdmin())
		{
			if(!($scope.user.forms.basic && $scope.user.forms.profile && $scope.user.forms.experience && $scope.user.forms.availability && $scope.user.forms.legal) )
			{	
				notificar("you must complete all forms.");$location.path("/signup");
			}
		}
		

		if(CalcommLogin.isAdmin())
			$scope.advance=true;
		
	}
	$scope.logout = function(){
				Session.remove("completeforms");  
				if(Session.closeSession())
					$location.path('/login'); 
				else
					$location.path('/login');
			};
		
});