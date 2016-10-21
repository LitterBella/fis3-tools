  function initNumberPassword() {
    var HAS_VALUE_CLASS = 'has-value';
    var DIGIT_CLASS = 'u-number-password-digit';
    var DISPLAY_CLASS = 'u-number-password-display';
    var INPUT_WRAP_CLASS = 'u-number-password-input';

    var container = $(this).addClass('is-inited');
    var input = $('input', container[0]);
    var maxlength = +input.attr('maxlength') || 6;
    input.attr({
      'type': 'tel',
      'maxlength': maxlength,
      'autocomplete': 'off'
    });
    var displaySpan = $('<span class="' + DISPLAY_CLASS + '">').appendTo(container[0]);
    var digitSpans = [];
    for (var i =0; i < maxlength; i ++) {
      digitSpans.push('<span class="' + DIGIT_CLASS + '">&nbsp;</span>');
    }

    digitSpans = $(digitSpans.join('')).appendTo(displaySpan[0]);
    if (maxlength !== 6) {
      digitSpans.css({
        width: 1 / maxlength * 100 + '%'
      });
    }

    input.on('input', function() {
      var value = this.value;
      digitSpans.slice(value.length).removeClass(HAS_VALUE_CLASS);
      digitSpans.slice(0, value.length).addClass(HAS_VALUE_CLASS);
    });

    input.on('focus', function() {
      this.value = '';
      digitSpans.removeClass(HAS_VALUE_CLASS);
    });
  }

  $(function() {
    $('.u-number-password').each(initNumberPassword);
  });
