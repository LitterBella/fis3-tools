/* global fis:true */
/*!
fis-conf.js
*/
'use strict';
(function($, undefined) {
  var CONFIG = {
    SUPPORT_IE: true, // IE < 9 支持
    USE_HASH: false, // 文件名添加md5戳
    MD5_LENGTH： 6, // md5戳长度
    MD5_CONNECTOR： '.', // md5戳连接符
    USE_RELATIVE: true, // 使用相对路径
    LINT_JS: true, // js 代码检查
    LINT_CSS: true, // css 代码检查
    PNG_LOSSY: true, // 有损压缩PNG
    PROGRESSIVE: true, // 渐进式 JPEG
    LIVERELOAD_HOSTNAME: 'localhost', // livereload IP地址，留空自动查找
    IGNORE: [
      '.**',
      '.git/**',
      '.svn/**',
      'node_modules/**',
      'output/**',
      'test/**',
      'fis-conf.js',
    ], //忽略文件
    RELEASE_IGNORE: [
      '_**',
    ],
    LINT_IGNORE: [
      '*.min.**',
      '*-min.**',
    ],
    OPTIMIZER_IGNORE: [
      '*.min.**',
      '*-min.**',
    ],
  };

  var PLUGINS_CONFIG = {
    'fis-parser-node-sass': {
      //indentType : 'space',
      //indentWidth : 2,
      //linefeed : 'lf',
      outputStyle: 'expanded',
      precision: 8, //default 5
      sourceComments: true,
      //sourceMap : true,
      //sourceMapContents : true,
      //sourceMapEmbed : false,
    },
    'fis-parser-stylus2': {},
    'fis-parser-less-2.x' : {},
    'fis-postprocessor-autoprefixer': {
      browsers: (CONFIG.SUPPORT_IE ? ['ie >= 5.5', ] : ['ie >= 9', ]).concat([
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
    },
    'fis-optimizer-uglify-js': {},
    'fis-optimizer-clean-css-2x': {
      advanced: CONFIG.SUPPORT_IE ? false : true,
      compatibility: (CONFIG.SUPPORT_IE ? [
        '+properties.ieBangHack',
        '+properties.iePrefixHack',
        '+properties.ieSuffixHack',
        '-properties.merging',
        '+selectors.ie7Hack',
      ] : []),
      keepSpecialComments: 0,
    },
    'fis-optimizer-png-compressor': {
      type: CONFIG.PNG_LOSSY ? 'pngquant' : 'pngcrush',
      speed: 1,
    },
    'fis-optimizer-jpeg-compressor': {
      progressive: CONFIG.PROGRESSIVE
    },
  }

  var prod = $.media('production');
  var dev = $.media('dev');

  if (CONFIG.IGNORE) {
    $.set('project.ignore', CONFIG.IGNORE);
  }

  CONFIG.RELEASE_IGNORE.forEach(function(preg) {
    $.match(preg, {
      release: false
    });
  });

  if (CONFIG.LIVERELOAD_HOSTNAME) {
    $.set('livereload.hostname', CONFIG.LIVERELOAD_HOSTNAME);
  }

  if (CONFIG.USE_HASH) {
    if (CONFIG.MD5_LENGTH) {
      $.set('project.md5Length', CONFIG.MD5_LENGTH);
    }
    if (CONFIG.MD5_CONNECTOR) {
      $.set('project.md5Connector', CONFIG.MD5_CONNECTOR);
    }
    $.match('*', {
      useHash: CONFIG.USE_HASH
    });
  }

  if (CONFIG.USE_RELATIVE) {
    $.hook('relative');
    $.match('*', {
      relative: CONFIG.USE_RELATIVE
    });
  }


  //help functions
  function toArray(s) {
    return s.push ? s.slice() : s.split(',');
  }

  function getPlugin(pluginName) {
    if (!pluginName) {
      return null;
    }
    var pluginPrefixRegex = /^(?:fis|fis3)\-(?:lint|parser|preprocessor|postprocessor|optimizer|postpackager)\-/;
    var shortPluginName = pluginName.relace(pluginPrefixRegex, '');
    var pluginOptions = PLUGINS_CONFIG[pluginName] || PLUGINS_CONFIG[shortPluginName] || {};
    return $.plugin(shortPluginName, pluginOptions);
  }
})(fis);


var processor = [
  {
    ext: 'less',
    type: 'css',
    parser: 'fis-parser-less-2.x',
  },
  {
    ext: ['sass', 'scss'],
    type: 'css',
    parser: 'fis-parser-node-sass',
  },
  {
    ext: 'styl',
    type: 'css',
    parser: 'fis-parser-stylus2',
  },
  {
    ext: 'coffee',
    type: 'js',
    parser: 'fis-parser-coffee-script',
  },
  {
    ext: 'es6',
    type: 'js',
    parser: 'fis-parser-es6-babel',
  },
  {
    ext: ['ts', 'tsx'],
    type: 'js',
    parser: 'fis3-parser-typescript',
  }
];

var standardProccessor = [
  {
    ext : 'css',
    lint : 'fis-lint-csslint',
    preprocessor: CONFIG.SUPPORT_IE ? 'fis-preprocessor-cssgrace' : null,
  },
  {
    ext : 'js',
    lint: 'fis-lint-jshint',
  }
]

var standard = {};
processor.forEach(function(data){
  var ext = toArray(data.ext);
 var type = data.type;
  var parser = getPlugin(data.parser);
  var processor = {
    rExt: '.' + type,
    parser: parser,
  };
  if (data.lint) {
    processor.lint = getPlugin(data.lint);
  }
  $.match(getExtsReg(ext), processor);
  $.match(getExtsReg(ext, true), processor); //inline text
  fileExts[type] = fileExts[type] || [];
  fileExts[type] = fileExts[type].concat(ext);
});




var pluginUglifyJS = getPlugin('fis-optimizer-uglify-js', {});

var pluginAutoPrefixer = getPlugin('fis-postprocessor-autoprefixer');

var pluginCleanCSS = getPlugin('fis-optimizer-clean-css-2x');

var pluginPNGCompressor = getPlugin('fis-optimizer-png-compressor', );

var pluginJPGCompressor = getPlugin('fis-optimizer-jpeg-compressor', );

var preProcessor = [];

var fileExts = {};


//CSS files
$
  .match('*.css', {
    lint: LINT_CSS ? $.plugin('csslint') : null,
  })
  .match(getExtsReg('css'), {
    preprocessor: CONFIG.SUPPORT_IE ?
      getPlugin('fis-preprocessor-cssgrace') : null,
    postprocessor: pluginAutoPrefixer,
  })
  .match(getExtsReg('css', true), {
    postprocessor: pluginAutoPrefixer,
  });

//JS files
$
  .match('*.js', {
    lint: LINT_JS ? getPlugin('fis-lint-jshint') : null,
  });

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
  .match('*{.,-}min.*', {
    optimizer: null
  });

$.match('*{.,-}min.*', {
  lint: null,
});

$.match('::package', {
  spriter: $.plugin('csssprites', {
    margin: 10,
    layout: 'linear', //'linear/matrix' default linear
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





function getExtsReg(ext, inline) {
  var exts = [];
  if (fileExts[ext]) {
    exts = fileExts[ext].slice();
    exts.unshift(ext);
  } else {
    exts = toArray(ext);
  }
  return (inline ? '*.html:' : '*.') +
    (1 === exts.length ? exts[0] : '{' + exts.join(',') + '}');
}
})(fis);
