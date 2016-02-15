'use strict';

eventica.controller('ViewCtrl',function($scope,Session){

	$scope.user = Session.getSession();
	console.log("COOKIE: "+JSON.stringify(Session.get('token')));

	if($scope.user.provider=='facebook'||$scope.user.provider=='google')
		$scope.img = $scope.user.image;

	$scope.users=[
		{name:'Armando',descripcion:"Informacion General del BA",photo:"1.jpg"},
		{name:'Alvin',descripcion:"Informacion General del BA",photo:"2.jpg"},
		{name:'Alberto',descripcion:"Informacion General del BA",photo:"3.jpg"},
		{name:'Benito',descripcion:"Informacion General del BA",photo:"4.jpg"},
		{name:'Bernardo',descripcion:"Informacion General del BA",photo:"5.jpg"},
		{name:'Carlos',descripcion:"Informacion General del BA",photo:"6.jpg"},
		{name:'Daniel',descripcion:"Informacion General del BA",photo:"7.jpg"},
		{name:'Armando',descripcion:"Informacion General del BA",photo:"1.jpg"},
		{name:'Alvin',descripcion:"Informacion General del BA",photo:"2.jpg"},
		{name:'Alberto',descripcion:"Informacion General del BA",photo:"3.jpg"},
		{name:'Benito',descripcion:"Informacion General del BA",photo:"4.jpg"},
		{name:'Bernardo',descripcion:"Informacion General del BA",photo:"5.jpg"},
		{name:'Carlos',descripcion:"Informacion General del BA",photo:"6.jpg"},
		{name:'Daniel',descripcion:"Informacion General del BA",photo:"7.jpg"}
	];
	$scope.criterio;

	$scope.change = function(state){
		if (state) {
			$scope.criterio
		}else
		{

		}
	};
});