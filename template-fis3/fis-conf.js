/*!
fis-conf.js
by fisker Cheung <lionkay@gmail.com>
verion 0.9
last update 2016.1.7
*/

;(function($) {
  'use strict';
  /* eslint comma-dangle: 0 */
  var ENV = {
    FIS_MEDIA: process.env.FIS_MEDIA || $.project.currentMedia(),
    NODE: process.version,
    TEMP_RESOURCE_FOLDER: process.env.TEMP_RESOURCE_FOLDER || '$$$TEMP_RESOURCE$$$',
    RELEASE_FOLDER: (process.env.RELEASE_FOLDER || 'release'),
  };

  var CONFIG = {
    LEGACY_IE: true, // IE < 9 支持
    LINT: {
      HTML: true, // html 代码检查
      CSS: true, // css 代码检查
      JS: true, // js 代码检查
    },
    FIX: {
      HTML: false, // 暂无插件修复
      CSS: false, // stylelint 时使用 stylefmt 自动修复
      JS: false, // eslint 自动修复
    },
    OPTIMIZER: {
      CSS: false, // css 代码压缩
      JS: false, // js 代码压缩
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
    LIVERELOAD: {
      // PORT: 1988, // livereload 端口，留空自动查找
      // HOSTNAME: 'localhost', // livereload IP地址，留空自动查找
    },
    //忽略文件
    IGNORE: {
      global: [
        '.**',
        '.{git,svn,hg,CVS,idea,sass-cache}/**',
        '{node_modules,bower_components}/**',
        '*.{bat,cmd,sh,tmp,bak}',
        'Thumbs.db',
        'fis-conf.js',
      ],
      release: [
        '_**',
      ],
      lint: [
        '*{.,-}min.**',
        'lib/**',
        'thirdparty/**',
        'third{_,-}party/**',
        'vendors/**',
      ],
      optimizer: [
        '*{.,-}min.**',
        //'lib/**',
        //'thirdparty/**',
        //'third{_,-}party/**',
        //'vendors/**',
      ],
    },
  };

  var PLUGINS_CONFIG = {
    'fis-parser-node-sass': {
        includePaths: [],
        indentType: 'space',
        indentWidth: 2,
        linefeed: 'lf',
        omitSourceMapUrl: false,
        //outFile: '',
        outputStyle: 'expanded', //nested, expanded, compact, compressed
        precision: 8, //default 5
        sourceComments: ENV.FIS_MEDIA === 'dev',
        sourceMap: false,
        sourceMapContents: true,
        sourceMapEmbed: ENV.FIS_MEDIA === 'dev',
        //sourceMapRoot: ''
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
        'firefox >= 16', // >=16: -moz-animation // 2
        'ie_mob >= 10',
        'ios_saf >= 3.2',
        'op_mini >= 5',
        'op_mob >= 10',
        'opera >= 12.1', // >=12.1 ? -o-animation // 9
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
      advanced: !CONFIG.LEGACY_IE,
      compatibility: CONFIG.LEGACY_IE ? [
        '+properties.ieBangHack',
        '+properties.iePrefixHack',
        '+properties.ieSuffixHack',
        '-properties.merging',
        '+selectors.ie7Hack',
      ] : [],
      keepSpecialComments: 0,
    },
    'fis-optimizer-png-compressor': {
      type: CONFIG.OPTIMIZER.PNG && CONFIG.OPTIMIZER.PNG.LOSSY ? 'pngquant' : 'pngcrush',
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
      to: './' + ENV.RELEASE_FOLDER,
    },
    'fis-parser-coffee-script': {
      //header: true,
    },
    'fis-parser-babel-5.x': {
      blacklist: ['regenerator'],
      optional: ['asyncToGenerator'],
      stage: 3,
      sourceMaps: ENV.FIS_MEDIA === 'dev',
    },
    'fis-parser-babel-6.x': {
      presets: 'react',
      sourceMaps: ENV.FIS_MEDIA === 'dev',
    },
    'fis-parser-jade': {
      pretty: true,
    },
    'fis-parser-jade-to-html': {
      pretty: true,
    },
    'fis3-lint-htmlhint': {},
    'fis3-lint-eslint-noisy': {
      fix: CONFIG.FIX.JS,
      useEslintrc: true
    },
    'fis3-lint-stylelint': {
      fix: CONFIG.FIX.CSS,
    },
    'fis3-optimizer-imagemin': {}
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

  var preProcessors = [
    {
      ext: 'less',
      type: 'css',
      // lint: CONFIG.LINT.CSS ? 'fis3-lint-stylelint' : null,
      parser: 'fis-parser-less-2.x',
    },
    {
      ext: ['sass', 'scss'],
      type: 'css',
      // lint: CONFIG.LINT.CSS ? 'fis3-lint-stylelint' : null,
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
  ];

  var standardProcessors = [
    {
      type: 'css',
      lint: CONFIG.LINT.CSS ? 'fis3-lint-stylelint' : null,
      preprocessor: CONFIG.LEGACY_IE ? 'fis-preprocessor-cssgrace' : null,
      optimizer: CONFIG.OPTIMIZER.CSS ? 'fis-optimizer-clean-css-2x' : null,
      postprocessor: ['fis-postprocessor-autoprefixer'].concat(
          (CONFIG.OPTIMIZER.CSS || ENV.FIS_MEDIA === 'dev') ?
          [] :
          ['fis3-postprocessor-stylefmt']
        ),
      useSprite: true
    },
    {
      type: 'js',
      lint: CONFIG.LINT.JS ? 'fis3-lint-eslint-noisy' : null,
      optimizer: CONFIG.OPTIMIZER.JS ? 'fis-optimizer-uglify-js' : null,
    },
    {
      type: 'png',
      optimizer: CONFIG.OPTIMIZER.PNG ? 'fis-optimizer-png-compressor' : null,
      //optimizer: CONFIG.OPTIMIZER.PNG ? 'fis3-optimizer-imagemin' : null,
    },
    {
      type: 'jpg',
      optimizer: CONFIG.OPTIMIZER.JPEG ? 'fis3-optimizer-imagemin' : null,
    },
    {
      type: 'gif',
      optimizer: CONFIG.OPTIMIZER.JPEG ? 'fis3-optimizer-imagemin' : null,
    },
    {
      type: 'svg',
      optimizer: CONFIG.OPTIMIZER.JPEG ? 'fis3-optimizer-imagemin' : null,
    },
    {
      type: 'html',
      lint: CONFIG.LINT.HTML ? 'fis3-lint-htmlhint' : null,
      optimizer: CONFIG.OPTIMIZER.HTML ? 'fis-optimizer-htmlmin' : null,
    }
  ];

  var fileExts = {};
  var hasOwn = fileExts.hasOwnProperty;
  var slice = pluginTypes.slice;

  if (CONFIG.IGNORE.global) {
    $.set('project.ignore', CONFIG.IGNORE.global);
  }

  CONFIG.IGNORE.release.forEach(function(preg) {
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

  if (ENV.FIS_MEDIA === 'prod') {
    $.set('project.md5Length', CONFIG.HASH.LENGTH);
    $.set('project.md5Connector', CONFIG.HASH.CONNECTOR);
    CONFIG.HASH.USE.forEach(function(reg) {
      $.match(reg, {
        useHash: true
      });
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
    return s.split ? s.split(',') : slice.call(s);
  }

  function extend(dest) {
    var sources = toArray(arguments);
    sources.shift();
    sources.forEach(function(source) {
      var prop;
      source = source || {};
      for (prop in source) {
        if (hasOwn.call(source, prop)) {
          dest[prop] = source[prop];
        }
      }
    });
    return dest;
  }

  function parsePlugin(pluginName) {
    var reg = new RegExp([
      '^',
      '(?:fis|fis3)-',
      '(' + pluginTypes.join('|') + ')-',
      '(.*?)',
      '$'
    ].join(''));
    var match = pluginName.match(reg);
    return match && match[2] && {
      name: match[0],
      type: match[1],
      short: match[2],
    };
  }

  function getPluginOptions(pluginName) {
    var shortPluginName = parsePlugin(pluginName).short;
    var options = PLUGINS_CONFIG[pluginName] || PLUGINS_CONFIG[shortPluginName] || {};
    return options;
  }

  function getPlugin(pluginNames) {
    var plugins = [];

    if (pluginNames.__plugin) {
      return pluginNames;
    }
    if (!pluginNames) {
      return null;
    }
    toArray(pluginNames).forEach(function(pluginName) {
      var plugin;
      var shortPluginName;

      if (!pluginName) {
        return null;
      }
      if (pluginName.__plugin) {
        plugin = pluginName;
      } else {
        shortPluginName = parsePlugin(pluginName).short;
        plugin = $.plugin(shortPluginName, getPluginOptions(pluginName));
      }
      plugins.push(plugin);
    });

    return 1 === plugins.length ? plugins[0] : plugins;
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

  function getExtsReg(ext, inline) {
    var exts = [];
    var prefix = '';

    if (ext.split && fileExts[ext]) {
      exts = toArray(fileExts[ext]);
      exts.unshift(ext);
    } else {
      exts = toArray(ext);
    }
    exts = 1 === exts.length ? exts : '{' + exts.join(',') + '}';
    if (true === inline) {
      prefix = '*.html:';
    } else if (false === inline) {
      prefix = '*.';
    } else {
      prefix = '{*.html:,*.}';
    }
    return prefix + exts;
  }

  preProcessors.forEach(function(data) {
    var exts = toArray(data.ext);
    var processor = {
      rExt: '.' + data.type,
    };
    // plugins
    var plugins = ['parser', 'lint'];

    fileExts[data.type] = fileExts[data.type] || [];
    fileExts[data.type] = fileExts[data.type].concat(exts);
    $.match(getExtsReg(exts), processor);

    var processor = {};
    plugins.forEach(function(pluginType) {
      if (data[pluginType]) {
        processor[pluginType] = getPlugin(data[pluginType]);
      }
    });
    $.match(getExtsReg(exts), processor);
  });

  standardProcessors.forEach(function(data) {
    var processor = {};

    // lint can't used on preProcessor
    // and we only lint for prodution
    if (data.lint) {
      $.match(getExtsReg(toArray(data.type)), {
        lint: getPlugin(data.lint)
      });
    }

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


  ['optimizer', 'lint'].forEach(function(type) {
    (CONFIG.IGNORE[type] || []).forEach(function(reg) {
      var settings = {};
      settings[type] = null;
      $.match(reg, settings);
    });
  });

  // standrad files should release
  // for inline include
  $.match('_' + getExtsReg(['png', 'jpg', 'gif', 'css', 'js', 'html'], false), {
    release: '/' + ENV.TEMP_RESOURCE_FOLDER + '/$0',
    relative: '/',
  });

  // _*.html should not lint
  // _*.js should not lint
  $.match('_' + getExtsReg(['html', 'js'], false), {
    lint: null,
  });

  $.match('::package', pluginToProperties('fis-spriter-csssprites'));

  if (ENV.FIS_MEDIA === 'prod') {
    $.match('**', pluginToProperties('fis3-deploy-local-deliver'));
  }

  if (ENV.FIS_MEDIA === 'dev') {
    $.match('**', {
      optimizer: null
    });
  }
})(global.fis);
