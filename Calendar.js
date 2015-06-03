/**
 * 日历组件
 */
'use strict';
var React = require('react');

var Calendar = {
    /** 
     * 日期对象转为字符串
     * @param date 日期对象
     * @param type 默认 : '20150302'; 1 : '2015-03-02'
     */
    changeDateObjToStr : function(date, type) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        var Arr = [year, month, day];
        var dateStr = '';
        if (!type) {
            dateStr = Arr.join('');
        } else if (type === 1) {
            dateStr = Arr.join('-');
        };
        return dateStr;
    },
    /** 
     * 比较两个日期对象的先后
     * return {number} 小于零：a > b 大于零：b > a  等于零：a == b
     */
    compareTwoDate : function(a, b) {
        var yearA = a.getFullYear(),
            monthA = a.getMonth(),
            dateA = a.getDate();
        var yearB = b.getFullYear(),
            monthB = b.getMonth(),
            dateB = b.getDate();
        if (yearA !== yearB) {
            return (yearB - yearA);
        } else if (monthA !== monthB) {
            return (monthB - monthA);
        } else {
            return (dateB - dateA);
        };
    },
	/**
      * 农历1900-2100的润大小信息表
      * @Array Of Property
      * @return Hex 
	  * 以十六进制作信息存储，以农历1987年为例：0x0af46 二进制码为 0000 1010 1111 0100 0110 一共五组数据，第五组表示这一年润几月、第一组表示这一年的
      * 润月是大月还是小月（大月30天，小月29天），二，三，四组一共十二个二进制位，从左向右分别表示农历的一到十二月是大月还是小月（1:大月 0:小月）
      */
 	lunarInfo : [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
			0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
			0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
			0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
			0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
			0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
			0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
			0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
			0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
			0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
			0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
			0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
			0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
			0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
			0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
			0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
			0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
			0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
			0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
			0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
			0x0d520],//2100
				
	/**
      * 返回农历y年一整年的总天数
      * @param lunar Year
      * @return Number
      * @eg:var count = calendar.lYearDays(1987) ;//count=384
      */
	lYearDays : function(y) {
		// 348 ＝ 12 ＊ 29
		var i, sum = 348,lunarYear = Calendar.lunarInfo[y-1900];
		for(i = 0x8000; i > 0x8; i = i>>1) { sum += (lunarYear & i)? 1: 0; }
		return(sum+Calendar.leapDays(y));
	},
	
	/**
      * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
      * @param lunar Year
      * @return Number (0-12)
      * @eg:var leapMonth = Calendar.leapMonth(1987) ;//leapMonth=6
      */
	leapMonth : function(y) { 
		return(Calendar.lunarInfo[y-1900] & 0xf);
	},
	
	/**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      * @param lunar Year
      * @return Number (0、29、30)
      * @eg:var leapMonthDay = Calendar.leapDays(1987) ;//leapMonthDay=29
      */
	leapDays : function(y) {
		if(Calendar.leapMonth(y))  { 
			return((Calendar.lunarInfo[y-1900] & 0x10000)? 30: 29); 
		}
		return(0);
	},
	
	/**
      * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
      * @param lunar Year
      * @return Number (-1、29、30)
      * @eg:var MonthDay = Calendar.monthDays(1987,9) ;//MonthDay=29
      */
	monthDays : function(y,m) {
		if(m > 12 || m < 1) {return -1;}//月份参数从1至12，参数错误返回-1
		var aa = ( (Calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
		return aa;
	},
	
	/**
      * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
      * @param y  solar year
      * @param m solar month
      * @param d  solar day
      * @return JSON object
      */
	solar2lunar : function (y, m, d) { //参数区间1900.1.31~2100.12.31
		if(y < 2010 || y > 2030) {return -1;}//年份限定、上限
		if(y === 2010 && m === 1 && d < 31) {return -1;}//下限
        var objDate;
		if(!y) { //未传参  获得当天
			objDate = new Date();
		}else {
			objDate = new Date(y,parseInt(m, 10)-1,d);
		}
		var i, leap=0, temp=0;
		//修正ymd参数
		y = objDate.getFullYear();
        m = objDate.getMonth()+1;
        d = objDate.getDate();
		// 得到输入日期到1900-1-31的天数
		var offset = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(2010,0,31))/86400000;
        offset -= 14;
		for(i = 2010; i < 2031 && offset > 0; i++) { temp=Calendar.lYearDays(i); offset-=temp; }
		// 得到农历年i，并得到农历年的第offset天
		if(offset<0) { offset += temp; i--; }
		
		//农历年
		var year = i;
		
		leap = Calendar.leapMonth(i); //农历i年闰哪个月
		var isLeap = false;
		
		//效验闰月
		for(i=1; i<13 && offset>0; i++) {
			//闰月
			if(leap > 0 && i === (leap+1) && isLeap === false){ 
				--i;
				isLeap = true; 
                temp = Calendar.leapDays(year); //计算农历闰月天数
			}
			else{
				temp = Calendar.monthDays(year, i);//计算农历普通月天数
			}
			//解除闰月
			if(isLeap === true && i === (leap+1)) { isLeap = false;}
			offset -= temp;
		}
		
		if(offset === 0 && leap>0 && i === leap+1)
		if(isLeap){
			isLeap = false;
		}else{ 
			isLeap = true; --i;
		}
		if(offset < 0){ offset += temp; --i; }
		//农历月
		var month = i;
		//农历日
		var day	= offset + 1;
		
		return {'lYear':year,'lMonth':month,'lDay':day,'isLeap':isLeap};
	},

    // 日历数据
    calendarData : null,
    
    // '今天'标记，用来标记‘今天’、‘明天’、‘后天’
    todayStart : 0,

	/**
	 * 日历内容绘制
     * @param year {number} 日历年份
     * @param month {number} 日历月份
     * @param date {number} 日历默认选中的日期
     * @param unavailableBefore {object} 日历在当前日期前不可用 
	 */
	init : function (state, props) {
        this.calendarData = this.getSolarMonthData(state, props);
        var html = this.rendarMonth(this.calendarData, state.unavailableBefore, props);
        return html;
	},

	/**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number 
      */
	solarMonth : [31,28,31,30,31,30,31,31,30,31,30,31],
	/**
	  * 农历的节日表
	  */
	lunarHoliday : {'1-1' : '春节','1-15' : '元宵', '5-5' : '端午', '8-15' : '中秋'},

	/**
	  * 公历的节日表
	  */
	solarHoliday : {'1-1' : '元旦','5-1' : '五一', '10-1' : '国庆', '12-25' : '圣诞'},
	
	
	/**
      * 数字转中文速查表
      * @Array Of Property 
      * @return Cn string 
      */
    nStr1 : ['日','一','二','三','四','五','六','七','八','九','十','十一','十二','十三','十四','十五','十六','十七','十八','十九','廿','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'],
	
	/**
	  * 公历xxxx年是否为闰年 闰年2月29天，平年2月28天
	  * @param year 
	  * @return Boolean
	  */
	isLeapSolarYear : function (year) {
		if (year%4 === 0 && year%100 !== 0 || year%400 === 0) {
			return true;
		} else {
			return false;
		}
	},

    /**
     * 判断传入的日期是否是清明
     * 清明节的公历日期有特定规律，2010 & 2011年是4月5日，2012 & 2013年是4月4日，2014 & 2015年又回到4月5日，以此类推
        qingmingList : ['4-5','4-5','4-4','4-4','4-5','4-5','4-4','4-4','4-5','4-5','4-4','4-4']
     */
    isQingMing : function (year, month, date) {
        if (date !== 4 && date !== 5) {
            return false;
        }
        var d = (year - 2010)/2;
        var s = d%2;
        if (s) {
            return date === 4 ? true : false;
        } else {
            return date === 5 ? true : false;
        }
    },

    /**
     * 获取公历节日
     */
    getSolarHoliday : function (year, month, date) {
        var sHoliday = this.solarHoliday[month + '-' + date];
        // 清明节特殊判断
        if (month === 4) {
            sHoliday = this.isQingMing(year, month, date) ? '清明' : '';
        }
        return sHoliday;
    },
	/**
	  * 获取一个公历月的数据
      * @param year 公历月所在的年份
      * @param month 公历月所在的月份
	  */
	getSolarMonthData : function (state, props) {
		var dataList = [],
			hasHoliday = props.config.hasHoliday,
            // 今天的年、月、日
			tDateObj = new Date(),
			tYear = tDateObj.getFullYear(),
			tMonth = tDateObj.getMonth() + 1,
			tDate = tDateObj.getDate(),
            year = state.showedYear,
            month = state.showedMonth;
        
		// 该月总天数
		var monthTotalDay = this.solarMonth[month - 1];
		if (month === 2 && this.isLeapSolarYear(year)) {
			monthTotalDay++;
		}
        // 当前月标记
        if (month === tMonth && year === tYear) {
            dataList.tmonth = true; 
        }
        dataList.year = year;
        dataList.month = month;
        dataList.total = monthTotalDay;
        
		var firstDate = new Date(year, month-1, 1);
		var firstDay = firstDate.getDay();
		var lunarData = null, tData = null, lHoliday, sHoliday, holiday;
		for (var d = 1; d <= monthTotalDay; d++) {
			if (hasHoliday) {
				lunarData = Calendar.solar2lunar(year, month, d);
				lHoliday = lunarData.isLeap ? undefined : this.lunarHoliday[lunarData.lMonth + '-' + lunarData.lDay];
                sHoliday = this.getSolarHoliday(year, month, d);
				holiday = sHoliday || lHoliday;
			}
			tData = {
				'year' : year,
				'month' : month,
				'date' : d,
				'week' : (firstDay + d - 1) % 7,
				'holiday' : holiday
			};
			// 今天特殊标记
			if (d === tDate && month === tMonth && year === tYear) {
				tData.today = true;
                tData.info = '今天';
			}
            // 选择的日期标记
            if (d === state.date && month === state.month && year === state.year) {
                tData.start = true;
            }
			dataList.push(tData);
		}
		return dataList;
	},

	/**
	  * 绘制一个月的数据
      * @param monthData 要绘制月份的数据
	  */
	rendarMonth : function (monthData, unavailableBefore, props) {
		var tbodyHTML,
			week,
			data,
			date,
			value,
			lunarDate,
			contentHTML = '<tr>',
			cTD = '',
			lunar = '',
            blankTD = '<td class="calendar-passed">&nbsp;</td>',
            fillWeek = [blankTD,blankTD,blankTD,blankTD,blankTD,blankTD];

        var addClass = 'calendar-date-useful ',
            specialClass = '',
            dataInfo = '';
		for (var i = 0; i < monthData.length; i++) {
			data = monthData[i];
			week = data.week;
			// 补空第一个星期
			if ((i === 0) && week !== 1) {
				if (week === 0) {
					contentHTML += fillWeek.join('');
				} else {
					contentHTML += (fillWeek.slice(7 - week)).join('');
				}
			}
            date = data.date;
            // 星期标记
            dataInfo = '周' + this.nStr1[data.week];
            // ‘明天’、‘后天’标记
            if (this.todayStart === 1) {
                dataInfo = '明天';
                this.todayStart++;
            } else if (this.todayStart === 2) {
                dataInfo = '后天';
                this.todayStart = 0;
            }
            // 显示‘今天’
            if (data.today) {
                specialClass = '';
                dataInfo = '今天';
                if (props.config.showToday) {
                    date = '今天';
                    specialClass = 'calendar-special calendar-today';
                    addClass = 'calendar-date-useful ';
                }
                this.todayStart++;
            }
            // 当前选中日期
            if (data.start) {
                specialClass += ' date-start';
            }
			// 显示节日,节日的优先级大于'今天'
			if (props.config.hasHoliday && data.holiday) {
                date = data.holiday;
                specialClass += ' calendar-special';
            }
            if (week === 6 || week === 0) {
                specialClass += ' week' + week;
            }
            if (unavailableBefore.date) {
                var calendarDateObj = new Date(data.year, data.month-1, data.date);
                var compare = Calendar.compareTwoDate(calendarDateObj, unavailableBefore.date);
                if (compare > 0) {
                    specialClass += ' date-unavailable';
                };
            };
            // 各位的月份&日期加上‘0’
            var monthStr = data.month < 10 ? '0' + data.month : data.month;
            var dateStr = data.date < 10 ? '0' + data.date : data.date;
			cTD += '<td data-value="'+ data.year + '-' + monthStr + '-' + dateStr +'" data-week="' + week + '" data-info="' + dataInfo + '" class="' + addClass + specialClass + '">'+
                   '<span class="calendar-date-item">'+ date + lunar +'</span></td>';
			if (week === 0 && i !== monthData.length) {
				contentHTML += cTD + '</tr><tr>';
				cTD = '';
			} else if (i === (monthData.length - 1)) {
				contentHTML += cTD + '</tr>';
			}
            specialClass = '';
            addClass = 'calendar-date-useful ';
            dataInfo = '';
		}
		tbodyHTML = '<tbody><tr class="calendar-week"><th class="week1">一</th><th class="week2">二</th><th class="week3">三</th><th class="week4">四</th>'+
            '<th class="week5">五</th><th class="week6">六</th><th class="week0">日</th></tr>'+ contentHTML +'</tbody>';
		return tbodyHTML;
	}
};

module.exports =  React.createClass({
    propTypes : {
        show : React.PropTypes.bool.isRequired,
        changeSelectedDate : React.PropTypes.func.isRequired,
        config : React.PropTypes.object.isRequired,
        // 日历不可用日期，在此日期之前不可用
        unavailableBefore : React.PropTypes.object.isRequired
    },
    getInitialState : function() {
        var config = this.props.config;
        return {
            // 默认选中的年、月、日
            year : config.year,
            month : config.month,
            date : config.date,
            // 当前显示的年、月
            showedYear : config.year,
            showedMonth : config.month,
            unavailableBefore : this.props.unavailableBefore,
            // calendar 的显示&隐藏
            show : this.props.show
        };
    },
    _renderCalendar : function() {
        var html = Calendar.init(this.state, this.props);
        return html;
    },
    handlePrev : function(e) {
        e.stopPropagation();
        var date = new Date(this.state.showedYear, this.state.showedMonth-2, 1);
        this.setState({
            showedYear : date.getFullYear(),
            showedMonth : date.getMonth()+1
        });
    },
    handleNext : function(e) {
        e.stopPropagation();
        var date = new Date(this.state.showedYear, this.state.showedMonth, 1);
        this.setState({
            showedYear : date.getFullYear(),
            showedMonth : date.getMonth()+1
        });
    },
    // 日历中某个日期被选中
    handleSelectDate : function(e) {
        e.stopPropagation();
        var target = e.target;
        var dateStr = '';
        if (target.tagName === 'SPAN') {
            target = target.parentNode;
        };
        var className = target.className;
        var ifUnavailableExp = /date-unavailable/g;
        // 如果className中包含date-unavailable 则该日期不可选
        if (ifUnavailableExp.test(className)) {
            return;
        };
        dateStr = target.getAttribute('data-value');
        if (dateStr) {
            this.changeSelectedDate(dateStr, true);
            this.props.changeSelectedDate(dateStr);
        };
    },
    changeSelectedDate : function(dateStr, clicked) {
        var dateArr = dateStr.split('-');
        this.setState({
            year : parseInt(dateArr[0]),
            month : parseInt(dateArr[1]),
            date : parseInt(dateArr[2])
        });
    },
    componentWillReceiveProps : function(nextProp) {
        this.setState({
            show : nextProp.show
        });
        var thisConfig = this.props.config;
        var nextConfig = nextProp.config;
        var thisUnavaDate = this.props.unavailableBefore.date;
        var nextUnavaDate = nextProp.unavailableBefore.date;
        var unavailableChange = false;
        if (thisUnavaDate !== nextUnavaDate) {
            if (typeof thisUnavaDate !== typeof nextUnavaDate) {
                unavailableChange = true;
            } else {
                var thisDateStr = Calendar.changeDateObjToStr(thisUnavaDate);
                var nextDateStr = Calendar.changeDateObjToStr(nextUnavaDate);
                if (thisDateStr !== nextDateStr) {
                    unavailableChange = true;
                }
            }
        };
        if (thisConfig.year !== nextConfig.year || thisConfig.month !== nextConfig.month || thisConfig.date !== nextConfig.date || unavailableChange) {
            this.setState({
                year : nextConfig.year,
                month : nextConfig.month,
                date : nextConfig.date,
                showedYear : nextConfig.year,
                showedMonth : nextConfig.month,
                unavailableBefore : nextProp.unavailableBefore
            });
        };
    },
    render : function() {
        var calendarHTML = '';
        var year = this.state.showedYear;
        var month = this.state.showedMonth;
        calendarHTML = this._renderCalendar();
        var calendarTitle = year + '-' + (month < 10 ? '0'+ month : month);
        var style = {
            display : this.state.show ? 'block' : 'none'
        };
        return (<div className="pms-calendar" id="react-calendar" style={ style }>
                 <div className="calendar-wrapper">
                   <div className="calendar-month">
                     <div className="calendar-month-title">{ calendarTitle }</div>
                      <span className="cal-month-nav nav-prev" onClick={ this.handlePrev }>&lt;</span>
                      <span className="cal-month-nav nav-next" onClick={ this.handleNext }>&gt;</span>
                      <table dangerouslySetInnerHTML={{ __html:calendarHTML }} onClick={ this.handleSelectDate }></table>
                   </div>
                 </div>
               </div>);
    }
});
