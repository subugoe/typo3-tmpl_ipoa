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
   * find carousels (contents with several images),
   * determine the height of the tallest image and
   * set height of element according to tallest image
   */
  const setCarouselHeight = () => {
    jQuery('.footer__column .ce-gallery, .more__column').each((index, el) => {
      const elements = jQuery(el).find('img').length;
      if (elements > 1) {
        let logoHeight = 100;
        jQuery(el).find('img').each((ix, img) => {
          if (img.height > logoHeight) {
            logoHeight = img.height;
          }
        });

        const columnHeight = logoHeight + 32 + jQuery('.footer__column h2').height();
        jQuery(el).parents('.footer__column').css('height', columnHeight + 'px');
      }
    });
  };
  setCarouselHeight();

  /**
   * Calculate height of footer
   * to determine how much the rest of the content has to slide up
   * There has to be set up a min-height, because otherwise, in very wide screens
   * the headers would not be visible after reload
   */
  const setFooterHeight = () => {
    const footerHeight = jQuery('.footer-hide__content').height();
    jQuery('.footer-hide').css('height', footerHeight + 'px');
  };

  jQuery(window).on('load', function () {
    setFooterHeight();
  });
  jQuery(window).on('resize', function () {
    setFooterHeight();
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

  // const carouselColumn = jQuery('.footer__column .ce-gallery[data-ce-images!="1"]').parents('.footer__column');

});

