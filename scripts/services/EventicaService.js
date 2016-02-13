eventica.factory('EventicaResource', function($resource) {
		return $resource("http://localhost:3000/api/v1/", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			},
      saveBasicInfo:{
        method:'POST',
        url:'http://localhost:3000/api/v1/basicinfos'
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
.factory('EventicaLogin', function (Session,$http) {
  var eventicalogin = {};

	eventicalogin.login = function (credentials) {
    	var cookie = {
    		user:credentials.username,
        email: credentials.email,
    		password:credentials.password
    	};
		$http.post('http://localhost:3000/api/v1/auth/',credentials,{"headers" : "Content-Type=application/x-www-form-urlencoded; charset=UTF-8"})
		.then(function successCallback(response) {
			console.log("sucess: "+response.data);
      console.log("Token: "+response.data.data.relations.tokens.attributes.token);
      if(response.data.errors!='')
      {
        cookie.id = response.data.data.attributes.id;
        cookie.stoken=response.data.data.relations.tokens.attributes.token;
        cookie.email=response.data.data.attributes.email;
        cookie.user=response.data.data.attributes.name;
        Session.StoreSession(cookie);
      }
      else
        console.log(response.errors);
      return reponse;

		}, function errorCallback(response) {
			console.log("error: "+response.data);
      return response;
		});
		//almacenar datos del usuario nombre,token y imgurl 
    	//Session.StoreSession(cookie);
  };
 
  eventicalogin.isAuthenticated = function () {
    return Session.getSession()!=null;//validar campos validos
  };
 
  return eventicalogin;
}).factory('facebookService', function($q) {
    return {
        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'email',

            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});