jQuery(document).ready(function() {


  windowWidth = jQuery(window).width();

  function menuIsActive() {
    if (jQuery('.menu__button').hasClass('js-active')) {
      return true;
    } else {
      return false;
    }
  }

  jQuery('.footer-hide__helper').click(function(event){
    if (menuIsActive()) {
      classNameOfClickedElement = jQuery(event.target).attr('class')
                                    .split(' ')[0];
      if (classNameOfClickedElement != 'menu__button') {
        jQuery('.menu__button')
          .removeClass('js-active js-alt-menu-toggle-button--active');
        jQuery('.alt-menu').css({
          'transform': 'translateX(-100%)',
          '-webkit-transform': 'translateX(-100%)',
          '-ms-transform': 'translateX(-100%)',
          'transition': 'all .25s ease-in-out',
          '-webkit-transition': 'all .25s ease-in-out',
          '-ms-transition': 'all .25s ease-in-out'
          });
      }
      event.preventDefault();
    }
  });


  /**
   * scroll to anchor, but make it slow
   */
  function scrollToAnchor(aid) {
    var aTag = jQuery("a[name='" + aid + "']");
    jQuery('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
  }


  /**
   * TODO : add documentation
   */
  jQuery('.js-head-language-links').hide();
  jsHeadLanguageIndicator = jQuery('.js-head-language-indicator');
  jsHeadLanguageIndicator.click(function() {
    jQuery('.js-head-language-links').show();
    var headHeight = jQuery('.head__links').height();
    jQuery('.head').css({'padding-top': headHeight});
    jsHeadLanguageIndicator.hide();
  });

  /**
   * TODO : add documentation
   */
  jQuery('.js-start-language-links').hide();
  jsStartLanguageIndicator = jQuery('.js-start-language-indicator');
  jsStartLanguageIndicator.click(function() {
    jQuery('.js-start-language-links').show();
    var startHeight = jQuery('.start__links').height();
    jQuery('.start').css({'padding-top': startHeight});
    jsStartLanguageIndicator.hide();
  });


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


  /**
   * hide all submenulists
   * for no-js fallback cases they are open by default, so we have to explicitly
   * close them
   */
  jQuery('.alt-menu .menu__list--indented').hide();

  /* find all ULs with active link and parents (in that menu__column) and open
     them */
  jQuery('.alt-menu .menu__list--indented .menu__link--active')
    .parentsUntil('.menu__column').show();

  /**
   *
   */
  jQuery('.alt-menu').find('.menu__link--has-children').click(function(event) {
    /* open link if child ULs are open already */
    if (jQuery(this).hasClass('menu__link--open')) {
      /* we could to fancy stuff if a link is clicked to follow the href */
      /* open UL */
    } else {
      /* prevent following the link, because we want to open the UL */
      event.preventDefault();
      /* add CSS class "menu__link--open" to clicked link */
      jQuery(this).addClass('menu__link--open');
      /* open child */
      jQuery(this).next('.menu__list--indented').show();
    }
  });


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
        /* move the menu off canvas */
        jQuery('.alt-menu').css({
          'transform': 'translateX(-100%)',
          '-webkit-transform': 'translateX(-100%)',
          '-ms-transform': 'translateX(-100%)',
          'transition': 'all .25s ease-in-out',
          '-webkit-transition': 'all .25s ease-in-out',
          '-ms-transition': 'all .25s ease-in-out'
          });
        /* what to do when menu button gets clicked and menu is not yet
           visible */
      } else {
        /* add '--active' modifier to the menu button */
        altMenuToggleButton.addClass('js-alt-menu-toggle-button--active');
        /* move the menu from off canvas into viewport */
        jQuery('.alt-menu').css({
          'transform': 'translateX(0%)',
          '-webkit-transform': 'translateX(0%)',
          '-ms-transform': 'translateX(0%)',
          'transition': 'all .25s ease-in-out',
          '-webkit-transition': 'all .25s ease-in-out',
          '-ms-transition': 'all .25s ease-in-out'
          });
        /* make the menu content fill the whole left side (top to bottom) and
           let its content scroll */
        jQuery('.alt-menu__content').css({
          'overflow': 'scroll',
          'height': '100%',
          'min-height': '100%'
          });
        /* set keyboard focus to second link in menu */
        jQuery('.alt-menu a:nth-child(2)').focus();
      }
    });
  };


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
        //console.log('scroll down');
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

  jQuery('.alt-menu__content').prepend('<div class="alt-menu__close-button-wrap"><a href="#" title="Menü schliessen" class="alt-menu__close-button"><svg class="fa-icon fa-icon-close fa-icon-on-bright"><use xlink:href="#icon-close"></use></svg> Close</a></div>');

  /*
   * The close-function of the menu
   * It is not only tied to the "close"-Button, but also to the search-button of
   * the special button for very small viewports which resides in the nav-partial.
   * Because in case of search, there is no new pageload
   */
  jQuery('.alt-menu__close-button').add('.js-nav-search-button').click(function(event) {
    altMenuToggleButton.removeClass('js-alt-menu-toggle-button--active');
    if (windowWidth <= 767) {
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
      jQuery('.alt-menu').css({
        'transform': 'translateX(-100%)',
        '-webkit-transform': 'translateX(-100%)',
        '-ms-transform': 'translateX(-100%)',
        'transition': 'all .25s ease-in-out',
        '-webkit-transition': 'all .25s ease-in-out',
        '-ms-transition': 'all .25s ease-in-out'
        });
    }
  });

});