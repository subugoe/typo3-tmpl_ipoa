jQuery(() => {
  /**
   * handle on demand content on pages like those for the oa days
   */
  // new version to hide and show on-demand__content
  const onDemandLinks = document.getElementsByClassName('on-demand__link');

  for (let link = 0; link < onDemandLinks.length; link++) {
    onDemandLinks[link].addEventListener('click', event => {
      let content = event.target.parentNode.nextSibling;
      console.log(content.classList);

      if (content.classList.contains('-opened')) {
        // use loop to catch all paragraphs
        while (content.classList.contains('on-demand__content')) {
          content.classList.remove('-opened');
          content = content.nextSibling;
        }
      } else {
        while (content.classList.contains('on-demand__content')) {
          content.classList.add('-opened');
          content = content.nextSibling;
        }
      }
    });
  }
  /**
   * scroll to top when page is loaded
   */


  jQuery('html,body').animate({
    'scrollTop': 0
  }, 500);
  /**
   * this part allows for in-page anchor clicks that move the scroll position
   * without wrongly covering the content by the top nav bar.
   *
   * 1. TODO : make dirty number clean
   */

  jQuery('.main div a').click(function () {
    const scrollToId = this.hash;
    const offsetTopOfTarget = jQuery(scrollToId).offset().top;
    jQuery('html, body').scrollTop(offsetTopOfTarget - 65); // 1.
  });
  /**
   * change the top menu bar according to scroll status
   */

  jQuery(() => {
    let lastScrollTop = 0;
    const delta = 5;
    jQuery(window).scroll(function () {
      const st = jQuery(this).scrollTop();

      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      } // downscroll code


      if (st > lastScrollTop) {
        jQuery('.js-head-language-links').hide();
        jQuery('.js-head-language-indicator').show();
        jQuery('.head-nav').addClass('head-nav--narrow');
      }

      if (jQuery(this).scrollTop() < 10) {
        jQuery('.head-nav').removeClass('head-nav--narrow');
      }

      lastScrollTop = st;
    });
  });
});
jQuery(() => {
  const menuToggleChildren = function (item) {
    jQuery(item).siblings('.menu__list--indented').toggle();

    if (jQuery(item).find('svg').attr('class') === 'fa-icon fa-icon-angle-double-down') {
      jQuery(item).find('svg').attr('class', 'fa-icon fa-icon-angle-double-right');
      jQuery(item).find('svg').html('<use xlink:href="#icon-angle-double-right"></use>');
    } else {
      jQuery(item).find('svg').attr('class', 'fa-icon fa-icon-angle-double-down');
      jQuery(item).find('svg').html('<use xlink:href="#icon-angle-double-down"></use>');
    }
  }; // add menu per ajax:
  // load answer of ajax-page directly into the element, then execute function


  const animateMenu = function () {
    // Add svg instances to svg tag as it can't be done from typoscript,
    // because the menu is created with a different typeNum without javascript on
    jQuery('.toggle-menu').find('.fa-icon-angle-double-right').html('<use xlink:href="#icon-angle-double-right"></use>');
    jQuery('.toggle-menu').find('.fa-icon-angle-double-down').html('<use xlink:href="#icon-angle-double-down"></use>'); // Now, that the DOM-Elements are available, their behaviour can be configured:
    // Configure toggle-icons (the arrows left of menu items)
    // every arrow-icon in the menu gets to toggle the respective submenu

    jQuery('.toggle-menu').click(function () {
      menuToggleChildren(this);
    }); // detect keyboard /clicks/ on menu toggle buttons
    // keycode 13 = return/enter key

    jQuery('.toggle-menu').focus().keydown(function (event) {
      if (event.keyCode === 13) {
        menuToggleChildren(this);
      }
    }); // when arrow is clicked, move menu up or down

    const menu = jQuery('.js-menu');
    const menuToggleButton = jQuery('.js-menu-toggle-button');
    jQuery(menuToggleButton).click(event => {
      jQuery('html,body').animate({
        'scrollTop': 0
      }, 500);
      jQuery(menu).slideUp();
      event.preventDefault();
    }); // hide all sub menu lists except for the current one
    // for no-js fallback cases they are open by default, so we have to explicitly
    // close them

    jQuery('.alt-menu .menu__list--indented').hide();
    jQuery('.fa-icon-angle-double-down').parent('span').siblings('.menu__list--indented').show();
    jQuery('.alt-menu__content').animate({
      'scrollTop': 0
    }, 500);
  };

  animateMenu();
  /**
   * handle display of menu
   */

  const menuIsActive = function () {
    return jQuery('.alt-menu').hasClass('alt-menu-in-canvas');
  };

  const hideMenu = function () {
    jQuery('.alt-menu').removeClass('alt-menu-in-canvas').addClass('alt-menu-off-canvas');
  };

  const showMenu = function () {
    jQuery('.alt-menu').removeClass('alt-menu-off-canvas').addClass('alt-menu-in-canvas');
  };

  jQuery('.head-nav .menu__button, .alt-menu__close-button').on('click', () => {
    if (menuIsActive()) {
      hideMenu();
    } else {
      showMenu();
    }
  }); // make sure, only active language is visible - except for decision

  jQuery('.head__link-language').on('click', () => {
    jQuery('.head__link-language:not(.head__link-active)').toggleClass('-shown');
  });
  jQuery(window).resize(() => {
    hideMenu();

    if (jQuery(window).width() > 820) {
      jQuery('.alt-menu').css('width', jQuery('.head__text').position().left);
    } else {
      jQuery('.alt-menu').css('width', '100%');
    }
  }); // initial once

  if (jQuery(window).width() > 820) {
    jQuery('.alt-menu').css('width', jQuery('.head__text').position().left);
  } else {
    jQuery('.alt-menu').css('width', '100%');
  }
  /**
   * Breadcrumbs
   */

  /**
   * put "Home" root Element of breadcrumb for IPOA
   * (breadcrumb for OJS begins at higher entry level)
   */


  if (jQuery('li.crumb').first().text() === 'IPOA') {
    jQuery('li.crumb').first().text('Home');
  }
});
/**
 * Together with the correct css, this replaces the genderstar and the following sequences so, that
 * screen reader don't read the genderstar
 */

jQuery(() => {
  const stringIn = '<span class="genderstar" aria-hidden="true">*</span><span aria-hidden="true">in</span><span visually-hidden="true">In</span>';
  const stringInnen = '<span class="genderstar" aria-hidden="true">*</span><span aria-hidden="true">innen</span><span visually-hidden="true">Innen</span>';
  const replaced = jQuery('body').html().replaceAll('*innen', stringInnen).replace('*in', stringIn);
  jQuery('body').html(replaced);
});
