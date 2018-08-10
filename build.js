const buildify = require('buildify');

buildify()
  .concat([
    'Resources/Private/JavaScript/ipoa.js',
    'Resources/Private/JavaScript/menu.js',
    'Resources/Private/JavaScript/languagemenu.js'
  ])
  .save('Build/JavaScript/concatenated.js');

buildify()
  .concat([
    'node_modules/jquery/dist/jquery.min.js',
    'Resources/Public/JavaScript/html5shiv.js',
    'Resources/Public/JavaScript/picturefill.min.js'
  ])
  .save('Resources/Public/JavaScript/vendor.min.js');
