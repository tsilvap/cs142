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
        tableRow;

    this.renderTable(this.monthName(month));

    date.setDate(1);  // Change to first day of the month
    if (date.getDay() !== 0) {
        // If the day of week is not a Sunday...
        // ...go backwards in time until we hit a Sunday
        date.setDate(1 - date.getDay());
    }

    calendarBody = document.querySelector('#' + this.id + ' tbody');
    calendarBody.appendChild(document.createElement('tr'));

    tableRow = document.querySelector('#' + this.id + ' tbody tr');

    // Fill calendar body with days
    while (date.getMonth() % 12 !== (month + 1) % 12) {
        calendarBody.appendChild(document.createElement('tr'));
        tableRow = calendarBody.lastChild;
        for (var i = 0; i < 7; i++) {
            var elem = document.createElement('td');
            var currDate = date.getDate();
            elem.textContent = currDate;
            tableRow.appendChild(elem);
            date.setDate(currDate + 1);
        }
    }
};
