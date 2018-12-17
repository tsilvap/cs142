'use strict';

var DatePicker = function DatePicker(id, callback) {
    this.id = id;

    var date = { month: 0, day: 0, year: 0 };

    callback(id, date);
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
DatePicker.prototype.renderTable = function renderTable(monthName) {

    document.getElementById(this.id).innerHTML = [
        '<table>',
        '<thead>',
        '<tr>',
        '<th colspan="7">', monthName, '</th>',
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
    var day = date.getDate(),
        month = date.getMonth(),
        calendarBody,
        daysHtml = '',
        i;

    this.renderTable(this.monthName(month));

    date.setDate(1);  // Change to first day of the month
    if (date.getDay() !== 0) {
        // If the day of week is not a Sunday...
        // ...go backwards in time until we hit a Sunday
        date.setDate(1 - date.getDay());
    }

    // Fill calendar body with days
    calendarBody = document.querySelector('#' + this.id + ' tbody');
    while (date.getMonth() % 12 !== (month + 1) % 12) {
        daysHtml += '<tr>';
        for (i = 0; i < 7; i += 1) {
            day = date.getDate();
            daysHtml += '<td>' + day + '</td>';
            date.setDate(day + 1);
        }
        daysHtml += '</tr>';
    }
    calendarBody.innerHTML = daysHtml;
};
