'use strict';

var DatePicker = function DatePicker(id, callback) {
    this.id = id;
    this.callback = callback;
};

/**
 * Return month name from month index (0-11).
 */
DatePicker.prototype.monthName = function monthName(monthIndex) {
    var monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];

    return monthNames[monthIndex];
};

/**
 * Create and render table in the DOM.
 */
DatePicker.prototype.renderTable = function renderTable(monthName, year) {

    document.getElementById(this.id).innerHTML = [
        '<table>',
        '<thead>',
        '<tr>',
        '<th class="month-back">&lt;</th>',
        '<th colspan="5">', monthName.slice(0,3), ' ', year, '</th>',
        '<th class="month-forward">&gt;</th>',
        '</tr>',
        '<tr>',
        '<th>S</th>',
        '<th>M</th>',
        '<th>T</th>',
        '<th>W</th>',
        '<th>T</th>',
        '<th>F</th>',
        '<th>S</th>',
        '</tr>',
        '</thead>',
        '<tbody>',
        '</tbody>',
        '</table>'
    ].join('');
};


/**
 * Render DatePicker in the DOM.
 */
DatePicker.prototype.render = function render(date) {
    var month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear(),
        monthIndex = date.getMonth(),
        that = this,
        tempDate = new Date(year, monthIndex, day),
        tempDay = tempDate.getDate(),
        calendarBody,
        daysHtml = '',
        i;

    this.callback(this.id, { month: month, day: day, year: year });

    this.renderTable(this.monthName(monthIndex), year);

    // Implement back and forward buttons
    document.querySelector('#' + this.id + ' .month-back')
            .addEventListener('click', function (event) {
                that.render(new Date(year, monthIndex - 1));
            });
    document.querySelector('#' + this.id + ' .month-forward')
            .addEventListener('click', function (event) {
                that.render(new Date(year, monthIndex + 1));
            });


    tempDate.setDate(1);  // Change to first day of the month
    if (tempDate.getDay() !== 0) {
        // If the day of week is not a Sunday...
        // ...go backwards in time until we hit a Sunday
        tempDate.setDate(1 - tempDate.getDay());
    }

    // Fill calendar body with days
    calendarBody = document.querySelector('#' + this.id + ' tbody');
    while (tempDate.getMonth() % 12 !== (monthIndex + 1) % 12) {
        daysHtml += '<tr>';
        for (i = 0; i < 7; i += 1) {
            tempDay = tempDate.getDate();
            daysHtml += '<td>' + tempDay + '</td>';
            tempDate.setDate(tempDay + 1);
        }
        daysHtml += '</tr>';
    }
    calendarBody.innerHTML = daysHtml;
};
