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
