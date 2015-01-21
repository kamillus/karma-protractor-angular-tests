describe('Unit Test: UserService ', function() {
	var userService;
	var $httpBackend;
	var $scope;
	var $q;
	var constants;
	var $provide;
	
	beforeEach(angular.mock.module('appControllers'))
	beforeEach(angular.mock.module('appServices'))
	beforeEach(angular.mock.module('startApp'))
	beforeEach(angular.mock.module('angularytics'))

	beforeEach(inject(function($rootScope, $injector, _$httpBackend_, _$q_){
		$q = _$q_;
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		userService = $injector.get(['UserService']);	
	}));
	
	afterEach (function () {
		$httpBackend.verifyNoOutstandingExpectation ();
		$httpBackend.verifyNoOutstandingRequest ();
	});

	it('Returns signup information when user not logged in but is signed up', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/check').respond(
			{"loggedIn":false,"signedUp":true}
		);
		
		$httpBackend.expectGET('/api/user/check');
		userService.check(function(data){	
		})
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.email).toBeFalsy();
	}));
	

	it('Returns signup information when user is not signed up and not logged in', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/check').respond(
			{"loggedIn":false,"signedUp":false}
		);
		
		$httpBackend.expectGET('/api/user/check');
		userService.check(function(data){	
		})
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(true);
		expect(userService.email).toBeFalsy();
		
	}));

	it('User able to login', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/check').respond(
			{"loggedIn":true,"signedUp":true}
		);	
		
		$httpBackend.whenPOST('/api/user/get').respond(
			{"status":1,"error":"","output":{"credits":"1"},"credits":0,"loginData":{"worked":true,"data":{"success":true,"message":"''","errorCode":0,"tag":{"authenticated":true,"message":"User Logged In","user":{"userId":"117","emailAddress":"test26@graboid.com","lastName":"","firstName":"","username":"","dateCreated":"2014-09-03 14:43:39","adultEnabled":"0","emailVerified":"1","isAdultClient":"0","poolId":"2","password":"ac8b260984e97d145556ba9a34743789","version":"","versionOriginal":"","versionModifier":"","testAccount":"1","remoteCountry":"ZZ","remoteIP":"192.168.0.168","emptyCol":"0","splitTestId":"","oauth":"0","userSubscription":{"userSubscriptionId":-1,"userId":"117","subscriptionPlanId":null,"paymentManifestId":null,"status":null,"cancelled":null,"startDate":null,"endDate":null,"changeDate":null,"registrationMarker":null,"paid":0,"subscriptionPlan":{"isExpired":0}}}}}},"hash":"ac8b260984e97d145556ba9a34743789"}
		);
		
		$httpBackend.expectPOST('/api/user/get');
		userService.login(true, function(){});
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.credits.value).toBeGreaterThan(0);
		expect(userService.password).toContain('ac8b260984e97d145556ba9a34743789');
		expect(userService.isFree).toBe(true);
	}));	


	it('Returns signup information when user is logged in', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/check').respond(
			{"email":"test26@graboid.com","password":"ac8b260984e97d145556ba9a34743789","loggedIn":true}
		);
		
		$httpBackend.whenPOST('/api/user/get').respond(
			{"loggedIn":true,"signedUp":true}
		);
		
		$httpBackend.expectGET('/api/user/check');
		$httpBackend.expectPOST('/api/user/get');
		userService.check(function(data){	
		})
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.email).toMatch("test26@graboid.com");	
	}));
	
	
	it('Logs out and redirects the user', inject(function(_$location_, $rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/logout').respond(
			{"logout":true}
		);
		
		$httpBackend.whenGET('/api/user/check').respond(
			{"loggedIn":false,"signedUp":true}
		);
		
		spyOn($location, 'path');
		$httpBackend.expectGET('/api/user/check');
		$httpBackend.expectGET('/api/user/logout');
		userService.logout();
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.email).toBe("");	
		expect(userService.userId).toBe(0);	
		
		expect($location.path).toHaveBeenCalled();
	}));
	
	it('Redirects to bmember on upgrade', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/check').respond(
			{"loggedIn":false,"signedUp":true}
		);
		$httpBackend.expectGET('/api/user/check');
		spyOn(userService, "redirect");
		userService.upgrade()
		$httpBackend.flush();
		expect(userService.redirect).toHaveBeenCalled();
	}));
	
	it('Redirects to bmember on manage', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/api/user/check').respond(
			{"loggedIn":false,"signedUp":true}
		);
		$httpBackend.expectGET('/api/user/check');
		spyOn(userService, "redirect");
		userService.manage()
		$httpBackend.flush();
		expect(userService.redirect).toHaveBeenCalled();
	}));						
});