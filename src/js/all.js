// Homepage Carousel

$(document).ready(function () {
	var sliderNum = $(".item").length;
	var cloneBoxA = [];
	var cloneBoxP = [];
	var carouselComponentWidth = $("#carousel").innerWidth();
	var carouselViewInit = (function () {
		for (var i = 0; i < sliderNum - 1; i++) {
			cloneBoxA[i] = $(".item").eq(i)
				.clone()
				.addClass("itemCloned");
		}
		for (var i = sliderNum - 1; i > 0; i--) {
			cloneBoxP[i] = $(".item").eq(i)
				.clone()
				.addClass("itemCloned");
		}
		$("#carouselView").prepend(cloneBoxP);
		$("#carouselView").append(cloneBoxA);

		sliderNum = $(".item").length;
		carouselComponentWidth = carouselComponentWidth * 0.6;
		var carouselBoxWidth = carouselComponentWidth * sliderNum;
		var translateWidth = carouselComponentWidth * 2.7;

		$("#carouselView").css({
			"width": carouselBoxWidth + "px",
			"transform": "translateX(-" + translateWidth + "px)",
		});

		$(".item").css({
			"width": carouselComponentWidth + "px"
		});

	} ());

	var defaultX = carouselComponentWidth * 3.7;

});

var carouselProp = {
	counter: 0,
	times: 1,
	counterWidth: -534,
	defaultWidth: -1441.8
};

Vue.component('carousel', {
	template: '#carouselComponent',
});

new Vue({
	el: '#carousel',

	methods: {
		prev: function (e) {
			e.preventDefault();

			if (carouselProp.counter === 0) {
				carouselProp.defaultWidth = -1441.8;
				carouselProp.times = 1;
				$("#carouselView").css({
					"transform": "translateX(" + (carouselProp.defaultWidth - (carouselProp.counterWidth * carouselProp.times)) + "px)",
					"transition": ".6s all ease-in",
				});

				setTimeout(function () {
					$("#carouselView").css({
						"transform": "translateX(-3043.8px)",
						"transition": "none"
					});
					carouselProp.counter = 3;
				}, 700);
			} else {
				carouselProp.defaultWidth = -3043.8;
				$("#carouselView").css({
					"transform": "translateX(" + (carouselProp.defaultWidth - (carouselProp.counterWidth * carouselProp.times)) + "px)",
					"transition": ".6s all ease-in",
				});
				carouselProp.counter--;
				carouselProp.times++;

			}
		},
		next: function (e) {
			e.preventDefault();
			$("#carouselView").css({
				"transform": "translateX(-" + (defaultX + (carouselComponentWidth * carouselProp.counter)) + "px)",
				"transition": ".6s all ease-in",
			});
			counter--;
		},
	}
});