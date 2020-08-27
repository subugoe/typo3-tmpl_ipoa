jQuery(() => {

  /**
   * handle on demand content on pages like those for the oa days
   */
  // new version to hide and show on-demand__content
  const onDemandLinks = document.getElementsByClassName('on-demand__link');
  for (let link = 0; link < onDemandLinks.length; link++) {
    onDemandLinks[link].addEventListener('click', (event) => {

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
  jQuery(() => {
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
      }

      if (jQuery(this).scrollTop() < 10) {
        jQuery('.head-nav').removeClass('head-nav--narrow');
      }

      lastScrollTop = st;
    });
  });

});

