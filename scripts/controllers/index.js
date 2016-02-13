'use strict';

var eventica = angular.module('Client');
eventica.controller('IndexCtrl', function($scope,$window,$rootScope) {
  $rootScope.algo="100";
	//OAuth.initialize('3ed5R1avns6fyDGMS9mRMZoiJFY');
	
	$scope.conect = function() {

		 FB.login(
        function(response) {
          console.log(JSON.stringify(response));
            if (response.authResponse) {
               console.log('Welcome!  Fetching your information.... ');

               var url = '/me';
                    FB.api(url,{fields:'email,picture,birthday'} ,function (response) {
                        alert(JSON.stringify(response));
                        console.log(response.picture);

                        FB.api('/'+response.id+'/picture?width=800&height=800',function (response) {
                        alert(JSON.stringify(response));
                        console.log(JSON.stringify(response));
                    });
                    });
                    // uid=userid, provider=facebook,gmail
                    FB.getLoginStatus(function(response) {
                      if (response.status == 'connected') {
                        getCurrentUserInfo(response)
                      } else {
                        FB.login(function(response) {
                          if (response.authResponse){
                            getCurrentUserInfo(response)
                          } else {
                            console.log('Auth cancelled.')
                          }
                        }, { scope: 'email' });
                      }
                    });

    function getCurrentUserInfo() {
      FB.api('/me',{fields:'email,name'}, function(userInfo) {
        console.log(userInfo.name + ': ' + userInfo.email);
      });
    }
                    
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        },
        {scope:'email,public_profile,user_friends,email,user_about_me'}
        );

		/*FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me',{ locale: 'en_US', fields: 'name, email' }, function(response) {
       console.log('Good to see you, ' + response.name + '.');
       console.log(JSON.stringify(response));
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
}, {scope: 'email,user_likes'});*/
   /*FB.api('/me', { locale: 'en_US', fields: 'name, email' },
  function(response) {
    console.log(response.email);
  }
);*/
};

	/*function(provider){
		console.log("Conectando a "+provider);
		OAuth.popup(provider).done(function(result) {
			console.log("Autentificacion: "+JSON.stringify(result));
	        //Get your user's personal data
	        result.me().done(function(me) {
	        	console.log("Facebook ME: "+JSON.stringify(me));

	            $scope.me = me;
	            $scope.provider = provider;
	        });
	        /*var url = '/me?fields=name,email';
	        result.get(url, function (response) {
                       console.log("Response GET: "+reponse);
             });
	        console.log("END");*
	    });
	};*/
});

/*
angular.module('angularoauthexampleApp')
  .controller('MainCtrl', function ($scope) {
    $scope.login=function() {
        var client_id="your client id";
        var scope="email";
        var redirect_uri="http://localhost:9000";
        var response_type="token";
        var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
        "&response_type="+response_type;
        window.location.replace(url);
    };
  });
Here is how to handle the redirect after authentication

angular
  .module('angularoauthexampleApp', [
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/access_token=:accessToken', {
        template: '',
        controller: function ($location,$rootScope) {
          var hash = $location.path().substr(1);

          var splitted = hash.split('&');
          var params = {};

          for (var i = 0; i < splitted.length; i++) {
            var param  = splitted[i].split('=');
            var key    = param[0];
            var value  = param[1];
            params[key] = value;
            $rootScope.accesstoken=params;
          }
          $location.path("/about");
        }
      })
  });
*/
	