react-datepicker
================
Datepicker component for react 支持重大节日显示，不可用日期设置

demo: http://xuluxi.github.io/react-datepicker/

![](http://xuluxi.github.io/react-datepicker/img/demo.png)

## Configuration

- date : (Date object) default selected date
- unavailableAfter : (Date object) can't be selected after that date
- unavailableBefore : (Date object) can't be selected before that date
- disabled : (Boolean) can't be used
- showToday : (Boolean) show '今天'
- showHoliday : (Boolean) show holidays in china

## Usage 
npm: npm install react-datepicker-cn
The css is in assets folder, I have not pack it in JS, you should add it by youself;
```jsx

var React = require('react');
var DatePicker = require('react-datepicker-cn');

React.render(<DatePicker date={ new Date() } />, document.body);

```jsx

