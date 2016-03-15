'use strict';

calcomm.controller('ViewCtrl',function($scope,Session,CalcommLogin,$rootScope,$location,CalcommConfig,$http){
	
	$scope.GoTo = function(url){
		$location.path(url);
	};
	
	$scope.users = [];
	
	$scope.confirm = {
		title:'Confirmation Dialog',
		msg:'Message in body',
		positive:'Yes',
		negative:'No',
		pfunc:function(){
			$('#confirmmodal').closeModal();
			$("#materialize-lean-overlay-1").css('display','none');
		},
		nfunc:function(){
			$('#confirmmodal').closeModal();
			$("#materialize-lean-overlay-1").css('display','none');
		}
	};
	
	
 
	if(CalcommLogin.isAuthenticated())
	{
		
		$scope.user = Session.getSession();
		//console.debug($scope.user);

		if(!CalcommLogin.isAdmin())
			$location.path("/");
		else
			$scope.advance=true;

		var getAll = {token:$scope.user.token,app_id:CalcommConfig.AppId};
		
		  
		$http({
			method: 'GET',
			url: 'http://'+CalcommConfig.IP+'/api/v1/users',
			params: getAll
		}).then(function successCallback(response) {
			$scope.users = response.data.data.users;
			console.debug($scope.users);
		}, function errorCallback(response) {
			console.debug(response);
		});

		/*FILTERS*/
		$scope.ByAge = function(from,to){
			return function(item){
				if(!from && !to)
					return item;
				else
				{
					if(item.relations.basic)
					{
						var birthday = new Date(item.relations.basic.birthday);
						var ageDifMs = Date.now() - birthday.getTime();
						var ageDate = new Date(ageDifMs);
						var yearsold = Math.abs(ageDate.getUTCFullYear() - 1970);
						if(!from)
						{
							if(yearsold>=1 && yearsold<= to)
								return item;
						}
						else if(!to)
						{
							if(yearsold>=from && yearsold<= 100)
								return item;
						}
						else
						{
							if(yearsold>=from && yearsold<= to)
								return item;
						}
					}

				}

			}
		};
		$scope.ByGender = function(gender){
			return function(item){
				//console.log(gender);

				if(!gender)
					return item;

				if(gender||gender!='')
				{
					if(item.relations.profile)
					{
						if(item.relations.profile.gender==gender)
							return item;	
					}

				}
				else
					return item;
			}
		};
		$scope.ByTABC = function(tabc){
			return function(item){

				if(!tabc)
					return item;

				if(tabc||tabc!='')
				{
					if(item.relations.experience)
					{
						if(item.relations.experience.tabc_ciertified==tabc)
							return item;	
					}

				}
				else
					return item;
			}
		};
		$scope.ByName = function(name){
			return function(item){
				if(name)
				{
					if(item.attributes.name.toLowerCase().indexOf(name.toLowerCase())>-1)
						return item;
				}
				else
					return item;
			}
		};
		$scope.ByStatus = function(status){
			return function(item){
				if(item.relations!=undefined){
				if($scope.Status(item.relations)==status)
					return item;
				if(status===undefined || status=='')
					return item;}
			}
		};
		/*FILTERS*/
		
		/*Setters acording state o data*/
		$scope.Status = function(data){
			if(data.basic&&data.profile&&data.experience&&data.availability&&data.legal)
				return "Completed";
			else
				return "In Progress";
		};
		$scope.showImg = function(url){
			return 'http://'+CalcommConfig.IP+url;
		}
		$scope.isCert = function(tabcc){
			if(tabcc==0)
				return 'No';
			else
				return 'Yes';
		};
		/*Setters acording state o data*/

		
		$scope.logout = function(){
			Session.remove("completeforms");
			if(Session.closeSession())
				$location.path('/login');
			else
				$location.path('/login');
		};
		$scope.collapse = function(){
			if($('.staff').hasClass('active'))
				{
					$('.staff').removeClass('active');
        			$('.staff .collapsible-header').removeClass('active');
        			$('.staff .collapsible-body').css('display', 'none');	
				}
			else
				{
					$('.staff').addClass('active');
        			$('.staff .collapsible-header').addClass('active');
        			$('.staff .collapsible-body').css('display', 'block');	
				}
			
		};
		
		 
		
		
		if($location.absUrl().indexOf('staff')>-1)
			{
				console.log("Staff URL");
				$scope.groups = [];
				$scope.groupsindex=0;
				$scope.changesnotsave=false;
				$scope.droppable=true;
				/*Testing HeartRating*/
				$scope.isReadonly = false;
				$scope.changeOnHover = true; 
				$scope.maxValue = 5; 
				$scope.ratingValue = 5;
				/*esting HeartRating*/
				$scope.icons = ["invert_colors", "label", "label_outline", "language", "perm_identity", "polymer", "thumb_up", "email", "dialpad", "contacts", "stay_current_portrait", "vpn_key", "textsms", "chat_bubble_outline", "grade", "repeat", "contact_phone", "subtitles", "today", "question_answer", "done", "tab", "games", "view_module", "trending_up", "work", "my_location", "view_week", "videocam", "dns", "alarm_on", "android", "present_to_all", "phonelink_ring", "play_circle_filled", "queue_music", "radio", "payment", "phone", "turned_in", "lock", "offline_pin", "library_music", "library_books", "assignment", "assignment_ind"];

				$http({
					method: 'GET',
					url: 'http://'+CalcommConfig.IP+'/api/v1/teams',
					params: getAll
				}).then(function successCallback(response) {
					$scope.groups = response.data.data;
					if($scope.groups.length>0){//existen grupos en la BD
						angular.forEach($scope.users,function(user){
							user.upload=false;
							user.status=0;//0 sin modificar; 1 editado/existente; 2  nuevo/modificado;3 eliminado/existente;  4 nuevo/eliminado
						});
					}

				}, function errorCallback(response) {
					console.debug(response);
				});
				/*Confirm Dialogs*/
				$scope.DialogConfirm = function(title,msg,pfn){
					$scope.confirm.title = title;
					$scope.confirm.msg = msg;
					$scope.confirm.positive='Remove';
					$scope.confirm.negative='No';
					$scope.confirm.pfunc = pfn;
					$('#confirmmodal').openModal();
				};
				$scope.SaveChangesConfirm = function(pfn){
					$scope.confirm.title = 'Changes Confirmation';
					$scope.confirm.msg = 'You must save your changes before continue.';
					$scope.confirm.positive='SaveChanges';
					$scope.confirm.negative='Close';
					$scope.confirm.pfunc = pfn;
					$('#confirmmodal').openModal();
				};
				/*Confirm Dialogs*/
				$scope.restore = function(element,eventQ,indexC){
					var last;
					console.log(indexC);
					console.debug($scope.groups);
					var itembkp,indexuser,indexgroup;
					indexgroup = indexC;
					$scope.changesnotsave=true;
					$scope.groups[indexgroup].upload=true;
					if($scope.groups[indexgroup].status==0)
							$scope.groups[indexgroup].status=1;//0 sin modificar; 1 editado/existente; 2  nuevo/modificado;3 eliminado/existente;  4 nuevo/eliminado

						if($scope.groups[indexgroup].users.length>1)
						{
							//hay mas de un usuario
							itembkp = $scope.groups[indexgroup].users[$scope.groups[indexgroup].users.length-1];

						}
					else
						{
							//solo hay un usuario
							console.log("solo hay un grupo y un usuario");
							itembkp = $scope.groups[indexgroup].users[0];

						}

							console.log("indexuser: "+ $scope.users.indexOf(itembkp)); 
							indexuser = $scope.users.indexOf(itembkp);
							if(indexuser == ($scope.users.length-1))
							{
								console.debug($scope.users[$scope.users.length-1]);
								console.log("es el ultimo elemento pop");
								$scope.users.pop();
								$scope.users.unshift(itembkp);
								console.debug($scope.users[$scope.users.length-1]);
							}
							else if(indexuser>0)
								{

									console.log("no es el primero removiendo conforme al indexuser"); 
									$scope.users.splice(indexuser, 1);
									$scope.users.push(itembkp); 
								}
							else
								{
									console.log("es el primero");
									$scope.users.shift();
		//							console.debug(itembkp);
									$scope.users.push(itembkp);
		//							console.debug($scope.users);
								}
					console.debug("Grupo: "+$scope.groups[indexgroup].name);
					last = $scope.groups[indexgroup].users.indexOf(itembkp);
					console.warn($scope.groups[indexgroup].users);
					console.debug("Usuario a comparar: "+itembkp.attributes.name);
						if(last == ($scope.groups[indexgroup].users.length-1) )
							{
								console.log("es el ultimo no hay duplicados");
							}
						else
							{
								if(last!=-1)
								{
									//console.debug(itembkp);
									//console.log("existe un duplicado en "+ last+" con el usuario "+ itembkp.attributes.name+" y "+$scope.groups[indexgroup].users[last].attributes.name);
								$scope.groups[indexgroup].users.pop();
								//console.log($scope.groups[indexgroup]);
								notificar(itembkp.attributes.name+" already belongs to the group "+ $scope.groups[indexgroup].name+".",6000);}
								//notificar("duplicated profiles");
							}
					itembkp = indexuser = indexgroup = undefined; 
					$scope.$apply;			
				};
				$scope.delete = function(index){
					$scope.DialogConfirm('Delete Group Confirmation','Are you sure wanna delete the group '+$scope.groups[index].name,function(){
						$scope.groups[index].upload=true;
						console.log("current status: "+$scope.groups[index].status);
						if($scope.groups[index].status==1|| $scope.groups[index].status==0)
							$scope.groups[index].status=3;//0 sin modificar; 1 editado/existente; 2  nuevo/modificado;3 eliminado/existente;  4 nuevo/eliminado
						if($scope.groups[index].status==2)
							$scope.groups[index].status=4;

						console.log("status despues de la modificacion: "+$scope.groups[index].status);
						$scope.confirm.nfunc();
						console.debug($scope.groups);
						$scope.changesnotsave=true;
					});

				};
				$scope.creategroup = function(){
							if($scope.groupsform.$valid){
								var newgroup = true;
								angular.forEach($scope.groups,function(data){
									if(data.name.toLowerCase() == $scope.groupc.name.toLowerCase() && data.status!=2)
										newgroup=false;
								});
								if(newgroup)
									{
										$scope.changesnotsave=true;
										$scope.groupc.users = [];
										$scope.groupc.upload=true;
										$scope.groupc.status=2;//0 sin modificar; 1 editado/existente; 2  nuevo/modificado;3 eliminado/existente;  4 nuevo/eliminado
										$scope.groups.push(angular.copy($scope.groupc));
										$scope.groupc='';
										console.log($scope.groups);
									}
								else
									{
										notificar("The group "+$scope.groupc.name+" already exists.");
									}

							}
							else
							{		
								notificar("please complete all fields"); 
							}

				};
				$scope.saveChanges = function(){
					$scope.changesnotsave=false;
					angular.forEach($scope.groups,function(group){
							if(group.upload)
								{
									switch(group.status){ //0 sin modificar; 1 editado/existente; 2  nuevo/modificado;3 eliminado/existente;  4 nuevo/eliminado
										case 0:
											console.log("sin cambios en "+group.name);
											break;
										case 1:
											console.log("se edito el grupo existente"+group.name);
											break;
										case 2:
											console.log("se va a crear el grupo "+group.name);
											break;
										case 3:
											console.log("se elimino el grupo existente "+group.name);
											break;
										case 4:
											console.log("omitirlo solo eliminarlo de memoria "+group.name);
											break;
									}
								}
							else
								{
									console.log(group.name+" sin cambios");
								}
					});
					notificar("saved sucessfully");
				};
				$scope.moreinfo = function(data) {
					if($scope.changesnotsave)//hay cambios pendientes
						{
							$scope.SaveChangesConfirm(function(){
								//falta iterar y guardar los datos
								console.debug(data);
								$scope.changesnotsave=false;
								$scope.saveChanges();
								Session.remove('datadetails');
								$rootScope.staffdetails = data;
								$scope.confirm.nfunc();
								$location.path('/show');
							});
						}
					else{
						console.debug(data);
						Session.remove('datadetails');
						$rootScope.staffdetails = data;
						$location.path('/show');
					}

				};
				
			}//end staff view
		else if($location.absUrl().indexOf('candidates')>-1)
			{
				console.log("Candidates URL");
				$scope.approve = function(user){
					console.log("Aprovando..."+JSON.stringify(user));
				};
				$scope.archive = function(user){
					console.log("Archivando..."+JSON.stringify(user));
				};
			}
		else{
			
		}
		
	}
	else
	{
		$location.path("/login");
	}



}).filter('age', function() {
	function calculateAge(v) {
		if(v!=undefined)
		{
			var birthday = new Date(v);
			var ageDifMs = Date.now() - birthday.getTime();
			var ageDate = new Date(ageDifMs);
			return Math.abs(ageDate.getUTCFullYear() - 1970);
		}
		else
		{
			return '';
		}

	}

	return function(birthdate) { 
		return calculateAge(birthdate);
	}; 
}).filter('cut', function () {//for long emails
	return function (value, wordwise, max, tail) {
		if (!value) return '';

		max = parseInt(max, 10);
		if (!max) return value;
		if (value.length <= max) return value;

		value = value.substr(0, max);
		if (wordwise) {
			var lastspace = value.lastIndexOf(' ');
			if (lastspace != -1) {
				value = value.substr(0, lastspace);
			}
		}

		return value + (tail || ' …');
	};
})
.directive('calcommRating',function(){
	return {
		restrict: 'EA',
		scope: {
			'value': '=value',
			'max': '=max',
			'hover': '=hover',
			'staff': '=staff',
			'isReadonly': '=isReadonly'
		},
		link: function (scope, element, attrs, ctrl) {
			if (scope.max === undefined) scope.max = 6; // default
			

			function renderValue() {
				scope.renderAry = [];
				/*logica actualizacion corazones aqui*/
				//
				/*logica actualizacion corazones aqui*/
				for (var i = 0; i < scope.max; i++) {
					
							if (i < scope.value) {
								scope.renderAry.push({
									'fa fa-heart fa-lg': true
								});
							} else {
								scope.renderAry.push({
										'fa fa-heart-o fa-lg': true
									});

							}
						
				}
			}

			scope.setValue = function (index) {
				if (!scope.isReadonly && scope.isReadonly !== undefined) {
					scope.value = index + 1;
				}
			};

			scope.changeValue = function (index) {
				if (scope.hover) {
					scope.setValue(index);
				} else {
					// !scope.changeOnhover && scope.changeOnhover != undefined
				}
			};

			scope.$watch('value', function (newValue, oldValue) {
				if (newValue) {
					renderValue();
				}
			});
			scope.$watch('max', function (newValue, oldValue) {
				if (newValue) {
					renderValue();
				}
			});
			scope.death= function(){
				element.find(' i ').removeClass('fa-heart').addClass('fa-heart-o');
		};

		},
		template:
		'<span id="hearts" syle="display:inline-block;" ng-class="{isReadonly: isReadonly}">' +
			'<i class="fa fa-star-o 3x" ng-click="death()" ontouchmove="death()" ng-click="death()" ng-mouseenter="death()" ></i>' +
			'<i id="hearts" ng-class="renderObj" syle="display:inline-block;" ng-repeat="renderObj in renderAry" ng-click="setValue($index)" ontouchmove="(changeValue($index, changeOnHover ))" ng-mouseenter="changeValue($index, changeOnHover )" ></i>' +
		'</span>',
		replace: true	
	};
})
.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
});