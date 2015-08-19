jQuery(document).ready(function() {

  windowWidth = jQuery(window).width();

  function menuIsActive() {
    if (jQuery('.menu__button').hasClass('js-active')) {
      return true;
    } else {
      return false;
    }
  }

  var showMenu = function() {
    /* move the menu from off canvas into viewport */
    jQuery('.alt-menu').css({
      'transform': 'translateX(0%)',
      '-webkit-transform': 'translateX(0%)',
      '-ms-transform': 'translateX(0%)',
      'transition': 'all .25s ease-in-out',
      '-webkit-transition': 'all .25s ease-in-out',
      '-ms-transition': 'all .25s ease-in-out'
    });
  }

  var hideMenu = function() {
    /* move the menu off canvas */
    jQuery('.alt-menu').css({
      'transform': 'translateX(-100%)',
      '-webkit-transform': 'translateX(-100%)',
      '-ms-transform': 'translateX(-100%)',
      'transition': 'all .25s ease-in-out',
      '-webkit-transition': 'all .25s ease-in-out',
      '-ms-transition': 'all .25s ease-in-out'
    });
  }

  /**
   * handle show and hide of menu
   *
   * remove classes
   */
  jQuery('.footer-hide__helper').click(function(event){
    if (menuIsActive()) {
      classNameOfClickedElement = jQuery(event.target).attr('class').split(' ')[0];
      if (classNameOfClickedElement != 'menu__button') {
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
  jQuery('.fa-icon-angle-double-down').parent('span').siblings('.menu__list--indented').show();


  function menuToggleChildren(item) {
    jQuery(item).siblings('.menu__list--indented').toggle();
    if (jQuery(item).find('svg').attr('class') == 'fa-icon fa-icon-angle-double-down') {
      jQuery(item).find('svg').attr('class', 'fa-icon fa-icon-angle-double-right');
      jQuery(item).find('svg').html('<use xlink:href="#icon-angle-double-right"></use>');
    } else {
      jQuery(item).find('svg').attr('class', 'fa-icon fa-icon-angle-double-down');
      jQuery(item).find('svg').html('<use xlink:href="#icon-angle-double-down"></use>');
    }
  }

  /**
   * every arrow-icon in the menu gets to toggle the respective submenu
   */
  jQuery('.toggle-menu').click(function(event) {
    menuToggleChildren(this);
  })

  /**
   * TODO : add documentation
   */
 menu = jQuery('.js-menu');
 menuToggleButton = jQuery('.js-menu-toggle-button');
 menuToggleButtonIcon = jQuery('.js-menu-button-icon');
 jQuery(menuToggleButton).click(function(event) {
   if (menuToggleButton.hasClass('js-active')) {
     jQuery('html,body').animate({'scrollTop': 0}, 500);
     jQuery(menuToggleButton).removeClass('js-active');
     jQuery(menu).slideUp();
   } else {
     jQuery('html,body').animate({'scrollTop': 0}, 500);
     jQuery(menuToggleButton).addClass('js-active');
     jQuery(menu).slideDown();
   }
   event.preventDefault();
 });

  /*
    Language menu
    at first, it is hidden,
    but when the "language-indicator" is clicked, it is shown and the "language-indicator" is hidden
    This menu exists twice:
      - once in the header of content pages
      - once on the start screen
  */
  var languageMenuShow = function(place) {
  // language indicator in head of content pages
  jQuery('.js-'+place+'-language-links').hide();
  jsLanguageIndicator = jQuery('.js-'+place+'-language-indicator');
  jsLanguageIndicator.click(function() {
    jQuery('.js-'+place+'-language-links').show();
    var langHeight = jQuery('.'+place+'__links').height();
    jQuery('.'+place).css({'padding-top': langHeight});
    jsLanguageIndicator.hide();
  });
  }
  languageMenuShow('head');
  languageMenuShow('start');

  /**
   * handle on demand content on pages like those for the oa days
   */
  jQuery('.on-demand__content').hide();
  jQuery('.on-demand__link').click(function(event) {
    jQuery(this).parent().nextAll(".on-demand__content").first().toggle("slow");
  });

  /**
   *
   */
  altMenu = jQuery('.alt-menu');
  altMenuToggleButton = jQuery('.js-alt-menu-toggle-button');
  /* full viewport overlay when <768px width */
  if (windowWidth <= 767) {
    jQuery(altMenu).css({'display': 'none'})
    /* when menu button receives click the menu will overlay everything an show
       an scrollable menu. Exit the menu by clicking a menu item. */
    jQuery(altMenuToggleButton).click(function() {
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
  /* off canvas when >=768px */
  } else {
    /* put the menu off canvas to the left */
    jQuery('.alt-menu').addClass('alt-menu--off-canvas');

    /* removes the no js option of columns side by side */
    jQuery('.menu__column').removeClass('ic-tablet-one-half');
    jQuery('.menu__column').removeClass('ic-notebook-and-up-one-quarter');

    jQuery('.menu__column').css({'padding-right': '24px',});

    jQuery(altMenuToggleButton).click(function() {

      /* what to do when menu button gets clicked and menu is already visible */
      if (altMenuToggleButton.hasClass('js-alt-menu-toggle-button--active')) {
        /* remove the '--active' modifier from the menu button */
        altMenuToggleButton.removeClass('js-alt-menu-toggle-button--active');
        hideMenu();
        /* what to do when menu button gets clicked and menu is not yet
           visible */
      } else {
        /* add '--active' modifier to the menu button */
        altMenuToggleButton.addClass('js-alt-menu-toggle-button--active');
        showMenu();
        /* make the menu content fill the whole left side (top to bottom) and
           let its content scroll */
        jQuery('.alt-menu__content').css({
          'overflow': 'scroll',
          'height': '100%',
          'min-height': '100%'
        });
        /* set keyboard focus to second link in menu */
        jQuery('.alt-menu__close-button').focus();
        /* set tabindex of menu items to be able to navigate them via keyboard */
        jQuery('.alt-menu').find('a').attr('tabindex', '99');
        jQuery('.alt-menu').find('.toggle-menu').attr('tabindex', '99');
      }
    });
  };

  /**
   * detect keyboard /clicks/ on menu toggle buttons (those tiny double arrows/
   * angles in front of menu items)
   */
  jQuery('.toggle-menu').focus().keydown(function(event){
    if (event.keyCode == 13) {
      menuToggleChildren(this);
    };
  });

  /**
   * change the top menu bar according to scroll status
   */
  jQuery(function() {
    var lastScrollTop = 0, delta = 5;
    jQuery(window).scroll(function(event) {
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
   * carousel related code
   */
  function carousel(id) {
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
  }
  /* put carousel related code to use */
  jQuery.each(jQuery(".logocarousel"), function() {
    carousel(jQuery(this).attr("id"));
  });

  /**
   * footerHide
   */
  footerHideHeight = jQuery('.footer-hide__content').height();
  jQuery('.footer-hide').css({ 'height': footerHideHeight + 'px' });

  /**
   * recalculate (and set the new) footer height with every window resize
   */
  jQuery(window).resize(function() {
    footerHideHeight = jQuery('.footer-hide__content').height();
    jQuery('.footer-hide').css({ 'height': footerHideHeight + 'px' });
  });

  /**
   * Prevent the logocarousel to change it's height
   * Find the logocarousel, get it's ID, get the max height of the images
   * and set the height of the logocarousel accordingly
   */
  logoIds = jQuery(".logocarousel");
  logoIds.each(function() {
    logoHeight = 0;
    jQuery(this).find("img").each(function() {
      if (this.height > logoHeight) {
        logoHeight = this.height;
      }
    });
    jQuery(this).css("height",logoHeight);
  });

  /**
   * this part allows for in-page anchor clicks that move the scroll position
   * without wrongly covering the content by the top nav bar.
   *
   * 1. TODO : make dirty number clean
   */
  jQuery('.main div a').click(function(event) {
    var scrollToId = this.hash;
    var offsetTopOfTarget = jQuery(scrollToId).offset().top;
    jQuery('html, body').scrollTop(offsetTopOfTarget - 65); /* 1. */
  });

  /*
   * The close-function of the menu
   * It is not only tied to the "close"-Button, but also to the search-button of
   * the special button for very small viewports which resides in the nav-partial.
   * Because in case of search, there is no new pageload
   */
  jQuery('.alt-menu__close-button').add('.js-nav-search-button').click(function(event) {
    altMenuToggleButton.removeClass('js-alt-menu-toggle-button--active');
    if (windowWidth <= 767) {
      jQuery(altMenu).css({'display': 'none'});
      jQuery('.head-nav').show();
      jQuery('.footer-hide__helper').css({
        'margin-left': '0%',
        'position': 'relative'
        });
      jQuery('.footer-hide').css({
        'margin-left': '0%',
        'position': 'relative'
        });
    } else {
      hideMenu();
    }
  });

});