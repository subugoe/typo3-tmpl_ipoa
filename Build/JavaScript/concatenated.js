jQuery(function () {
  jQuery('html,body').animate({'scrollTop': 0}, 500);


  /**
   * this part allows for in-page anchor clicks that move the scroll position
   * without wrongly covering the content by the top nav bar.
   *
   * 1. TODO : make dirty number clean
   */
  jQuery('.main div a').click(function () {
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
   * Handle inner function of menu
   */

  // Load menu per ajax and load it paralelly
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

  // add menu per ajax:
  // load answer of ajax-page directly into the element, then execute function
  const loadMenu = function () {

    const url = createURLForAjax();

    // show spinner as long as there is no menu
    let spHTML = '<svg class="fa fa-spinner fa-pulse">';
    spHTML += '<use xlink:href="#spinner"></use></svg>';
    jQuery('.ajax-menu').html(spHTML);

    // load menu per ajax, but only once
    jQuery('.ajax-menu').load(url, function (response, status) {
      if (status === 'success') {

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
          jQuery('html,body').animate({'scrollTop': 0}, 500);
          jQuery(menu).slideUp();
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
      jQuery('.alt-menu__content').animate({'scrollTop': 0}, 500);
    });
  };


  // make sure, menu is already in cache
  setTimeout(function () {
    loadMenu();
  }, 10);


  /**
   * handle display of menu
   */
  const menuIsActive = function () {
    return jQuery('.alt-menu').hasClass('--in-canvas');
  };

  const hideMenu = function() {
    jQuery('.alt-menu').removeClass('--in-canvas').addClass('--off-canvas');
  };

  const showMenu = function() {
    jQuery('.alt-menu').removeClass('--off-canvas').addClass('--in-canvas');
  };

  jQuery('.head-nav .menu__button, .alt-menu__close-button').on('click', function() {
    if (menuIsActive()) {
      hideMenu();
    } else {
      showMenu();
    }
  });


  /**
   * handle on demand content on pages like those for the oa days
   */
  jQuery('.on-demand__content').hide();
  jQuery('.on-demand__link').click(function () {
    jQuery(this)
      .parent('p')
      .nextUntil(':not(".on-demand__content")')
      .toggle('slow');
  });


  jQuery(window).resize(function () {
    hideMenu();
    if (jQuery(window).width() > 820) {
      jQuery('.alt-menu').css('width', jQuery('.head__text').position().left);
    } else {
      jQuery('.alt-menu').css('width', '100%');
    }
  });
  // initial once
  if (jQuery(window).width() > 820) {
    jQuery('.alt-menu').css('width', jQuery('.head__text').position().left);
  } else {
    jQuery('.alt-menu').css('width', '100%');
  }


});
