jQuery(function() {

  /**
   * carousel related code
   */
  const carousel = function(id) {
    const arr = jQuery('#' + id).find('li');
    jQuery(arr).hide();
    jQuery(arr[0]).show();

    (function recurse(counter) {
      const item = arr[counter];
      Reflect.deleteProperty(arr[counter]);
      arr.push(item);
      setTimeout(function() {
        jQuery('#' + id).find('li').hide();
        recurse(counter + 1);
        jQuery(item).show();
      }, 2500);
    })(0);

  };

  /**
   * put carousel related code to use
   */
  jQuery.each(jQuery('.logocarousel'), function() {
    carousel(jQuery(this).attr('id'));
  });

  /**
   * Prevent the logocarousel to change it's height
   * Find the logocarousel, get it's ID, get the max height of the images
   * and set the height of the logocarousel accordingly
   */
  const getLogoHeight = () => {
    let logoHeight = 100;

    jQuery(this).find('img').each(function() {
      if (this.height > logoHeight) {
        logoHeight = this.height;
      }
    });
    jQuery(this).css('height', logoHeight);

    return logoHeight;
  };
  getLogoHeight();


  /**
   * Calculate height of footer
   * to determine how much the rest of the content has to slide up
   * There has to be set up a min-height, because otherwise, in very wide screens
   * the headers would not be visible after reload
   */
  let footerHideHeight = jQuery('.footer-hide__content').height();
  let footerHideMinHeight = getLogoHeight() + 20;
  footerHideMinHeight += jQuery('.tracking').height();
  footerHideMinHeight += jQuery('.footer__column > h3').height();
  jQuery('.footer-hide').css({'height': footerHideHeight + 'px'});
  jQuery('.footer-hide').css({'min-height': footerHideMinHeight + 'px'});
  /**
   * recalculate (and set the new) footer height with every window resize
   */
  jQuery(window).resize(function() {
    footerHideHeight = jQuery('.footer-hide__content').height();
    jQuery('.footer-hide').css({'height': footerHideHeight + 'px'});
  });
  jQuery(window).on('load', function() {
    footerHideHeight = jQuery('.footer-hide__content').height();
    jQuery('.footer-hide').css({'height': footerHideHeight + 'px'});
  });


  /**
   * this part allows for in-page anchor clicks that move the scroll position
   * without wrongly covering the content by the top nav bar.
   *
   * 1. TODO : make dirty number clean
   */
  jQuery('.main div a').click(function() {
    const scrollToId = this.hash;
    const offsetTopOfTarget = jQuery(scrollToId).offset().top;
    jQuery('html, body').scrollTop(offsetTopOfTarget - 65);
    // 1.
  });


  /**
   * change the top menu bar according to scroll status
   */
  jQuery(function () {
    let lastScrollTop = 0;
    const delta = 5;

    jQuery(window).scroll(function () {
      const st = jQuery(this).scrollTop();

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


});

jQuery(function () {


  /**
   * Language menu
   * at first, it is hidden, but when the "language-indicator" is clicked,
   * it is shown and the "language-indicator" is hidden
   * This menu exists twice:
   * - once in the header of content pages
   * - once on the start screen
   */
  const languageMenuShow = function (place) {
    jQuery('.js-' + place + '-language-links').hide();
    const jsLanguageIndicator = jQuery('.js-' + place + '-language-indicator');

    jsLanguageIndicator.click(function () {
      jQuery('.js-' + place + '-language-links').show();
      const langHeight = jQuery('.' + place + '__links').height();
      jQuery('.' + place).css({'padding-top': langHeight});
      jsLanguageIndicator.hide();
    });

  };


  /**
   * There are two language menus on the web page
   * - on startpage and
   * - on all other pages in the head
   */
  languageMenuShow('head');
  languageMenuShow('start');


});

jQuery(function () {

  /**
   * create URL for ajax requests
   */
  const createURLForAjax = function () {
    let url = window.location.protocol + '//';
    url += window.location.hostname;
    if (window.location.port !== '') {
      url += ':' + window.location.port;
    }
    url += window.location.pathname;
    url += '?type=37902';
    return url;
  };

  /**
   * move the menu of the canvas
   */
  const hideMenu = function () {
    jQuery('.alt-menu').css({
      'transform': 'translateX(-100%)',
      '-webkit-transform': 'translateX(-100%)',
      '-ms-transform': 'translateX(-100%)',
      'transition': 'all .25s ease-in-out',
      '-webkit-transition': 'all .25s ease-in-out',
      '-ms-transition': 'all .25s ease-in-out'
    });
  };

  const menuIsActive = function () {

    if (jQuery('.menu__button').hasClass('js-active')) {
      return true;
    }
    return false;
  };

  const menuToggleChildren = function (item) {
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
   * Style the menu so that it is still readable, but hidden
   */
  const putMenuOffScreen = function () {
    // put the menu off canvas to the left
    jQuery('.alt-menu').addClass('alt-menu--off-canvas');
    // removes the no js option of columns side by side
    // TODO: cache jQuery('.menu__column') lookup
    jQuery('.menu__column').removeClass('ic-tablet-one-half');
    jQuery('.menu__column').removeClass('ic-notebook-and-up-one-quarter');
    jQuery('.menu__column').css({'padding-right': '24px'});
  };

  /**
   * handle show and hide of menu and remove classes
   */
  jQuery('.footer-hide__helper').click(function (event) {

    if (menuIsActive()) {
      const classNamesOfClickedElement = event.target.attr('class');

      if (classNamesOfClickedElement.split(' ')[0] !== 'menu__button') {
        jQuery('.menu__button')
          .removeClass('js-active js-alt-menu-toggle-button--active');
        hideMenu();
      }
      event.preventDefault();
    }
  });

  /**
   * handle on demand content on pages like those for the oa days
   */
  jQuery('.on-demand__content').hide();
  jQuery('.on-demand__link').click(function () {
    jQuery(this)
      .parent()
      .nextAll('.on-demand__content')
      .first()
      .toggle('slow');
  });

  /**
   * Configuration of the alternative menu for small viewports
   */
  const altMenu = jQuery('.alt-menu');
  const altMenuToggleButton = jQuery('.js-alt-menu-toggle-button');
  const windowWidth = jQuery(window).width();

  /**
   * move the menu from off canvas into viewport
   */
  const showMenu = function () {
    // move the menu from off canvas into viewport
    jQuery('.alt-menu').css({
      'transform': 'translateX(0%)',
      '-webkit-transform': 'translateX(0%)',
      '-ms-transform': 'translateX(0%)',
      'transition': 'all .25s ease-in-out',
      '-webkit-transition': 'all .25s ease-in-out',
      '-ms-transition': 'all .25s ease-in-out'
    });

    /**
     * add menu per ajax
     * load answer of ajax-page directly into the element,
     * then execute function
     */
    const url = createURLForAjax();

    // show spinner as long as there is no menu
    let spHTML = '<svg class="fa fa-spinner fa-pulse">';
    spHTML += '<use xlink:href="#spinner"></use></svg>';
    jQuery('.ajax-menu').html(spHTML);
    // load menu per ajax
    jQuery('.ajax-menu').load(url, function (response, status) {
      if (status === 'success') {
        if (windowWidth > 767) {
          putMenuOffScreen();
        }

        // Add svg instances to svg tag as it can't be done from typoscript,
        // because the menu is created with a different typeNum without javascript on
        jQuery('.toggle-menu').find('.fa-icon-angle-double-right')
          .html('<use xlink:href="#icon-angle-double-right"></use>');
        jQuery('.toggle-menu').find('.fa-icon-angle-double-down')
          .html('<use xlink:href="#icon-angle-double-down"></use>');

        // Now, that the DOM-Elements are available, their behaviour can be configured:

        // Configure toggle-icons (the arrows left of menu items)
        // every arrow-icon in the menu gets to toggle the respective submenu
        jQuery('.toggle-menu').click(function () {
          menuToggleChildren(this);
        });

        // detect keyboard /clicks/ on menu toggle buttons
        // keycode 13 = return/enter key
        jQuery('.toggle-menu').focus().keydown(function (event) {
          if (event.keyCode === 13) {
            menuToggleChildren(this);
          }
        });

        // when arrow is clicked, move menu up or down
        const menu = jQuery('.js-menu');
        const menuToggleButton = jQuery('.js-menu-toggle-button');

        jQuery(menuToggleButton).click(function (event) {
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

        // hide all sub menu lists except for the current one
        // for no-js fallback cases they are open by default, so we have to explicitly
        // close them
        jQuery('.alt-menu .menu__list--indented').hide();
        jQuery('.fa-icon-angle-double-down')
          .parent('span')
          .siblings('.menu__list--indented').show();
      }
    });
  };

  // full viewport overlay when <768px width
  if (windowWidth <= 767) {
    jQuery(altMenu).css({'display': 'none'});
    // when menu button receives click the menu will overlay everything an show
    // an scrollable menu. Exit the menu by clicking a menu item.
    jQuery(altMenuToggleButton).click(function () {
      jQuery(altMenu).css({'display': 'block'});
      jQuery('.head-nav').hide();
      jQuery('.footer-hide__helper').css({
        'margin-left': '100%',
        'position': 'fixed'
      });
      jQuery('.footer-hide').css({
        'margin-left': '100%',
        'position': 'fixed'
      });
    });

    // off canvas to the left when >=768px
  } else {
    putMenuOffScreen();

    jQuery(altMenuToggleButton).click(function () {

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
   * The close-function of the menu
   * It is not only tied to the "close"-Button, but also to the search-button of
   * the special button for very small viewports which resides in the nav-partial.
   * Because in case of search, there is no new pageload
   */
  const altMenuCloseButton = jQuery('.alt-menu__close-button');
  altMenuCloseButton.add('.js-nav-search-button');
  altMenuCloseButton.click(function () {
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
      hideMenu();
    } else {
      hideMenu();
    }
  });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlwb2EuanMiLCJsYW5ndWFnZW1lbnUuanMiLCJtZW51LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaXBvYS5qcyIsInNvdXJjZXNDb250ZW50IjpbImpRdWVyeShmdW5jdGlvbigpIHtcblxuICAvKipcbiAgICogY2Fyb3VzZWwgcmVsYXRlZCBjb2RlXG4gICAqL1xuICBjb25zdCBjYXJvdXNlbCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgY29uc3QgYXJyID0galF1ZXJ5KCcjJyArIGlkKS5maW5kKCdsaScpO1xuICAgIGpRdWVyeShhcnIpLmhpZGUoKTtcbiAgICBqUXVlcnkoYXJyWzBdKS5zaG93KCk7XG5cbiAgICAoZnVuY3Rpb24gcmVjdXJzZShjb3VudGVyKSB7XG4gICAgICBjb25zdCBpdGVtID0gYXJyW2NvdW50ZXJdO1xuICAgICAgUmVmbGVjdC5kZWxldGVQcm9wZXJ0eShhcnJbY291bnRlcl0pO1xuICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBqUXVlcnkoJyMnICsgaWQpLmZpbmQoJ2xpJykuaGlkZSgpO1xuICAgICAgICByZWN1cnNlKGNvdW50ZXIgKyAxKTtcbiAgICAgICAgalF1ZXJ5KGl0ZW0pLnNob3coKTtcbiAgICAgIH0sIDI1MDApO1xuICAgIH0pKDApO1xuXG4gIH07XG5cbiAgLyoqXG4gICAqIHB1dCBjYXJvdXNlbCByZWxhdGVkIGNvZGUgdG8gdXNlXG4gICAqL1xuICBqUXVlcnkuZWFjaChqUXVlcnkoJy5sb2dvY2Fyb3VzZWwnKSwgZnVuY3Rpb24oKSB7XG4gICAgY2Fyb3VzZWwoalF1ZXJ5KHRoaXMpLmF0dHIoJ2lkJykpO1xuICB9KTtcblxuICAvKipcbiAgICogUHJldmVudCB0aGUgbG9nb2Nhcm91c2VsIHRvIGNoYW5nZSBpdCdzIGhlaWdodFxuICAgKiBGaW5kIHRoZSBsb2dvY2Fyb3VzZWwsIGdldCBpdCdzIElELCBnZXQgdGhlIG1heCBoZWlnaHQgb2YgdGhlIGltYWdlc1xuICAgKiBhbmQgc2V0IHRoZSBoZWlnaHQgb2YgdGhlIGxvZ29jYXJvdXNlbCBhY2NvcmRpbmdseVxuICAgKi9cbiAgY29uc3QgZ2V0TG9nb0hlaWdodCA9ICgpID0+IHtcbiAgICBsZXQgbG9nb0hlaWdodCA9IDEwMDtcblxuICAgIGpRdWVyeSh0aGlzKS5maW5kKCdpbWcnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaGVpZ2h0ID4gbG9nb0hlaWdodCkge1xuICAgICAgICBsb2dvSGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgalF1ZXJ5KHRoaXMpLmNzcygnaGVpZ2h0JywgbG9nb0hlaWdodCk7XG5cbiAgICByZXR1cm4gbG9nb0hlaWdodDtcbiAgfTtcbiAgZ2V0TG9nb0hlaWdodCgpO1xuXG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBoZWlnaHQgb2YgZm9vdGVyXG4gICAqIHRvIGRldGVybWluZSBob3cgbXVjaCB0aGUgcmVzdCBvZiB0aGUgY29udGVudCBoYXMgdG8gc2xpZGUgdXBcbiAgICogVGhlcmUgaGFzIHRvIGJlIHNldCB1cCBhIG1pbi1oZWlnaHQsIGJlY2F1c2Ugb3RoZXJ3aXNlLCBpbiB2ZXJ5IHdpZGUgc2NyZWVuc1xuICAgKiB0aGUgaGVhZGVycyB3b3VsZCBub3QgYmUgdmlzaWJsZSBhZnRlciByZWxvYWRcbiAgICovXG4gIGxldCBmb290ZXJIaWRlSGVpZ2h0ID0galF1ZXJ5KCcuZm9vdGVyLWhpZGVfX2NvbnRlbnQnKS5oZWlnaHQoKTtcbiAgbGV0IGZvb3RlckhpZGVNaW5IZWlnaHQgPSBnZXRMb2dvSGVpZ2h0KCkgKyAyMDtcbiAgZm9vdGVySGlkZU1pbkhlaWdodCArPSBqUXVlcnkoJy50cmFja2luZycpLmhlaWdodCgpO1xuICBmb290ZXJIaWRlTWluSGVpZ2h0ICs9IGpRdWVyeSgnLmZvb3Rlcl9fY29sdW1uID4gaDMnKS5oZWlnaHQoKTtcbiAgalF1ZXJ5KCcuZm9vdGVyLWhpZGUnKS5jc3MoeydoZWlnaHQnOiBmb290ZXJIaWRlSGVpZ2h0ICsgJ3B4J30pO1xuICBqUXVlcnkoJy5mb290ZXItaGlkZScpLmNzcyh7J21pbi1oZWlnaHQnOiBmb290ZXJIaWRlTWluSGVpZ2h0ICsgJ3B4J30pO1xuICAvKipcbiAgICogcmVjYWxjdWxhdGUgKGFuZCBzZXQgdGhlIG5ldykgZm9vdGVyIGhlaWdodCB3aXRoIGV2ZXJ5IHdpbmRvdyByZXNpemVcbiAgICovXG4gIGpRdWVyeSh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICBmb290ZXJIaWRlSGVpZ2h0ID0galF1ZXJ5KCcuZm9vdGVyLWhpZGVfX2NvbnRlbnQnKS5oZWlnaHQoKTtcbiAgICBqUXVlcnkoJy5mb290ZXItaGlkZScpLmNzcyh7J2hlaWdodCc6IGZvb3RlckhpZGVIZWlnaHQgKyAncHgnfSk7XG4gIH0pO1xuICBqUXVlcnkod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIGZvb3RlckhpZGVIZWlnaHQgPSBqUXVlcnkoJy5mb290ZXItaGlkZV9fY29udGVudCcpLmhlaWdodCgpO1xuICAgIGpRdWVyeSgnLmZvb3Rlci1oaWRlJykuY3NzKHsnaGVpZ2h0JzogZm9vdGVySGlkZUhlaWdodCArICdweCd9KTtcbiAgfSk7XG5cblxuICAvKipcbiAgICogdGhpcyBwYXJ0IGFsbG93cyBmb3IgaW4tcGFnZSBhbmNob3IgY2xpY2tzIHRoYXQgbW92ZSB0aGUgc2Nyb2xsIHBvc2l0aW9uXG4gICAqIHdpdGhvdXQgd3JvbmdseSBjb3ZlcmluZyB0aGUgY29udGVudCBieSB0aGUgdG9wIG5hdiBiYXIuXG4gICAqXG4gICAqIDEuIFRPRE8gOiBtYWtlIGRpcnR5IG51bWJlciBjbGVhblxuICAgKi9cbiAgalF1ZXJ5KCcubWFpbiBkaXYgYScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHNjcm9sbFRvSWQgPSB0aGlzLmhhc2g7XG4gICAgY29uc3Qgb2Zmc2V0VG9wT2ZUYXJnZXQgPSBqUXVlcnkoc2Nyb2xsVG9JZCkub2Zmc2V0KCkudG9wO1xuICAgIGpRdWVyeSgnaHRtbCwgYm9keScpLnNjcm9sbFRvcChvZmZzZXRUb3BPZlRhcmdldCAtIDY1KTtcbiAgICAvLyAxLlxuICB9KTtcblxuXG4gIC8qKlxuICAgKiBjaGFuZ2UgdGhlIHRvcCBtZW51IGJhciBhY2NvcmRpbmcgdG8gc2Nyb2xsIHN0YXR1c1xuICAgKi9cbiAgalF1ZXJ5KGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgY29uc3QgZGVsdGEgPSA1O1xuXG4gICAgalF1ZXJ5KHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHN0ID0galF1ZXJ5KHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgICBpZiAoTWF0aC5hYnMobGFzdFNjcm9sbFRvcCAtIHN0KSA8PSBkZWx0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGRvd25zY3JvbGwgY29kZVxuICAgICAgaWYgKHN0ID4gbGFzdFNjcm9sbFRvcCkge1xuICAgICAgICBqUXVlcnkoJy5qcy1oZWFkLWxhbmd1YWdlLWxpbmtzJykuaGlkZSgpO1xuICAgICAgICBqUXVlcnkoJy5qcy1oZWFkLWxhbmd1YWdlLWluZGljYXRvcicpLnNob3coKTtcbiAgICAgICAgalF1ZXJ5KCcuaGVhZC1uYXYnKS5hZGRDbGFzcygnaGVhZC1uYXYtLW5hcnJvdycpO1xuICAgICAgICBqUXVlcnkoJy5oZWFkJykucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGpRdWVyeSh0aGlzKS5zY3JvbGxUb3AoKSA8IDEwKSB7XG4gICAgICAgIGpRdWVyeSgnLmhlYWQtbmF2JykucmVtb3ZlQ2xhc3MoJ2hlYWQtbmF2LS1uYXJyb3cnKTtcbiAgICAgIH1cblxuICAgICAgbGFzdFNjcm9sbFRvcCA9IHN0O1xuICAgIH0pO1xuICB9KTtcblxuXG59KTtcbiIsImpRdWVyeShmdW5jdGlvbiAoKSB7XG5cblxuICAvKipcbiAgICogTGFuZ3VhZ2UgbWVudVxuICAgKiBhdCBmaXJzdCwgaXQgaXMgaGlkZGVuLCBidXQgd2hlbiB0aGUgXCJsYW5ndWFnZS1pbmRpY2F0b3JcIiBpcyBjbGlja2VkLFxuICAgKiBpdCBpcyBzaG93biBhbmQgdGhlIFwibGFuZ3VhZ2UtaW5kaWNhdG9yXCIgaXMgaGlkZGVuXG4gICAqIFRoaXMgbWVudSBleGlzdHMgdHdpY2U6XG4gICAqIC0gb25jZSBpbiB0aGUgaGVhZGVyIG9mIGNvbnRlbnQgcGFnZXNcbiAgICogLSBvbmNlIG9uIHRoZSBzdGFydCBzY3JlZW5cbiAgICovXG4gIGNvbnN0IGxhbmd1YWdlTWVudVNob3cgPSBmdW5jdGlvbiAocGxhY2UpIHtcbiAgICBqUXVlcnkoJy5qcy0nICsgcGxhY2UgKyAnLWxhbmd1YWdlLWxpbmtzJykuaGlkZSgpO1xuICAgIGNvbnN0IGpzTGFuZ3VhZ2VJbmRpY2F0b3IgPSBqUXVlcnkoJy5qcy0nICsgcGxhY2UgKyAnLWxhbmd1YWdlLWluZGljYXRvcicpO1xuXG4gICAganNMYW5ndWFnZUluZGljYXRvci5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBqUXVlcnkoJy5qcy0nICsgcGxhY2UgKyAnLWxhbmd1YWdlLWxpbmtzJykuc2hvdygpO1xuICAgICAgY29uc3QgbGFuZ0hlaWdodCA9IGpRdWVyeSgnLicgKyBwbGFjZSArICdfX2xpbmtzJykuaGVpZ2h0KCk7XG4gICAgICBqUXVlcnkoJy4nICsgcGxhY2UpLmNzcyh7J3BhZGRpbmctdG9wJzogbGFuZ0hlaWdodH0pO1xuICAgICAganNMYW5ndWFnZUluZGljYXRvci5oaWRlKCk7XG4gICAgfSk7XG5cbiAgfTtcblxuXG4gIC8qKlxuICAgKiBUaGVyZSBhcmUgdHdvIGxhbmd1YWdlIG1lbnVzIG9uIHRoZSB3ZWIgcGFnZVxuICAgKiAtIG9uIHN0YXJ0cGFnZSBhbmRcbiAgICogLSBvbiBhbGwgb3RoZXIgcGFnZXMgaW4gdGhlIGhlYWRcbiAgICovXG4gIGxhbmd1YWdlTWVudVNob3coJ2hlYWQnKTtcbiAgbGFuZ3VhZ2VNZW51U2hvdygnc3RhcnQnKTtcblxuXG59KTtcbiIsImpRdWVyeShmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSBVUkwgZm9yIGFqYXggcmVxdWVzdHNcbiAgICovXG4gIGNvbnN0IGNyZWF0ZVVSTEZvckFqYXggPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArICcvLyc7XG4gICAgdXJsICs9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnBvcnQgIT09ICcnKSB7XG4gICAgICB1cmwgKz0gJzonICsgd2luZG93LmxvY2F0aW9uLnBvcnQ7XG4gICAgfVxuICAgIHVybCArPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgdXJsICs9ICc/dHlwZT0zNzkwMic7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICAvKipcbiAgICogbW92ZSB0aGUgbWVudSBvZiB0aGUgY2FudmFzXG4gICAqL1xuICBjb25zdCBoaWRlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBqUXVlcnkoJy5hbHQtbWVudScpLmNzcyh7XG4gICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVgoLTEwMCUpJyxcbiAgICAgICctd2Via2l0LXRyYW5zZm9ybSc6ICd0cmFuc2xhdGVYKC0xMDAlKScsXG4gICAgICAnLW1zLXRyYW5zZm9ybSc6ICd0cmFuc2xhdGVYKC0xMDAlKScsXG4gICAgICAndHJhbnNpdGlvbic6ICdhbGwgLjI1cyBlYXNlLWluLW91dCcsXG4gICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogJ2FsbCAuMjVzIGVhc2UtaW4tb3V0JyxcbiAgICAgICctbXMtdHJhbnNpdGlvbic6ICdhbGwgLjI1cyBlYXNlLWluLW91dCdcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBtZW51SXNBY3RpdmUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBpZiAoalF1ZXJ5KCcubWVudV9fYnV0dG9uJykuaGFzQ2xhc3MoJ2pzLWFjdGl2ZScpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IG1lbnVUb2dnbGVDaGlsZHJlbiA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgalF1ZXJ5KGl0ZW0pLnNpYmxpbmdzKCcubWVudV9fbGlzdC0taW5kZW50ZWQnKS50b2dnbGUoKTtcblxuICAgIGlmIChqUXVlcnkoaXRlbSkuZmluZCgnc3ZnJykuYXR0cignY2xhc3MnKSA9PT0gJ2ZhLWljb24gZmEtaWNvbi1hbmdsZS1kb3VibGUtZG93bicpIHtcbiAgICAgIGpRdWVyeShpdGVtKS5maW5kKCdzdmcnKS5hdHRyKCdjbGFzcycsICdmYS1pY29uIGZhLWljb24tYW5nbGUtZG91YmxlLXJpZ2h0Jyk7XG4gICAgICBqUXVlcnkoaXRlbSkuZmluZCgnc3ZnJykuaHRtbCgnPHVzZSB4bGluazpocmVmPVwiI2ljb24tYW5nbGUtZG91YmxlLXJpZ2h0XCI+PC91c2U+Jyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgalF1ZXJ5KGl0ZW0pLmZpbmQoJ3N2ZycpLmF0dHIoJ2NsYXNzJywgJ2ZhLWljb24gZmEtaWNvbi1hbmdsZS1kb3VibGUtZG93bicpO1xuICAgICAgalF1ZXJ5KGl0ZW0pLmZpbmQoJ3N2ZycpLmh0bWwoJzx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWFuZ2xlLWRvdWJsZS1kb3duXCI+PC91c2U+Jyk7XG4gICAgfVxuXG4gIH07XG5cbiAgLyoqXG4gICAqIFN0eWxlIHRoZSBtZW51IHNvIHRoYXQgaXQgaXMgc3RpbGwgcmVhZGFibGUsIGJ1dCBoaWRkZW5cbiAgICovXG4gIGNvbnN0IHB1dE1lbnVPZmZTY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gcHV0IHRoZSBtZW51IG9mZiBjYW52YXMgdG8gdGhlIGxlZnRcbiAgICBqUXVlcnkoJy5hbHQtbWVudScpLmFkZENsYXNzKCdhbHQtbWVudS0tb2ZmLWNhbnZhcycpO1xuICAgIC8vIHJlbW92ZXMgdGhlIG5vIGpzIG9wdGlvbiBvZiBjb2x1bW5zIHNpZGUgYnkgc2lkZVxuICAgIC8vIFRPRE86IGNhY2hlIGpRdWVyeSgnLm1lbnVfX2NvbHVtbicpIGxvb2t1cFxuICAgIGpRdWVyeSgnLm1lbnVfX2NvbHVtbicpLnJlbW92ZUNsYXNzKCdpYy10YWJsZXQtb25lLWhhbGYnKTtcbiAgICBqUXVlcnkoJy5tZW51X19jb2x1bW4nKS5yZW1vdmVDbGFzcygnaWMtbm90ZWJvb2stYW5kLXVwLW9uZS1xdWFydGVyJyk7XG4gICAgalF1ZXJ5KCcubWVudV9fY29sdW1uJykuY3NzKHsncGFkZGluZy1yaWdodCc6ICcyNHB4J30pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBoYW5kbGUgc2hvdyBhbmQgaGlkZSBvZiBtZW51IGFuZCByZW1vdmUgY2xhc3Nlc1xuICAgKi9cbiAgalF1ZXJ5KCcuZm9vdGVyLWhpZGVfX2hlbHBlcicpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgaWYgKG1lbnVJc0FjdGl2ZSgpKSB7XG4gICAgICBjb25zdCBjbGFzc05hbWVzT2ZDbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldC5hdHRyKCdjbGFzcycpO1xuXG4gICAgICBpZiAoY2xhc3NOYW1lc09mQ2xpY2tlZEVsZW1lbnQuc3BsaXQoJyAnKVswXSAhPT0gJ21lbnVfX2J1dHRvbicpIHtcbiAgICAgICAgalF1ZXJ5KCcubWVudV9fYnV0dG9uJylcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2pzLWFjdGl2ZSBqcy1hbHQtbWVudS10b2dnbGUtYnV0dG9uLS1hY3RpdmUnKTtcbiAgICAgICAgaGlkZU1lbnUoKTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogaGFuZGxlIG9uIGRlbWFuZCBjb250ZW50IG9uIHBhZ2VzIGxpa2UgdGhvc2UgZm9yIHRoZSBvYSBkYXlzXG4gICAqL1xuICBqUXVlcnkoJy5vbi1kZW1hbmRfX2NvbnRlbnQnKS5oaWRlKCk7XG4gIGpRdWVyeSgnLm9uLWRlbWFuZF9fbGluaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICBqUXVlcnkodGhpcylcbiAgICAgIC5wYXJlbnQoKVxuICAgICAgLm5leHRBbGwoJy5vbi1kZW1hbmRfX2NvbnRlbnQnKVxuICAgICAgLmZpcnN0KClcbiAgICAgIC50b2dnbGUoJ3Nsb3cnKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gb2YgdGhlIGFsdGVybmF0aXZlIG1lbnUgZm9yIHNtYWxsIHZpZXdwb3J0c1xuICAgKi9cbiAgY29uc3QgYWx0TWVudSA9IGpRdWVyeSgnLmFsdC1tZW51Jyk7XG4gIGNvbnN0IGFsdE1lbnVUb2dnbGVCdXR0b24gPSBqUXVlcnkoJy5qcy1hbHQtbWVudS10b2dnbGUtYnV0dG9uJyk7XG4gIGNvbnN0IHdpbmRvd1dpZHRoID0galF1ZXJ5KHdpbmRvdykud2lkdGgoKTtcblxuICAvKipcbiAgICogbW92ZSB0aGUgbWVudSBmcm9tIG9mZiBjYW52YXMgaW50byB2aWV3cG9ydFxuICAgKi9cbiAgY29uc3Qgc2hvd01lbnUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gbW92ZSB0aGUgbWVudSBmcm9tIG9mZiBjYW52YXMgaW50byB2aWV3cG9ydFxuICAgIGpRdWVyeSgnLmFsdC1tZW51JykuY3NzKHtcbiAgICAgICd0cmFuc2Zvcm0nOiAndHJhbnNsYXRlWCgwJSknLFxuICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICctbXMtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVgoMCUpJyxcbiAgICAgICd0cmFuc2l0aW9uJzogJ2FsbCAuMjVzIGVhc2UtaW4tb3V0JyxcbiAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiAnYWxsIC4yNXMgZWFzZS1pbi1vdXQnLFxuICAgICAgJy1tcy10cmFuc2l0aW9uJzogJ2FsbCAuMjVzIGVhc2UtaW4tb3V0J1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogYWRkIG1lbnUgcGVyIGFqYXhcbiAgICAgKiBsb2FkIGFuc3dlciBvZiBhamF4LXBhZ2UgZGlyZWN0bHkgaW50byB0aGUgZWxlbWVudCxcbiAgICAgKiB0aGVuIGV4ZWN1dGUgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBjb25zdCB1cmwgPSBjcmVhdGVVUkxGb3JBamF4KCk7XG5cbiAgICAvLyBzaG93IHNwaW5uZXIgYXMgbG9uZyBhcyB0aGVyZSBpcyBubyBtZW51XG4gICAgbGV0IHNwSFRNTCA9ICc8c3ZnIGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBmYS1wdWxzZVwiPic7XG4gICAgc3BIVE1MICs9ICc8dXNlIHhsaW5rOmhyZWY9XCIjc3Bpbm5lclwiPjwvdXNlPjwvc3ZnPic7XG4gICAgalF1ZXJ5KCcuYWpheC1tZW51JykuaHRtbChzcEhUTUwpO1xuICAgIC8vIGxvYWQgbWVudSBwZXIgYWpheFxuICAgIGpRdWVyeSgnLmFqYXgtbWVudScpLmxvYWQodXJsLCBmdW5jdGlvbiAocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgIGlmICh3aW5kb3dXaWR0aCA+IDc2Nykge1xuICAgICAgICAgIHB1dE1lbnVPZmZTY3JlZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBzdmcgaW5zdGFuY2VzIHRvIHN2ZyB0YWcgYXMgaXQgY2FuJ3QgYmUgZG9uZSBmcm9tIHR5cG9zY3JpcHQsXG4gICAgICAgIC8vIGJlY2F1c2UgdGhlIG1lbnUgaXMgY3JlYXRlZCB3aXRoIGEgZGlmZmVyZW50IHR5cGVOdW0gd2l0aG91dCBqYXZhc2NyaXB0IG9uXG4gICAgICAgIGpRdWVyeSgnLnRvZ2dsZS1tZW51JykuZmluZCgnLmZhLWljb24tYW5nbGUtZG91YmxlLXJpZ2h0JylcbiAgICAgICAgICAuaHRtbCgnPHVzZSB4bGluazpocmVmPVwiI2ljb24tYW5nbGUtZG91YmxlLXJpZ2h0XCI+PC91c2U+Jyk7XG4gICAgICAgIGpRdWVyeSgnLnRvZ2dsZS1tZW51JykuZmluZCgnLmZhLWljb24tYW5nbGUtZG91YmxlLWRvd24nKVxuICAgICAgICAgIC5odG1sKCc8dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1hbmdsZS1kb3VibGUtZG93blwiPjwvdXNlPicpO1xuXG4gICAgICAgIC8vIE5vdywgdGhhdCB0aGUgRE9NLUVsZW1lbnRzIGFyZSBhdmFpbGFibGUsIHRoZWlyIGJlaGF2aW91ciBjYW4gYmUgY29uZmlndXJlZDpcblxuICAgICAgICAvLyBDb25maWd1cmUgdG9nZ2xlLWljb25zICh0aGUgYXJyb3dzIGxlZnQgb2YgbWVudSBpdGVtcylcbiAgICAgICAgLy8gZXZlcnkgYXJyb3ctaWNvbiBpbiB0aGUgbWVudSBnZXRzIHRvIHRvZ2dsZSB0aGUgcmVzcGVjdGl2ZSBzdWJtZW51XG4gICAgICAgIGpRdWVyeSgnLnRvZ2dsZS1tZW51JykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1lbnVUb2dnbGVDaGlsZHJlbih0aGlzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZGV0ZWN0IGtleWJvYXJkIC9jbGlja3MvIG9uIG1lbnUgdG9nZ2xlIGJ1dHRvbnNcbiAgICAgICAgLy8ga2V5Y29kZSAxMyA9IHJldHVybi9lbnRlciBrZXlcbiAgICAgICAgalF1ZXJ5KCcudG9nZ2xlLW1lbnUnKS5mb2N1cygpLmtleWRvd24oZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICBtZW51VG9nZ2xlQ2hpbGRyZW4odGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyB3aGVuIGFycm93IGlzIGNsaWNrZWQsIG1vdmUgbWVudSB1cCBvciBkb3duXG4gICAgICAgIGNvbnN0IG1lbnUgPSBqUXVlcnkoJy5qcy1tZW51Jyk7XG4gICAgICAgIGNvbnN0IG1lbnVUb2dnbGVCdXR0b24gPSBqUXVlcnkoJy5qcy1tZW51LXRvZ2dsZS1idXR0b24nKTtcblxuICAgICAgICBqUXVlcnkobWVudVRvZ2dsZUJ1dHRvbikuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKG1lbnVUb2dnbGVCdXR0b24uaGFzQ2xhc3MoJ2pzLWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBjYWNoZSBqUXVlcnkoJ2h0bWwsIGJvZHknKSBsb29rdXBcbiAgICAgICAgICAgIGpRdWVyeSgnaHRtbCxib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6IDB9LCA1MDApO1xuICAgICAgICAgICAgalF1ZXJ5KG1lbnVUb2dnbGVCdXR0b24pLnJlbW92ZUNsYXNzKCdqcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeShtZW51KS5zbGlkZVVwKCk7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogdXNlIGNhY2hlZCBqUXVlcnkoJ2h0bWwsIGJvZHknKSBsb29rdXAgaWYgcG9zc2libGVcbiAgICAgICAgICAgIGpRdWVyeSgnaHRtbCxib2R5JykuYW5pbWF0ZSh7J3Njcm9sbFRvcCc6IDB9LCA1MDApO1xuICAgICAgICAgICAgalF1ZXJ5KG1lbnVUb2dnbGVCdXR0b24pLmFkZENsYXNzKCdqcy1hY3RpdmUnKTtcbiAgICAgICAgICAgIGpRdWVyeShtZW51KS5zbGlkZURvd24oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gaGlkZSBhbGwgc3ViIG1lbnUgbGlzdHMgZXhjZXB0IGZvciB0aGUgY3VycmVudCBvbmVcbiAgICAgICAgLy8gZm9yIG5vLWpzIGZhbGxiYWNrIGNhc2VzIHRoZXkgYXJlIG9wZW4gYnkgZGVmYXVsdCwgc28gd2UgaGF2ZSB0byBleHBsaWNpdGx5XG4gICAgICAgIC8vIGNsb3NlIHRoZW1cbiAgICAgICAgalF1ZXJ5KCcuYWx0LW1lbnUgLm1lbnVfX2xpc3QtLWluZGVudGVkJykuaGlkZSgpO1xuICAgICAgICBqUXVlcnkoJy5mYS1pY29uLWFuZ2xlLWRvdWJsZS1kb3duJylcbiAgICAgICAgICAucGFyZW50KCdzcGFuJylcbiAgICAgICAgICAuc2libGluZ3MoJy5tZW51X19saXN0LS1pbmRlbnRlZCcpLnNob3coKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBmdWxsIHZpZXdwb3J0IG92ZXJsYXkgd2hlbiA8NzY4cHggd2lkdGhcbiAgaWYgKHdpbmRvd1dpZHRoIDw9IDc2Nykge1xuICAgIGpRdWVyeShhbHRNZW51KS5jc3MoeydkaXNwbGF5JzogJ25vbmUnfSk7XG4gICAgLy8gd2hlbiBtZW51IGJ1dHRvbiByZWNlaXZlcyBjbGljayB0aGUgbWVudSB3aWxsIG92ZXJsYXkgZXZlcnl0aGluZyBhbiBzaG93XG4gICAgLy8gYW4gc2Nyb2xsYWJsZSBtZW51LiBFeGl0IHRoZSBtZW51IGJ5IGNsaWNraW5nIGEgbWVudSBpdGVtLlxuICAgIGpRdWVyeShhbHRNZW51VG9nZ2xlQnV0dG9uKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICBqUXVlcnkoYWx0TWVudSkuY3NzKHsnZGlzcGxheSc6ICdibG9jayd9KTtcbiAgICAgIGpRdWVyeSgnLmhlYWQtbmF2JykuaGlkZSgpO1xuICAgICAgalF1ZXJ5KCcuZm9vdGVyLWhpZGVfX2hlbHBlcicpLmNzcyh7XG4gICAgICAgICdtYXJnaW4tbGVmdCc6ICcxMDAlJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJ1xuICAgICAgfSk7XG4gICAgICBqUXVlcnkoJy5mb290ZXItaGlkZScpLmNzcyh7XG4gICAgICAgICdtYXJnaW4tbGVmdCc6ICcxMDAlJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ2ZpeGVkJ1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBvZmYgY2FudmFzIHRvIHRoZSBsZWZ0IHdoZW4gPj03NjhweFxuICB9IGVsc2Uge1xuICAgIHB1dE1lbnVPZmZTY3JlZW4oKTtcblxuICAgIGpRdWVyeShhbHRNZW51VG9nZ2xlQnV0dG9uKS5jbGljayhmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIHdoYXQgdG8gZG8gd2hlbiBtZW51IGJ1dHRvbiBnZXRzIGNsaWNrZWQgYW5kIG1lbnUgaXMgYWxyZWFkeSB2aXNpYmxlXG4gICAgICBpZiAoYWx0TWVudVRvZ2dsZUJ1dHRvbi5oYXNDbGFzcygnanMtYWx0LW1lbnUtdG9nZ2xlLWJ1dHRvbi0tYWN0aXZlJykpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSAnLS1hY3RpdmUnIG1vZGlmaWVyIGZyb20gdGhlIG1lbnUgYnV0dG9uXG4gICAgICAgIGFsdE1lbnVUb2dnbGVCdXR0b24ucmVtb3ZlQ2xhc3MoJ2pzLWFsdC1tZW51LXRvZ2dsZS1idXR0b24tLWFjdGl2ZScpO1xuICAgICAgICBoaWRlTWVudSgpO1xuXG4gICAgICAgIC8vIHdoYXQgdG8gZG8gd2hlbiBtZW51IGJ1dHRvbiBnZXRzIGNsaWNrZWQgYW5kIG1lbnUgaXMgbm90IHlldCB2aXNpYmxlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBhZGQgJy0tYWN0aXZlJyBtb2RpZmllciB0byB0aGUgbWVudSBidXR0b25cbiAgICAgICAgYWx0TWVudVRvZ2dsZUJ1dHRvbi5hZGRDbGFzcygnanMtYWx0LW1lbnUtdG9nZ2xlLWJ1dHRvbi0tYWN0aXZlJyk7XG4gICAgICAgIHNob3dNZW51KCk7XG4gICAgICAgIC8vIG1ha2UgdGhlIG1lbnUgY29udGVudCBmaWxsIHRoZSB3aG9sZSBsZWZ0IHNpZGUgKHRvcCB0byBib3R0b20pXG4gICAgICAgIC8vIGFuZCBsZXQgaXRzIGNvbnRlbnQgc2Nyb2xsXG4gICAgICAgIGpRdWVyeSgnLmFsdC1tZW51X19jb250ZW50JykuY3NzKHtcbiAgICAgICAgICAnb3ZlcmZsb3cnOiAnc2Nyb2xsJyxcbiAgICAgICAgICAnaGVpZ2h0JzogJzEwMCUnLFxuICAgICAgICAgICdtaW4taGVpZ2h0JzogJzEwMCUnXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBzZXQga2V5Ym9hcmQgZm9jdXMgdG8gc2Vjb25kIGxpbmsgaW4gbWVudVxuICAgICAgICBqUXVlcnkoJy5hbHQtbWVudV9fY2xvc2UtYnV0dG9uJykuZm9jdXMoKTtcbiAgICAgICAgLy8gc2V0IHRhYmluZGV4IG9mIG1lbnUgaXRlbXMgdG8gYmUgYWJsZSB0byBuYXZpZ2F0ZSB0aGVtIHZpYSBrZXlib2FyZFxuICAgICAgICAvLyBUT0RPOiBjYWNoZSBqUXVlcnkoJy5hbHQtbWVudScpIGxvb2t1cFxuICAgICAgICAvLyBUT0RPOiB1c2UgXCJqUXVlcnkoJy5hbHQtbWVudSBhJylcIiBpbnN0ZWFkIG9mIFwiLi4uZmluZCgnYScpXCIgaWYgcG9zc2libGVcbiAgICAgICAgalF1ZXJ5KCcuYWx0LW1lbnUnKS5maW5kKCdhJykuYXR0cigndGFiaW5kZXgnLCAnOTknKTtcbiAgICAgICAgLy8gVE9ETzogdXNlIFwialF1ZXJ5KCcuYWx0LW1lbnUgLnRvZ2dsZS1tZW51JylcIiArXG4gICAgICAgIC8vIGluc3RlYWQgb2YgXCIuLi5maW5kKCcudG9nZ2xlLW1lbnUnKVwiIGlmIHBvc3NpYmxlXG4gICAgICAgIGpRdWVyeSgnLmFsdC1tZW51JykuZmluZCgnLnRvZ2dsZS1tZW51JykuYXR0cigndGFiaW5kZXgnLCAnOTknKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFRoZSBjbG9zZS1mdW5jdGlvbiBvZiB0aGUgbWVudVxuICAgKiBJdCBpcyBub3Qgb25seSB0aWVkIHRvIHRoZSBcImNsb3NlXCItQnV0dG9uLCBidXQgYWxzbyB0byB0aGUgc2VhcmNoLWJ1dHRvbiBvZlxuICAgKiB0aGUgc3BlY2lhbCBidXR0b24gZm9yIHZlcnkgc21hbGwgdmlld3BvcnRzIHdoaWNoIHJlc2lkZXMgaW4gdGhlIG5hdi1wYXJ0aWFsLlxuICAgKiBCZWNhdXNlIGluIGNhc2Ugb2Ygc2VhcmNoLCB0aGVyZSBpcyBubyBuZXcgcGFnZWxvYWRcbiAgICovXG4gIGNvbnN0IGFsdE1lbnVDbG9zZUJ1dHRvbiA9IGpRdWVyeSgnLmFsdC1tZW51X19jbG9zZS1idXR0b24nKTtcbiAgYWx0TWVudUNsb3NlQnV0dG9uLmFkZCgnLmpzLW5hdi1zZWFyY2gtYnV0dG9uJyk7XG4gIGFsdE1lbnVDbG9zZUJ1dHRvbi5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgYWx0TWVudVRvZ2dsZUJ1dHRvbi5yZW1vdmVDbGFzcygnanMtYWx0LW1lbnUtdG9nZ2xlLWJ1dHRvbi0tYWN0aXZlJyk7XG5cbiAgICBpZiAod2luZG93V2lkdGggPD0gNzY3KSB7XG4gICAgICBqUXVlcnkoYWx0TWVudSkuY3NzKHsnZGlzcGxheSc6ICdub25lJ30pO1xuICAgICAgLy8gVE9ETzogdXNlIGNhY2hlZCBqUXVlcnkoJy5oZWFkLW5hdicpIGxvb2t1cCBpZiBwb3NzaWJsZVxuICAgICAgalF1ZXJ5KCcuaGVhZC1uYXYnKS5zaG93KCk7XG4gICAgICAvLyBUT0RPOiB1c2UgY2FjaGVkIGpRdWVyeSgnLmZvb3Rlci1oaWRlX19oZWxwZXInKSBsb29rdXAgaWYgcG9zc2libGVcbiAgICAgIGpRdWVyeSgnLmZvb3Rlci1oaWRlX19oZWxwZXInKS5jc3Moe1xuICAgICAgICAnbWFyZ2luLWxlZnQnOiAnMCUnLFxuICAgICAgICAncG9zaXRpb24nOiAncmVsYXRpdmUnXG4gICAgICB9KTtcbiAgICAgIC8vIFRPRE86IHVzZSBjYWNoZWQgalF1ZXJ5KCcuZm9vdGVyLWhpZGUnKSBsb29rdXAgaWYgcG9zc2libGVcbiAgICAgIGpRdWVyeSgnLmZvb3Rlci1oaWRlJykuY3NzKHtcbiAgICAgICAgJ21hcmdpbi1sZWZ0JzogJzAlJyxcbiAgICAgICAgJ3Bvc2l0aW9uJzogJ3JlbGF0aXZlJ1xuICAgICAgfSk7XG4gICAgICBoaWRlTWVudSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlTWVudSgpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdfQ==
