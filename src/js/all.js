// Homepage Carousel
Vue.component('carousel', {
	template: '#carouselComponent',



	methods: {
		prev: function (event) {
			event.preventDefault();
			console.log("prev success");

		},
		next: function (event) {
			event.preventDefault();
			console.log("next success");
		}

	}
});

new Vue({
	el: '#carousel'
});


$(document).ready(function () {
	var carouselView = (function () {
		var carouselLength = $("#carouselView").find(".item").css("height");
		console.log(carouselLength);
			// $("#carouselView").css("")
	}());

});