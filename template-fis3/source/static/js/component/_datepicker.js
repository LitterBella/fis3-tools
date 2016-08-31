  var uPicker = (function(doc) {
    var i10n = {
      weekdays: {
        shorthand: ['一', '二', '三', '四', '五', '六', '日'],
        longhand: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      },
      months: {
        longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }
    };

    function getDaysInMonth(year, month) {
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return (month === 1 && ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : daysInMonth[month];
    }

    function createElement(tagName, parent, props) {
      props = props || {};
      var el = parent.appendChild(doc.createElement(tagName));
      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          el[prop] = props[prop];
        }
      }
      return el;
    }

    function build(year, month) {
      var days = [];
      var firstDayThisMonth = new Date(year, month, 1, 0, 0, 0);
      var daysInMonth = getDaysInMonth(year, month);
      var lastDayThisMonth = new Date(year, month, daysInMonth, 0, 0, 0);
      var dayOfFirstDay = firstDayThisMonth.getDay();
      var dayOfLastDay = lastDayThisMonth.getDay();
      var i;
      var daysLength = 0;

      if (dayOfFirstDay > 0) {
        var lastDayLastMonth = new Date(firstDayThisMonth - 24 * 60 * 60 * 1000);
        var daysInLastMonth = getDaysInMonth(lastDayLastMonth.getFullYear(), lastDayLastMonth.getMonth());
        i = dayOfFirstDay;
        while (i--) {
          days[daysLength ++] = [daysInLastMonth - i , true];
        }
      }

      i = daysInMonth;
      while(i--) {
        days[daysLength ++] = [daysInMonth - i];
      }

      if (dayOfLastDay < 7) {
        i = 6 - dayOfLastDay;
        while (i--) {
          days[daysLength ++] = [6 - dayOfLastDay - i, false];
        }
      }

      var fragment = document.createDocumentFragment();
      var div = createElement('div', fragment, {
        className: 'u-datepicker-picker'
      });

      var header = createElement('div', div, {
        className: 'u-datepicker-header'
      });
      var button;
      button = createElement('button', header, {
        type: 'button',
        className: 'u-datepicker-prev',
        innerText: '<'
      });

      var input = createElement('input', header, {
        type: 'number',
        className: 'u-datepicker-year',
        value: year,
        step: 1
      });

      var select = createElement('select', header, {
        className: 'u-datepicker-month'
      });
      var option;
      var months = i10n.months.shorthand || i10n.months.longhand;
      i = 0;
      while (i++ < 12) {
        option = createElement('option', select, {
          innerText: months[i - 1],
          value: i - 1,
          selected: month === i - 1
        });
      }

      button = createElement('button', header, {
        type: 'button',
        className: 'u-datepicker-next',
        innerText: '>'
      });

      var table = createElement('table', div, {
        className: 'u-datepicker-calendar'
      });
      var thead = createElement('thead', table);
      var tbody = createElement('tbody', table);
      var tr;
      var th = createElement('tr', thead);

      var weekdays = i10n.weekdays.shorthand || i10n.weekdays.longhand;
      i = 0;
      tr = createElement('tr', thead);
      while (i++ < 7) {
        th = createElement('th', tr, {
          innerText: weekdays[i - 1]
        });
      }

      var td;
      var day;
      i = 0;
      while(day = days.shift()) {
        if (i++ % 7 === 0) {
          tr = createElement('tr', tbody);
        }
        td = createElement('td', tr);

        button = createElement('button', td, {
          type: 'button',
          innerText: day[0],
          className: 'u-datepicker-day' +
            (day[1] === true ? ' is-prev' : day[1] === false ? ' is-next' : '')
        });
      }

      return fragment;
    }

    return {
      build: build
    };

  })(document);



  function initDatePicker() {
    var container = $(this);
    var input = $('[type="date"], [type="time"], [type="datetime-local"], [type="month"], [type="week"]', container[0]);
    var fragment = uPicker.build(2016, 5);
    container.append(fragment);


    $(container).on('click', '.u-datepicker-day', function() {
      var year = +$('.u-datepicker-year').val();
      var month = +$('.u-datepicker-month').val() + 1;
      var day = +$(this).text();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      input.val([year, month, day].join('-'));
      console.log([year, month, day].join('-'));
    });
    $(container).on('click', '.u-datepicker-prev', function() {
      var year = +$('.u-datepicker-year').val();
      var month = +$('.u-datepicker-month').val();
      var lastMonth = new Date(year, month, 1, 0, 0, 0);
      lastMonth = new Date(lastMonth - 24 * 60 * 60 * 1000);
      var fragment = uPicker.build(lastMonth.getFullYear(), lastMonth.getMonth());
      $('.u-datepicker-picker').replaceWith(fragment);
    });
    $(container).on('click', '.u-datepicker-next', function() {
      var year = +$('.u-datepicker-year').val();
      var month = +$('.u-datepicker-month').val() + 1;
      var fragment = uPicker.build(year, month);
      $('.u-datepicker-picker').replaceWith(fragment);
    });


  }


  $(function() {
    $('.u-datepicker').each(initDatePicker);
  });
