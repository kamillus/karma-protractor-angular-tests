//unit tests

'use strict';

describe('Unit Test: My Video List Controller', function() {
	var $scope;
	var userService;
	var videoService;
	var modalService;
	var constants;
	var videoListController;
	
	beforeEach(angular.mock.module('appControllers'))
	beforeEach(angular.mock.module('appServices'))
	beforeEach(angular.mock.module('videoPlayerApp'))
	
	beforeEach(inject(function($rootScope, $injector){
		$scope = $rootScope.$new();
		userService = $injector.get(['UserService']);
		videoService = $injector.get(['VideoService']);
		modalService = $injector.get(['modalService']);
		constants = $injector.get(['CONSTANTS']);
	}));
	
	beforeEach(inject(function($controller, $httpBackend, $location, $injector){
		videoListController = $controller("VideoListController", {
					$scope: $scope, 
					$http: $httpBackend, 
					UserService: userService, 
					VideoService: videoService, 
					modalService: modalService, 
					$location: $location, 
					CONSTANTS: constants
				});
	}));
	
	it('Should have a VideoListController', inject(function($controller, $httpBackend, $location, $injector) {
		expect(videoListController).toBeDefined();
	}));
});

describe('Unit Test: My Video Detail Controller', function() {
	var $scope;
	var userService;
	var videoService;
	var modalService;
	var constants;
	var videoDetailController;
	
	beforeEach(angular.mock.module('appControllers'))
	beforeEach(angular.mock.module('appServices'))
	beforeEach(angular.mock.module('videoPlayerApp'))

	beforeEach(inject(function($rootScope, $injector){
		$scope = $rootScope.$new();
		userService = $injector.get(['UserService']);
		videoService = $injector.get(['VideoService']);
		modalService = $injector.get(['modalService']);
		constants = $injector.get(['CONSTANTS']);
	}));
	
	beforeEach(inject(function($controller, $httpBackend, $location, $injector){
		videoDetailController = $controller("VideoDetailController", {
			$scope: $scope, 
			$http: $httpBackend, 
			UserService: userService, 
			VideoService: videoService, 
			modalService: modalService, 
			$location: $location, 
			CONSTANTS: constants
		});
	}));	
	
	it('Should have a VideoListController', inject(function($rootScope, $controller, $httpBackend, $location, $injector) {
		expect(videoDetailController).toBeDefined();
	}));	
});