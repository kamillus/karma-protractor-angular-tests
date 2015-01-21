//unit tests

'use strict';

describe('My video site home page', function() {
	browser.get('/');
	browser.waitForAngular();

	it('Should load angular', function() {
		//the ip is a docker instance I have set up.
		expect(browser.getLocationAbsUrl()).toMatch("http://192.168.59.103:8080/#/");
	});

	it('Should load correct title', function() {
		expect(browser.getTitle()).toEqual("My Video Site");
	});		
	
	it('Should have search results', function() {
		var rows = element.all(By.repeater('video in VideoService.results.data')).map(function(row) {
		  return 1
		}).then(function(arr) {
		  return arr.reduce(function(a, b) {
		    return a+b
		  })
		});
	    expect(rows).toEqual(20);
	});
	


});