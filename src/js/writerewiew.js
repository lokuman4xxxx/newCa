$("#write-review-btn").click(function () {
	$("#review-form-container").slideDown().addClass("open");
});

function monthFormatter(m) {
	switch (m) {
		case 0:
			m = "Jan";
			break;

		case 1:
			m = "Feb";
			break;

		case 2:
			m = "Mar";
			break;

		case 3:
			m = "Api";
			break;

		case 4:
			m = "May";
			break;

		case 5:
			m = "Jun";
			break;

		case 6:
			m = "Jul";
			break;

		case 7:
			m = "Aug";
			break;

		case 8:
			m = "Sep";
			break;

		case 9:
			m = "Oct";
			break;

		case 10:
			m = "Nov";
			break;

		case 11:
			m = "Dec";
			break;
	}

	return m;
}

$("#review-submit").click(function (e) {
	if ($("#review-title").val().length > 0 && $("#review-name").val().length > 0 && $("#review-comment").val().length > 0) {
		$("#review-submit").css("cursor", "pointer");
		e.preventDefault();
		var reviewTitle = $("#review-title").val(),
			reviewName = $("#review-name").val(),
			reviewRating = $("#input-write").val(),
			reviewPercentage = Math.round(reviewRating / 5 * 100),
			reviewDate = new Date(),
			reviewMonth = reviewDate.getMonth(),
			reviewDate = monthFormatter(reviewMonth) + "." + reviewDate.getDate() + " - " + reviewDate.getFullYear(),
			reviewComment = $("#review-comment").val();

		$.ajax({
			type: 'POST',
			data: {
				title: reviewTitle,
				name: reviewName,
				mark: reviewRating,
				comments: reviewComment,
			},
			url: 'system/_commentSave.ohtml',
			success: function (msg) {
				$(".review-content").prepend('<div class="col-lg-12 customer-row">' +
					'<div class="col-lg-2 customer-row-left"><b>' + reviewName + '</b>' +
					'<br><span>' + reviewDate + '</span>' +
					'<br>' +
					'<div class="rating-container theme-krajee-fa rating-md rating-animate rating-disabled">' +
					'<div class="rating"><span class="empty-stars"><span class="star"><i class="glyphicon glyphicon-star-empty"></i></span><span class="star"><i class="glyphicon glyphicon-star-empty"></i></span><span class="star"><i class="glyphicon glyphicon-star-empty"></i></span><span class="star"><i class="glyphicon glyphicon-star-empty"></i></span><span class="star"><i class="glyphicon glyphicon-star-empty"></i></span></span><span class="filled-stars" style="width:' + reviewPercentage + '%;"><span class="star"><i class="glyphicon glyphicon-star"></i></span><span class="star"><i class="glyphicon glyphicon-star"></i></span><span class="star"><i class="glyphicon glyphicon-star"></i></span><span class="star"><i class="glyphicon glyphicon-star"></i></span><span class="star"><i class="glyphicon glyphicon-star"></i></span></span>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'<div class="col-lg-10 customer-row-right"><b>' + reviewTitle + '</b>' +
					'<p>' + reviewComment + '</p>' +
					'</div>' +
					'</div>');
				$("#review-form-container").removeClass("open");
			}
		});
	} else {
		$("#review-submit").css("cursor", "not-allowed");
	}
});

$("#review-cancel").click(function (e) {
	e.preventDefault();
	$("#review-form-container").removeClass("open");
});