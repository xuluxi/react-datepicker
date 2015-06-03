react-datepicker
================
Datepicker component for react

## Usage 
```jsx
var React = require('react');
var DatePicker = require('react-datepicker');

var StartCalendar = React.createElement(DatePicker, {
    config : {
        year : 2015,
        month : 5,
        date : 8,
        // if show chinese holiday
        hasHoliday : true,
        // if high light today
        showToday : true
    },
    // _changeDate is the callback function if a date is picked
    changeSelectedDate : _changeDate,
    // show or hide the datepicker
    show : true,
    // date can not be picked before unavailabelBefore date , if date is false , all date can be selected
    unavailableBefore : {
        date : false /* Date Object */
    }
});
React.render(StartDatePicker, document.body);

```jsx
