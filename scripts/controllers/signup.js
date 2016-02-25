'use strict';

calcomm.controller('SignUpCtrl', function($rootScope,$scope,CalcommResource,cssInjector,$window,Session,$location,CalcommConfig,CalcommLogin,upload) {
	
	$scope.allcompletecookie;
	if(!CalcommLogin.isAuthenticated())
		$location.path("/login");
	else
	{
		$scope.imgs=0;
		cssInjector.add("assets/css/proyecto.form.css");
		/* START INITS*/
			
			//$scope.work_basicinfo = {"address1":"","addres2":"","ship_address1":"","ship_address2":"","social":false};
			//using a filled data for testing
			$scope.basicinfo = { "address1": "asdasdasd", "addres2": "asdasdasd", "ship_address1": "asdasdasd", "ship_address2": "asdasdasd", "social": false, "firstname": "asdadasd", "middle_initial": "asdasd", "lastname": "asdasd", "birthday": "02/17/1998", "referred": "asdasdasd", "city": "asdasdad", "state": "AR", "zip": "22222", "phone": "1231231231", "same_as_home_mailing": true, "ship_city": "asdasdad", "ship_state": "AR", "ship_zip": "22222", "emergency_firstname": "sdadasdasd", "emergency_lastname": "asdasdasd", "emergency_relation": "Brother", "emergency_address1": "asdasdasdasd", "emergency_address2": "asdasd", "emergency_city": "asdads", "emergency_state": "CA", "emergency_zip": "22222", "emergency_phone": "1231231231", "emergency_info": "asdasdasd" }
			//$scope.profile = {"waist": "", "jacketsize": "", "chest": "","hips":"","dressize":"","waistfemale":"","nflanguage":"","slanguage":"", "piercings": false, "tatoos": false, "englishfuently": false, "englishacent": false,picture1:'',picture2:'',picture3:'',picture4:'',picture5:'',};
			$scope.profile = { "waist": "32", "jacketsize": "", "chest": "42", "hips": "", "dressize": "", "waistfemale": "", "nflanguage": "", "slanguage": "", "piercings": false, "tatoos": false, "englishfuently": false, "englishacent": false, "gender": "male", "height": "4'12", "weight": "1231", "eye_color": "Green", "hair_color": "Auburn", "hair_length": "Medium", "tshirt_size": "M", "pants_size": "S", "shoes_size": "5.5", "jacket_size": "40", "first_language": "German", "second_language": "Italian", "english_accent": true, "spanish_fluently": true };
			$scope.legal={"licensev":false,"ownmb":false,"apitm":false,"days":false,"cmdays":false,"cmmonths":false,"sshift":false,"lshift":false,"mshift":false,"ashift":false,"lmshift":false,"hshift":false,"bshift":false};
			$scope.experience={"tabcertified": false, "xptech": false, "capinfo": false, "xpsocial": false, "emodeling": false, "flashmg": false, "tradeshow": false, "sampling": false, "indoor": false, "driving": false, "hostess": false, "promos": false, "techp": false, "streeteam": false, "demostore": false, "natours": false, "liquor": false, "outdoor": false, "costume": false, "setbd": false, "retailsales": false, "bambass": false, "teaml": false, "emcee": false, "model": false, "driver": false};
			$scope.availability = {"licensev":false,"ownmb":false,"apitm":false,"days":false,"cmdays":false,"cmmonths":false,"sshift":false,"lshift":false,"mshift":false,"ashift":false,"lmshift":false,"hshift":false,"bshift":false};
			
			var currentTime = new Date();
			$scope.currentTime = currentTime;
			$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
			$scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * 365 * CalcommConfig.Max_Age ))).toISOString();
			$scope.maxDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * 365 * CalcommConfig.Min_Age ))).toISOString();
			
			$scope.states = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
			$scope.relation = ["Mother","Father","Grand Parent","Brother","Sister","Child","Friend","Aunt","Uncle","Partner"];
			$scope.heights = ["4'10","4'11","4'12","5'0","5'1","5'2","5'3","5'4","5'5","5'6","5'7","5'8","5'9","5'10","5'11","5'12","6'0","6'1","6,2","6'3","6'4","6'5","6'6","6'7","6'8","6'9","6'10","6'11","6'12"];
			$scope.eyecolor=["Blue","Brown","Green","Hazel","Gray"];
			$scope.haircolor=["Auburn","Black","Blonde","Brunette","Other"];
			$scope.hairlength=["Short","Medium","Long","Bald"];
			$scope.tshirt=["XS","S","M","L","XL","XXL+"];
			/* END INITS*/

			$scope.addimgs = function(){
				switch ($scope.imgs) {
					case 1:
						if($scope.profile.picture1.data==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
					case 2:
						if($scope.profile.picture1.data==undefined||$scope.profile.picture2.data==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
					case 3:
						if($scope.profile.picture1.data==undefined||$scope.profile.picture2.data==undefined||$scope.profile.picture3.data==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
					case 4:
						if($scope.profile.picture1.data==undefined||$scope.profile.picture2.data==undefined||$scope.profile.picture3.data==undefined||$scope.profile.picture4.data==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
				}
				if($scope.imgs<5)
					$scope.imgs = $scope.imgs+1;
			};
			$scope.delimgs = function(){
				switch ($scope.imgs) {
					case 1:
						$scope.profile.picture1='';
					break;
					case 2:
						$scope.profile.picture2='';
					break;
					case 3:
						$scope.profile.picture3='';
					break;
					case 4:
						$scope.profile.picture4='';
					break;
					case 5:
						$scope.profile.picture5='';
					break;
				}
				if($scope.imgs>0)
					$scope.imgs = $scope.imgs-1;
				
			};

		if(($location.absUrl().indexOf('signup')>-1)) //is signup view
		{
			$scope.onlyview = false;
			
			$scope.url = $location.absUrl();
			$scope.user = Session.getSession();
			var allcomplete = $scope.user.forms;	
			
			if(Session.get('completeforms')==undefined)
			{
				//console.log('no existe la cookie creando');
				$scope.allcompletecookie ={basicinfo:false,profile:false,experience:false,availability:false,legal:false};
				Session.save('completeforms',$scope.allcompletecookie);
			}
			$scope.allcompletecookie = Session.get('completeforms');
			
			
			if(allcomplete !=undefined)
			{
				if(allcomplete.basic != undefined)
				{
					//console.log('$("#progressbar li").eq(0).addClass("active");');
					$scope.allcompletecookie.basicinfo=true;
					Session.save('completeforms',$scope.allcompletecookie);
					$("#profile_progress").addClass("active");
				}
				if(allcomplete.profile != undefined)
				{
					//angular.element( document.querySelector("#profile_form") ).remove();
					$scope.allcompletecookie.basicinfo=true;
					$scope.allcompletecookie.profile=true;
					Session.save('completeforms',$scope.allcompletecookie);
					$("#experience_progress").addClass("active");
				}
				if(allcomplete.experience != undefined)
				{
					//angular.element( document.querySelector("#experience_form") ).remove();
					$scope.allcompletecookie.basicinfo=true;
					$scope.allcompletecookie.profile=true;
					$scope.allcompletecookie.experience=true;
					Session.save('completeforms',$scope.allcompletecookie);
					$("#availability_progress").addClass("active");
				}
				if(allcomplete.availability != undefined)
				{
					//angular.element( document.querySelector("#availability_form") ).remove();
					$scope.allcompletecookie.basicinfo=true;
					$scope.allcompletecookie.experience=true;
					$scope.allcompletecookie.availability=true;
					$scope.allcompletecookie.profile=true;
					Session.save('completeforms',$scope.allcompletecookie);
					$("#legal_progress").addClass("active");
				}
				if(allcomplete.basic != undefined && allcomplete.profile != undefined && allcomplete.experience != undefined && allcomplete.availability != undefined && allcomplete.legal != undefined)
				{
					//angular.element( document.querySelector("#legal_form") ).remove();
					$("#progressbar li").eq(4).addClass("active");
					$location.path('/home');$scope.allcompletecookie.basicinfo=true;
					$scope.allcompletecookie.experience=true;
					$scope.allcompletecookie.availability=true;
					$scope.allcompletecookie.profile=true;
					$scope.allcompletecookie.legal=true;
					Session.save('completeforms',$scope.allcompletecookie);
				}
			}
			
			
			
			
			
			
			if(CalcommLogin.isAuthenticated()){
				$scope.jbasic = {token:$scope.user.token,app_id:CalcommConfig.AppId,basic:''};
				$scope.jprofile = {token:$scope.user.token,app_id:CalcommConfig.AppId,profile:''};
				$scope.jexperience = {token:$scope.user.token,app_id:CalcommConfig.AppId,experience:''};
				$scope.javailability = {token:$scope.user.token,app_id:CalcommConfig.AppId,availability:''};
				$scope.jlegal = {token:$scope.user.token,app_id:CalcommConfig.AppId,legal:''};
				
				if($scope.user.provider=='facebook'||$scope.user.provider=='google_oauth2')
				{
					$scope.img = $scope.user.image;
				}
			}
			
			
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

				if(CalcommLogin.isAuthenticated())
				{
					if (form.$valid) {
						// if($scope.basicinfo.picture)
						// {
						// 	$scope.basicinfo.picture = $scope.basicinfo.picture.data;//onyl applies to select picture no facebook no google
							$scope.jbasic.basic = $scope.basicinfo;
							CalcommResource.saveBasicInfo($scope.jbasic).$promise.then(function(response){
								//console.log(JSON.stringify(response));
								$scope.allcompletecookie.basicinfo=true;
								Session.save('completeforms',$scope.allcompletecookie);
								$scope.animate_next(c);
							});
						// }
						// else{
						// 	notificar('you must choose your profile picture');
						// }
						
					}
					else
					{
						notificar("you must complete the register");
					}
				}
				else
				{
					$location.path('/login');
					notificar("your session is incorrect");

				}
				
				
			};
			
			$scope.profileclick = function(c,form)
			{
				if(CalcommLogin.isAuthenticated())
				{
					if (form.$valid) {
						if($scope.imgs>=1){


							var fd = new FormData();
				        	fd.append('picture1', $scope.profile.picture1);
				            fd.append('token',$scope.user.token);
				            fd.append('app_id','e86aea35d849802cdf17e00d965c7bd9');
				            fd.append('profile',$scope.profile);
				            CalcommResource.saveProfile(fd).$promise.then(function(response){
											
							});

							// $scope.jprofile.profile = $scope.profile;
							// console.log($scope.jprofile);
							// console.log(JSON.stringify($scope.jprofile));
							// CalcommResource.saveProfile($scope.jprofile).$promise.then(function(response){
							// 	//console.log(JSON.stringify(response));
							// 	$scope.allcompletecookie.basicinfo=true;
							// 	$scope.allcompletecookie.profile=true;
							// 	Session.save('completeforms',$scope.allcompletecookie);
							// 	$scope.animate_next(c);
							// });
							}else {
							notificar('you must upload at least 3 pictures.');
						}
						
					}
					else
					{
						$location.path('/login');
						notificar("you must complete the register");
					}
				}
				else
				{
					notificar("your session is incorrect");
				}
				/*$scope.jprofile.profile = $scope.profile;
				console.log($scope.jprofile);
			    upload.uploadFile($scope.jprofile).then(function(res)
				{
					console.log(res);
				})*/
				
			};
			$scope.experienceclick = function(c,form)
			{
				if(CalcommLogin.isAuthenticated())
				{
					if (form.$valid) { 
						$scope.availability.driver_image = $scope.availability.driver_image.data;
						$scope.experience.tabc_image = $scope.experience.tabc_image.data;
						$scope.jexperience.experience = $scope.experience;
						CalcommResource.saveExperience($scope.jexperience).$promise.then(function(response){
							//console.log(JSON.stringify(response));
							$scope.allcompletecookie.basicinfo=true;
							$scope.allcompletecookie.profile=true;
							$scope.allcompletecookie.experience=true;
							Session.save('completeforms',$scope.allcompletecookie);
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
					$location.path('/login');
					notificar("your session is incorrect");
				}
				
				
			};
			$scope.availabilityclick = function(c,form)
			{
				if(CalcommLogin.isAuthenticated())
				{
					if (form.$valid) {
						$scope.javailability.availability = $scope.availability;
						CalcommResource.saveAvailability($scope.javailability).$promise.then(function(response){
							//console.log(JSON.stringify(response));
							$scope.allcompletecookie.basicinfo=true;
							$scope.allcompletecookie.profile=true;
							$scope.allcompletecookie.experience=true;
							$scope.allcompletecookie.availability=true;
							Session.save('completeforms',$scope.allcompletecookie);
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
					$location.path('/login');
					notificar("your session is incorrect");
				}
				
			};
			$scope.legalclick = function(c,form)
			{
				if(CalcommLogin.isAuthenticated())
				{
					if (form.$valid) {
						$scope.jlegal.legal = $scope.legal;
						CalcommResource.saveLegal($scope.jlegal).$promise.then(function(response){
							//console.log(JSON.stringify(response));
							$scope.allcompletecookie.basicinfo=true;
							$scope.allcompletecookie.profile=true;
							$scope.allcompletecookie.experience=true;
							$scope.allcompletecookie.availability=true;
							$scope.allcompletecookie.legal=true;
							Session.save('completeforms',$scope.allcompletecookie);
							//$scope.animate_next(c);
							$location.path('/home');
						});
					}
					else
					{
						notificar("you must complete the register");
					}
				}
				else
				{
					$location.path('/login');
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
			
			$scope.addbrands = function(){
				if($scope.brands<5)
					$scope.brands = $scope.brands+1;
			};
			$scope.delbrands = function(){
				if($scope.brands>0)
					$scope.brands = $scope.brands-1;
			};
			$scope.addjobs = function(){
				if($scope.jobs<5)
					$scope.jobs = $scope.jobs+1;
			};
			$scope.deljobs = function(){
				if($scope.jobs>0)
					$scope.jobs = $scope.jobs-1;
			};
			
			$scope.setpic = function(){
				$scope.basicinfo.picture = $scope.img;
			};
			$scope.loadpreview = function(input){
				if (input.files && input.files[0]) {
			        var reader = new FileReader();

			        reader.onload = function (e) {
			            $('#blah').attr('src', e.target.result);
			        }

			        reader.readAsDataURL(input.files[0]);
			    }
			};
			$scope.profilepreview = function(input){
				console.log(input);
				if (input.files && input.files[0]) {
			        var reader = new FileReader();

			        reader.onload = function (e) {
			            $('#blah').attr('src', e.target.result);
			        }
			        $scope.profpic = reader.readAsDataURL(input.files[0]);;
			        //reader.readAsDataURL(input.files[0]);
			    }
			};
			

			
			$scope.delete = function(){
				cssInjector.removeAll();
			};
		}
		else//is show route
		{
			$scope.onlyview = true;

			if(Session.get('basicinfo')==undefined){
				Session.save('basicinfo',$rootScope.info);
			}
				$scope.basicinfo = Session.get('basicinfo');
		}
		
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
		
	}//END IF AUTHENTICATED
}).filter('age', function() {
     function calculateAge(v) { 
     	console.log('filter with: '+v);
     	var birthday = new Date(v);
     	console.log('Date parameter: '+birthday);
         var ageDifMs = Date.now() - birthday.getTime();
         console.log('AgeDifMs: '+ageDate);
         var ageDate = new Date(ageDifMs);
         console.log('AgeDate: '+ageDate);
         return Math.abs(ageDate.getUTCFullYear() - 1970);
     }

     return function(birthdate) { 
           return calculateAge(birthdate);
     }; 
}).directive('uploaderModel', ["$parse", function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) 
		{
			iElement.on("change", function(e)
			{
				var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                    	scope.$apply(function () {
                    		scope.previewo = loadEvent.target.result;
                    	});
                    	console.log('loader file reader:'+loadEvent.target.result);
                    	//scope.previewo = loadEvent.target.result;
                    	scope.previewo = 'somepo';
                    }
                  //  reader.readAsDataURL(iElement[0].files[0]);
				//$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
			});
		}
	};
}])
.service('upload',function ($http, $q) 
{
	this.uploadFile = function(data)
	{
		var deferred = $q.defer();
		//var formData = new FormData();
		return $http.post('http://localhost:3000/api/v1/profiles', data, {
			headers: {
				"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})
		return deferred.promise;
	}	
})

