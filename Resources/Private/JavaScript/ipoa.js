jQuery(function () {

  /**
   * carousel related code
   * just show one image at a time
   */
  const carousel = function (carel) {
    const arr = jQuery(carel).find('.ce-row');

    jQuery(arr).hide();
    jQuery(arr[0]).show();

    (function recurse(counter) {
      const item = arr[counter];
      Reflect.deleteProperty(arr[counter]);
      arr.push(item);
      setTimeout(function () {
        jQuery(carel).find('.ce-row').hide();
        recurse(counter + 1);
        jQuery(item).show();
      }, 2500);
    })(0);
  };

  jQuery.each(jQuery('.footer__column .ce-gallery'), function () {
    carousel(jQuery(this));
  });


  /**
   * Prevent the logocarousel to change it's height
   * Find the logocarousel, get it's ID, get the max height of the images
   * and set the height of the logocarousel accordingly
   */
  const getLogoHeight = () => {
    let logoHeight = 100;

    jQuery(this).find('.footer__column img').each(function () {
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
  let footerHideHeight = getLogoHeight() + 20;
  footerHideHeight += jQuery('.tracking').height();
  footerHideHeight += jQuery('.footer__column h2').height();
  jQuery('.footer').css({'height': footerHideHeight + 'px'});
  jQuery('.footer-hide').css({'height': footerHideHeight + 20 + 'px'});
  /**
   * recalculate (and set the new) footer height with every window resize
   */
  jQuery(window).resize(function () {
    jQuery('.footer').css({'height': footerHideHeight + 'px'});
    jQuery('.footer-hide').css({'height': footerHideHeight + 20 + 'px'});
  });
  jQuery(window).on('load', function () {
    jQuery('.footer').css({'height': footerHideHeight + 'px'});
    jQuery('.footer-hide').css({'min-height': footerHideHeight + 20 + 'px'});
  });


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
