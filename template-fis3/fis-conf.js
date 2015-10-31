/**********
fis-conf.js
***********/
;(function($){
'use strict';
var supportForIE = true;
//使用md5
var USE_HASH = false;
//md5 连接符
var MD5_CONNECTOR = '.';
//使用相对路径 !`相对路径`和`Sprite`冲突
var USE_RELATIVE = true;
//JS lint
var LINT_JS = true;
//CSS lint
var LINT_CSS = true;

//有损压缩PNG
var PNG_LOSSY = true;

var prod = $.media('production');
var dev = $.media('dev');

var pluginUglifyJS = getPlugin('fis-optimizer-uglify-js', {
});

var pluginAutoPrefixer = getPlugin('fis-postprocessor-autoprefixer', {
  browsers : (supportForIE ? [
    'ie >= 5.5',
  ] : [
    'ie >= 9',
  ]).concat([
    'and_chr >= 1',
    'and_ff >=1',
    'and_uc >=1',
    'android >= 2.1',
    'bb >= 7',
    'chrome >= 4',
    'edge >= 12',
    'firefox >= 2',
    'ie_mob >= 10',
    'ios_saf >= 3.2',
    'op_mini >= 5',
    'op_mob >= 10',
    'opera >= 9',
    'safari >= 3.1',
  ]),
});

var pluginCleanCSS = getPlugin('fis-optimizer-clean-css', {
  compatibility : (supportForIE ? [
    '+properties.ieBangHack',
    '+properties.iePrefixHack',
    '+properties.ieSuffixHack',
    '+selectors.ie7Hack',
  ] : []),
  keepSpecialComments : 0,
});

var pluginPNGCompressor = getPlugin('fis-optimizer-png-compressor', {
  type : PNG_LOSSY ? 'pngquant' : 'pngcrush',
  speed : 1,
});


var pluginJPGCompressor = getPlugin('fis-optimizer-jpeg-compressor', {
  progressive : true
});

$.set('project.ignore', [
  '.**',
  'node_modules/**',
  'output/**',
  '.git/**',
  '.svn/**',
  'fis-conf.js',
]);
$.match('_**', {release: false});
$.set('livereload.hostname', 'localhost');

if (USE_HASH) {
  $.set('project.md5Length', 6);
  $.set('project.md5Connector', MD5_CONNECTOR);
  $.match('*', {
    useHash: USE_HASH
  });
}

if (USE_RELATIVE) {
  $.hook('relative');
  $.match('*', {
    relative: USE_RELATIVE
  });
}

var preProcessor = [
  {
    'ext' : 'less',
    'type' : 'css',
    'parser' : 'fis-parser-less-2.x',
  },
  {
    'ext' : ['sass','scss'],
    'type' : 'css',
    'parser' : 'fis-parser-sass',
  },
  {
    'ext' : 'styl',
    'type' : 'css',
    'parser' : 'fis-parser-stylus2',
  },
  {
    'ext' : 'coffee',
    'type' : 'js',
    'parser' : 'fis-parser-coffee-script',
  },
  {
    'ext' : 'es6',
    'type' : 'js',
    'parser' : 'fis-parser-es6-babel',
  },
  {
    'ext' : ['ts', 'tsx'],
    'type' : 'js',
    'parser' : 'fis3-parser-typescript',
  },
];



var fileExts = {};
preProcessor.forEach(function(data){
  var ext = toArray(data.ext);
  var type = data.type;
  var parser = getPlugin(data.parser);
  var processor = {
    rExt : '.' + type,
    parser : parser,
  };
  if (data.lint) {
    processor.lint = getPlugin(data.lint);
  }
  $.match(getExtsReg(ext), processor);
  $.match(getExtsReg(ext, true), processor);  //inline text
  fileExts[type] = fileExts[type] || [];
  fileExts[type] = fileExts[type].concat(ext);
});

//CSS files
$
  .match('*.css', {
    lint :  LINT_CSS ? $.plugin('csslint') : null,
  })
  .match(getExtsReg('css'), {
    postprocessor : pluginAutoPrefixer,
  })
  .match(getExtsReg('css', true), {
    postprocessor : pluginAutoPrefixer,
  })
  ;

//JS files
$
  .match('*.js', {
    lint : LINT_JS ? getPlugin('fis-lint-jshint') : null,
  })
  ;

// HTML
/*
$
  .match('*.html',{
    postpackager : getPlugin('fis-postpackager-replace', {

    });
  });
*/

prod
  .match(getExtsReg('css'), {
      optimizer: pluginCleanCSS,
      useSprite: true,
  })
  .match('*.html:css', {
    //optimizer: pluginCleanCSS
  })
  .match(getExtsReg('js'), {
    optimizer: pluginUglifyJS
  })
  .match('*.html:js', {
    //optimizer: $.plugin('uglify-js')
  })
  .match('*.png', {
      optimizer: pluginPNGCompressor
  })
/* useless
  .match('*.jpg', {
      optimizer: pluginJPGCompressor
  })
*/
  .match('*.min.*', {
      optimizer: null
  })
  ;

$.match('*.min.*', {
  lint: null,
});

$.match('::package', {
    spriter: $.plugin('csssprites', {
        margin : 10,
        layout : 'linear', //'linear/matrix' default linear
    })
});

/*
    $.match('::package', {
      postpackager: $.plugin('loader', {
        allInOne: true
      })
    });
*/

/*
    $.match('*.{less,css}', {
      packTo: '/static/aio.css'
    });

    $.match('*.js', {
      packTo: '/static/aio.js'
    });
*/

prod
  .match('**', {
    deploy: $.plugin('local-deliver', {
      to: './release'
    })
  });


//help functions
function toArray(s){
  return s.push ? s.slice() : s.split(',');
}
function getPlugin(s, options){
  return s.__plugin ? s : $.plugin(s.replace(/^(?:fis|fis3)\-(?:lint|parser|optimizer|postprocessor|postpackager)\-/, ''), options || {});
}
function getExtsReg(ext, inline){
  var exts = [];
  if(fileExts[ext]){
    exts = fileExts[ext].slice();
    exts.unshift(ext);
  }else{
    exts = toArray(ext);
  }
  return (inline ? '*.html:' : '*.') + (1 === exts.length ? exts[0] : '{' + exts.join(',') + '}');
}
})(fis);
