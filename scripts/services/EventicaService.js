eventica.factory('EventicaResource', function($resource) {
		return $resource("http://localhost:8000/notes/:id", {
			id: "@id"
		}, {
			update: {
				method: "PUT"
			},
			login:{
				method: "POST",
				transformResponse: function(data, headers){
                response = {}
                response.data = data;
                response.headers = headers();
                return response;
            }
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
		$http.post('http://localhost/api/v1/auth/',credentials,{"headers" : "Content-Type=application/x-www-form-urlencoded; charset=UTF-8"})
		.then(function successCallback(response) {
			console.log("sucess: "+response.data);
      if(response.errors!='')
      {
        cookie.id = response.data.attributes.id;
        cookie.stoken=response.data.relations.tokens.attributes.token;
        cookie.email=response.data.attributes.email;
        cookie.user=response.data.attributes.name;
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