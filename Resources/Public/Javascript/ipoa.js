jQuery(function() {

	'use strict';

	/**
	 * carousel related code
	 */
	var carousel = function(id) {
		var arr = jQuery('#' + id).find('li');
		jQuery(arr).hide();
		jQuery(arr[0]).show();

		(function recurse(counter) {
			var item = arr[counter];
			delete arr[counter];
			arr.push(item);
			setTimeout(function() {
				jQuery('#' + id).find('li').hide();
				recurse(counter + 1);
				jQuery(item).show();
			}, 2500);
		})(0);

	};

	/**
	 * Language menu
	 * at first, it is hidden,
	 * but when the "language-indicator" is clicked,
	 * it is shown and the "language-indicator" is hidden
	 * This menu exists twice:
	 * - once in the header of content pages
	 * - once on the start screen
	 */
	var languageMenuShow = function(place) {
		jQuery('.js-' + place + '-language-links').hide();
		var jsLanguageIndicator = jQuery('.js-' + place + '-language-indicator');

		jsLanguageIndicator.click(function() {
			jQuery('.js-' + place + '-language-links').show();
			var langHeight = jQuery('.' + place + '__links').height();
			jQuery('.' + place).css({'padding-top': langHeight});
			jsLanguageIndicator.hide();
		});

	};

	/**
	 * move the menu of the canvas
	 */
	var hideMenu = function() {
		jQuery('.alt-menu').css({
			                        'transform': 'translateX(-100%)',
			                        '-webkit-transform': 'translateX(-100%)',
			                        '-ms-transform': 'translateX(-100%)',
			                        'transition': 'all .25s ease-in-out',
			                        '-webkit-transition': 'all .25s ease-in-out',
			                        '-ms-transition': 'all .25s ease-in-out'
		                        });
	};

	/**
	 * helper function
	 * @returns {boolean}
	 */
	var menuIsActive = function() {

		if (jQuery('.menu__button').hasClass('js-active')) {
			return true;

		} else {
			return false;
		}

	};

	/**
	 *
	 * @param item
	 */
	var menuToggleChildren = function(item) {
		jQuery(item).siblings('.menu__list--indented').toggle();

		if (jQuery(item).find('svg').attr('class') === 'fa-icon fa-icon-angle-double-down') {
			jQuery(item).find('svg').attr('class', 'fa-icon fa-icon-angle-double-right');
			jQuery(item).find('svg').html('<use xlink:href="#icon-angle-double-right"></use>');

		} else {
			jQuery(item).find('svg').attr('class', 'fa-icon fa-icon-angle-double-down');
			jQuery(item).find('svg').html('<use xlink:href="#icon-angle-double-down"></use>');
		}

	};

	/**
	 * move the menu from off canvas into viewport
	 */
	var showMenu = function() {
		// move the menu from off canvas into viewport
		jQuery('.alt-menu').css({
			                        'transform': 'translateX(0%)',
			                        '-webkit-transform': 'translateX(0%)',
			                        '-ms-transform': 'translateX(0%)',
			                        'transition': 'all .25s ease-in-out',
			                        '-webkit-transition': 'all .25s ease-in-out',
			                        '-ms-transition': 'all .25s ease-in-out'
		                        });
	};

	/**
	 * handle ajax requests
	 */
	var menuData;
	var getAjax = (function() {
		var createURL = function() {
			var url = window.location.protocol + '//';
			url += window.location.hostname;
			var pathname = window.location.pathname;
			url += pathname;
			url += '?type=37902';
			return url;
		};
		var getData = function(url) {
			var fillDocs = function(data) {
				menuData = data;
			};
			return jQuery.ajax(url).done(function(data) {
				fillDocs(data);
			});
		};
		return {
			'createURL': createURL,
			'getData': getData
		};
	})();

	/**
	 * Style the menu so that it is still readable, but hidden
	 */
	var styleMenu = function() {

		// put the menu off canvas to the left
		jQuery('.alt-menu').addClass('alt-menu--off-canvas');
		// removes the no js option of columns side by side
		// TODO: cache jQuery('.menu__column') lookup
		jQuery('.menu__column').removeClass('ic-tablet-one-half');
		jQuery('.menu__column').removeClass('ic-notebook-and-up-one-quarter');

		jQuery('.menu__column').css({'padding-right': '24px',});
	};

	/**
	 * handle show and hide of menu
	 *
	 * remove classes
	 */
	jQuery('.footer-hide__helper').click(function(event) {

		if (menuIsActive()) {
			var classNameOfClickedElement = jQuery(event.target)
					.attr('class')
					.split(' ')[0];

			if (classNameOfClickedElement !== 'menu__button') {
				jQuery('.menu__button')
						.removeClass('js-active js-alt-menu-toggle-button--active');
				hideMenu();
			}

			event.preventDefault();
		}
	});

	/**
	 * hide all sub menu lists except for the current one
	 * for no-js fallback cases they are open by default, so we have to explicitly
	 * close them
	 */
	jQuery('.alt-menu .menu__list--indented').hide();
	jQuery('.fa-icon-angle-double-down')
			.parent('span')
			.siblings('.menu__list--indented').show();


	/**
	 * every arrow-icon in the menu gets to toggle the respective submenu
	 */
	jQuery('.toggle-menu').click(function() {
		menuToggleChildren(this);
	});

	/**
	 *
	 */
	var menu = jQuery('.js-menu');
	var menuToggleButton = jQuery('.js-menu-toggle-button');

	jQuery(menuToggleButton).click(function(event) {

		if (menuToggleButton.hasClass('js-active')) {
			// TODO: cache jQuery('html, body') lookup
			jQuery('html,body').animate({'scrollTop': 0}, 500);
			jQuery(menuToggleButton).removeClass('js-active');
			jQuery(menu).slideUp();

		} else {
			// TODO: use cached jQuery('html, body') lookup if possible
			jQuery('html,body').animate({'scrollTop': 0}, 500);
			jQuery(menuToggleButton).addClass('js-active');
			jQuery(menu).slideDown();
		}

		event.preventDefault();
	});


	/**
	 * There are two language menus on the web page
	 * - on startpage and
	 * - on all other pages in the head
	 */
	languageMenuShow('head');
	languageMenuShow('start');

	/**
	 * handle on demand content on pages like those for the oa days
	 */
	jQuery('.on-demand__content').hide();
	jQuery('.on-demand__link').click(function() {
		jQuery(this)
				.parent()
				.nextAll('.on-demand__content')
				.first()
				.toggle('slow');
	});

	/**
	 *
	 */
	var altMenu = jQuery('.alt-menu');
	var altMenuToggleButton = jQuery('.js-alt-menu-toggle-button');
	var windowWidth = jQuery(window).width();

	/* full viewport overlay when <768px width */
	if (windowWidth <= 767) {
		jQuery(altMenu).css({'display': 'none'});
		// when menu button receives click the menu will overlay everything and show
		// an scrollable menu. Exit the menu by clicking a menu item.
		jQuery(altMenuToggleButton).click(function() {
			jQuery(altMenu).css({'display': 'block'});
			jQuery('.head-nav').hide();
			// TODO: use cached jQuery('.footer-hide__helper') lookup if possible
			jQuery('.footer-hide__helper').css({
				                                   'margin-left': '100%',
				                                   'position': 'fixed'
			                                   });
			jQuery('.footer-hide').css({
				                           'margin-left': '100%',
				                           'position': 'fixed'
			                           });
		});

		/* off canvas to the left when >=768px */
	} else {
		styleMenu();

		jQuery(altMenuToggleButton).click(function() {

			// what to do when menu button gets clicked and menu is already visible
			if (altMenuToggleButton.hasClass('js-alt-menu-toggle-button--active')) {
				// remove the '--active' modifier from the menu button
				altMenuToggleButton.removeClass('js-alt-menu-toggle-button--active');
				hideMenu();

				// what to do when menu button gets clicked and menu is not yet visible
			} else {
				// add '--active' modifier to the menu button
				altMenuToggleButton.addClass('js-alt-menu-toggle-button--active');
				showMenu();
				// make the menu content fill the whole left side (top to bottom)
				// and let its content scroll
				jQuery('.alt-menu__content').css({
					                                 'overflow': 'scroll',
					                                 'height': '100%',
					                                 'min-height': '100%'
				                                 });
				// set keyboard focus to second link in menu
				jQuery('.alt-menu__close-button').focus();
				// set tabindex of menu items to be able to navigate them via keyboard
				// TODO: cache jQuery('.alt-menu') lookup
				// TODO: use "jQuery('.alt-menu a')" instead of "...find('a')" if possible
				jQuery('.alt-menu').find('a').attr('tabindex', '99');
				// TODO: use "jQuery('.alt-menu .toggle-menu')" +
				// instead of "...find('.toggle-menu')" if possible
				jQuery('.alt-menu').find('.toggle-menu').attr('tabindex', '99');
			}
		});
	}

	/**
	 * detect keyboard /clicks/ on menu toggle buttons (those tiny double arrows/
	 * angles in front of menu items)
	 * keycode 13 = return/enter key
	 */
	jQuery('.toggle-menu').focus().keydown(function(event) {

		if (event.keyCode == 13) {
			menuToggleChildren(this);
		}

	});

	/**
	 * change the top menu bar according to scroll status
	 */
	jQuery(function() {
		var lastScrollTop = 0, delta = 5;

		jQuery(window).scroll(function() {
			var st = jQuery(this).scrollTop();

			if (Math.abs(lastScrollTop - st) <= delta) {
				return;
			}

			// downscroll code
			if (st > lastScrollTop) {
				jQuery('.js-head-language-links').hide();
				jQuery('.js-head-language-indicator').show();
				jQuery('.head-nav').addClass('head-nav--narrow');
				jQuery('.head').removeAttr('style');
			}

			if (jQuery(this).scrollTop() < 10) {
				jQuery('.head-nav').removeClass('head-nav--narrow');
			}

			lastScrollTop = st;
		});
	});

	/**
	 * put carousel related code to use
	 */
	jQuery.each(jQuery('.logocarousel'), function() {
		carousel(jQuery(this).attr('id'));
	});

	/**
	 * footerHide
	 */
	var footerHideHeight = jQuery('.footer-hide__content').height();

	// TODO: cache jQuery('.footer-hide') lookup
	jQuery('.footer-hide').css({'height': footerHideHeight + 'px'});

	/**
	 * recalculate (and set the new) footer height with every window resize
	 */
	jQuery(window).resize(function() {
		// TODO: use cached jQuery('.footer-hide__content') lookup if possible
		footerHideHeight = jQuery('.footer-hide__content').height();
		jQuery('.footer-hide').css({'height': footerHideHeight + 'px'});
	});

	/**
	 * Prevent the logocarousel to change it's height
	 * Find the logocarousel, get it's ID, get the max height of the images
	 * and set the height of the logocarousel accordingly
	 */
	var logoIds = jQuery('.logocarousel');
	logoIds.each(function() {
		var logoHeight = 0;

		jQuery(this).find('img').each(function() {

			if (this.height > logoHeight) {
				logoHeight = this.height;
			}

		});

		jQuery(this).css('height', logoHeight);
	});

	/**
	 * this part allows for in-page anchor clicks that move the scroll position
	 * without wrongly covering the content by the top nav bar.
	 *
	 * 1. TODO : make dirty number clean
	 */
	jQuery('.main div a').click(function() {
		var scrollToId = this.hash;
		var offsetTopOfTarget = jQuery(scrollToId).offset().top;
		jQuery('html, body').scrollTop(offsetTopOfTarget - 65);
		// 1.
	});

	/**
	 * The close-function of the menu
	 * It is not only tied to the "close"-Button, but also to the search-button of
	 * the special button for very small viewports which resides in the nav-partial.
	 * Because in case of search, there is no new pageload
	 */
	jQuery('.alt-menu__close-button').add('.js-nav-search-button').click(function() {
		altMenuToggleButton.removeClass('js-alt-menu-toggle-button--active');

		if (windowWidth <= 767) {
			jQuery(altMenu).css({'display': 'none'});
			// TODO: use cached jQuery('.head-nav') lookup if possible
			jQuery('.head-nav').show();
			// TODO: use cached jQuery('.footer-hide__helper') lookup if possible
			jQuery('.footer-hide__helper').css({
				                                   'margin-left': '0%',
				                                   'position': 'relative'
			                                   });
			// TODO: use cached jQuery('.footer-hide') lookup if possible
			jQuery('.footer-hide').css({
				                           'margin-left': '0%',
				                           'position': 'relative'
			                           });

		} else {
			hideMenu();
		}

	});
	/**
	 * add menu per ajax
	 */
	var url = getAjax.createURL();
	jQuery.when(getAjax.getData(url)).then(function() {
		jQuery('.ajaxMenu').html(menuData);
		styleMenu();
	});

});
