'use strict';

calcomm.controller('SignUpCtrl', function($rootScope,$scope,CalcommResource,cssInjector,$window,Session,$location,CalcommConfig,CalcommLogin,upload) {
	$scope.allcompletecookie;
	if(!CalcommLogin.isAuthenticated())
		$location.path("/login");
	else
	{
		$scope.imgs=0;
		$scope.brands=0;
		$scope.jobsx=0;
		cssInjector.add("assets/css/proyecto.form.css");
		/* START INITS*/
			
			$scope.basicinfo = {"address1":"","addres2":"","ship_address1":"","ship_address2":"","social":false};
			$scope.profile = {"waist": "", "jacketsize": "", "chest": "","hips":"","dressize":"","waistfemale":"","nflanguage":"","slanguage":"", "piercings": false, "tatoos": false, "englishfuently": false, "englishacent": false,picture1:'',picture2:'',picture3:'',picture4:'',picture5:'',};
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
						if($scope.profile.picture1.body==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
					case 2:
						if($scope.profile.picture1.body==undefined||$scope.profile.picture2.body==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
					case 3:
						if($scope.profile.picture1.body==undefined||$scope.profile.picture2.body==undefined||$scope.profile.picture3.body==undefined)
						{
							notificar('first complete the existing fields before add more.');
							return;
						}
					break;
					case 4:
						if($scope.profile.picture1.body==undefined||$scope.profile.picture2.body==undefined||$scope.profile.picture3.body==undefined||$scope.profile.picture4.body==undefined)
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
			
			
				if($scope.user.forms.basic)
				{
					$("#profile_progress").addClass("active");
				}
				if($scope.user.forms.profile)
				{
					$("#experience_progress").addClass("active");
				}
				if($scope.user.forms.experience)
				{
					$("#availability_progress").addClass("active");
				}
				if($scope.user.forms.availability)
				{
					$("#legal_progress").addClass("active");
				}
				if($scope.user.forms.basic && $scope.user.forms.profile && $scope.user.forms.experience && $scope.user.forms.availability && $scope.user.forms.legal )
				{
					$("#progressbar li").eq(4).addClass("active");
					$location.path('/home');
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
						 if($scope.basicinfo.profile_picture)
						 {
							$("#loginp").removeClass("ng-hide").addClass('ng-show');
							$scope.jbasic.basic = $scope.basicinfo;
							CalcommResource.saveBasicInfo($scope.jbasic).$promise.then(function(response){
								
								$scope.user.forms.basic=true;
								Session.StoreSession($scope.user);
								$scope.animate_next(c);
							});
						}
						 else{
						 	notificar('you must choose your profile picture');
						}
						
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
						if($scope.imgs>=3 && !$scope.empyImgs($scope.imgs)){
							$("#loginp").removeClass("ng-hide").addClass('ng-show');
				            $scope.jprofile.profile = $scope.profile;
				            CalcommResource.saveProfile($scope.jprofile).$promise.then(function(response){
								$scope.user.forms.basic=true;
								$scope.user.forms.profile=true;
								Session.StoreSession($scope.user);
								$scope.animate_next(c);		
							});
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
				
			};
			$scope.experienceclick = function(c,form)
			{
				if(CalcommLogin.isAuthenticated())
				{
					if (form.$valid) {
						$("#loginp").removeClass("ng-hide").addClass('ng-show');
						$scope.jexperience.experience = $scope.experience;
						CalcommResource.saveExperience($scope.jexperience).$promise.then(function(response){
							$scope.user.forms.basic=true;
							$scope.user.forms.profile=true;
							$scope.user.forms.experience=true;
							
								Session.StoreSession($scope.user);
							console.debug(response);
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
						$("#loginp").removeClass("ng-hide").addClass('ng-show');
						$scope.javailability.availability = $scope.availability;
						CalcommResource.saveAvailability($scope.javailability).$promise.then(function(response){
							$scope.user.forms.basic=true;
							$scope.user.forms.profile=true;
							$scope.user.forms.experience=true;
							$scope.user.forms.availability=true;
								Session.StoreSession($scope.user);
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
						$("#loginp").removeClass("ng-hide").addClass('ng-show');
						$scope.jlegal.legal = $scope.legal;
						CalcommResource.saveLegal($scope.jlegal).$promise.then(function(response){
							$scope.user.forms.basic=true;
							$scope.user.forms.profile=true;
							$scope.user.forms.experience=true;
							$scope.user.forms.availability=true;
							$scope.user.forms.legal=true;
							Session.StoreSession($scope.user);
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
				Session.remove("completeforms");
				if(Session.closeSession())
					$location.path('/login');
				else
					$location.path('/login');
			};
			/* End Click Functions*/
			
			
			/* Start Stuff Functions*/
			$scope.empyImgs = function(ln){
				var empty = false; 
				switch(ln){
					case 1:
						if(($scope.profile.picture1==undefined||$scope.profile.picture1.body==undefined))
							empty=true;
						break;
					case 2:
						if(($scope.profile.picture1==undefined||$scope.profile.picture1.body==undefined)||($scope.profile.picture2==undefined||$scope.profile.picture2.body==undefined))
							empty=true;
						break;
					case 3:
						if(($scope.profile.picture1==undefined||$scope.profile.picture1.body==undefined)||($scope.profile.picture2==undefined||$scope.profile.picture2.body==undefined)||($scope.profile.picture3==undefined||$scope.profile.picture3.body==undefined))
							empty=true;
						break;
					case 4:
						if(($scope.profile.picture1==undefined||$scope.profile.picture1.body==undefined)||($scope.profile.picture2==undefined||$scope.profile.picture2.body==undefined)||($scope.profile.picture3==undefined||$scope.profile.picture3.body==undefined)||($scope.profile.picture4==undefined||$scope.profile.picture4.body==undefined))
							empty=true;
						break;
					case 5:
						if(($scope.profile.picture1==undefined||$scope.profile.picture1.body==undefined)||($scope.profile.picture2==undefined||$scope.profile.picture2.body==undefined)||($scope.profile.picture3==undefined||$scope.profile.picture3.body==undefined)||($scope.profile.picture4==undefined||$scope.profile.picture4.body==undefined)||($scope.profile.picture5==undefined||$scope.profile.picture5.body==undefined))
							empty=true;
						break;
				}
				return empty;
			}
			
			$scope.addbrands = function(){
				if($scope.brands<5)
					$scope.brands = $scope.brands+1;
			};
			$scope.delbrands = function(){
				if($scope.brands>0)
					$scope.brands = $scope.brands-1;
			};
			$scope.addjobs = function(){
				if($scope.jobsx<5)
					$scope.jobsx = $scope.jobsx+1;
			};
			$scope.deljobs = function(){
				if($scope.jobsx>0)
					$scope.jobsx = $scope.jobsx-1;
			};
			$scope.settabc = function(active){
				if(!active)
					delete $scope.experience.tabc_image;
			}
			
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
			
						
			$scope.deletes = function(){
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
			
			$scope.user = Session.getSession();
			if($scope.user.email!='calcommadmin@calcommevents.com')
				$location.path("/");
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
     	var birthday = new Date(v);
         var ageDifMs = Date.now() - birthday.getTime();
         var ageDate = new Date(ageDifMs);
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
                    	//scope.previewo = loadEvent.target.result;
                    	scope.previewo = 'somepo';
                    }
                    reader.readAsDataURL(iElement[0].files[0]);
				$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
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

