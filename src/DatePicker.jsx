var React = require('react');
var Calendar = require('./Calendar.jsx');
var DatePicker = React.createClass({
    
    getInitialState: function() {
        var nowDate = this.props.date || new Date(),
            year = nowDate.getFullYear(),
            month = (nowDate.getMonth() + 1),
            date = nowDate.getDate();
        return {
            show : false,
            config : {
                year : year,
                month : month,
                date : date,
                showToday : this.props.showToday,
                showHoliday : this.props.showHoliday,
                showLunarDate : this.props.showLunarDate
            },
            unavailableBefore : this.props.unavailableBefore,
            selectedDate : year + '-' + (month < 10 ? '0'+month : month) + '-' + date
        }
    },

    changeSelectedDate: function (dateStr) {
        this.setState({
            show : false,
            selectedDate : dateStr
        });
        this.props.changeSelectedDate(dateStr);
    },

    showCalendar: function () {
        if (!this.state.show && !this.props.disabled) {
            this.setState({
                show : true
            });
        }
    },

    hideCalendar: function () {
        this.setState({
            show : false
        });
    },

    render: function() {
        var spanClassName = 'input-normal';
        spanClassName += this.state.show ? ' input-active' : '';
        spanClassName += this.props.disabled ? ' input-disabled' : '';
        return (
            <div id="datepicker-wrapper">
                <span onClick={ this.showCalendar } className={ spanClassName }>{ this.state.selectedDate }</span>
                <Calendar show={ this.state.show } 
                    changeSelectedDate={ this.changeSelectedDate } 
                    config={ this.state.config } 
                    unavailableBefore={ this.props.unavailableBefore } 
                    unavailableAfter={ this.props.unavailableAfter }
                    hideCalendar={ this.hideCalendar }/> 
            </div>
        );
    }
});

module.exports = DatePicker;

