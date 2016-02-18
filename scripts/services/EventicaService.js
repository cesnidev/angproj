eventica.factory('EventicaResource', function($resource,EventicaConfig) {
		return $resource("http://"+EventicaConfig.IP+":3000/api/v1/", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			},
      saveBasicInfo:{
        method:'POST',
        url:'http://'+EventicaConfig.IP+':3000/api/v1/basics'
      },
      saveProfile:{
        method:'POST',
        url:'http://'+EventicaConfig.IP+':3000/api/v1/profiles'
      },
      saveExperience:{
        method:'POST',
        url:'http://'+EventicaConfig.IP+':3000/api/v1/experiences'
      },
      saveAvailability:{
        method:'POST',
        url:'http://'+EventicaConfig.IP+':3000/api/v1/availabilities'
      },
      saveLegal:{
        method:'POST',
        url:'http://'+EventicaConfig.IP+':3000/api/v1/legals'
      }
		});
	})
.factory('EventicaLogin', function (Session,$http,$location,$window,$rootScope,EventicaConfig,Stats) {
  var eventicalogin = {};
  var data;
  var errors;

	eventicalogin.register = function (dataregister,social) {
    	var cookie = {};
      var url = 'http://'+EventicaConfig.IP+':3000/api/v1/normal/register/';

      if(social)
        url = 'http://'+EventicaConfig.IP+':3000/api/v1/social/register/';

		$http.post(url,dataregister,{"headers" : "Content-Type=application/x-www-form-urlencoded; charset=UTF-8"})
		.then(function successCallback(response) {
      data=response.data.data;
      errors = response.data.errors;
			console.log("sucess: "+JSON.stringify(response.data));
      console.log("sucess data: "+JSON.stringify(data));
      console.log("Token: "+response.data.data.relations.tokens[0].attributes.token);
      if(errors==''|| !errors)
      {
        switch(dataregister.auth.provider){
            case 'facebook':
            console.log('facebook elegido');
              FB.api('/'+dataregister.auth.uid+'/picture?width=800&height=800',function (picture) {
                console.log("picture: "+JSON.stringify(picture));
                cookie.id = dataregister.auth.uid;
                cookie.user=dataregister.auth.info.name;
                cookie.email= dataregister.auth.info.email;
                cookie.image=picture.data.url;
                cookie.token=data.relations.tokens[0].attributes.token;
                cookie.provider = dataregister.auth.provider;
                Session.StoreSession(cookie);
                console.log("ALMACENADA LA COOKIE Y REDIRECCIONANDO");
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
                $window.location.href = '#/signup';
              break;
            case 'angular':
              cookie.id = response.data.data.attributes.id;
              cookie.user=response.data.data.attributes.name;
              cookie.email= response.data.data.attributes.email;
              cookie.token=data.relations.tokens[0].attributes.token;
              cookie.provider = dataregister.auth.provider;
              Session.StoreSession(cookie);
              $window.location.href = '#/signup';
              break;
        };
        
        
      }
      else
      {
        console.log(response.errors);
        notificar(response.errors);
        
      }

		}, function errorCallback(response) {
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

  eventicalogin.login = function(credentials,social){
    var cookie={forms:{}};
    $rootScope.forms={basicinfo:{},profile:{},experience:{},availability:{},legal:{}};
    var url = 'http://'+EventicaConfig.IP+':3000/api/v1/normal/login/';

      if(social)
        url = 'http://'+EventicaConfig.IP+':3000/api/v1/social/login/';

    $http.post(url,credentials,{}).then(function successCallback(response){
      data=response.data.data;
      errors = response.data.errors;
      console.log("sucess: "+JSON.stringify(response));
      //console.log("sucess data: "+JSON.stringify(data));
      //console.log("Token: "+data.relations.tokens[0].attributes.token);
      if (errors==''|| !errors) {
          cookie.id = data.id;
          cookie.user=data.attributes.name;
          cookie.email= data.attributes.email;
          cookie.image=data.attributes.picture;
          cookie.token=data.relations.tokens[0].attributes.token;
          cookie.provider = data.attributes.provider;

            if(data.relations.basic != undefined)
              cookie.forms.basic=true;
            else
              console.log('no existe basic');

            if(data.relations.profile != undefined)
              cookie.forms.profile=true;
            if(data.relations.experience != undefined)
              cookie.forms.experience=true;
            if(data.relations.availability != undefined)
              cookie.forms.availability=true;
            if(data.relations.legal != undefined)
              cookie.forms.legal=true;
            Session.StoreSession(cookie);

          $window.location.href = '#/signup';
      } else{
        console.log("Sucess with errors: "+errors);
        notificar(errors.errors);
      };
    },function errorCallback(response){
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
 
  eventicalogin.isAuthenticated = function () {
    return Session.getSession()!=null;//validar campos validos
  };
  eventicalogin.isAllowed = function () {
    return Session.getSession()!=null;//validar campos validos
  };
 
  return eventicalogin;
});