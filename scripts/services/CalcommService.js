calcomm.factory('CalcommResource', function($resource,CalcommConfig) {
	return $resource("http://"+CalcommConfig.IP+"/api/v1/", {
		id: "@id"
		}, {
		saveBasicInfo:{
			method:'POST',
			url:'http://'+CalcommConfig.IP+'/api/v1/basics'
		},
		saveProfile:{
			method:'POST',
			url:'http://'+CalcommConfig.IP+'/api/v1/profiles'
		},
		saveExperience:{
			method:'POST',
			url:'http://'+CalcommConfig.IP+'/api/v1/experiences'
		},
		saveAvailability:{
			method:'POST',
			url:'http://'+CalcommConfig.IP+'/api/v1/availabilities'
		},
		saveLegal:{
			method:'POST',
			url:'http://'+CalcommConfig.IP+'/api/v1/legals'
		}
	});
})
.factory('CalcommLogin', function (Session,$http,$location,$window,$rootScope,CalcommConfig,Stats) {
	var calcommlogin = {};
	var data;
	var errors;
	
	calcommlogin.register = function (dataregister,social) {
		var cookie={forms:{basic:false,profile:false,experience:false,availability:false,legal:false,}};
		var url = 'http://'+CalcommConfig.IP+'/api/v1/normal/register/';
		
		if(social)
		url = 'http://'+CalcommConfig.IP+'/api/v1/social/register/';
		
		$http.post(url,dataregister,{"headers" : "Content-Type=application/x-www-form-urlencoded; charset=UTF-8"})
		.then(function successCallback(response) {
			
			data=response.data.data;
			errors = response.data.errors;
			if(errors==''|| !errors)
			{
				switch(dataregister.auth.provider){
					case 'facebook':
					FB.api('/'+dataregister.auth.uid+'/picture?width=800&height=800',function (picture) {
						cookie.id = dataregister.auth.uid;
						cookie.user=dataregister.auth.info.name;
						cookie.email= dataregister.auth.info.email;
						cookie.image=picture.data.url;
						cookie.token=data.relations.tokens[0].attributes.token;
						cookie.provider = dataregister.auth.provider;
						Session.StoreSession(cookie);
						$("#loginp").removeClass("ng-show").addClass('ng-hide');
						$window.location.href = '#/signup';
					});
					break;
					case 'google':
					cookie.id = dataregister.auth.uid;
					cookie.user=dataregister.auth.info.name;
					cookie.email= dataregister.auth.info.email;
					cookie.image=dataregister.auth.info.picture;
					cookie.token=data.relations.tokens[0].attributes.token
					cookie.provider = dataregister.auth.provider;
					Session.StoreSession(cookie);
					$("#loginp").removeClass("ng-show").addClass('ng-hide');
					$window.location.href = '#/signup';
					break;
					case 'angular':
					cookie.id = response.data.data.attributes.id;
					cookie.user=response.data.data.attributes.name;
					cookie.email= response.data.data.attributes.email;
					cookie.token=data.relations.tokens[0].attributes.token;
					cookie.provider = dataregister.auth.provider;
					Session.StoreSession(cookie);
					$("#loginp").removeClass("ng-show").addClass('ng-hide');
					$window.location.href = '#/signup';
					break;
				};
				
				
			}
			else
			{
				
				$("#loginp").removeClass("ng-show").addClass('ng-hide');
				notificar(response.errors);
				
			}
			
			}, function errorCallback(response) {
			$("#loginp").removeClass("ng-show").addClass('ng-hide');
			console.log('register in error');
			
			if(response!=undefined)
			{
				notificar(response.data.errors[0]);
			}
			else
			{
				notificar(Stats.missed);
			}
		});
	};
	
	calcommlogin.login = function(credentials,social){
		var cookie={forms:{basic:false,profile:false,experience:false,availability:false,legal:false,}};
		$rootScope.forms={basicinfo:{},profile:{},experience:{},availability:{},legal:{}};
		var url = 'http://'+CalcommConfig.IP+'/api/v1/normal/login/';
		
		if(social)
        url = 'http://'+CalcommConfig.IP+'/api/v1/social/login/';
		
		$http.post(url,credentials,{}).then(function successCallback(response){
			data=response.data.data;
			errors = response.data.errors;
			if (errors==''|| !errors) {
				
				cookie.id = data.id;
				cookie.user=data.attributes.name;
				cookie.email= data.attributes.email;
				cookie.image=data.attributes.picture;
				cookie.token=data.relations.tokens[0].attributes.token;
				cookie.provider = data.attributes.provider;
				
				if(data.relations.basic != undefined)
					cookie.forms.basic=true;
				if(data.relations.profile != undefined)
					cookie.forms.profile=true;
				if(data.relations.experience != undefined)
					cookie.forms.experience=true;
				if(data.relations.availability != undefined)
					cookie.forms.availability=true;
				if(data.relations.legal != undefined)
					cookie.forms.legal=true;
				Session.StoreSession(cookie);
				$rootScope.loading=false;
				$("#loginp").removeClass("ng-show").addClass('ng-hide');
				$window.location.href = '#/signup';
				} else{
				$("#loginp").removeClass("ng-show").addClass('ng-hide');
				notificar(errors.errors);
			};
			},function errorCallback(response){
			
			$("#loginp").removeClass("ng-show").addClass('ng-hide');
			if(response!=undefined)
			{
				notificar(response.data.errors[0]);
			}
			else
			{
				notificar(Stats.missed);
			}
		});
	}
	
	calcommlogin.isAuthenticated = function () {
		return Session.getSession()!=null;//validar campos validos
	};
	calcommlogin.getEmail = function () {
		if(calcommlogin.isAuthenticated())
		return Session.getSession().email;//validar campos validos
		else
		return -1;
	};
	calcommlogin.isAllowed = function () {
		return Session.getSession()!=null;//validar campos validos
	};
	
	return calcommlogin;
});