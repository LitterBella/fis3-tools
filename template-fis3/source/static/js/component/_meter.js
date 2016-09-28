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
    var value = +meter.val() || +meter.attr('value');
    setMeterValue(meter, value);
  }

  function setMeterValue(meter, value) {
    meter = $(meter).val(value);
    if (supportMeter) {
      return;
    }
    var max = +meter.attr('max') || 1;
    var meterBar = meter.find('.meter-bar');

    var low = +meter.attr('low');
    var high = +meter.attr('high');
    var optimum = +meter.attr('optimum');
    var isHigerBetter = true;
    if (optimum && optimum <= low) {
      isHigerBetter = false;
    }

    var className = 'meter-sub-optimum-value';
    if (isHigerBetter) {
      if (value <= low) {
        className = 'meter-sub-sub-optimum-value';
      } else if (value >= high) {
        className = 'meter-optimum-value';
      }
    } else {
      if (value >= high) {
        className = 'meter-sub-sub-optimum-value';
      } else if (value <= low) {
        className = 'meter-optimum-value';
      }
    }

    if (value > max) {
      value = max;
    }

    meterBar.css('width', value / max * 100 + '%')[0].className = 'meter-bar ' + className;
  }

  $.fn.meterValue = $.fn.meterVal = function(value) {
    return $(this).each(function() {
      setMeterValue(this, value);
    });
  };

  $(function() {
    $('meter').each(initMeter);
  });
