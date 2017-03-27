  var supportMeter = document.createElement('meter').max === 1;

  function initMeter() {
    if (supportMeter) {
      return;
    }
    var meter = $(this);
    var meterBar = meter.find('.meter-bar');
    if (!meterBar.length) {
      $('<div class="meter-bar">').appendTo(meter);
    }
    var value = +meter.attr('value');
    setMeterValue(meter, value);
  }

  function setMeterValue(meter, value) {
    meter = $(meter).val(value);
    if (supportMeter) {
      reeturn;
    }
    var meterBar = meter.find('.meter-bar');
    if (!meterBar.length) {
      return meter.each(initMeter);
    }
    var max = +meter.attr('max') || 1;
    var min = +meter.attr('min') || 0;
    if (max <= min) {
      max = min;
    }

    var low = +meter.attr('low') || min;
    var high = +meter.attr('high') || max;
    if (low < min) {
      low = min;
    }
    if (high > max) {
      high = max;
    }
    var optimum = +meter.attr('optimum') || 0;
    if (optimum < min || optimum > max) {
      optimum = min + (max - min) / 2;
    }

    if (value > max) {
      value = max;
    }
    if (value < min) {
      value = min;
    }

    var className = 'meter-sub-optimum-value';
    if (optimum > high) { // higher is better
      if (value < low) {
        className = 'meter-sub-sub-optimum-value';
      } else if (value >= high) {
        className = 'meter-optimum-value';
      }
    } else {
      if (value > high) {
        className = 'meter-sub-sub-optimum-value';
      } else if (value <= low) {
        className = 'meter-optimum-value';
      }
    }

    var width = min === max ? 0 : (value - min) / (max - min) * 100 + '%';
    meterBar.css('width', width)[0].className = 'meter-bar ' + className;
  }

  $.fn.meterValue = $.fn.meterVal = function(value) {
    return $(this).each(function() {
      setMeterValue(this, value);
    });
  };

  $(function() {
    $('meter').each(initMeter);
  });
