'use strict';

eventica.controller('SignUpCtrl', function($rootScope,$scope,EventicaResource,cssInjector,$window,Session,$location,EventicaConfig,EventicaLogin) {
	var allcompletecookie={basicinfo:false,profile:false,experience:false,availability:false,legal:false};
	if(!EventicaLogin.isAuthenticated())
		$location.path("/login");
	else
	{
		$scope.url = $location.absUrl();
		$scope.user = Session.getSession();
		console.log("Cookie Content: "+JSON.stringify($scope.user));

		var allcomplete = $scope.user.forms;
		

		console.log('contenido forms relation  : '+JSON.stringify(allcomplete));

		if(Session.get('completeforms')==undefined)
		{
			Session.save('completeforms',allcompletecookie);
		}
		allcompletecookie = Session.get('completeforms');
		

		if(allcomplete !=undefined)
		{
			if(allcomplete.basic != undefined)
			{
				console.log('$("#progressbar li").eq(0).addClass("active");');
				allcompletecookie.basicinfo=true;
				Session.save('completeforms',allcompletecookie);
				$("#progressbar li").eq(0).addClass("active");
			}
			if(allcomplete.profile != undefined)
			{
				//angular.element( document.querySelector("#profile_form") ).remove();
				allcompletecookie.basicinfo=true;
				allcompletecookie.profile=true;
				Session.save('completeforms',allcompletecookie);
				$("#progressbar li").eq(1).addClass("active");
			}
			if(allcomplete.experience != undefined)
			{
				//angular.element( document.querySelector("#experience_form") ).remove();
				allcompletecookie.basicinfo=true;
				allcompletecookie.profile=true;
				allcompletecookie.experience=true;
				Session.save('completeforms',allcompletecookie);
				$("#progressbar li").eq(2).addClass("active");
			}
			if(allcomplete.availability != undefined)
			{
				//angular.element( document.querySelector("#availability_form") ).remove();
				allcompletecookie.basicinfo=true;
				allcompletecookie.experience=true;
				allcompletecookie.availability=true;
				allcompletecookie.profile=true;
				Session.save('completeforms',allcompletecookie);
				$("#progressbar li").eq(3).addClass("active");
			}
			if(allcomplete.basic != undefined && allcomplete.profile != undefined && allcomplete.experience != undefined && allcomplete.availability != undefined && allcomplete.legal != undefined)
			{
				//angular.element( document.querySelector("#legal_form") ).remove();
				$("#progressbar li").eq(4).addClass("active");
				$location.path('/home');allcompletecookie.basicinfo=true;
				allcompletecookie.experience=true;
				allcompletecookie.availability=true;
				allcompletecookie.profile=true;
				allcompletecookie.legal=true;
				Session.save('completeforms',allcompletecookie);}
		}
		}
		

		
	

	if(EventicaLogin.isAuthenticated()){
		$scope.jbasic = {token:$scope.user.token,app_id:EventicaConfig.AppId,basic:''};
		$scope.jprofile = {token:$scope.user.token,app_id:EventicaConfig.AppId,profile:''};
		$scope.jexperience = {token:$scope.user.token,app_id:EventicaConfig.AppId,experience:''};
		$scope.javailability = {token:$scope.user.token,app_id:EventicaConfig.AppId,availability:''};
		$scope.jlegal = {token:$scope.user.token,app_id:EventicaConfig.AppId,legal:''};

		if($scope.user.provider=='facebook'||$scope.user.provider=='google')
			$scope.img = $scope.user.image;
	}
	

	cssInjector.add("assets/css/proyecto.form.css");

	/* START INITS*/
	$scope.dropzoneConfig = {
	    'options': { // passed into the Dropzone constructor
	      'url': 'upload.php'
	    },
	    'eventHandlers': {
	      'sending': function (file, xhr, formData) {
	      },
	      'success': function (file, response) {
	      }
	    }
	};

	$scope.basicinfo = {"address1":"","addres2":"","ship_address1":"","basicinfo.ship_address2":""};
	$scope.profile = {"waist": "", "jacketsize": "", "chest": "","hips":"","dressize":"","waistfemale":"","nflanguage":"","slanguage":"", "piercings": false, "tatoos": false, "englishfuently": false, "englishacent": false};
	$scope.legal={"licensev":false,"ownmb":false,"apitm":false,"days":false,"cmdays":false,"cmmonths":false,"sshift":false,"lshift":false,"mshift":false,"ashift":false,"lmshift":false,"hshift":false,"bshift":false};
	$scope.experience={"tabcertified": false, "xptech": false, "capinfo": false, "xpsocial": false, "emodeling": false, "flashmg": false, "tradeshow": false, "sampling": false, "indoor": false, "driving": false, "hostess": false, "promos": false, "techp": false, "streeteam": false, "demostore": false, "natours": false, "liquor": false, "outdoor": false, "costume": false, "setbd": false, "retailsales": false, "bambass": false, "teaml": false, "emcee": false, "model": false, "driver": false};
	$scope.availability = {"licensev":false,"ownmb":false,"apitm":false,"days":false,"cmdays":false,"cmmonths":false,"sshift":false,"lshift":false,"mshift":false,"ashift":false,"lmshift":false,"hshift":false,"bshift":false};
	
	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * 365 * EventicaConfig.Max_Age ))).toISOString();
	$scope.maxDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * 365 * EventicaConfig.Min_Age ))).toISOString();

	$scope.states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
	$scope.relation = ["Mother","Father","Grand Parent","Brother","Sister","Child","Friend","Aunt","Uncle","Partner"];
	$scope.heights = ["4'10","4'11","4'12","5'0","5'1","5'2","5'3","5'4","5'5","5'6","5'7","5'8","5'9","5'10","5'11","5'12","6'0","6'1","6,2","6'3","6'4","6'5","6'6","6'7","6'8","6'9","6'10","6'11","6'12"];
	$scope.eyecolor=["Blue","Brown","Green","Hazel","Gray"];
	$scope.haircolor=["Auburn","Black","Blonde","Brunette","Other"];
	$scope.hairlength=["Short","Medium","Long","Bald"];
	$scope.tshirt=["XS","S","M","L","XL","XXL+"];
	$scope.cesni=["5","5.5","6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12","12.5","13","13.5","14","14+"];
	$scope.cesni=["36","38","40","42","44","46","48","50"];
	$scope.cesni=["28","30","32","34","36","38","40","42"];
	$scope.cesni=["24","25","26","27","28","29","30","31","32","33","34+"];
	$scope.cesni=["33","34","35","36","37","38","39","40","41","42","43","44+"];
	$scope.cesni=["0","2","4","6","8","10","12+"];
	$scope.cesni=["English","Spanish","French","German","Italian","Portuguese","Russian","Chinese"];
	$scope.cesni=["0","10-25","25-50","50-100","100+"];
	$scope.cesni=["Just Getting Started","Less than a year","1-3 years","3-5 years","5 years or more"];
	$scope.cesni=["0","1-5","6-10","More than 10"];
	$scope.cesni=["High School","Associate Degree","Bachelors Degree","Masters Degree","Ph. D.","Other"];
	/* END INITS*/


	/* Start Click Functions*/
		$scope.same= function(c){
			if(c)
			{
				$scope.basicinfo.ship_address1=$scope.basicinfo.address1;
				$scope.basicinfo.ship_address2=$scope.basicinfo.addres2;
				$scope.basicinfo.ship_city=$scope.basicinfo.city;
				$scope.basicinfo.ship_state=$scope.basicinfo.state;
				$scope.basicinfo.ship_zip=$scope.basicinfo.zip;
			}
			else
			{
				$scope.basicinfo.ship_address1='';
				$scope.basicinfo.ship_address2='';
				$scope.basicinfo.ship_city='';
				$scope.basicinfo.ship_state='';
				$scope.basicinfo.ship_zip='';
			}
			 
		};
		$scope.basicinfoclick = function(c,form)
		{
			console.log("BINFO FORM: "+JSON.stringify($scope.binfo));
			if(EventicaLogin.isAuthenticated())
			{
				if (form.$valid) {
					$scope.jbasic.basic = $scope.basicinfo;
					EventicaResource.saveBasicInfo($scope.jbasic).$promise.then(function(response){
		            	console.log(JSON.stringify(response));
		            	$scope.animate_next(c);
		            });
	        	}
	        	else
	        	{
	        		notificar("you must complete the register");
	        	}
			}
			else
			{
				notificar("your session is incorrect");
			}

			
		};


		//CHECAR LA CONFIGURACION DEL RELOJ FINES DE SEMANA DISABLED
		//IMAGENES
		$scope.profileclick = function(c)
		{
			if(EventicaLogin.isAuthenticated())
			{
				if ($scope.prof.$valid) {
					$scope.jprofile.profile = $scope.profile;
	            	EventicaResource.saveBasicInfo($scope.jprofile).$promise.then(function(response){
		            	console.log(JSON.stringify(response));
		            	$scope.animate_next(c);
		            });
	        	}
	        	else
	        	{
	        		notificar("you must complete the register");
	        	}
			}
			else
			{
				notificar("your session is incorrect");
			}
			
		};
		$scope.experienceclick = function(c)
		{
			if(EventicaLogin.isAuthenticated())
			{
				if ($scope.exp.$valid) {
					$scope.jexperience.basic = $scope.experience;
	            	EventicaResource.saveExperience($scope.jexperience).$promise.then(function(response){
		            	console.log(JSON.stringify(response));
		            	$scope.animate_next(c);
		            });
	        	}
	        	else
	        	{
	        		notificar("you must complete the register");
	        	}
			}
			else
			{
				notificar("your session is incorrect");
			}
			
			
		};
		$scope.availabilityclick = function(c)
		{
			if(EventicaLogin.isAuthenticated())
			{
				if ($scope.avail.$valid) {
					$scope.javailability.availability = $scope.availability;
	            	EventicaResource.saveAvailability($scope.javailability).$promise.then(function(response){
		            	console.log(JSON.stringify(response));
		            	$scope.animate_next(c);
		            });
	        	}
	        	else
	        	{
	        		notificar("you must complete the register");
	        	}
			}
			else
			{
				notificar("your session is incorrect");
			}
			
		};
		$scope.legalclick = function(c)
		{
			if(EventicaLogin.isAuthenticated())
			{
				if ($scope.legl.$valid) {
					$scope.jlegal.legal = $scope.legal;
	            	EventicaResource.saveLegal($scope.jlegal).$promise.then(function(response){
		            	console.log(JSON.stringify(response));
		            	$scope.animate_next(c);
		            });
	        	}
	        	else
	        	{
	        		notificar("you must complete the register");
	        	}
			}
			else
			{
				notificar("your session is incorrect");
			}
			
		};
		$scope.logout = function(){
	    	//checar si es sesion por social media o email
	    	if(Session.closeSession())
	    		$location.path('/login');
	    	else
	    		$location.path('/login');
	    };
	/* End Click Functions*/


	/* Start Stuff Functions*/
	$scope.delete = function(){
		cssInjector.removeAll();
	};
	$scope.animate_next = function(container){
		if (animating)
			return false;	
        animating = true;
        current_fs = $(container);
        next_fs = $(container).next();
        var c=$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        next_fs.show();
        current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
                scale = 1 - (1 - now) * 0.2;
                left = (now * 50) + "%";
                opacity = 1 - now;
                current_fs.css({'transform': 'scale(' + scale + ')'});
                next_fs.css({'left': left,'opacity': opacity});
            },
            duration: 800,
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
	};
	$scope.animate_previous = function(container){
	    if(animating) 
	    	return false;
	    animating = true;
	    current_fs = $(container);
	    previous_fs = $(container).prev();
	    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	    previous_fs.show(); 
	    current_fs.animate({opacity: 0}, {
	        step: function(now, mx) {
	            scale = 0.8 + (1 - now) * 0.2;
	            left = ((1-now) * 50)+"%";
	            opacity = 1 - now;
	            current_fs.css({'left': left});
	            previous_fs.css({'transform': 'scale('+scale+')', 'opacity':opacity});
	        }, 
	        duration: 800, 
	        complete: function(){
	            current_fs.hide();
	            animating = false;
	        }, 
	        easing: 'easeInOutBack'
	    });
	};

	/* End Stuff Functions*/


});

