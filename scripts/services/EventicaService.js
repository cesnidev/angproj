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

	eventicalogin.login = function (credentials) {
    	var cookie = {};
      /*switch(credentials.auth.provider){
            case 'facebook':
            console.log('facebook elegido');
              FB.api('/'+credentials.auth.uid+'/picture?width=800&height=800',function (picture) {
                console.log("picture: "+JSON.stringify(picture));
                cookie.id = credentials.auth.uid;
                cookie.user=credentials.auth.info.name;
                cookie.email= credentials.auth.info.email;
                cookie.image=picture.data.url;
                cookie.token='12345';
                cookie.provider = credentials.auth.provider;
                Session.StoreSession(cookie);
                console.log("ALMACENADA LA COOKIE Y REDIRECCIONANDO");
                $window.location.href = '#/signup';
              });
              break;
            case 'google':
                cookie.id = credentials.auth.uid;
                cookie.user=credentials.auth.info.name;
                cookie.email= credentials.auth.info.email;
                cookie.image=credentials.auth.info.picture;
                //cookie.token=response.data.data.relations.tokens[0].attributes.token;
                cookie.token='12345';
                cookie.provider = credentials.auth.provider;
                Session.StoreSession(cookie);
                $window.location.href = '#/signup';
              break;
            case 'angular':
              cookie.id = response.data.data.attributes.id;
              cookie.user=response.data.data.attributes.name;
              cookie.email= response.data.data.attributes.email;
              cookie.token=response.data.data.relations.tokens[0].attributes.token;
              cookie.provider = credentials.auth.provider;
              Session.StoreSession(cookie);
              $window.location.href = '#/signup';
              break;
         };*/


		$http.post('http://localhost:3000/api/v1/auth/',credentials,{"headers" : "Content-Type=application/x-www-form-urlencoded; charset=UTF-8"})
		.then(function successCallback(response) {
			console.log("sucess: "+response.data);
      console.log("Token: "+response.data.data.relations.tokens.attributes.token);
      if(response.data.errors!='')
      {
        switch(credentials.auth.provider){
            case 'facebook':
            console.log('facebook elegido');
              FB.api('/'+credentials.auth.uid+'/picture?width=800&height=800',function (picture) {
                console.log("picture: "+JSON.stringify(picture));
                cookie.id = credentials.auth.uid;
                cookie.user=credentials.auth.info.name;
                cookie.email= credentials.auth.info.email;
                cookie.image=picture.data.url;
                cookie.token=response.data.data.relations.tokens[0].attributes.token
                cookie.provider = credentials.auth.provider;
                Session.StoreSession(cookie);
                console.log("ALMACENADA LA COOKIE Y REDIRECCIONANDO");
                $window.location.href = '#/signup';
              });
              break;
            case 'google':
                cookie.id = credentials.auth.uid;
                cookie.user=credentials.auth.info.name;
                cookie.email= credentials.auth.info.email;
                cookie.image=credentials.auth.info.picture;
                cookie.token=response.data.data.relations.tokens[0].attributes.token
                cookie.provider = credentials.auth.provider;
                Session.StoreSession(cookie);
                $window.location.href = '#/signup';
              break;
            case 'angular':
              cookie.id = response.data.data.attributes.id;
              cookie.user=response.data.data.attributes.name;
              cookie.email= response.data.data.attributes.email;
              cookie.token=response.data.data.relations.tokens[0].attributes.token;
              cookie.provider = credentials.auth.provider;
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