/* global fis:true */
/*!
fis-conf.js
by fisker Cheung <lionkay@gmail.com>
verion 0.9
last update 2016.1.7
*/
'use strict';
(function($, undefined) {
  var CONFIG = {
    LEGACY_IE: true, // IE < 9 支持
    LINT: {
      CSS: true, // css 代码检查
      JS: true, // js 代码检查
    },
    OPTIMIZER: {
      CSS: true, // css 代码压缩
      JS: true, // js 代码压缩
      HTML: false, // html 代码压缩
      PNG: {
        LOSSY: true, // 有损压缩PNG
      },
      JPEG: {
        PROGRESSIVE: true, // 渐进式 JPEG
      },
    },
    HASH: {
      LENGTH: 6, // md5戳长度
      CONNECTOR: '.', // md5戳连接符
      USE: [
        // '*',
      ],
    },
    USE_RELATIVE: true, // 使用相对路径
    RELEASE_DIR: './release', //发布目录
    LIVERELOAD: {
      //PORT: 1988, // livereload 端口，留空自动查找
      HOSTNAME: 'localhost', // livereload IP地址，留空自动查找
    },
    TEMP_RESOURCE_FOLDER: '$$$TEMP_RESOURCE$$$',
    //忽略文件
    IGNORE: [
      '.**',
      '.{git,svn,hg,CVS,idea,sass-cache}/**',
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
      'vendors/**',
    ],
    OPTIMIZER_IGNORE: [
      '*{.,-}min.**',
      //'lib/**',
      //'thirdparty/**',
      //'third{_,-}party/**',
      //'vendors/**',
    ],
  };

  var PLUGINS_CONFIG = {
    'fis-parser-node-sass': {
      __sperate: true,
      common: {
        includePaths: [],
        indentType: 'space',
        indentWidth: 2,
        linefeed: 'lf',
        omitSourceMapUrl: false,
        //outFile: '',
        outputStyle: 'expanded', //nested, expanded, compact, compressed
        precision: 8, //default 5
        sourceComments: true,
        sourceMap: false,
        sourceMapContents: true,
        sourceMapEmbed: true,
        //sourceMapRoot: ''
      },
      dev: {
        sourceComments: true,
        sourceMapEmbed: true,
      },
      prod: {
        sourceComments: false,
        sourceMapEmbed: false,
      },
    },
    'fis-parser-stylus2': {},
    'fis-parser-less-2.x': {},
    'fis-postprocessor-autoprefixer': {
      browsers: (CONFIG.LEGACY_IE ? ['ie >= 5.5'] : ['ie >= 9']).concat([
        'and_chr >= 1',
        'and_ff >=1',
        'and_uc >=1',
        'android >= 2.1',
        'bb >= 7',
        'chrome >= 4',
        'edge >= 12',
        'firefox >= 2', //>=16: -moz-animation
        'ie_mob >= 10',
        'ios_saf >= 3.2',
        'op_mini >= 5',
        'op_mob >= 10',
        'opera >= 9', //>=12.1 ? -o-animation
        'safari >= 3.1',
      ]),
    },
    'fis-optimizer-uglify-js': {
      //jscs: disable requireCamelCaseOrUpperCaseIdentifiers
      mangle: {
        except: 'exports, module, require, define',
      },
      compress: {
        drop_console: true,
      },
    },
    'fis-optimizer-clean-css-2x': {
      advanced: CONFIG.LEGACY_IE ? false : true,
      compatibility: (CONFIG.LEGACY_IE ? [
        '+properties.ieBangHack',
        '+properties.iePrefixHack',
        '+properties.ieSuffixHack',
        '-properties.merging',
        '+selectors.ie7Hack',
      ] : []),
      keepSpecialComments: 0,
    },
    'fis-optimizer-png-compressor': {
      type: (CONFIG.OPTIMIZER.PNG && CONFIG.OPTIMIZER.PNG.LOSSY) ? 'pngquant' : 'pngcrush',
      speed: 1,
    },
    'fis-optimizer-jpeg-compressor': {
      progressive: CONFIG.OPTIMIZER.JPEG && CONFIG.OPTIMIZER.JPEG.PROGRESSIVE
    },
    'fis-spriter-csssprites': {
      margin: 10,
      layout: 'linear', //'linear/matrix' default linear
    },
    'fis3-deploy-local-deliver': {
      to: CONFIG.RELEASE_DIR,
    },
    'fis-parser-coffee-script': {
      //header: true,
    },
    'fis-parser-babel-5.x': {
      __sperate: true,
      common: {
        blacklist: ['regenerator'],
        optional: ['asyncToGenerator'],
        sourceMaps: false,
        stage: 3,
      },
      dev: {
        sourceMaps: true,
      },
      prod: {
        sourceMaps: false,
      },
    },
    'fis-parser-babel-6.x': {
      __sperate: true,
      common: {
        presets: 'react',
        sourceMaps: false,
      },
      dev: {
        sourceMaps: true,
      },
      prod: {
        sourceMaps: false,
      },
    },
    'fis-parser-jade': {
      pretty: true,
    },
    'fis-parser-jade-to-html': {
      pretty: true,
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

  var prod = $.media('prod');
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

  if (CONFIG.LIVERELOAD.PORT) {
    $.set('livereload.port', CONFIG.LIVERELOAD.PORT);
  }
  if (CONFIG.LIVERELOAD.HOSTNAME) {
    $.set('livereload.hostname', CONFIG.LIVERELOAD.HOSTNAME);
  }

  prod.set('project.md5Length', CONFIG.HASH.LENGTH);
  prod.set('project.md5Connector', CONFIG.HASH.CONNECTOR);
  CONFIG.HASH.USE.forEach(function(reg) {
    prod.match(reg, {
      useHash: true
    });
  });

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
    {
      ext: 'jade',
      type: 'html',
      parser: 'fis-parser-jade',
    },
  ]).forEach(function(data) {
    var exts = toArray(data.ext);
    var processor = {
      rExt: '.' + data.type,
    };
    fileExts[data.type] = fileExts[data.type] || [];
    fileExts[data.type] = fileExts[data.type].concat(exts);
    $.match(getExtsReg(exts), processor);

    // plugins
    var plugins = ['parser', 'lint'];

    ['dev', 'prod'].forEach(function(media) {
      var processor = {};
      plugins.forEach(function(pluginType) {
        if (data[pluginType]) {
          processor[pluginType] = getPlugin(data[pluginType], media);
        }
      });

      $.media(media).match(getExtsReg(exts), processor);
    });
  });

  // standardProccessor
  ([
    {
      type: 'css',
      lint: CONFIG.LINT.CSS ? 'fis-lint-csslint' : null,
      preprocessor: CONFIG.LEGACY_IE ? 'fis-preprocessor-cssgrace' : null,
      optimizer: CONFIG.OPTIMIZER.CSS ? 'fis-optimizer-clean-css-2x' : null,
      postprocessor: 'fis-postprocessor-autoprefixer',
      useSprite: true
    },
    {
      type: 'js',
      //lint: CONFIG.LINT.JS ? ['fis-lint-jshint', 'fis-lint-jscs'] : null,
      lint: CONFIG.LINT.JS ? ['fis-lint-jshint'] : null,
      optimizer: CONFIG.OPTIMIZER.JS ? 'fis-optimizer-uglify-js' : null,
    },
    {
      type: 'png',
      optimizer: CONFIG.OPTIMIZER.PNG ? 'fis-optimizer-png-compressor' : null,
    },
    {
      type: 'jpg',
      optimizer: CONFIG.OPTIMIZER.JPEG ? 'fis-optimizer-jpeg-compressor' : null,
    },
    {
      type: 'html',
      optimizer: CONFIG.OPTIMIZER.HTML ? 'fis-optimizer-htmlmin' : null,
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
  // for inline include
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

  function pluginToProperties(pluginNames) {
    var properties = {};
    toArray(pluginNames).forEach(function(pluginName) {
      var type = parsePlugin(pluginName).type;
      var plugin = getPlugin(pluginName);
      if (properties[type]) {
        properties[type] = properties[type].push ? properties[type] : [properties[type]];
        properties[type].push(plugin);
      } else {
        properties[type] = plugin;
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

  function getPluginOptions(pluginName, media) {
    media = media || 'dev';
    var shortPluginName = parsePlugin(pluginName).short;
    var options = PLUGINS_CONFIG[pluginName] || PLUGINS_CONFIG[shortPluginName] || {};
    return options.__sperate ?
      extend({}, options.common, options[media]) :
      options;
  }

  function getPlugin(pluginNames, media) {
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
      } else {
        var shortPluginName = parsePlugin(pluginName).short;
        plugin = $.plugin(shortPluginName, getPluginOptions(pluginName, media));
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
      source = source || {};
      for (var prop in source) {
        if (hasOwn.call(source, prop)) {
          dest[prop] = source[prop];
        }
      }
    });
    return dest;
  }
})(fis);
