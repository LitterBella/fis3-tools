  var NUMBER_INPUT_SELECTOR = '.u-number-input';

  function initNumberInput() {
    var container = $(this);
    if (container.hasClass('is-inited')) {
      return;
    }

    container.addClass('is-inited');

    var input = $('input', container[0]);
    var btnDecrease = $('<button class="u-number-input-decrease-btn" type="button">-</button>').appendTo(container);
    var btnIncrease = $('<button class="u-number-input-increase-btn" type="button">+</button>').appendTo(container);

    function getFloatProperty(prop, defalutValue) {
      var value = parseFloat(input.attr(prop));
      return isFinite(value) ? value : defalutValue;
    }

    var min = getFloatProperty('min', Number.MIN_VALUE);
    var max = getFloatProperty('max', Number.MAX_VALUE);
    var step = getFloatProperty('step', 1);

    function increaseValue(valueIncrese) {
      valueIncrese = valueIncrese || 0;
      var currentValue = +input.val() || 0;
      var newValue = currentValue + valueIncrese;
      if (newValue < min) {
        newValue = min;
      } else if (newValue > max) {
        newValue = max;
      }

      if (newValue !== currentValue) {
        input.val(newValue);
        input.trigger('change');
      }

      if (!valueIncrese || newValue !== currentValue) {
        var isMuted = input.prop('disabled') || input.prop('readonly');
        btnDecrease.prop('disabled', isMuted || newValue <= min);
        btnIncrease.prop('disabled', isMuted || newValue >= max);
      }
    }

    btnDecrease.on('click', function() {
      increaseValue(- step);
    });
    btnIncrease.on('click', function() {
      increaseValue(step);
    });
    input.on('input', function(){
      increaseValue();
    });
    increaseValue();
  }

  $(function() {
    $(NUMBER_INPUT_SELECTOR).each(initNumberInput);
  });
