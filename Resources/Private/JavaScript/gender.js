/**
 * Together with the correct css, this replaces the genderstar and the following sequences so, that
 * screen reader don't read the genderstar
 */

jQuery(() => {

  const stringIn = '<span class="genderstar" aria-hidden="true">*</span><span aria-hidden="true">in</span><span visually-hidden="true">In</span>';
  const stringInnen = '<span class="genderstar" aria-hidden="true">*</span><span aria-hidden="true">innen</span><span visually-hidden="true">Innen</span>';

  const replaced = jQuery('main').html().replaceAll('*innen', stringInnen).replace('*in', stringIn);

  jQuery('main').html(replaced);

});
