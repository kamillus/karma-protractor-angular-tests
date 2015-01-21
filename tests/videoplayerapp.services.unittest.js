describe('Unit Test: Video Player App Services ', function() {
	var videoService;
	var $httpBackend;
	var $scope;
	var $q;
	var constants;
	var $provide;
	
	beforeEach(angular.mock.module('appControllers'))
	beforeEach(angular.mock.module('appServices'))
	beforeEach(angular.mock.module('videoPlayerApp'))
	
    beforeEach(function() {
        module(function($provide) {
            $provide.constant('CONSTANTS', {'billing_url': 'localhost:8000/billing'});
        });
	});

	beforeEach(inject(function($rootScope, $injector, _$httpBackend_, _$q_){
		$q = _$q_;
		$scope = $rootScope.$new();
		$httpBackend = _$httpBackend_;
		videoService = $injector.get(['VideoService']);	
		
		
		$httpBackend.whenGET('/api/search/count/50/offset/0/category/0/orderBy/-1/order/desc/genre/0').respond(
			{"search_results":[{"title":"Test Title","likes":"0","views":"0","date":"1392849608", "category":"1"}],"meta":{"count":"1"}}		
		);
		
		$httpBackend.whenGET('/api/search/count/50/offset/50/category/0/orderBy/-1/order/desc/genre/0').respond(
			{"search_results":[{"title":"Test Title 3","likes":"0","views":"0","date":"1392849608", "category":"2"}],"meta":{"count":"1"}}		
		);
		
		$httpBackend.whenGET('/api/search/count/50/offset/0/category/1/orderBy/-1/order/desc/genre/0').respond(
			{"search_results":[{"title":"Test Title 4","likes":"0","views":"0","date":"1392849608", "category":"1"}],"meta":{"count":"1"}}		
		);

		$httpBackend.whenGET('/api/search/count/50/offset/0/category/0/orderBy/3/order/desc/genre/0').respond(
			{"search_results":[{"title":"Test Title 5","likes":"0","views":"0","date":"1392849608", "category":"1"}],"meta":{"count":"1"}}		
		);
		
		$httpBackend.whenGET('/api/search/count/50/offset/0/category/0/orderBy/3/order/asc/genre/0').respond(
			$httpBackend.whenGET('/api/search/count/50/offset/0/category/0/orderBy/-1/order/desc/genre/0').respond(
		);

		$httpBackend.whenGET('/api/user').respond(
			{"loggedIn":false,"signedUp":false}
		);
		
		$httpBackend.whenGET('/api/genres').respond(
			'200', ''
		);
	}));
	
	afterEach (function () {
		$httpBackend.verifyNoOutstandingExpectation ();
		$httpBackend.verifyNoOutstandingRequest ();
	});	
	
	it('Should have results', inject(function($rootScope, $controller, $location, $injector) {

		$httpBackend.expectGET('/api/search/count/50/offset/0/category/0/orderBy/-1/order/desc/genre/0'); 
		
		videoService.getSearchResults().then(function(data){})	
		$httpBackend.flush();
		expect(videoService.results.max).toBeGreaterThan(0);
		expect(videoService.results.data.length).toBeGreaterThan(0);
		
	}));
	
	it('Should go to next/previous page', inject(function($rootScope, $controller, $location, $injector) {
		videoService.getSearchResults().then(function(data){})	
		$httpBackend.flush();

		$httpBackend.expectGET('/api/search/count/50/offset/50/category/0/orderBy/-1/order/desc/genre/0');
		videoService.nextPage();
		$httpBackend.flush();
		expect(videoService.page).toEqual(1);
		
		$httpBackend.expectGET('/api/search/count/50/offset/0/category/0/orderBy/-1/order/desc/genre/0');
		videoService.previousPage();
		$httpBackend.flush();
		expect(videoService.page).toEqual(0);
	}));
	
	it('Should change category to TV', inject(function($rootScope, $controller, $location, $injector) {
		videoService.getSearchResults().then(function(data){})	
		$httpBackend.flush();

		$httpBackend.expectGET('/api/search/count/50/offset/0/category/1/orderBy/-1/order/desc/genre/0');
		videoService.change_category(1);
		$httpBackend.flush();
		
		expect(videoService.page).toEqual(0);
		expect(videoService.selected_category).toEqual(1);
	}));
	
	it('Should change order by date and change order direction ', inject(function($rootScope, $controller, $location, $injector) {
		videoService.getSearchResults().then(function(data){})	
		$httpBackend.flush();

		$httpBackend.expectGET('/api/search/count/50/offset/0/category/0/orderBy/3/order/desc/genre/0');
		videoService.change_order_by(3)
		$httpBackend.flush();
		expect(videoService.orderDirection).toEqual('desc')
		expect(videoService.page).toEqual(0);
		
		$httpBackend.expectGET('/api/search/count/50/offset/0/category/0/orderBy/3/order/asc/genre/0');
		videoService.change_order_by(3)
		$httpBackend.flush();
		expect(videoService.orderDirection).toEqual('asc')
		expect(videoService.page).toEqual(0);
	}));
	
	it('Should not have adult category when disabled', inject(function($rootScope, $controller, $location, $injector) {
		videoService.getSearchResults().then(function(data){})	
		$httpBackend.flush();
		expect(youtubeService.searchCategories).not.toContain({'label':'Comedy','icon':'fa-exclamation-triangle'})	
	}));
	
	it('Should show correct modal when a user who is not logged in tries to download', inject(function($rootScope, $controller, $location, $injector) {
		$httpBackend.whenPOST('/api/watch/1').respond(
			{"status":0,"title":"Title 4","message":"You need to be logged in to view videos"}
		);		
		$httpBackend.expectPOST('/api/watch/1');
		spyOn(videoService, "show_modal");
		videoService.watch("1")
		$httpBackend.flush();
		expect(videoService.show_modal).toHaveBeenCalledWith({
                                closeButtonText: 'Cancel',
                                actionButtonText: 'Sign Up',
                                headerText: 'You need to sign up first!',
                                bodyText: 'You to sign up first!'});
	}));		
});