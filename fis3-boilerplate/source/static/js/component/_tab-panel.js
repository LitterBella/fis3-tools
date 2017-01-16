  var TAB_PANEL_SELECTOR = '.u-tab-panel';
  var TAB_PANEL_CURRENT_CLASS = 'is-current';

  function initTabPanel() {
    var container = $(this);
    container.on('click', '.u-tab', function() {
      $(this).addClass(TAB_PANEL_CURRENT_CLASS)
        .siblings().removeClass(TAB_PANEL_CURRENT_CLASS);
    });
    var tabs = $('.u-tab', this);
    var initialTab = tabs.filter('.' + TAB_PANEL_CURRENT_CLASS);
    if (!initialTab.length) {
      tabs.eq(0).addClass(TAB_PANEL_CURRENT_CLASS);
    }
  }

  $(function() {
    $(TAB_PANEL_SELECTOR).each(initTabPanel);
  });
