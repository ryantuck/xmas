angular.module('PresentService',[]).factory('Present', function() {

	// constructor for present
	function Present(title) {
		this.title = title;
		this.notes = null;
		this.link = null;
	}

	return Present;
});