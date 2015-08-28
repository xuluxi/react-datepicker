var React = require('react');
var DatePicker = require('../src/DatePicker.jsx');

function changeDate(dateStr) {
    console.log(dateStr);
};
window.onload = function() {
    var demo1 = document.getElementById('demo1'),
        demo2 = document.getElementById('demo2'),
        demo3 = document.getElementById('demo3'),
        demo4 = document.getElementById('demo4'),
        demo5 = document.getElementById('demo5'),
        demo6 = document.getElementById('demo6');

    React.render(<DatePicker date={ new Date() } />, demo1);
    React.render(<DatePicker date={ new Date() } unavailableAfter={ new Date() } />, demo2);
    React.render(<DatePicker date={ new Date() } unavailableBefore={ new Date() } />, demo3);
    React.render(<DatePicker date={ new Date() } changeSelectedDate={ changeDate } showToday={ true } />, demo4);
    React.render(<DatePicker date={ new Date() } changeSelectedDate={ changeDate } showToday={ true } showHoliday={ true } />, demo5);
    React.render(<DatePicker date={ new Date() } disabled={ true }/>, demo6);
};
