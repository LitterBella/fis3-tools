  // TODO: webkit-only

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
    $('[type="date"], [type="time"], [type="datetime-local"], [type="month"], [type="week"]').each(supportPlaceholder);
  });
