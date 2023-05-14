let content =  document.querySelector('.content'),
dateHeader = document.querySelector('.date__header'),
displayContent = "",  
flag = 1;

let rightPagigng =  document.querySelector('.turn__date-right'),
leftPagigng = document.querySelector('.turn__date-left'),
headerDateArray = [];
let controllDateArray = [], calendarMonth, calendarYear, controllNumberOfClick = -1;

let onTargetDate = 0, changeTargetDate = 1;
const tbody = document.querySelector('#dycalendar');
const cells = tbody.getElementsByTagName('td');
let nrow, ncolumn;

let todayDay = "", TD = "";


var
    //this will be used by the user.
    dycalendar = {},

    //starting year
    START_YEAR = 1900,

    //end year
    END_YEAR = 9999,

    //name of the months
    monthName = {
        full: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },

    //name of the days
    dayName = {
        full: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        d: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };

/**
 * this function will create month table.
 *
 * @param object data   this contains the calendar data
 * @param object option this is the settings object
 * @return html
 */
function createMonthTable(data, option) {

    var
        table, tr, td,
        r, c, count;

    table = document.createElement("table");
    tr = document.createElement("tr");

    //create 1st row for the day letters
    let d = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    for (c = 0; c <= 6; c = c + 1) {
        td = document.createElement("td");
        // td.innerHTML = "SMTWTFS"[c];
        td.innerHTML = d[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);

    //create 2nd row for dates
    tr = document.createElement("tr");

    //blank td
    for (c = 0; c <= 6; c = c + 1) {
        if (c === data.firstDayIndex) {
            break;
        }
        td = document.createElement("td");
        tr.appendChild(td);
    }

    //remaing td of dates for the 2nd row
    count = 1;
    while (c <= 6) {
        td = document.createElement("td");
        td.innerHTML = count;
        if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
            td.setAttribute("class", "dycalendar-today-date");
        }
        if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
            td.setAttribute("class", "dycalendar-target-date");
        }
        tr.appendChild(td);
        count = count + 1;
        c = c + 1;
    }
    table.appendChild(tr);

    //create remaining rows
    for (r = 3; r <= 7; r = r + 1) {
        tr = document.createElement("tr");
        for (c = 0; c <= 6; c = c + 1) {
            if (count > data.totaldays) {
                table.appendChild(tr);
                return table;
            }
            td = document.createElement('td');
            td.innerHTML = count;
            if (data.today.date === count && data.today.monthIndex === data.monthIndex && option.highlighttoday === true) {
                td.setAttribute("class", "dycalendar-today-date");
            }
            if (option.date === count && option.month === data.monthIndex && option.highlighttargetdate === true) {
                td.setAttribute("class", "dycalendar-target-date");
            }
            count = count + 1;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table;
}

/**
 * this function will draw Calendar Month Table
 *
 * @param object data   this contains the calendar data
 * @param object option this is the settings object
 * @return html
 */
function drawCalendarMonthTable(data, option) {

    var
        table,
        div, container, elem;

    //get table
    table = createMonthTable(data, option);

    //calendar container
    container = document.createElement("div");
    container.setAttribute("class", "dycalendar-month-container");

    //-------------------------- Header ------------------

    //header div
    div = document.createElement("div");
    div.setAttribute("class", "dycalendar-header");
    div.setAttribute("data-option", JSON.stringify(option));

    //prev button
    // if (option.prevnextbutton === "show") {
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-prev-btn");
        elem.setAttribute("data-date", option.date);
        elem.setAttribute("data-month", option.month);
        elem.setAttribute("data-year", option.year);
        elem.setAttribute("onclick", "log_in2()");
        // elem.setAttribute("data-btn", "prev");
        elem.innerHTML = "&lt;";
        //add prev button span to header div
        div.appendChild(elem);
    // }

    //month span
    elem = document.createElement("span");
    elem.setAttribute("class", "dycalendar-span-month-year");
    if (option.monthformat === "mmm") {
        elem.innerHTML = data.monthName + " " + data.year;
    } else if (option.monthformat === "full") {
        elem.innerHTML = data.monthNameFull + " " + data.year;
    }

    //add month span to header div
    div.appendChild(elem);

    //next button
    // if (option.prevnextbutton === "show") {
        elem = document.createElement("span");
        elem.setAttribute("class", "dycalendar-next-btn");
        elem.setAttribute("data-date", option.date);
        elem.setAttribute("data-month", option.month);
        elem.setAttribute("data-year", option.year);
        elem.setAttribute("onclick", "log_in1()");
        // elem.setAttribute("data-btn", "next");
        elem.innerHTML = "&gt;";
        //add prev button span to header div
        div.appendChild(elem);
    // }

    //add header div to container
    container.appendChild(div);

    //-------------------------- Body ------------------

    //body div
    div = document.createElement("div");
    div.setAttribute("class", "dycalendar-body");
    div.appendChild(table);

    //add body div to container div
    container.appendChild(div);

    //return container
    return container;
}

/**
 * this function will draw Calendar Day
 *
 * @param object data   this contains the calendar data
 * @param object option this is the settings object
 * @return html
 */
function drawCalendarDay(data, option) {

    var
        div, container, elem;

    //calendar container
    container = document.createElement("div");
    container.setAttribute("class", "dycalendar-day-container");

    //-------------------------- Header ------------------

    //header div
    div = document.createElement("div");
    div.setAttribute("class", "dycalendar-header");

    //day span
    elem = document.createElement("span");
    elem.setAttribute("class", "dycalendar-span-day");
    if (option.dayformat === "ddd") {
        elem.innerHTML = dayName.ddd[data.targetedDayIndex];
    } else if (option.dayformat === "full") {
        elem.innerHTML = dayName.full[data.targetedDayIndex];
    }

    //add day span to footer div
    div.appendChild(elem);

    //add header div to container
    container.appendChild(div);

    //-------------------------- Body ------------------

    //body div
    div = document.createElement("div");
    div.setAttribute("class", "dycalendar-body");

    //date span
    elem = document.createElement("span");
    elem.setAttribute("class", "dycalendar-span-date");
    elem.innerHTML = data.date;

    //add date span to body div
    div.appendChild(elem);

    //add body div to container
    container.appendChild(div);

    //-------------------------- Footer ------------------

    //footer div
    div = document.createElement("div");
    div.setAttribute("class", "dycalendar-footer");

    //month span
    elem = document.createElement("span");
    elem.setAttribute("class", "dycalendar-span-month-year");
    if (option.monthformat === "mmm") {
        elem.innerHTML = data.monthName + " " + data.year;
    } else if (option.monthformat === "full") {
        elem.innerHTML = data.monthNameFull + " " + data.year;
    }

    //add month span to footer div
    div.appendChild(elem);

    //add footer div to container
    container.appendChild(div);

    //return container
    return container;
}

/**
 * this function will extend source object with defaults object.
 *
 * @param object source     this is the source object
 * @param object defaults   this is the default object
 * @return object
 */
function extendSource(source, defaults) {
    var property;
    for (property in defaults) {
        if (source.hasOwnProperty(property) === false) {
            source[property] = defaults[property];
        }
    }
    return source;
}

/**
 * This function will return calendar detail.
 *
 * @param integer year        1900-9999 (optional) if not set will consider
 *                          the current year.
 * @param integer month        0-11 (optional) 0 = Jan, 1 = Feb, ... 11 = Dec,
 *                          if not set will consider the current month.
 * @param integer date      1-31 (optional)
 * @return boolean|object    if error return false, else calendar detail
 */
function getCalendar(year, month, date) {

    var
        dateObj = new Date(),
        dateString,
        result = {},
        idx;

    if (year < START_YEAR || year > END_YEAR) {
        global.console.error("Invalid Year");
        return false;
    }
    if (month > 11 || month < 0) {
        global.console.error("Invalid Month");
        return false;
    }
    if (date > 31 || date < 1) {
        global.console.error("Invalid Date");
        return false;
    }

    result.year = year;
    result.month = month;
    result.date = date;


    //today
    result.today = {};
    dateString = dateObj.toString().split(" ");

    idx = dayName.ddd.indexOf(dateString[0]);
    if (idx === 7){
        idx = 6
    }
    else{
        idx = idx - 1;
    }
    result.today.dayName = dateString[0];
    result.today.dayFullName = dayName.full[idx];


    idx = monthName.mmm.indexOf(dateString[1]);
    result.today.monthIndex = idx;
    result.today.monthName = dateString[1];
    result.today.monthNameFull = monthName.full[idx];

    //непосредственно сам номер дня, конкретно сегодня 26 число
    result.today.date = dateObj.getDate();
    todayDay = result.today.date;
    TD = result.today.date;


    result.today.year = dateString[3];

    // строка заголовок с сегодняшней датой (Апрель 29, 2023)
    // displayContent = "";
    // displayContent += result.today.monthNameFull.toString() + " " + result.today.date.toString() + ", " + result.today.year.toString() + " ";
    // dateHeader.textContent = displayContent;

    headerDateArray[0] = result.today.monthIndex;
    headerDateArray[1] = result.today.date;
    headerDateArray[2] = result.today.year;

    controllDateArray[0] = result.today.monthIndex;
    controllDateArray[1] = result.today.date;
    controllDateArray[2] = result.today.year;

    let monthDisplay = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    todayDay = monthDisplay[controllDateArray[0]].toString() + " " + controllDateArray[1].toString() + ", " + controllDateArray[2].toString() + " ";
    dateHeader.textContent = todayDay;


    //get month-year first day
    dateObj.setDate(1);
    dateObj.setMonth(month);
    dateObj.setFullYear(year);
    dateString = dateObj.toString().split(" ");

    idx = dayName.ddd.indexOf(dateString[0]);
    if (idx === 7){
        idx = 6
    }
    else{
        idx = idx - 1;
    }
    result.firstDayIndex = idx;
    result.firstDayName = dateString[0];
    result.firstDayFullName = dayName.full[idx];

    idx = monthName.mmm.indexOf(dateString[1]);
    result.monthIndex = idx;
    result.monthName = dateString[1];
    result.monthNameFull = monthName.full[idx];

    //get total days for the month-year
    dateObj.setFullYear(year);
    dateObj.setMonth(month + 1);
    dateObj.setDate(0);
    result.totaldays = dateObj.getDate();

    //get month-year targeted date
    dateObj.setFullYear(year);
    dateObj.setMonth(month);
    dateObj.setDate(date);
    dateString = dateObj.toString().split(" ");

    idx = dayName.ddd.indexOf(dateString[0]);
    result.targetedDayIndex = idx;
    result.targetedDayName = dateString[0];
    result.targetedDayFullName = dayName.full[idx];

    return result;
}

rightPagigng.addEventListener('click', function(){
    let dateF = headerDateArray[1];
    let monthF = headerDateArray[0];
    let yearF = headerDateArray[2];  

    let monthDisplay = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //let spl = dateHeader.textContent.split(' ');
    //for (let i = 0; i < 12; i++){
      // if (monthDisplay[i].toString() === spl[0].toString()){
        //    monthF = i;
          //   i = 13;
       //}
    //}
    
    
    let optionPaging = {
        target: "#dycalendar",
        type: "month",
        dayformat: "full",
        monthformat: "full",
        highlighttargetdate: true,
        prevnextbutton: "show",
        month: controllDateArray[0],
        year: controllDateArray[2],
        date: controllDateArray[1],
        highlighttoday: false,
    };

    const table = document.querySelector('#dycalendar');
    const cells = table.getElementsByTagName('td');

    // раскрашиваем клетки, которые не совпадают с сегодняшним числом в стандарнтый цвет календаря
    for (var i = 7, len = cells.length; i < len; i++){
        if (cells[i].innerHTML.toString() !== controllDateArray[1].toString()){
            cells[i].style.color = "black";
            cells[i].style.background = "#cc89eb";
        }
    }

    // высчитываем новую дату после того, как нажали листание вправо
    dateF = dateF + 1;
    const d = 32 - new Date(yearF, monthF, 32).getDate();
    if (dateF > d) {
        // если перешли на новый месяц, высчитываем дату/месяц/год и сразу рисуем календарь на эту дату
        dateF = 1;
        monthF = monthF + 1;
        if (monthF > 11) {
            yearF = yearF + 1;
            monthF = 0;
        }
        // optionPaging.date = dateF;
        optionPaging.month = monthF;
        optionPaging.year = yearF;
        drawCalendar(optionPaging);
    }

    headerDateArray[0] = monthF;
    headerDateArray[1] = dateF;
    headerDateArray[2] = yearF;
    checkMainHeader();

    displayContent = "";
    displayContent = monthDisplay[monthF] + " " + dateF.toString() + ", " + yearF.toString();
    dateHeader.textContent = displayContent;

    // for (var i = 7, len = cells.length; i < len; i++){
    //     if (monthF.toString() !== controllDateArray[0].toString()){
    //             cells[i].style.color = "black";
    //             cells[i].style.background = "#cc89eb";
    //     }
    // }

    // если мы листаем вправо и сегодняшняя дата не совпадает с заголовочной
    if (headerDateArray[0] === controllDateArray[0]) {
        if (headerDateArray[1] !== controllDateArray[1]){
            for (var i = 7, len = cells.length; i < len; i++){
                if (cells[i].innerHTML.toString() === headerDateArray[1].toString() && cells[i].innerHTML.toString() !== controllDateArray[1].toString()){
                    cells[i].style.color = "#FFF8DC";
                    cells[i].style.background = "#6A5ACD";

                    controllNumberOfClick = i;
                }
            }    
        }
    }
    else{
        for (var i = 7, len = cells.length; i < len; i++){
            if (cells[i].innerHTML.toString() === headerDateArray[1].toString() && cells[i].innerHTML.toString() !== controllDateArray[1].toString()){
                cells[i].style.color = "#FFF8DC";
                cells[i].style.background = "#6A5ACD";

                controllNumberOfClick = i;
            }
        }    
    }
    displayMessages();
});

//------------------------------ листаем дату влево ----------------------
leftPagigng.addEventListener('click', function(){
    let dateF = headerDateArray[1];
    let monthF = headerDateArray[0];
    let yearF = headerDateArray[2];

    let monthDisplay = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    let optionPaging = {
        target: "#dycalendar",
        type: "month",
        dayformat: "full",
        monthformat: "full",
        highlighttargetdate: true,
        prevnextbutton: "show",
        month: controllDateArray[0],
        year: controllDateArray[2],
        date: controllDateArray[1],
        highlighttoday: false,
    };

    const table = document.querySelector('#dycalendar');
    const cells = table.getElementsByTagName('td');

    // раскрашиваем клетки, которые не совпадают с сегодняшним числом в стандарнтый цвет календаря
    for (var i = 7, len = cells.length; i < len; i++){
        if (cells[i].innerHTML.toString() !== controllDateArray[1].toString()){
            cells[i].style.color = "black";
            cells[i].style.background = "#cc89eb";
        }
    }
    

    dateF = dateF - 1;
    if (dateF < 1) {
        monthF = monthF - 1;
        if (monthF < 0) {
            yearF = yearF - 1;
            monthF = 11;
        }

        const d = 32 - new Date(yearF, monthF, 32).getDate();
        dateF = d;
        // optionPaging.date = dateF;
        optionPaging.month = monthF;
        optionPaging.year = yearF;
        drawCalendar(optionPaging);
    }

    headerDateArray[0] = monthF;
    headerDateArray[1] = dateF;
    headerDateArray[2] = yearF;
    checkMainHeader();

    displayContent = "";
    displayContent = monthDisplay[monthF] + " " + dateF.toString() + ", " + yearF.toString();
    dateHeader.textContent = displayContent;

    // for (var i = 7, len = cells.length; i < len; i++){
    //     if (monthF.toString() !== controllDateArray[0].toString()){
    //         cells[i].style.color = "black";
    //         cells[i].style.background = "#cc89eb";
    //     }
    // }

    // если мы листаем влево и сегодняшняя дата не совпадает с заголовочной
    if (headerDateArray[0] === controllDateArray[0]) {
        if (headerDateArray[1] !== controllDateArray[1]){
            for (var i = 7, len = cells.length; i < len; i++){
                if (cells[i].innerHTML.toString() === headerDateArray[1].toString() && cells[i].innerHTML.toString() !== controllDateArray[1].toString()){
                    cells[i].style.color = "#FFF8DC";
                    cells[i].style.background = "#6A5ACD";

                    controllNumberOfClick = i;
                }
            }    
        }
    }
    else{
        for (var i = 7, len = cells.length; i < len; i++){
            if (cells[i].innerHTML.toString() === headerDateArray[1].toString() && cells[i].innerHTML.toString() !== controllDateArray[1].toString()){
                cells[i].style.color = "#FFF8DC";
                cells[i].style.background = "#6A5ACD";
                
                controllNumberOfClick = i;
            }
        }    
    }
    displayMessages();
});


//------------------------------ dycalendar.draw() ----------------------

/**
 * this function will draw the calendar based on user preferences.
 *
 * option = {
 *  target : "#id|.class"   //(mandatory) for id use #id | for class use .class
 *  type : "calendar-type"  //(optional) values: "day|month" (default "day")
 *  month : "integer"       //(optional) value 0-11, where 0 = January, ... 11 = December (default current month)
 *  year : "integer"        //(optional) example 1990. (default current year)
 *  date : "integer"        //(optional) example 1-31. (default current date)
 *  monthformat : "full"    //(optional) values: "mmm|full" (default "full")
 *  dayformat : "full"      //(optional) values: "ddd|full" (default "full")
 *  highlighttoday : boolean    //(optional) (default false) if true will highlight today's date
 *  highlighttargetdate : boolean   //(optional) (default false) if true will highlight targeted date of the month year
 *  prevnextbutton : "hide"         //(optional) (default "hide") (values: "show|hide") if set to "show" it will show the nav button (prev|next)
 * }
 *
 * @param object option     user preferences
 * @return boolean          true if success, false otherwise
 */
dycalendar.draw = function (option) {

    //check if option is passed or not
    if (typeof option === "undefined") {
        global.console.error("Option missing");
        return false;
    }

    var
        self = this,    //pointing at dycalendar object

        dateObj = new Date(),

        //default settings
        defaults = {
            type: "day",
            month: dateObj.getMonth(),
            year: dateObj.getFullYear(),
            date: dateObj.getDate(),
            monthformat: "full",
            dayformat: "full",
            highlighttoday: false,
            highlighttargetdate: false,
            prevnextbutton: "hide"
        };

    //extend user options with predefined options
    option = extendSource(option, defaults);

    drawCalendar(option);

};

//------------------------------ dycalendar.draw() ends here ------------

/**
 * this function will draw the calendar inside the target container.
 */
function drawCalendar(option) {

    var
        //variables for creating calendar
        calendar,
        calendarHTML,
        targetedElementBy = "id",
        targetElem,

        //other variables
        i, len, elemArr;

    //find target element by
    if (option.target[0] === "#") {
        targetedElementBy = "id";
    } else if (option.target[0] === ".") {
        targetedElementBy = "class";
    }
    targetElem = option.target.substring(1);

    //get calendar HTML
    switch (option.type) {
        case "day":
            //get calendar detail
            calendar = getCalendar(option.year, option.month, option.date);
            //get calendar html
            calendarHTML = drawCalendarDay(calendar, option);
            break;

        case "month":
            //get calendar detail
            calendar = getCalendar(option.year, option.month, option.date);
            //get calendar html
            calendarHTML = drawCalendarMonthTable(calendar, option);
            break;

        default:
            global.console.error("Invalid type");
            return false;
    }

    //draw calendar
    if (targetedElementBy === "id") {

        document.getElementById(targetElem).innerHTML = calendarHTML.outerHTML;

    } else if (targetedElementBy === "class") {

        elemArr = document.getElementsByClassName(targetElem);
        for (i = 0, len = elemArr.length; i < len; i = i + 1) {
            elemArr[i].innerHTML = calendarHTML.outerHTML;
        }

    }
}


tbody.addEventListener('click', function (e) {
    const cell = e.target.closest('td');
    if (!cell) {return;} // Quit, not clicked on a cell
    const row = cell.parentElement;

    if (parseInt(controllNumberOfClick) !== -1){
        onTargetDate = 1;
        nrow = row.rowIndex;
        ncolumn = cell.cellIndex;
    }

    if (cell.innerHTML !== '' && cell.textContent.toString() !== TD.toString() && row.rowIndex !== 0){
        if (!onTargetDate){
            cell.style.color = "#FFF8DC";
            cell.style.background = "#6A5ACD";
            onTargetDate = 1;
            nrow = row.rowIndex;
            ncolumn = cell.cellIndex;

            let monthDisplay = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
            headerDateArray[1] = parseInt(cell.innerHTML);
            displayContent = "";
            displayContent = monthDisplay[headerDateArray[0]] + " " + headerDateArray[1].toString() + ", " + headerDateArray[2].toString();
            dateHeader.textContent = displayContent;
            checkMainHeader();
        }
        else{
            if (controllNumberOfClick === nrow*7+ncolumn){
                controllNumberOfClick = -1;
                onTargetDate = 0;
            }
            if (nrow === row.rowIndex && ncolumn === cell.cellIndex){
                cell.style.color = "black";
                cell.style.background = "#cc89eb";
                onTargetDate = 0;
            }
        }
    }
    displayMessages();
});
