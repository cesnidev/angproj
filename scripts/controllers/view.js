'use strict';

calcomm.controller('ViewCtrl',function($scope,Session,CalcommLogin,$rootScope,$location,CalcommConfig,$http){
	
	
	if(CalcommLogin.isAuthenticated())
	{
		$scope.user = Session.getSession();
		if($scope.user.email!='calcommadmin@calcommevents.com')
			$location.path("/");
		
		var getAll = {token:$scope.user.token,app_id:CalcommConfig.AppId};
		
		$http({
		  method: 'GET',
		  url: 'http://'+CalcommConfig.IP+'/api/v1/users',
		  params: getAll
		}).then(function successCallback(response) {
			//console.log(response);
		  }, function errorCallback(response) {
			//console.debug(response);
		  });
		
		//console.log("COOKIE: "+JSON.stringify(Session.get('token')));
		if($scope.user.provider=='facebook'||$scope.user.provider=='google')
		$scope.img = $scope.user.image;
		
		
		$scope.users=[
			{id:1,firstname:'Armando',descripcion:"Informacion General del BA",photo:"1.jpg",gender:'male',age:"29"},
			{id:2,firstname:'Alvin',descripcion:"Informacion General del BA",photo:"2.jpg",gender:'male',age:"34"},
			{id:3,firstname:'Alberto',descripcion:"Informacion General del BA",photo:"3.jpg",gender:'male',age:"45"},
			{id:4,firstname:'Benito',descripcion:"Informacion General del BA",photo:"4.jpg",gender:'male',age:"19"},
			{id:5,firstname:'Bernardo',descripcion:"Informacion General del BA",photo:"5.jpg",gender:'male',age:"23"},
			{id:6,firstname:'Carlos',descripcion:"Informacion General del BA",photo:"6.jpg",gender:'male',age:"24"},
			{id:7,firstname:'Daniel',descripcion:"Informacion General del BA",photo:"7.jpg",gender:'male',age:"25"},
			{id:8,firstname:'Armando',descripcion:"Informacion General del BA",photo:"1.jpg",gender:'male',age:"28"},
			{id:9,firstname:'Alvin',descripcion:"Informacion General del BA",photo:"2.jpg",gender:'male',age:"30"},
			{id:10,firstname:'Alberto',descripcion:"Informacion General del BA",photo:"3.jpg",gender:'male',age:"32"},
			{id:11,firstname:'Benito',descripcion:"Informacion General del BA",photo:"4.jpg",gender:'male',age:"16"},
			{id:12,firstname:'Bernardo',descripcion:"Informacion General del BA",photo:"5.jpg",gender:'male',age:"25"},
			{id:13,firstname:'Carlos',descripcion:"Informacion General del BA",photo:"6.jpg",gender:'male',age:"31"},
			{id:14,firstname:'Daniel',descripcion:"Informacion General del BA",photo:"7.jpg",gender:'male',age:"20"}
		];
		$scope.AgeRange = function(from,to){
			return function(item){
				if(!from && !to)
				return item['age'] >=1 && item['age'] <= 100;
				else
				{
					if(!from)
					return item['age'] >= 1 && item['age'] <= to;
					else if(!to)
					return item['age'] >= from && item['age'] <= 100;
					else
					return item['age'] >= from && item['age'] <= to;
				}
				
			}
		};
		$scope.moreinfo = function(data) {
			Session.remove('basicinfo');
			$rootScope.info=data;
			$location.path('/show');
		}
		 $scope.logout = function(){
			Session.remove("completeforms");
			if(Session.closeSession())
				$location.path('/login');
			else
				$location.path('/login');
		};
	}
	else
	{
		$location.path("/login");
	}
	
	
    
});