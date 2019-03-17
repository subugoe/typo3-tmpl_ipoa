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
    jQuery('.js-' + place + '-language-links').removeClass('-shown').addClass('-hidden');
    const jsLanguageIndicator = jQuery('.js-' + place + '-language-indicator');

    jsLanguageIndicator.click(function () {
      jQuery('.js-' + place + '-language-links').removeClass('-hidden').addClass('-shown');
      const langHeight = jQuery('.' + place + '__links').height();
      jQuery('.' + place).css({'padding-top': langHeight});
      jsLanguageIndicator.removeClass('-shown').addClass('-hidden');
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
