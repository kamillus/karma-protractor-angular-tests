describe('Unit Test: UserService ', function() {
	var userService;
	var $httpBackend;
	var $scope;
	var $q;
	var constants;
	var $provide;
	
	beforeEach(angular.mock.module('appControllers'))
	beforeEach(angular.mock.module('appServices'))
	beforeEach(angular.mock.module('videoPlayerApp'))
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
		$httpBackend.whenGET('/user/status').respond(
			{"loggedIn":false,"signedUp":true}
		);
		
		$httpBackend.expectGET('/user/status');
		userService.check(function(data){	
		})
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.email).toBeFalsy();
	}));
	

	it('Returns signup information when user is not signed up and not logged in', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/user/status').respond(
			{"loggedIn":false,"signedUp":false}
		);
		
		$httpBackend.expectGET('/user/status');
		userService.check(function(data){	
		})
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(true);
		expect(userService.email).toBeFalsy();
		
	}));

	it('User able to login', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/user/status').respond(
			{"loggedIn":true,"signedUp":true}
		);	
		
		$httpBackend.whenPOST('/user').respond(
			{"status":1,"error":"","credits":0,"loginData":{"worked":true,"data":{"success":true,"message":"''","errorCode":0,"tag":{"authenticated":true,"message":"User Logged In","user":{"userId":"1","emailAddress":"test1324783@mailinator.com","lastName":"","firstName":"","username":"","createdAt":"2014-09-03 14:43:39"}}}}}		);
		);
		
		$httpBackend.expectPOST('/user');
		userService.login(true, function(){});
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.credits.value).toBeGreaterThan(0);
		expect(userService.password).toContain('ac8b260984e97d145556ba9a34743789');
		expect(userService.isFree).toBe(true);
	}));	


	it('Returns signup information when user is logged in', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/user/status').respond(
			{"email":"test1324783@mailinator.com","password":"somehash","loggedIn":true}
		);
		
		$httpBackend.whenPOST('/user').respond(
			{"loggedIn":true,"signedUp":true}
		);
		
		$httpBackend.expectGET('/user/status');
		$httpBackend.expectPOST('/user');
		userService.check(function(data){	
		})
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.email).toMatch("test1324783@mailinator.com");	
	}));
	
	
	it('Logs out and redirects the user', inject(function(_$location_, $rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/user/logout').respond(
			{"logout":true}
		);
		
		$httpBackend.whenGET('/user/status').respond(
			{"loggedIn":false,"signedUp":true}
		);
		
		spyOn($location, 'path');
		$httpBackend.expectGET('/user/status');
		$httpBackend.expectGET('/user/logout');
		userService.logout();
		$httpBackend.flush();
		expect(userService.showSignUp).toBe(false);
		expect(userService.email).toBe("");	
		expect(userService.userId).toBe(0);	
		
		expect($location.path).toHaveBeenCalled();
	}));
	
	it('Redirects to payment system on upgrade', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenGET('/user/status').respond(
			{"loggedIn":false,"signedUp":true}
		);
		$httpBackend.expectGET('/user/status');
		spyOn(userService, "redirect");
		userService.upgrade()
		$httpBackend.flush();
		expect(userService.redirect).toHaveBeenCalled();
	}));						
});