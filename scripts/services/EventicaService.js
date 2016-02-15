eventica.factory('EventicaResource', function($resource) {
		return $resource("http://localhost:3000/api/v1/", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			},
      saveBasicInfo:{
        method:'POST',
        url:'http://localhost:3000/api/v1/basics'
      },
      saveProfile:{
        method:'POST',
        url:'http://localhost:3000/api/v1/profiles'
      },
      saveExperience:{
        method:'POST',
        url:'http://localhost:3000/api/v1/experiences'
      },
      saveAvailability:{
        method:'POST',
        url:'http://localhost:3000/api/v1/availabilities'
      },
      saveLegal:{
        method:'POST',
        url:'http://localhost:3000/api/v1/legals'
      }
		});
	})
.factory('EventicaLogin', function (Session,$http,$location,$window) {
  var eventicalogin = {};
  var data;
  var errors;

	eventicalogin.register = function (dataregister) {
    	var cookie = {};

		$http.post('http://localhost:3000/api/v1/auth/',dataregister,{"headers" : "Content-Type=application/x-www-form-urlencoded; charset=UTF-8"})
		.then(function successCallback(response) {
      data=response.data.data;
      errors = response.data.errors;
			console.log("sucess: "+response.data);
      console.log("Token: "+response.data.data.relations.tokens.attributes.token);
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
                cookie.token=data.relations.tokens[0].attributes.token
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
      return reponse;

		}, function errorCallback(response) {
			console.log("error: "+response.data);
      return response;
		});
  };

  eventicalogin.login = function(credentials){
    var cookie={};
    $http.post('http://localhost:3000/api/v1/login',credentials,{}).then(function successCallback(response){
      data=response.data.data;
      errors = response.data.errors;
      if (errors==''|| !errors) {
          cookie.id = data.id;
          cookie.user=data.attributes.name;
          cookie.email= data.attributes.email;
          cookie.image=data.attributes.picture;
          cookie.token=data.relations.tokens[0].attributes.token
          cookie.provider = data.attributes.provider;
          Session.StoreSession(cookie);
          $window.location.href = '#/home';
      } else{
        console.log("Sucess with errors: "+errors);
        notificar(errors.errors);
      };
    },function errorCallback(response){
        notificar(response);
    });
  }
 
  eventicalogin.isAuthenticated = function () {
    return Session.getSession()!=null;//validar campos validos
  };
  eventicalogin.isAllowed = function () {
    return Session.getSession()!=null;//validar campos validos
  };
 
  return eventicalogin;
}).factory('$Facebook', function() {
   var facebook={};

   facebook.getMyInfo = function(){
      var myinfo={};
      FB.api('/me',{fields:'email,picture,birthday,name'} ,function (response) {
                  
            //console.log("Response Data: "+JSON.stringify(response));

        FB.api('/'+response.id+'/picture?width=800&height=800',function (response) {
            console.log("Response Image: "+JSON.stringify(response.data.url));
            myinfo.url = response.data.url;

          return myinfo;
        });
    });
   };
   facebook.isOnline = function(){
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected')
          return true;
        else
          return false;
      });
   };

   return facebook;
   
});