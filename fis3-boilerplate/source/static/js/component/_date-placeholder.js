  // TODO: webkit-only

  var INPUT_NO_PLACEHOLDER_SELECTOR = '[type="date"], [type="time"], [type="datetime-local"], [type="month"], [type="week"]';
  function supportPlaceholder() {
    var el = $(this);
    var placeholder = el.attr('placeholder');
    if (placeholder) {
      el
        .data('placeholder', placeholder)
        .on('change blur', function() {
          if (el.val()) {
            el.removeAttr('placeholder');
          } else {
            el.attr('placeholder', el.data('placeholder'));
          }
        })
        .on('focus', function() {
           el.removeAttr('placeholder');
        })
        .trigger('blur');
    } else {
      el.removeAttr('placeholder');
    }
  }

  $(function() {
    $(INPUT_NO_PLACEHOLDER_SELECTOR).each(supportPlaceholder);
  });
