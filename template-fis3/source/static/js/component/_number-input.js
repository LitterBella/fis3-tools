  function initNumberInput() {
    var container = $(this).addClass('is-inited');
    var input = $('input', container[0]);
    var btnDecrease = $('<button class="u-number-input-decrease-btn" type="button">-</button>').appendTo(container);
    var btnIncrease = $('<button class="u-number-input-increase-btn" type="button">+</button>').appendTo(container);
    var min = input.attr('min');
    min = min === "0" ? 0 : (+min || Number.MIN_VALUE);
    var max = input.attr('max');
    max = max === "0" ? 0 : (+max || Number.MAX_VALUE);
    var step = +input.attr('step') || 1;

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
        var isMute = input.prop('disabled') || input.prop('readonly');
        btnDecrease.prop('disabled', isMute || newValue <= min);
        btnIncrease.prop('disabled', isMute || newValue >= max);
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
    $('.u-number-input').each(initNumberInput);
  });
