// pricematch

$(".select-to-price").click(function () {
				$(this).toggleClass("checked");
				var checkedNum = $(".checked").length;
				switch (checkedNum) {
					case 0:
						$(".select-to-price").css("cursor", "pointer");
						$(this).css("cursor", "pointer")
							.find("i")
							.toggleClass("fa-circle-thin")
							.toggleClass("fa-check-circle");
						$(".select-prompt").removeClass("display-none");
						$(".matched-info").addClass("display-none");
						$(".prod-price-in").remove();
						break;

					case 1:
						$(".select-to-price").css("cursor", "pointer");
						$(this).css("cursor", "pointer")
							.find("i")
							.toggleClass("fa-circle-thin")
							.toggleClass("fa-check-circle");
						var ele = $(this).parents(".price-match").find("td"),
							eleLink = ele.eq(0).find("a").attr("href"),
							eleImg = ele.eq(0).html(),
							eleImgSrc = ele.eq(0).find("img").attr("src"),
							eleRetailer = ele.eq(0).find("img").attr("alt"),
							elePrice = ele.eq(1).text();
						elepriceInfo = "<div data-retailer-name=\"" + eleRetailer + "\" class=\"prod-price-in\">Product price is <b>" + elePrice + "</b> at" + eleImg + "</div>";

						$("#matched-price").text(elePrice);
						$("#high-retailer-link").attr("href", eleLink);
						$("#high-retailer-img").attr("src", eleImgSrc);


						if ($(this).hasClass("checked")) {
							$(elepriceInfo).insertBefore(".print-prompt");
						} else {
							var ele2 = $(".select-to-price.checked").parents(".price-match").find("td"),
								ele2Link = ele2.eq(0).find("a").attr("href"),
								ele2Img = ele2.eq(0).html(),
								ele2ImgSrc = ele2.eq(0).find("img").attr("src"),
								ele2Retailer = ele2.eq(0).find("img").attr("alt"),
								ele2Price = ele2.eq(1).text();

							$("#matched-price").text(ele2Price);
							$("#high-retailer-link").attr("href", ele2Link);
							$("#high-retailer-img").attr("src", ele2ImgSrc);

							for (var i = 0; i <= 1; i++) {
								var remove1 = ele.eq(0).find("img").attr("alt"),
									remove2 = ele.eq(1).find("img").attr("alt");
								if (eleRetailer == $(".prod-price-in").eq(i).data("retailer-name")) {
									$(".prod-price-in[data-retailer-name=" + eleRetailer + "]").remove();
								}
							}
						}
						$(".select-prompt").addClass("display-none");
						$(".matched-info").removeClass("display-none");

						break;

					case 2:
						var ele = $(this).parents(".price-match").find("td"),
							eleLink = ele.eq(0).find("a").attr("href"),
							eleImg = ele.eq(0).html(),
							eleImgSrc = ele.eq(0).find("img").attr("src"),
							eleRetailer = ele.eq(0).find("img").attr("alt"),
							elePrice = ele.eq(1).text();
						elepriceInfo = "<div data-retailer-name=\"" + eleRetailer + "\" class=\"prod-price-in\">Product price is <b>" + elePrice + "</b> at" + eleImg + "</div>";

						// special
						var matching = $(".select-to-price.checked").parents(".price-match"),
							matchingPrice1 = parseFloat(matching.eq(0).find("td").eq(1).find("span").text()),
							matchingPrice2 = parseFloat(matching.eq(1).find("td").eq(1).find("span").text()),
							matchingImgSrc1 = matching.eq(0).find("td").eq(0).find("img").attr("src"),
							matchingImgSrc2 = matching.eq(1).find("td").eq(0).find("img").attr("src"),
							matchingLink1 = matching.eq(0).find("td").eq(0).find("a").attr("href"),
							matchingLink2 = matching.eq(1).find("td").eq(0).find("a").attr("href"),
							matchingRetailer1 = matching.eq(0).find("td").eq(0).find("img").attr("alt"),
							matchingRetailer2 = matching.eq(1).find("td").eq(0).find("img").attr("alt");
						if (matchingPrice1 > matchingPrice2) {

							if (matchingRetailer1 == "bestbuy") {
								$("#matched-price").text("$" + (matchingPrice2 - (matchingPrice1 - matchingPrice2) * 0.1).toFixed(2));
							} else if (matchingRetailer1 == "homedepot") {

								$("#matched-price").text("$" + (matchingPrice2 * 0.9).toFixed(2));
							} else if (matchingRetailer1 == "sears") {
								$("#matched-price").text("$" + (matchingPrice2 * 0.9).toFixed(2));
							} else if (matchingRetailer1 == "visions") {
								$("#matched-price").text("$" + (matchingPrice2 - (matchingPrice1 - matchingPrice2) * 0.15).toFixed(2));
							} else {
								$("#matched-price").text("$" + matchingPrice2);
							}

							$("#high-retailer-link").attr("href", matchingLink1);
							$("#high-retailer-img").attr("src", matchingImgSrc1);


						} else if ((matchingPrice1 < matchingPrice2)) {

							if (matchingRetailer2 == "bestbuy") {
								$("#matched-price").text("$" + (matchingPrice1 - (matchingPrice2 - matchingPrice1) * 0.1).toFixed(2));
							} else if (matchingRetailer2 == "homedepot") {

								$("#matched-price").text("$" + (matchingPrice1 * 0.9).toFixed(2));
							} else if (matchingRetailer2 == "sears") {
								$("#matched-price").text("$" + (matchingPrice1 * 0.9).toFixed(2));
							} else if (matchingRetailer2 == "visions") {
								$("#matched-price").text("$" + (matchingPrice1 - (matchingPrice2 - matchingPrice1) * 0.15).toFixed(2));
							} else {
								$("#matched-price").text("$" + matchingPrice1);
							}

							$("#high-retailer-link").attr("href", matchingLink2);
							$("#high-retailer-img").attr("src", matchingImgSrc2);
						} else {
							$("#matched-price").text(elePrice);
							$("#high-retailer-link").attr("href", eleLink);
							$("#high-retailer-img").attr("src", eleImgSrc);
						}


						$(elepriceInfo).insertBefore(".print-prompt");

						$(".select-to-price:not(.checked)")
							.css("cursor", "not-allowed")
							.removeClass("checked");
						$(".select-to-price").css("cursor", "not-allowed");
						$(".select-to-price.checked").css("cursor", "pointer");
						$(this).find("i")
							.toggleClass("fa-circle-thin")
							.toggleClass("fa-check-circle");

						break;

					default:
						if ($(this).hasClass("checked")) {
							$(this).removeClass("checked");
						}

						$(".select-to-price").css("cursor", "not-allowed");
				}

				
				
});

// print temp
				// $(".result-print").click(function () {
				// 	window.print();
				// });

$(".result-print").click(function () {
	$(".modal-contents .prod-price-in").remove();
	$(".modal-contents h3").text($(".result-prod-right").text());
	$(".prod-price-in").eq(1).clone().prependTo(".modal-contents .col-lg-9");
	$(".prod-price-in").eq(0).clone().prependTo(".modal-contents .col-lg-9");
	$(".modal-matched-price span").text($("#matched-price").text());
	$(".modal-matched-retailer").html("Get Matched Price From " + $("#high-retailer-link").html());
	$(".modal-contents .col-lg-3").html($(".result-prod-img").html());
});


/* @license 
 * jQuery.print, version 1.4.0
 *  (c) Sathvik Ponangi, Doers' Guild
 * Licence: CC-By (http://creativecommons.org/licenses/by/3.0/)
 *--------------------------------------------------------------------------*/
(function ($) {
    "use strict";
    // A nice closure for our definitions
    function getjQueryObject(string) {
        // Make string a vaild jQuery thing
        var jqObj = $("");
        try {
            jqObj = $(string)
                .clone();
        } catch (e) {
            jqObj = $("<span />")
                .html(string);
        }
        return jqObj;
    }

    function printFrame(frameWindow, content, options) {
        // Print the selected window/iframe
        var def = $.Deferred();
        try {
            frameWindow = frameWindow.contentWindow || frameWindow.contentDocument || frameWindow;
            var wdoc = frameWindow.document || frameWindow.contentDocument || frameWindow;
            if(options.doctype) {
                wdoc.write(options.doctype);
            }
            wdoc.write(content);
            wdoc.close();
            setTimeout(function () {
                // Fix for IE : Allow it to render the iframe
                frameWindow.focus();
                try {
                    // Fix for IE11 - printng the whole page instead of the iframe content
                    if (!frameWindow.document.execCommand('print', false, null)) {
                        // document.execCommand returns false if it failed -http://stackoverflow.com/a/21336448/937891
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
                def.resolve();
            }, options.timeout);
        } catch (err) {
            def.reject(err);
        }
        return def;
    }

    function printContentInIFrame(content, options) {
        var $iframe = $(options.iframe + "");
        var iframeCount = $iframe.length;
        if (iframeCount === 0) {
            // Create a new iFrame if none is given
            $iframe = $('<iframe height="0" width="0" border="0" wmode="Opaque"/>')
                .prependTo('body')
                .css({
                    "position": "absolute",
                    "top": -999,
                    "left": -999
                });
        }
        var frameWindow = $iframe.get(0);
        return printFrame(frameWindow, content, options)
            .done(function () {
                // Success
                setTimeout(function () {
                    // Wait for IE
                    if (iframeCount === 0) {
                        // Destroy the iframe if created here
                        $iframe.remove();
                    }
                }, 100);
            })
            .fail(function (err) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", err);
                printContentInNewWindow(content, options);
            })
            .always(function () {
                try {
                    options.deferred.resolve();
                } catch (err) {
                    console.warn('Error notifying deferred', err);
                }
            });
    }

    function printContentInNewWindow(content, options) {
        // Open a new window and print selected content
        var frameWindow = window.open();
        return printFrame(frameWindow, content, options)
            .always(function () {
                try {
                    options.deferred.resolve();
                } catch (err) {
                    console.warn('Error notifying deferred', err);
                }
            });
    }

    function isNode(o) {
        /* http://stackoverflow.com/a/384380/937891 */
        return !!(typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string");
    }
    $.print = $.fn.print = function () {
        // Print a given set of elements
        var options, $this, self = this;
        // console.log("Printing", this, arguments);
        if (self instanceof $) {
            // Get the node if it is a jQuery object
            self = self.get(0);
        }
        if (isNode(self)) {
            // If `this` is a HTML element, i.e. for
            // $(selector).print()
            $this = $(self);
            if (arguments.length > 0) {
                options = arguments[0];
            }
        } else {
            if (arguments.length > 0) {
                // $.print(selector,options)
                $this = $(arguments[0]);
                if (isNode($this[0])) {
                    if (arguments.length > 1) {
                        options = arguments[1];
                    }
                } else {
                    // $.print(options)
                    options = arguments[0];
                    $this = $("html");
                }
            } else {
                // $.print()
                $this = $("html");
            }
        }
        // Default options
        var defaults = {
            globalStyles: true,
            mediaPrint: false,
            stylesheet: null,
            noPrintSelector: ".no-print",
            iframe: true,
            append: null,
            prepend: null,
            manuallyCopyFormValues: true,
            deferred: $.Deferred(),
            timeout: 250,
            title: null,
            doctype: '<!doctype html>'
        };
        // Merge with user-options
        options = $.extend({}, defaults, (options || {}));
        var $styles = $("");
        if (options.globalStyles) {
            // Apply the stlyes from the current sheet to the printed page
            $styles = $("style, link, meta, title");
        } else if (options.mediaPrint) {
            // Apply the media-print stylesheet
            $styles = $("link[media=print]");
        }
        if (options.stylesheet) {
            // Add a custom stylesheet if given
            $styles = $.merge($styles, $('<link rel="stylesheet" href="' + options.stylesheet + '">'));
        }
        // Create a copy of the element to print
        var copy = $this.clone();
        // Wrap it in a span to get the HTML markup string
        copy = $("<span/>")
            .append(copy);
        // Remove unwanted elements
        copy.find(options.noPrintSelector)
            .remove();
        // Add in the styles
        copy.append($styles.clone());
        // Update title
        if (options.title) {
            var title = $("title", copy);
            if (title.length === 0) {
                title = $("<title />");
                copy.append(title);                
            }
            title.text(options.title);            
        }
        // Appedned content
        copy.append(getjQueryObject(options.append));
        // Prepended content
        copy.prepend(getjQueryObject(options.prepend));
        if (options.manuallyCopyFormValues) {
            // Manually copy form values into the HTML for printing user-modified input fields
            // http://stackoverflow.com/a/26707753
            copy.find("input")
                .each(function () {
                    var $field = $(this);
                    if ($field.is("[type='radio']") || $field.is("[type='checkbox']")) {
                        if ($field.prop("checked")) {
                            $field.attr("checked", "checked");
                        }
                    } else {
                        $field.attr("value", $field.val());
                    }
                });
            copy.find("select").each(function () {
                var $field = $(this);
                $field.find(":selected").attr("selected", "selected");
            });
            copy.find("textarea").each(function () {
                // Fix for https://github.com/DoersGuild/jQuery.print/issues/18#issuecomment-96451589
                var $field = $(this);
                $field.text($field.val());
            });
        }
        // Get the HTML markup string
        var content = copy.html();
        // Notify with generated markup & cloned elements - useful for logging, etc
        try {
            options.deferred.notify('generated_markup', content, copy);
        } catch (err) {
            console.warn('Error notifying deferred', err);
        }
        // Destroy the copy
        copy.remove();
        if (options.iframe) {
            // Use an iframe for printing
            try {
                printContentInIFrame(content, options);
            } catch (e) {
                // Use the pop-up method if iframe fails for some reason
                console.error("Failed to print from iframe", e.stack, e.message);
                printContentInNewWindow(content, options);
            }
        } else {
            // Use a new window for printing
            printContentInNewWindow(content, options);
        }
        return this;
    };
})(jQuery);

$("#printable").find('.print').on('click', function() {
$.print("#printable");
});