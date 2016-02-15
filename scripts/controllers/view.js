'use strict';

eventica.controller('ViewCtrl',function($scope,Session){

	$scope.user = Session.getSession();
	console.log("COOKIE: "+JSON.stringify(Session.get('token')));

	if($scope.user.provider=='facebook'||$scope.user.provider=='google')
		$scope.img = $scope.user.image;

	$scope.users=[
		{name:'Armando',descripcion:"Informacion General del BA",photo:"1.jpg",age:"29"},
		{name:'Alvin',descripcion:"Informacion General del BA",photo:"2.jpg",age:"34"},
		{name:'Alberto',descripcion:"Informacion General del BA",photo:"3.jpg",age:"45"},
		{name:'Benito',descripcion:"Informacion General del BA",photo:"4.jpg",age:"19"},
		{name:'Bernardo',descripcion:"Informacion General del BA",photo:"5.jpg",age:"23"},
		{name:'Carlos',descripcion:"Informacion General del BA",photo:"6.jpg",age:"24"},
		{name:'Daniel',descripcion:"Informacion General del BA",photo:"7.jpg",age:"25"},
		{name:'Armando',descripcion:"Informacion General del BA",photo:"1.jpg",age:"28"},
		{name:'Alvin',descripcion:"Informacion General del BA",photo:"2.jpg",age:"30"},
		{name:'Alberto',descripcion:"Informacion General del BA",photo:"3.jpg",age:"32"},
		{name:'Benito',descripcion:"Informacion General del BA",photo:"4.jpg",age:"16"},
		{name:'Bernardo',descripcion:"Informacion General del BA",photo:"5.jpg",age:"25"},
		{name:'Carlos',descripcion:"Informacion General del BA",photo:"6.jpg",age:"31"},
		{name:'Daniel',descripcion:"Informacion General del BA",photo:"7.jpg",age:"20"}
	];
	$scope.criterio;

	$scope.change = function(state){
		if (state) {
			$scope.criterio
		}else
		{

		}
	};
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
    
});