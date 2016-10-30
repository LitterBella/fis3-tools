  function initRangeInput() {
    var container = $(this).addClass('is-inited');
    var input = $('input', container[0]);
    var isVertical = (input.attr('orient') || '').toLowerCase() === 'vertical';
    if (isVertical) {
      container.addClass('is-vertical');
    }

    if (window.navigator.userAgent.indexOf('AppleWebKit') === -1) {
      return;
    }
    var track = $('<span class="u-track">').appendTo(container);
    var indicate = $('<span class="u-indicate" style="width: 0">').appendTo(track);
    var min = +input.attr('min') || 0;
    var max = +input.attr('max') || 1;
    input.on('input', function() {
      var percentage = (min + input.val()) / (max - min) * 100;
      indicate.css({
        width: percentage + '%'
      });
    }).trigger('input');
  }

  $(function() {
    $('.u-range-input').each(initRangeInput);
  });
