/* global fis:true */
/*!
fis-conf.js
by fisker Cheung <lionkay@gmail.com>
2016.1.4
*/
'use strict';
(function($, undefined) {
  var CONFIG = {
    SUPPORT_FOR_IE: true, // IE < 9 支持
    LINT: [
      'css',  // js 代码检查
      'js',   // css 代码检查
    ],
    OPTIMIZER: [
      'css',  // js 代码压缩
      'js',   // css 代码压缩
      //'html', // html 代码压缩
    ],
    USE_HASH: false, // 文件名添加md5戳
    MD5_LENGTH: 6, // md5戳长度
    MD5_CONNECTOR: '.', // md5戳连接符
    USE_RELATIVE: true, // 使用相对路径
    RELEASE_DIR: './release', //发布目录
    PNG_LOSSY: true, // 有损压缩PNG
    PROGRESSIVE: true, // 渐进式 JPEG
    LIVERELOAD_HOSTNAME: 'localhost', // livereload IP地址，留空自动查找
    TEMP_RESOURCE_FOLDER: '$$$TEMP_RESOURCE$$$',
    //忽略文件
    IGNORE: [
      '.**',
      '.{git,svn,hg,CVS,idea}/**',
      '{node_modules,bower_components}/**',
      '*.{bat,cmd,sh,tmp,bak}',
      'test/**',
      'Thumbs.db',
      'fis-conf.js',
    ],
    RELEASE_IGNORE: [
      '_**',
    ],
    LINT_IGNORE: [
      '*{.,-}min.**',
      'lib/**',
      'thirdparty/**',
      'third{_,-}party/**',
    ],
    OPTIMIZER_IGNORE: [
      '*{.,-}min.**',
      //'lib/**',
      //'thirdparty/**',
      //'third{_,-}party/**',
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
    'fis-parser-less-2.x': {},
    'fis-postprocessor-autoprefixer': {
      browsers: (CONFIG.SUPPORT_FOR_IE ? ['ie >= 5.5'] : ['ie >= 9']).concat([
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
      advanced: CONFIG.SUPPORT_FOR_IE ? false : true,
      compatibility: (CONFIG.SUPPORT_FOR_IE ? [
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
    'fis-spriter-csssprites': {
      margin: 10,
      layout: 'linear', //'linear/matrix' default linear
    },
    'fis3-deploy-local-deliver': {
      to: CONFIG.RELEASE_DIR,
    },
    'fis-parser-babel-5.x': {
      blacklist: ['regenerator'],
      optional: ['asyncToGenerator'],
      //sourceMaps: false,
      stage: 3,
    },
    'fis-parser-babel-6.x': {
      //presets: 'react',
      //sourceMaps: false,
    },
  };

  var pluginTypes = [
    'lint',
    'parser',
    'preprocessor',
    'standard',
    'postprocessor',
    'optimizer',
    'prepacakger',
    'spriter',
    'packager',
    'postpackager',
    'deploy',
  ];

  var prod = $.media('production');
  var dev = $.media('dev');

  var fileExts = {};
  var hasOwn = fileExts.hasOwnProperty;
  var slice = pluginTypes.slice;

  if (CONFIG.IGNORE) {
    $.set('project.ignore', CONFIG.IGNORE);
  }

  CONFIG.RELEASE_IGNORE.forEach(function(preg) {
    $.match(preg, {
      release: false
    });
  });

  //$.set('livereload.port', '1988');
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

  // preProcessor
  ([
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
      ext: ['es', 'es6', 'jsx'],
      type: 'js',
      parser: 'fis-parser-babel-5.x',
    },
    {
      ext: ['ts', 'tsx'],
      type: 'js',
      parser: 'fis3-parser-typescript',
    },
  ]).forEach(function(data) {
      var exts = toArray(data.ext);
      var processor = {
        rExt: '.' + data.type,
      };
      // plugins
      ['parser', 'lint'].forEach(function(type) {
        if (data[type]) {
          processor[type] = getPlugin(data[type]);
        }
      });
      fileExts[data.type] = fileExts[data.type] || [];
      fileExts[data.type] = fileExts[data.type].concat(exts);
      $.match(getExtsReg(exts), processor);
    });

  // standardProccessor
  ([
    {
      type: 'css',
      lint: CONFIG.LINT.indexOf('css') >= 0 ? 'fis-lint-csslint' : null,
      preprocessor: CONFIG.SUPPORT_FOR_IE ? 'fis-preprocessor-cssgrace' : null,
      optimizer: CONFIG.OPTIMIZER.indexOf('css') >= 0 ? 'fis-optimizer-clean-css-2x' : '',
      postprocessor: 'fis-postprocessor-autoprefixer',
      useSprite: true
    },
    {
      type: 'js',
      //lint: CONFIG.LINT.indexOf('js') >= 0 ? ['fis-lint-jshint', 'fis-lint-jscs'] : null,
      lint: CONFIG.LINT.indexOf('js') >= 0 ? ['fis-lint-jshint'] : null,
      optimizer: CONFIG.OPTIMIZER.indexOf('js') >= 0 ? 'fis-optimizer-uglify-js' : '',
    },
    {
      type: 'png',
      optimizer: 'fis-optimizer-png-compressor',
    },
    {
      type: 'jpg',
      optimizer: 'fis-optimizer-jpeg-compressor',
    },
    {
      type: 'html',
      optimizer: CONFIG.OPTIMIZER.indexOf('html') >= 0 ? 'fis-optimizer-htmlmin' : '',
    }
  ]).forEach(function(data) {
      // lint can't used on preProcessor
      if (data.lint) {
        $.match(getExtsReg(toArray(data.type)), {
          lint: getPlugin(data.lint)
        });
      }
      var processor = {};
      ['useSprite'].forEach(function(type) {
        if (type in data) {
          processor[type] = data[type];
        }
      });
      //plugins
      ['preprocessor', 'optimizer', 'postprocessor'].forEach(function(type) {
        if (data[type]) {
          processor[type] = getPlugin(data[type]);
        }
      });

      $.match(getExtsReg(data.type), processor);
    });

  CONFIG.LINT_IGNORE.forEach(function(reg) {
    $.match(reg, {
      lint: null
    });
  });

  CONFIG.OPTIMIZER_IGNORE.forEach(function(reg) {
    $.match(reg, {
      optimizer: null
    });
  });

  CONFIG.RELEASE_IGNORE.forEach(function(reg) {
    $.match(reg, {
      release: false
    });
  });
  // standrad files should release
  $.match('_' + getExtsReg(['png', 'jpg', 'gif', 'css', 'js', 'html'], false), {
    release: '/' + CONFIG.TEMP_RESOURCE_FOLDER + '/$0',
    relative: '/',
  });

  $.match('::package', pluginToProperties('fis-spriter-csssprites'));

  prod
    .match('**', pluginToProperties('fis3-deploy-local-deliver'));

  dev
    .match('**', {
      optimizer: null
    });

  //help functions
  function toArray(s) {
    return s.split ? s.split(',') : slice.call(s);
  }

  function pluginToProperties(pluginNames, pluginOptions) {
    var properties = {};
    toArray(pluginNames).forEach(function(pluginName) {
      var type = parsePlugin(pluginName).type;
      var plugin = getPlugin(pluginName);
      if (properties[type]) {
        properties[type] = properties[type].push ? properties[type] : [properties[type]];
        properties[type].push(plugin);
      }else {
        properties[plugin.type] = plugin;
      }
    });
    return properties;
  }

  function parsePlugin(pluginName) {
    var match = pluginName.match(new RegExp('^(?:fis|fis3)\-(' + pluginTypes.join('|') + ')\-(.*?)$'));
    return match && match[2] && {
      'name': match[0],
      'type': match[1],
      'short': match[2],
    };
  }

  function getPlugin(pluginNames, pluginOptions) {
    if (pluginNames.__plugin) {
      return pluginNames;
    }
    if (!pluginNames) {
      return null;
    }
    var plugins = [];

    toArray(pluginNames).forEach(function(pluginName) {
      if (!pluginName) {
        return null;
      }
      var plugin;
      if (pluginName.__plugin) {
        plugin = pluginName;
      }else {
        var shortPluginName = parsePlugin(pluginName).short;
        var options = pluginOptions || (PLUGINS_CONFIG[pluginName] || PLUGINS_CONFIG[shortPluginName] || {});
        plugin = $.plugin(shortPluginName, extend({}, options));
      }
      plugins.push(plugin);
    });

    return 1 === plugins.length ? plugins[0] : plugins;
  }

  function getExtsReg(ext, inline) {
    var exts = [];
    var prefix = '';

    if (ext.split && fileExts[ext]) {
      exts = toArray(fileExts[ext]);
      exts.unshift(ext);
    } else {
      exts = toArray(ext);
    }
    exts = exts.length === 1 ? exts : '{' + exts.join(',') + '}';
    if (true === inline) {
      prefix = '*.html:';
    } else if (false === inline) {
      prefix = '*.';
    } else {
      prefix = '{*.html:,*.}';
    }
    return prefix + exts;
  }

  function extend(dest) {
    var sources = toArray(arguments);
    sources.shift();
    sources.forEach(function(source) {
      for (var prop in source) {
        if (hasOwn.call(source, prop)) {
          dest[prop] = source[prop];
        }
      }
    });
    return dest;
  }
})(fis);
