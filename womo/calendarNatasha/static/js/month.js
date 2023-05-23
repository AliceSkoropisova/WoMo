const calendar = document.querySelector(".calendar"),
	date = document.getElementById('monthDisplay'),
	daysContainer = document.querySelector(".days"),
	prev = document.querySelector(".prev"),
	next = document.querySelector(".next"),
	todayBtn = document.querySelector(".today-btn"),
	gotoBtn = document.querySelector(".goto-btn"),
	dateInput = document.querySelector(".date-input"),
	eventDay = document.querySelector(".event-day"),
eventDate = document.querySelector(".event-date"), 
eventContainer = document.querySelector(".events"), 
addEventSubmit = document.querySelector(".add-event-btn"),
addEventBtn=document.querySelector(".add-event"),
addEventContainer = document.querySelector(".add-event-wrapper"),
addEventCloseBtn = document.querySelector(".close"),
addEventTitle = document.querySelector(".event-name");;

	let today = new Date();
	let activeDay;
	let month = today.getMonth();	
	let year = today.getFullYear();
const weeks=["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
	const monthsForToDo = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля",
"Авгуса", "Сентября", "Октября", "Ноября", "Декабря"];
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
"Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
let eventsArr=[];
getEvents();
console.log(eventsArr);

function getCookie(cname) {
     name = cname + "=";
     ca = document.cookie.split(';');
     for( i=0; i<ca.length; i++) {
        c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if(c.indexOf(name) == 0)
           return c.substring(name.length,c.length);
     }
     return "";
}

function initCalendar(){
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month+1, 0);
	const prevLastDay = new Date(year, month, 0);
	const prevDays = prevLastDay.getDate();
	const lastDate = lastDay.getDate();
	const day = firstDay.getDay();
	const nextDays = 7-lastDay.getDay();//-lastDay.getDay()-1!!
	date.innerHTML = months[month]+" "+year;

	console.log(lastDay.getDay());
	console.log(nextDays);
	
	let days = "";
	for(let x = day-1;x>0;x--){//day!
		days += `<div class="day prev-day">${prevDays-x+1}</div>`;
	}

	console.log(lastDate);

	for(let i=1;i<=lastDate;i++){
		let event=false;
		eventsArr.forEach((eventObj)=>{
			if(
				eventObj.day===i && 
				eventObj.month===month+1 &&
				eventObj.year===year
			){
				event=true;
			}
		});
			
		if(i===new Date().getDate()
		&& year===new Date().getFullYear() 
		&& month===new Date().getMonth()){
			activeDay=i;
			getActiveDay(i);
			updateEvents(i);
			if(event)
			{
				days += `<div class="day today active event">${i}</div>`;
			}
			else
			{
				days += `<div class="day today active">${i}</div>`;
			}
			
		}
		else{
			if(event)
			{
				days += `<div class="day event">${i}</div>`;
			}
			else
			{
				days += `<div class="day">${i}</div>`;
			}
			
		}
	}
	for(let j=1;j<=nextDays;j++)
	{
		days += `<div class="day next-day">${j}</div>`;
	}
	daysContainer.innerHTML = days;
	addListener();


}
initCalendar();

function prevMonth(){
	month--;
	if(month<0){
		month=11;
		year--;
	}
	initCalendar();
}
function nextMonth(){
	month++;
	if(month>11){
		month=0;
		year++;
	}
	initCalendar();
}
document.getElementById('nextButton').addEventListener("click", nextMonth);
document.getElementById('backButton').addEventListener("click", prevMonth);

todayBtn.addEventListener("click", ()=>{
	today = new Date();
	month = today.getMonth();
	year = today.getFullYear();
	initCalendar();
});


dateInput.addEventListener("keyup", (e)=>{
	dateInput.value=dateInput.value.replace(/[^0-9/]/g, "");
	if(dateInput.value.length===2){
		dateInput.value+="/";

	}
	if(dateInput.value.length>7){
		dateInput.value = dateInput.value.slice(0,7);
	}
	if(e.inputType === "deleteContentBackward"){
		if(dateInput.value.length===3)
		{
			dateInput.value = dateInput.value.slice(0,2);
		}
	}
});

gotoBtn.addEventListener("click", gotoDate);
function gotoDate(){
	const dateArr = dateInput.value.split("/");
	if(dateArr.length===2){
		if(dateArr[0]>0 && dateArr[0]<13 && dateArr[1].length===4){
			month=dateArr[0]-1;
			year = dateArr[1];
			initCalendar();
			return;
		}
	}
	alert("invalid date");
}





addEventBtn.addEventListener("click", ()=>{
	addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", ()=>{
	addEventContainer.classList.remove("active");
});
document.addEventListener("click", (e)=>{
	if(e.target!==addEventBtn && !addEventContainer.contains(e.target)){
		addEventContainer.classList.remove("active");

	}
});
addEventTitle.addEventListener("input", (e)=>{
	addEventTitle.value=addEventTitle.value.slice(0,50);
});

function addListener(){
	const days = document.querySelectorAll(".day");
	days.forEach((day)=>{
		day.addEventListener("click", (e)=>{
			activeDay = Number(e.target.innerHTML);
			getActiveDay(e.target.innerHTML);
			updateEvents(Number(e.target.innerHTML));
			days.forEach((day)=>{
				day.classList.remove("active");
			});

			if(e.target.classList.contains("prev-day")){
				prevMonth();
				setTimeout(()=>{
					const days = document.querySelectorAll(".day");
					days.forEach((day)=>{
						if(
							!day.classList.contains("prev-day") &&
							day.innerHTML === e.target.innerHTML
						){
							day.classList.add("active");
						}
					});
				}, 100);
			}
			else if(e.target.classList.contains("next-day")){
				nextMonth();
				setTimeout(()=>{
					const days = document.querySelectorAll(".day");
					days.forEach((day)=>{
						if(
							!day.classList.contains("next-day") &&
							day.innerHTML === e.target.innerHTML
						){
							day.classList.add("active");
						}
					});
				}, 100);
			}
			else{
				e.target.classList.add("active");
			}
		})
	})
}

function getActiveDay(date){
	const day = new Date(year, month, date);
	const dayName = day.toString().split(" ")[0];
	const numDay=getWeekDayNumber(dayName);
	eventDay.innerHTML=weeks[numDay-1];
	console.log(numDay);
	eventDate.innerHTML=date + "  " + monthsForToDo[month]+"  " + year;
}
function getWeekDayNumber(weekDay)
{
	var days={
		Mon:1,
		Tue:2,
		Wed:3,
		Thu:4,
		Fri:5,
		Sat:6,
		Sun:7
	};
	return days[weekDay];
}

function updateEvents(date){
    $.ajax(
    {
        type:'GET',
        async: false,
        url: '',
        dataType: 'json',
        data:{
                 csrfmiddlewaretoken: getCookie('csrftoken'),
                 action: 'get_Natasha',
                 user_id: ID,
        },
        success: function(data)
        {
            eventsArr.length = 0;
            day1 = '';
            month1='';
            year1 = '';
            for(i = 0; i<data.data.length; i++)
            {
                if(data.data[i].day == day1 && data.data[i].month == month1 && data.data[i].year == year1)
                {
                    newEvent= {title: data.data[i].todo};
                    eventsArr[eventsArr.length - 1].events.push(newEvent);
                }
                else
                {
                    newEvent= {title: data.data[i].todo};
                    console.log(data.data[i].todo);
                    eventsArr.push({
                    day: Number(data.data[i].day),
                    month: Number(data.data[i].month),
                    year: Number(data.data[i].year),
                    events: [newEvent]
                    });
                    day1 = data.data[i].day;
                    month1 = data.data[i].month;
                    year1 = data.data[i].year;
                }
            }
        }
    });
	let events="";
	eventsArr.forEach((event)=>{
		if(
			date==event.day &&
			month+1===event.month &&
			year===event.year
		){
			event.events.forEach((event)=>{
				events+=`<div class="event">
				<div class="title">
					<i class="fas fa-circle"></i>
					<h3 class="event-title">${event.title}</h3>
				</div>
		</div>`;
			});
		}
	});
	if(events===""){
			events=`<div class="no-event">
			<h3>No Events</h3>
	</div>`;
	}
	eventContainer.innerHTML=events;
	saveEvents();
}

addEventSubmit.addEventListener("click", ()=>{
	const eventTitle=addEventTitle.value;
	const newEvent={
		title:eventTitle
	};
	let eventAdded=false;
	//console.log(eventsArr);
	if(eventsArr.length>0){
		eventsArr.forEach((item)=>{
			if(
				item.day===activeDay &&
				item.month===month+1 &&
				item.year===year
			){
				item.events.push(newEvent);
				console.log(newEvent);
				eventAdded=true;
			}
		});
	}
	if(eventTitle===""){
		alert("Заполните поле");
		return;
	}
	if(!eventAdded){
		eventsArr.push({
			day:activeDay,
			month: month+1,
			year:year,
			events: [newEvent]
		});
	}
    $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        delo: eventTitle,
                        importance: 'false',
                        action: 'post',
                        user_id: ID,
                        day: activeDay,
                        month: month,
                        year: year,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        console.log("it worked!");
                    },
                    error: function (data) {
                        console.log("it didnt work");
                    }
                });
	addEventContainer.classList.remove("active");
	addEventTitle.value="";
	updateEvents(activeDay);


	const activeDayElem = document.querySelector(".day.active");
	if(!activeDayElem.classList.contains("event")){
		activeDayElem.classList.add("event");
	}
});


eventContainer.addEventListener("click", (e)=>{
	if(e.target.classList.contains("event")){

		const eventTitle = e.target.children[0].children[1].innerHTML;
		$.ajax({
                            method: 'POST',
                            async: false,
                            url: '',
                            dataType: 'json',
                            data: {
                                delo: eventTitle,
                                action: 'delete',
                                user_id: ID,
                                day: activeDay,
                                month: month,
                                year: year,
                                csrfmiddlewaretoken: getCookie('csrftoken')
                            },
                            success: function (data) {
                                console.log("it is deleted!");
                            },
                            error: function (data) {
                                console.log("it isnt deleted");
                            }
                        });

		/*eventsArr.forEach((event)=>{
			if(
				event.day===activeDay &&
				event.month===month+1 &&
				event.year===year
			){
				event.events.forEach((item, index)=>{
					if(item.title===eventTitle){
						event.events.splice(index, 1);
					}
				});
				if(event.events.length===0){
					eventsArr.splice(eventsArr.indexOf(event), 1);
					const activeDayElem = document.querySelector(".day.active");
					if(activeDayElem.classList.contains("event")){
						activeDayElem.classList.remove("event");
						$.ajax({
                            method: 'POST',
                            async: false,
                            url: '',
                            dataType: 'json',
                            data: {
                                delo: '',
                                action: 'delete',
                                user_id: ID,
                                day: activeDay,
                                month: month,
                                year: year,
                                csrfmiddlewaretoken: getCookie('csrftoken')
                            },
                            success: function (data) {
                                console.log("it is deleted!");
                            },
                            error: function (data) {
                                console.log("it isnt deleted");
                            }
                        });
					}
				}


			}
		});*/
		updateEvents(activeDay);
	}
});

function saveEvents(){
	localStorage.setItem("events", JSON.stringify(eventsArr));
}
function getEvents(){
    $.ajax(
    {
        type:'GET',
        async: false,
        url: '',
        dataType: 'json',
        data:{
                 csrfmiddlewaretoken: getCookie('csrftoken'),
                 action: 'get_Natasha',
                 user_id: ID,
        },
        success: function(data)
        {
            eventsArr.length = 0;
            day1 = '';
            month1='';
            year1 = '';
            for(i = 0; i<data.data.length; i++)
            {
                if(data.data[i].day == day1 && data.data[i].month == month1 && data.data[i].year == year1)
                {
                    newEvent= {title: data.data[i].delo};
                    eventsArr[eventsArr.length - 1].events.push(newEvent);
                }
                else
                {
                    newEvent= {title: data.data[i].delo};
                    eventsArr.push({
                    day: Number(data.data[i].day),
                    month: Number(data.data[i].month),
                    year: Number(data.data[i].year),
                    events: [newEvent]
                    });
                    day1 = data.data[i].day;
                    month1 = data.data[i].month;
                    year1 = data.data[i].year;
                }
            }
        }
    });
	/*if(localStorage.getItem("event"===null)){
		return;
	}
		eventsArr.push(...JSON.parse(localStorage.getItem("events")));*/
}

