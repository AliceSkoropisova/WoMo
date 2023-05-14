let mainHeader = document.querySelector(".title");

function log_in1() {
        date = parseInt(controllDateArray[1]);

        let monthDisplay = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        let spl = dateHeader.textContent.split(' ');
        for (let i =0; i < 12; i++){
            if (monthDisplay[i].toString() === spl[0].toString()){
                month = i;
                i = 13;
            }
        }
        year = parseInt(spl[2]);

        let option = {
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

        month = month + 1;
        if (month > 11) {
            year = year + 1;
            month = 0;
        }

        displayContent = monthDisplay[month] + " " + date.toString() + ", " + year.toString();
        dateHeader.textContent = displayContent;                

        // option.date = date;
        option.month = month;
        option.year = year;

        drawCalendar(option);

    dateHeader.textContent = displayContent;
    spl = dateHeader.textContent.split(' ');
    for (let i =0; i < 12; i++){
        if (monthDisplay[i].toString() === spl[0].toString()){
            headerDateArray[0] = i;
            i = 13;
        }
    }
    headerDateArray[2] = parseInt(spl[2]);
    headerDateArray[1] = parseInt(spl[1].split(",")[0]);

    onTargetDate = 0;
    controllNumberOfClick = -1;
    checkMainHeader();
    displayMessages();
}

function log_in2() {
    date = parseInt(controllDateArray[1]);
    let monthDisplay = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let spl = dateHeader.textContent.split(' ');
    for (let i =0; i < 12; i++){
        if (monthDisplay[i].toString() === spl[0].toString()){
            month = i;
            i = 13;
        }
    }
    year = parseInt(spl[2]);

    let option = {
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

    month = month - 1;
    if (month < 0) {
        year = year - 1;
        month = 11;
    }

    displayContent = monthDisplay[month] + " " + date.toString() + ", " + year.toString();
    dateHeader.textContent = displayContent;                

    // option.date = date;
    option.month = month;
    option.year = year;

    drawCalendar(option);

    dateHeader.textContent = displayContent;
    spl = dateHeader.textContent.split(' ');
    for (let i =0; i < 12; i++){
        if (monthDisplay[i].toString() === spl[0].toString()){
            headerDateArray[0] = i;
            i = 13;
        }
    }
    headerDateArray[2] = parseInt(spl[2]);
    headerDateArray[1] = parseInt(spl[1].split(",")[0]);

    onTargetDate = 0;
    controllNumberOfClick = -1;
    checkMainHeader();
    displayMessages();
}

function checkMainHeader(){
    if (headerDateArray[0] !== controllDateArray[0] || headerDateArray[1] !== controllDateArray[1] || headerDateArray[2].toString() !== controllDateArray[2].toString()){
        mainHeader.textContent = "Планы на день"; 
    }
    else {
        mainHeader.textContent = "Планы на сегодня"; 
    }
}