// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })
    
        .state('forgotpassword', {
          url: "/forgotpassword",
          templateUrl: "forgotpassword.html",
          controller: 'PasswordCtrl'
        })
    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'WelcomeCtrl'
        })
    
        .state('accBalance', {
          url: "/accBalance",
          templateUrl: "accBalance.html",
          controller: 'AccBalanceCtrl'
        })
		
		 .state('accStatement', {
          url: "/accStatement",
          templateUrl: "accStatement.html",
          controller: 'AccStatementCtrl'
        })
    
		 .state('fundTranster', {
			  url: "/fundTranster",
			  templateUrl: "fundTranster.html",
			  controller: 'FundTransterCtrl'
			})
			
		 .state('fundTransterRequest', {
			  url: "/fundTransterRequest",
			  templateUrl: "fundTransterRequest.html",
			  controller: 'fundTransterRequestCtrl'
			})
			
			 .state('talkTimeRecharge', {
			  url: "/talkTimeRecharge",
			  templateUrl: "talkTimeRecharge.html",
			  controller: 'talkTimeRechargetCtrl'
			})
			
			.state('stopChequeLeaf', {
			  url: "/stopChequeLeaf",
			  templateUrl: "stopChequeLeaf.html",
			  controller: 'stopChequeLeafCtrl'
			})
    
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http, $rootScope, $ionicLoading, $timeout,$ionicPopup) {
	  
    //$rootScope.getServerIp='http://10.11.201.19/';
   // $rootScope.getServerIp='http://202.40.190.14:8084/'
	$rootScope.getServerIp='http://10.11.201.43:8084/'
    
    //window.addEventListener("load", initApp);
	
//    function initApp() {
//		document.getElementById("btnLogin").addEventListener("click", login);
//	}

    
	$scope.login = function (user) {
	
       				
		if(!user || ! user.uname){
		 $ionicPopup.alert({
		  title: 'User ID Required !',
		  //template:'From date'
		  })
		//alert("Please Enter Your User ID");
		}else if(!user || ! user.pass){
			 $ionicPopup.alert({
		  title: 'Password Required !',
		  //template:'From date'
		  })
		}else if(checkConnectionStatus()){
		
		}else{
	
			$ionicLoading.show({
                template: 'Please Wait..'
            });
					$http({
					  method: 'GET',
					 
					  url: $rootScope.getServerIp+'BankAndroidConnectivity/LoginMobiBank',
					  params: {uname:user.uname, pass:user.pass, appVersion:'MOBIBANKV1.1'},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
						//alert("success..."+data.loginNodes[0].errorCode);
						$ionicLoading.hide();
						if(data.loginNodes[0].errorCode != 0) {
							//alert(data.loginNodes[0].errorMessage);
							$ionicPopup.alert({
						  title: data.loginNodes[0].errorMessage,
						  //template:'From date'
						  })
						} else {
							$scope.loginNodes = data.loginNodes; // response data
							//$scope.responseArr = [];
							  $rootScope.responseArr = [];
							angular.forEach(data.loginNodes, function(loginNode, index) {
								
								$rootScope.cusCode = loginNode.cusCode;
								 $rootScope.mailID = loginNode.mailID;
								 $rootScope.sessionID = loginNode.sessionID;
								 $rootScope.errorMessage = loginNode.errorMessage;
								 //alert(loginNode.mailID);
								 
								 //$rootScope.responseArr.push(loginNode); 
								$state.go('welcome');
								//alert($scope.responseArr.cusCode);
			//                  angular.forEach(loginNode.responseArr, function(loginNodeVal, index){
			//                      
			//                  });
							});                
						}            
					}).error(function(data, status, headers, config) {
					$ionicLoading.hide();
						$ionicPopup.alert({
						  title: "Unable to perform your request. Please Check your Device Internet Connection",
						  //template:'From date'
						  })
					}); 

		}
		

//		
    }
	
	 $timeout(function() {
     $ionicLoading.hide();
   }, 10000);
})

.controller('WelcomeCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup,$timeout) {

	 $scope.btnLogOut = function() {		
		var confirmPopup = $ionicPopup.confirm({
			 title: 'Log out now?',
			// template: 'Log out now?'
		   });
		   confirmPopup.then(function(res) {               
			 if(res) {			   
			  $state.go('signin');
			 } else {
			   //console.log('You are not sure');
			 }
		   });
	 }

})

.controller('PasswordCtrl', function($scope, $state) {

//Parse.initialize("",
//                "");
//    window.addEventListener("load",initApp);
//	function initApp(){
//		document.getElementById("reset").addEventListener("click", reset);
//	}
//	function reset(){
//        email = document.getElementById('email').value;
//        Parse.User.requestPasswordReset(email, {
//          success: function() {
//            confirm('Foi enviado um email para: '+email+'/n Verifique seu email e redifina a senha!');
//          },
//          error: function(error) {
//            confirm('Aconteceu algum erro, entre em contato com o desenvolvedor!');
//          }
//        });
//    }
})

.controller('DashBoardCtrl', function($scope, $state) {
    alert("In DashBoardCtrl: ");
    //$scope.loginNode1 = $scope.loginNode;
})

.controller('AccBalanceCtrl', function($scope, $state, $http, $rootScope, $ionicLoading,$timeout) {
		$ionicLoading.show({
                template: 'Please Wait..'
            });

        cusCode = $rootScope.cusCode;
		
		//mailID = $rootScope.mailID;
		//alert(mailID);
        //alert("cusCode: "+cusCode);
        $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountBalnaceSV',
          params: {cusCode:cusCode},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
        }).success(function(data, status, headers, config) {
            //alert("success..."+data.accountBalanceNodes.length);  
				 $ionicLoading.hide();
            $scope.accountBalanceNodes = data.accountBalanceNodes; // response data
            $rootScope.accountBalanceNodes = data.accountBalanceNodes; // response data
            $rootScope.responseArr = [];
            angular.forEach(data.accountBalanceNodes, function(accountBalanceNode, index) {
				$scope.accountTitle=accountBalanceNode.accountTitle;
                $rootScope.responseArr.push(accountBalanceNode);                
                $state.go('accBalance');
				
            });   
            //alert($rootScope.responseArr.toString);
        }).error(function(data, status, headers, config) {
			 $ionicLoading.hide();
         
		   $ionicPopup.alert({
		  title: 'Unable to perform your request. Please Check your Device Internet Connection',
		  //template:'From date'
		  })
			
        });  

 $timeout(function() {
     $ionicLoading.hide();
   }, 10000);
		
})



.controller('AccStatementCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$ionicPopup,$timeout,$ionicPopup,$filter) {
		
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });

		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
				
		 $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberListSV',
          params: {mailID:mailID,sessiongID:sessionID},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
        }).success(function(data, status, headers, config) {                  
            $scope.accountTagCode = data.accountTagCode; // response data
            $rootScope.accountTagCode = data.accountTagCode; // response data
            $rootScope.responseArr = [];
            angular.forEach(data.accountTagCode, function(accountTagCode, index) {
                if(data.accountTagCode[0].sErrorCode == 0) {
					//alert('sucess');

									 $http({
									  method: 'GET',									  
									  url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListSV',
									  params: {mailID:mailID,sessiongID:sessionID},
									  //type:'JSON',
									  headers : { 'Content-Type': 'application/json' }
									}).success(function(data, status, headers, config) {                  
										$scope.accountListDescription = data.accountListDescription; // response data
										$rootScope.accountListDescription = data.accountListDescription; // response data
										$rootScope.responseArr = [];
										angular.forEach(data.accountListDescription, function(accountListDescription, index) {
												//alert(data.accountListDescription[0].sAccountNumber);
												 $ionicLoading.hide();
												 $rootScope.responseArr.push(accountListDescription); 
												 
												
										});   
										//alert($rootScope.responseArr.toString);
									}).error(function(data, status, headers, config) {
									 $ionicLoading.hide();
										 $ionicPopup.alert({
										  title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
										  })
										
									});  						
					//second prorame
							
				}else{
				$ionicLoading.hide();				
			 $ionicPopup.alert({
			  title: data.accountTagCode[0].sSrrorMessage,
			  //template:'From date'
			  })
			
				}
            });   
            //alert($rootScope.responseArr.toString);
        }).error(function(data, status, headers, config) {
		$ionicLoading.hide();          
		  $ionicPopup.alert({
			  title:'Unable to perform your request. Please Check your Device Internet Connection',
			  //template:'From date'
			  })
        });   
		
		
	 $scope.SearchAction = function(search){
	 //alert(search.acToDate);
	 
		if( $scope.sourceAccount==null){
		
		 $ionicPopup.alert({
		  title: 'Please Enter Source Account',
		  //template:'From date'
		  })
		}else if(!search || ! search.acFromDate){
		//alert($scope.sourceAccount);
		//alert("From date required");
				 $ionicPopup.alert({
		  title: 'From date required',
		  //template:'From date'
		  })
		
		}else if(!search || ! search.acToDate){
		//alert("To date required");
		 $ionicPopup.alert({
		  title: 'To date required',
		  //template:'To date'
		  })
		}else{
	//	alert(	(new Date(search.acToDate),'dd/MM/yyyy'));
	 var f_from_date = $filter('date')(new Date(search.acFromDate), 'dd/MM/yyyy');
		 var f_to_date = $filter('date')(new Date(search.acToDate),'dd/MM/yyyy');
							//  alert(f_from_date);
  
		
		$ionicLoading.show({
                template: 'Please Wait..'
            });
						$http({
					  method: 'GET',
					  
					  url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountStatementTagCode',
					  params: {accountno: $scope.sourceAccount,fromDate:f_from_date,toDate:f_to_date,mailID:mailID,sessiongID:sessionID,companyCode:'001'},
					  //type:'JSON',
					  headers : { 'Content-Type': 'application/json' }
					}).success(function(data, status, headers, config) {
					
									//alert("success..."+data.loginNodes[0].errorCode);
							if(data.accountStatementTagCodeNodes[0].errorCode== 0) {
								//alert(data.accountStatementTagCodeNodes[0].errorMesage);
								//second request Begin
										 $http({
										  method: 'GET',									  
										  url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountBalanceStatement',
										  params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
										  headers : { 'Content-Type': 'application/json' }
										}).success(function(data, status, headers, config) { 
											 $ionicLoading.hide();
											 //alert('sucess');
											$scope.accountStatementNodes = data.accountStatementNodes; // response data
											$rootScope.accountStatementNodes = data.accountStatementNodes; // response data
											$rootScope.responseArr = [];
											angular.forEach(data.accountStatementNodes, function(accountStatementNodes, index) {
												 $ionicLoading.hide();
												$rootScope.responseArr.push(accountStatementNodes);
												//aler(accountStatementNodes);
												//$state.go('accBalance');
												
											});   
										}).error(function(data, status, headers, config) {
											 $ionicLoading.hide();
										$ionicPopup.alert({
										  title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
										  })
											
										});  	
								
								//Second request End
								
								
								
							} else {
								$ionicLoading.hide();
								
							$ionicPopup.alert({
							  title:data.accountStatementTagCodeNodes[0].errorMesage,
							  //template:'From date'
							  })
							} 
										
						//alert($rootScope.responseArr.toString);
					}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
					  title:'Unable to perform your request. Please Check your Device Internet Connection',
					  //template:'From date'
					  })
						
					});            
					// end 0
		
		}
	 }
    

	
	
	
	
   
                
        
$scope.update = function(sa) {
   $scope.sourceAccount = sa.item;
   // use $scope.selectedItem.code and $scope.selectedItem.name here
   // for other stuff ...
   //alert($scope.item);
}
	
	$timeout(function() {
     $ionicLoading.hide();
   }, 10000);
        
})

//***************Fund Transfer***************************************************************************************************************************************************************////////////
.controller('FundTransterCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup) {
		//alert("Fund Transfer");
		$ionicLoading.show({
                template: 'Please Wait..'
            });
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',
        
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				
				   if(data.accountTagCode[0].sErrorCode == 0) {
				   
				   //Second Request Begin
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
							 $ionicLoading.hide();				 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountListDescription);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								$ionicPopup.alert({
									 title:'Unable to perform your request. Please Check your Device Internet Connection',
											  //template:'From date'
									})
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					//alert(data.accountTagCode[0].sSrrorMessage);
					 $ionicLoading.hide();
					$ionicPopup.alert({
					  title:data.accountTagCode[0].sSrrorMessage,
					  //template:'From date'
					  })
					
				}
			
			}).error(function(data, status, headers, config) {
            $ionicLoading.hide();
			$ionicPopup.alert({
			 title:'Unable to perform your request. Please Check your Device Internet Connection',
					  //template:'From date'
			})
        }); 
		
		
	//************* Begin For Populate field Selecting by Source Account//****************
	        
		$scope.update = function(sa) {
		   $scope.sourceAccount = sa.item;
		   // use $scope.selectedItem.code and $scope.selectedItem.name here
		   // for other stuff ...
		   //alert($scope.item);
		   
		   $ionicLoading.show({
                template: 'Please Wait..'
            });
			$http({
				  method: 'GET',
				 
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:$scope.sourceAccount},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
							$scope.availableBalance = accountDetailsSelectedByAccountNodes.availableBalance;
							$scope.currencyCode = accountDetailsSelectedByAccountNodes.currencyCode;
							//$ionicLoading.show();
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
												
										//************For Begin Destintion Account **************
																				 $http({
											  method: 'GET',											  
											  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsErrorCodeTagSV2',
											 // params: {cusCode:cusCode},
											  //type:'JSON',
											   params: {mailID:mailID,sessionID:sessionID,companyCode:'001',accountNo:$scope.sourceAccount,productCode:'FTR'},
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												//alert(ata.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode); 
													 if(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode == 0) {
														//alert("success...");
														//*************** for Begin Destination Account List***********************
														$http({
															 method: 'GET',									  
															url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsAccountListSV',
															params: {mailID:mailID,sessionID:sessionID},
																			  //type:'JSON',
															headers : { 'Content-Type': 'application/json' }
															}).success(function(data, status, headers, config) {                  
																				 //alert('sucess');
																 $ionicLoading.hide();
															$scope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.responseArr = [];
															angular.forEach(data.destrinationaAccountListNodes, function(destrinationaAccountListNodes, index) {
																$ionicLoading.hide();
																$rootScope.responseArr.push(destrinationaAccountListNodes);
																					//aler(accountListDescription);
																					//$state.go('accBalance');
																	
																	});   
																}).error(function(data, status, headers, config) {
																	 $ionicLoading.hide();
																	$ionicPopup.alert({
																		 title:'Unable to perform your request. Please Check your Device Internet Connection',
																				  //template:'From date'
																		})
																});  
														//*************** for End Destination Account List***********************
													}else{
													$ionicLoading.hide();
													//alert(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sEerrorMessage);
													$ionicPopup.alert({
													 title:data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sEerrorMessage,
															  //template:'From date'
													})
													
												}
																					
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												 $ionicLoading.hide();
													$ionicPopup.alert({
													 title:'Unable to perform your request. Please Check your Device Internet Connection',
															  //template:'From date'
													})
											});  
										//********** For End Destrination Account***************
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
						 title:'Unable to perform your request. Please Check your Device Internet Connection',
								  //template:'From date'
						})
			});            
		}
		
		
		//************* End For Populate field Selecting by Source Account  *************************
		
		// ****************Begin For Populate field Selecting by Destination Account***************
				$scope.DestinationUpdate = function(da) {
				//alert(da.destitionItem);
				 $scope.destinationAccount = da.destitionItem;
				 $ionicLoading.show({
                template: 'Please Wait..'
            });
				 
					   $http({
				  method: 'GET',
			
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestrinationaAccountDestailsSelectByDestrinationAccount',
				 params: {mailID:mailID,sessionID:sessionID,destrinationAccountNo: $scope.destinationAccount},
				  //type:'JSON',
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert("success...");
					$ionicLoading.hide();
						$scope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
						//$rootScope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
											//$rootScope.responseArr = [];
						angular.forEach(data.destrinationAccountDetailsSelectByDestrinationAccount, function(destrinationAccountDetailsSelectByDestrinationAccount, index) {
						 $ionicLoading.hide();
						$scope.destinationAccountTitle=destrinationAccountDetailsSelectByDestrinationAccount.accountTitle;
						$scope.destinationCurrency=destrinationAccountDetailsSelectByDestrinationAccount.accountDescription;
							
												
					});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
					 title:'Unable to perform your request. Please Check your Device Internet Connection',
							  //template:'From date'
					})
				}); 
				}
		
		// ****************End For Populate field Selecting by Destination Account***************

		
			// ****************Begin Fund Transfer Submit Execution***************
				$scope.DoSubmitAction = function(fundtransfer){
					if( $scope.sourceAccount==null){
					$ionicPopup.alert({
					  title: 'Source Account required',
					  //template:'To date'
					  })
					}else if(!fundtransfer || !fundtransfer.amount){
						$ionicPopup.alert({
					  title: 'Amount required',
					  //template:'To date'
					  })
					}else if($scope.destinationAccount==null){
						$ionicPopup.alert({
						  title: 'Destination Account required',
						  //template:'To date'
						  })
					}else if(!fundtransfer || !fundtransfer.pinCode){
						$ionicPopup.alert({
						  title: 'Pin Code required',
						  //template:'To date'
						  })
					}else{
						//alert("succcc");
						$ionicLoading.show({
							template: 'Please Wait..'
						});
						$http({
							  method: 'GET',							 
							  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferExecuteTagCodeSV',
							   params: {mailID:mailID,sessionID:sessionID,password:fundtransfer.pinCode,companyCode:'001',sourceAccountNo:$scope.sourceAccount,amount:fundtransfer.amount,destrinationAcountNo:$scope.destinationAccount,remarks:fundtransfer.remarks},
							 // params: {cusCode:cusCode},
							  //type:'JSON',
							  headers : { 'Content-Type': 'application/json' }
							}).success(function(data, status, headers, config) {
								//alert("success...");
									$ionicLoading.hide();
									 if(data.fundTransferExecuteTagCodeNodes[0].errorCode == 0) {
									 $ionicLoading.hide();									
									  $ionicPopup.alert({
										 title:data.fundTransferExecuteTagCodeNodes[0].errorMesage,
												  //template:'From date'
										})
									 }else {
									  $ionicLoading.hide();									 
									 $ionicPopup.alert({
										 title:data.fundTransferExecuteTagCodeNodes[0].errorMesage,
												  //template:'From date'
										})
									 }
									
								//alert($rootScope.responseArr.toString);
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								$ionicPopup.alert({
								 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
								})
							});  
					}
				}
			// ****************End Fund Transfer End Submit Execution***************
	
	
})

.controller('fundTransterRequestCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup) {
	//alert("Fund Transfer");
			 $ionicLoading.show({
                template: 'Please Wait..'
            });
				 
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',
        
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				
				   if(data.accountTagCode[0].sErrorCode == 0) {
				   
				   //Second Request Begin
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
							 $ionicLoading.hide();				 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountListDescription);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								$ionicPopup.alert({
								 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
								})
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					//alert(data.accountTagCode[0].sSrrorMessage);
					$ionicPopup.alert({
					 title:data.accountTagCode[0].sSrrorMessage,
										  //template:'From date'
					})
					
				}
			
			}).error(function(data, status, headers, config) {
            $ionicLoading.hide();
			 $ionicPopup.alert({
				title:'Unable to perform your request. Please Check your Device Internet Connection',
											  //template:'From date'
				})
        }); 
		
			//************* Begin For Populate field Selecting by Source Account//****************
	        
		$scope.update = function(sa) {
		   $scope.sourceAccount = sa.item;
		   // use $scope.selectedItem.code and $scope.selectedItem.name here
		   // for other stuff ...
		   //alert($scope.item);
		   
		   $ionicLoading.show({
                template: 'Please Wait..'
            });
			$http({
				  method: 'GET',
				 
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:$scope.sourceAccount},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
							$scope.availableBalance = accountDetailsSelectedByAccountNodes.availableBalance;
							$scope.currencyCode = accountDetailsSelectedByAccountNodes.currencyCode;
							//$ionicLoading.show();
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
												
										//************For Begin Destintion Account **************
																				 $http({
											  method: 'GET',											  
											  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsErrorCodeTagSV2',
											 // params: {cusCode:cusCode},
											  //type:'JSON',
											   params: {mailID:mailID,sessionID:sessionID,companyCode:'001',accountNo:$scope.sourceAccount,productCode:'FTR'},
											  headers : { 'Content-Type': 'application/json' }
											}).success(function(data, status, headers, config) {
												//alert(ata.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode); 
													 if(data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sErrorCode == 0) {
														//alert("success...");
														//*************** for Begin Destination Account List***********************
														$http({
															 method: 'GET',									  
															url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestinationDetailsAccountListSV',
															params: {mailID:mailID,sessionID:sessionID},
																			  //type:'JSON',
															headers : { 'Content-Type': 'application/json' }
															}).success(function(data, status, headers, config) {                  
																				 //alert('sucess');
																 $ionicLoading.hide();
															$scope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.destrinationaAccountListNodes = data.destrinationaAccountListNodes; // response data
															$rootScope.responseArr = [];
															angular.forEach(data.destrinationaAccountListNodes, function(destrinationaAccountListNodes, index) {
																$ionicLoading.hide();
																$rootScope.responseArr.push(destrinationaAccountListNodes);
																					//aler(accountListDescription);
																					//$state.go('accBalance');
																	
																	});   
																}).error(function(data, status, headers, config) {
																	 $ionicLoading.hide();
																	$ionicPopup.alert({
																	 title:'Unable to perform your request. Please Check your Device Internet Connection',
																			  //template:'From date'
																	})
																});  
														//*************** for End Destination Account List***********************
													}else{
													$ionicLoading.hide();
													
													$ionicPopup.alert({
													 title:data.fundTransferDestrianationDeatailsErrorCodeNodes[0].sEerrorMessage,
															  //template:'From date'
													})
													
												}
																					
												//alert($rootScope.responseArr.toString);
											}).error(function(data, status, headers, config) {
												 $ionicLoading.hide();
													$ionicPopup.alert({
												 title:'Unable to perform your request. Please Check your Device Internet Connection',
														  //template:'From date'
												})
											});  
										//********** For End Destrination Account***************
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
						title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
					})
			});            
		}
		
		
		//************* End For Populate field Selecting by Source Account  *************************
		
		// ****************Begin For Populate field Selecting by Destination Account***************
				$scope.DestinationUpdate = function(da) {
				//alert(da.destitionItem);
				 $scope.destinationAccount = da.destitionItem;
				 $ionicLoading.show({
                template: 'Please Wait..'
            });
				 
					   $http({
				  method: 'GET',
			
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDestrinationaAccountDestailsSelectByDestrinationAccount',
				 params: {mailID:mailID,sessionID:sessionID,destrinationAccountNo: $scope.destinationAccount},
				  //type:'JSON',
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert("success...");
					$ionicLoading.hide();
						$scope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
						//$rootScope.destrinationAccountDetailsSelectByDestrinationAccount = data.destrinationAccountDetailsSelectByDestrinationAccount; // response data
											//$rootScope.responseArr = [];
						angular.forEach(data.destrinationAccountDetailsSelectByDestrinationAccount, function(destrinationAccountDetailsSelectByDestrinationAccount, index) {
						 $ionicLoading.hide();
						$scope.destinationAccountTitle=destrinationAccountDetailsSelectByDestrinationAccount.accountTitle;
						$scope.destinationCurrency=destrinationAccountDetailsSelectByDestrinationAccount.accountDescription;
							
												
					});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
						title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
					})
				}); 
				}
		
		// ****************End For Populate field Selecting by Destination Account***************

			// ****************Begin Fund Transfer Submit Execution***************
				$scope.DoSubmitAction = function(fundtransfer){
				if(!fundtransfer || !fundtransfer.requestDate){
				$ionicPopup.alert({
					  title: 'Request Date required',
					  //template:'To date'
					  })
				}else if( $scope.sourceAccount==null){
					$ionicPopup.alert({
					  title: 'Source Account required',
					  //template:'To date'
					  })
					}else if(!fundtransfer || !fundtransfer.amount){
						$ionicPopup.alert({
					  title: 'Amount required',
					  //template:'To date'
					  })
					}else if($scope.destinationAccount==null){
						$ionicPopup.alert({
						  title: 'Destination Account required',
						  //template:'To date'
						  })
					}else if(!fundtransfer || !fundtransfer.pinCode){
						$ionicPopup.alert({
						  title: 'Pin Code required',
						  //template:'To date'
						  })
					}else{
						//alert("succcc");
						$ionicLoading.show({
							template: 'Please Wait..'
						});
						
						//**********Begin First Execution *********
						$http({
							  method: 'GET',							 
							  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferRequestExecuteTagCodeSV',
							   params: {mailID:mailID,sessionID:sessionID,password:fundtransfer.pinCode,companyCode:'001',requestDate:fundtransfer.requestDate,sourceAccountNo:$scope.sourceAccount,amount:fundtransfer.amount,destrinationAcountNo:$scope.destinationAccount,remarks:fundtransfer.remarks},
							 // params: {cusCode:cusCode},
							  //type:'JSON',
							  headers : { 'Content-Type': 'application/json' }
							}).success(function(data, status, headers, config) {
								//alert("success...");  
									 $ionicLoading.hide();
									if(data.fundTransferExecuteTagCodeNodes[0].errorCode == 0) {
									$ionicLoading.hide();										
										$ionicPopup.alert({
											title:data.fundTransferExecuteTagCodeNodes[0].errorMesage,
															  //template:'From date'
										})
									}else{
									$ionicLoading.hide();										
											$ionicPopup.alert({
											title:data.fundTransferExecuteTagCodeNodes[0].errorMesage,
															  //template:'From date'
										})
									}
										
								//alert($rootScope.responseArr.toString);
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								$ionicPopup.alert({
									title:'Unable to perform your request. Please Check your Device Internet Connection',
													  //template:'From date'
								})
							});            
										
					//**********End First Execution *********
						 
					}
				}
			// ****************End Fund Transfer End Submit Execution***************
		
})


.controller('talkTimeRechargetCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup) {
		
				 $ionicLoading.show({
                template: 'Please Wait..'
            });
				 
		//cusCode = $rootScope.cusCode;
		mailID = $rootScope.mailID;
		//alert(mailID);
		sessionID = $rootScope.sessionID;
		//alert(sessionID);
		
		
		 $http({
          method: 'GET',
        
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountNumberTransferCode',
          params: {mailID:mailID,sessiongID:sessionID,sDate:$filter("date")(Date.now(), 'dd/MM/yyyy')},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
		   }).success(function(data, status, headers, config) {
			//alert("success");
				
				   if(data.accountTagCode[0].sErrorCode == 0) {
				   
				   //Second Request Begin
					 $http({
						 method: 'GET',									  
						url:  $rootScope.getServerIp+'BankAndroidConnectivity/AccountListTransferSV',
						params: {mailID:mailID,sessiongID:sessionID},
										  //type:'JSON',
						headers : { 'Content-Type': 'application/json' }
					    }).success(function(data, status, headers, config) {                  
							 $ionicLoading.hide();				 //alert('sucess');
						$scope.accountListDescription = data.accountListDescription; // response data
						$rootScope.accountListDescription = data.accountListDescription; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountListDescription, function(accountListDescription, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(accountListDescription);
												//aler(accountListDescription);
												//$state.go('accBalance');
								
								});   
							}).error(function(data, status, headers, config) {
								 $ionicLoading.hide();
								$ionicPopup.alert({
								 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
								})
							});  
				
				//Second Request End
								
				}else{
					$ionicLoading.hide();
					//alert(data.accountTagCode[0].sSrrorMessage);
					$ionicPopup.alert({
					 title:data.accountTagCode[0].sSrrorMessage,
										  //template:'From date'
					})
					
				}
			
			}).error(function(data, status, headers, config) {
            $ionicLoading.hide();
			 $ionicPopup.alert({
				title:'Unable to perform your request. Please Check your Device Internet Connection',
											  //template:'From date'
				})
        }); 
		
	
	
	//************* Begin For Populate field Selecting by Source Account//****************
	        
		$scope.update = function(sa) {
		   $scope.sourceAccount = sa.item;
		   // use $scope.selectedItem.code and $scope.selectedItem.name here
		   // for other stuff ...
		   //alert($scope.item);
		   
		   $ionicLoading.show({
                template: 'Please Wait..'
            });
			$http({
				  method: 'GET',
				 
				  url:  $rootScope.getServerIp+'BankAndroidConnectivity/FundTransferDetailsSelectByAccountSV',
				  params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:$scope.sourceAccount},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.accountDetailsSelectedByAccountNodes, function(accountDetailsSelectedByAccountNodes, index) {
							 $ionicLoading.hide();
							$scope.accountTitle = accountDetailsSelectedByAccountNodes.accountTitle;
							$scope.availableBalance = accountDetailsSelectedByAccountNodes.availableBalance;
							$scope.currencyCode = accountDetailsSelectedByAccountNodes.currencyCode;
							//$ionicLoading.show();
									//$rootScope.responseArr.push(accountDetailsSelectedByAccountNodes);
												//alert(accountDetailsSelectedByAccountNodes);
												//$state.go('accBalance');
												
										//************For Begin Destintion Account **************
											
										//********** For End Destrination Account***************
								
								});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
						title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
					})
			});            
		}
		
		
		//************* End For Populate field Selecting by Source Account  *************************
		
		
		//*****************for Operator Begin***************
		   $http({
          method: 'GET',
          
          url:  $rootScope.getServerIp+'BankAndroidConnectivity/MobileOperatorsSV',
         // params: {cusCode:cusCode},
          //type:'JSON',
          headers : { 'Content-Type': 'application/json' }
        }).success(function(data, status, headers, config) {
            //alert("success...");            
				$scope.mobileOperatorsNamesAndCodesNodes = data.mobileOperatorsNamesAndCodesNodes; // response data
						$rootScope.mobileOperatorsNamesAndCodesNodes = data.mobileOperatorsNamesAndCodesNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.mobileOperatorsNamesAndCodesNodes, function(mobileOperatorsNamesAndCodesNodes, index) {
							$ionicLoading.hide();
							$rootScope.responseArr.push(mobileOperatorsNamesAndCodesNodes);
												//aler(accountListDescription);
												//$state.go('accBalance');
												
								
								});   
            //alert($rootScope.responseArr.toString);
        }).error(function(data, status, headers, config) {
            $ionicLoading.hide();
			$ionicPopup.alert({
			 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
			})
        });            
		//*****************End Operator Begin***************
		
		//*************Begin Radio Button Value ********************
		 $scope.radioSubmit = function(i) {
						 $scope.radioValue=i;						
				 // alert($scope.radioValue);
		}
		//*************End Radio Button Value ********************
		
		
		
		//*************Begin Mobile Operator Value ********************
		$scope.updateMoileOperator = function(mobileoperator) {
		   $scope.mobileoperator = mobileoperator.item;
		   //alert($scope.mobileoperator);
				$http({
						  method: 'GET',
						 
						  url:  $rootScope.getServerIp+'BankAndroidConnectivity/MobileOperatorCodeSelectByMobileOperatorNameSV',
						  params: {operatorName: $scope.mobileoperator},
						  //type:'JSON',
						  headers : { 'Content-Type': 'application/json' }
						   }).success(function(data, status, headers, config) {
							
							$scope.mobileOperatorCode= data.mobileOperatorsCodesNodes[0].mobileOperatorCode
								
							
							
							}).error(function(data, status, headers, config) {
						   //$ionicLoading.hide();
							$ionicPopup.alert({
								 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
								})
						}); 
		   
		   }
		//*************Begin Mobile Operator Value ********************
	
	//******************* Begin Talk Time Execution**********************
		$scope.DoSubmitAction = function(talkTime){
			if($scope.sourceAccount==null){
				$ionicPopup.alert({
						  title: 'Please Select Source Account',
						  //template:'To date'
						  })
			}else if($scope.mobileoperator==null){
					$ionicPopup.alert({
					title: 'Please Select Operator',
						  //template:'To date'
				})
			}else if($scope.radioValue==null){
				$ionicPopup.alert({
					title: 'Please Select Mobile Type',
						  //template:'To date'
				})
			}else if(!talkTime || ! talkTime.mobileNo){
				$ionicPopup.alert({
					title: 'Mobile Number Required',
						  //template:'To date'
				})
			}else if(!talkTime || ! talkTime.amount){
				$ionicPopup.alert({
					title: 'Amount Required',
						  //template:'To date'
				})
			}else if(!talkTime || ! talkTime.pinCode){
				$ionicPopup.alert({
					title: 'Pin Code Required',
						  //template:'To date'
				})
			}else {
					$ionicLoading.show({
						template: 'Please Wait..'
					});
											
						
						$http({
						  method: 'GET',
						 
						  url:  $rootScope.getServerIp+'BankAndroidConnectivity/MobileRechargeExecuteSV',
						  params: {mailID:mailID,sessionID:sessionID,pinCode:talkTime.pinCode,companyCode:'001',sourceAccount:$scope.sourceAccount,amount:talkTime.amount,mobileOperatorCode:$scope.mobileOperatorCode,selectedMobileType:$scope.radioValue,mobileNumber:talkTime.mobileNo},
						  //type:'JSON',
						  headers : { 'Content-Type': 'application/json' }
						   }).success(function(data, status, headers, config) {
							//alert("success");
								//Second Request Begin
								$ionicLoading.hide();
								   if(data.submitExecuteNodes[0].sumitExecuteErrorCode == 0) {
									
								//Second Request End
									$ionicLoading.hide();
									
									$ionicPopup.alert({
										title: data.submitExecuteNodes[0].sumitExecuteErrorMessage,
											  //template:'To date'
									})
												
								}else{
									$ionicLoading.hide();									
									$ionicPopup.alert({
										title: data.submitExecuteNodes[0].sumitExecuteErrorMessage,
											  //template:'To date'
									})
									
								}
							
							}).error(function(data, status, headers, config) {
						   $ionicLoading.hide();
							$ionicPopup.alert({
								 title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
								})
						}); 
						
			}
			
		}
	//********************End Talk Time Execution******************
	
	
})



			
.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	$ionicPlatform.registerBackButtonAction(function (event) {
      event.preventDefault();
 }, 100) 
 
	if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    
                }
            }
  });
  
 


//    document.addEventListener("deviceready", onDeviceReady, false);
//
//    function onDeviceReady() {
//
//        //Initialize anything you need to. aka: Google analytics.
//
//        //Set other evens you need to listen to.
////        document.addEventListener("online", onOnline, false);
////        document.addEventListener("offline", onOffline, false);
//         documrnt.addEventListener("load", initAccBalance, false);
//    
//	function initAccBalance() {
//		document.getElementById("btnLogin").addEventListener("click", accountBalance);
//	}
//        //document.getElementById("accBalanceLnk").addEventListener("click", accountBalance, false);
//     }
})

function checkConnectionStatus() {
    if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.alert({
                title: 'Network Status',
                content: 'No Internet Connection'
            })
            return flase;
        }
    }
}
