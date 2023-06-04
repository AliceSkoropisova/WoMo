const date=document.getElementById('week-monthDisplay'), 
weekCountsContainer=document.querySelector(".week-counts"), 
todayBtn = document.querySelector(".today-btn"),
addEvSubmit=document.querySelector(".add-btn"), 
eventContOne=document.querySelector(".week-block-one"),
eventContTwo=document.querySelector(".week-block-two"),
eventContThree=document.querySelector(".week-block-three"),
eventContFour=document.querySelector(".week-block-four"),
eventContFive=document.querySelector(".week-block-five"),
eventContSix=document.querySelector(".week-block-six"),
eventContSeven=document.querySelector(".week-block-seven"), 
addEventTit=document.querySelector(".section-input");



let today = new Date();
	let activeDay;
	let curr=new Date;
	let today1=new Date();
	let month = today.getMonth();	
	let year = today.getFullYear();
	let week=0;
	const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
	"Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
	let renn, curr1=[], curr2=[], curr3=[], curr4=[], all=[], count=0;
	let first, second, third, fourd, fifth, number;
	let try1, try2, try3, try4, try5, tr=true, filled=true, num, flag=true;
	let num1=[], num2=[], num3=[], num4=[], num5=[], allFor=[];
	let yadata=new Date(year, month, date), newMonth=0;
	let numYadata=yadata.getDay();
	const eventContALL=[eventContOne, eventContTwo,
	eventContThree, eventContFour, eventContFive,
eventContSix, eventContSeven]

const eventsArr=[];
getEvents();

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

	function initWeek(){
	const firstDayWeek = today.getDate()-today.getDay()+1;
	const lastDayWeek = firstDayWeek+7;
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month+1, 0);
	const prevLastDay = new Date(year, month, 0);//последний день предыдущего месяца
	const prevDays = prevLastDay.getDate();
	const day1 = new Date(today.setDate(firstDayWeek));
	const day2 = new Date(today.setDate(lastDayWeek));
	const lastDate = lastDay.getDate();
	const day=firstDay.getDay();
	const now=String(today1.getDate());
	const dayOnLastWeek = new Date(today.setDate(firstDayWeek));
	const nextDays = 7-lastDay.getDay();//-lastDay.getDay()-1!!
	date.innerHTML = months[month]+" "+year;//помещаю месяц и год заголовок
	let weekc="";
	for(let x=day-1;x>0;x--){
		weekc+=`<div class="day prev-day">${prevDays-x+1} </div>  `;
	}
	for(let i=1;i<=lastDate;i++)
	{
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
		&& month===new Date().getMonth())
		{
			console.log(new Date().getDate());
			activeDay=i;
			getActiveDay(i);
			 //updateEvents(i);
			//  console.log(eventsArr);

			if(event){
				weekc+= `<div class="day this-day today active event">${i} </div>  `;
			}
			else{
				weekc+= `<div class="day this-day today active">${i} </div>  `;
			}
		}
		else{
			if(event){
				weekc+= `<div class="day this-day event">${i} </div>  `;
			}
			else{
				weekc+= `<div class="day this-day">${i} </div>  `;
			}
		}
	}
	let week2=weekc.split("  ");
	first=week2.splice(0,7);//разделение на недели
	second=week2.splice(0,7);
	third=week2.splice(0,7);
	fourd=week2.splice(0,7);
	fifth=week2.splice(0,7);
	// console.log(weekc);
	// console.log(fifth);
	number=[];
	number.push(first, second, third, fourd, fifth);
	console.log(fifth, now);
	for(let t=0;t<5;t++){
		allFor[t]=[];
		for(let u=0;u<7;u++)
		{
			if(number[t][u]==undefined || number[t][u]=="")
			{
				// console.log(number[t][u]);
				number[t][u]="0";
			}
			else
			{
				allFor[t][u]=Number(number[t][u].replace(/[^0-9]/g,""));
				// console.log(allFor[t][u]);
			}
			// allFor[t][u]=Number(number[t][u].replace(/[^0-9]/g,""));
		}


	}
//работа для массивов, чисел, дней недели
	try1=first.join(" ");//каждый отдельный массив в строку
	try2=second.join(" ");
	try3=third.join(" ");
	try4=fourd.join(" ");
	try5=fifth.join(" ");
	console.log(try5);
	all=[];
	all.push(try1, try2, try3, try4, try5);//соединение всех дат в один массив
	if(try1.includes(now))//нахожу в какой неделе сегодняшняя дата
	{		num=0;	}
	else if(try2.includes(now))
	{		num=1;	}
	else if(try3.includes(now))
	{		num=2;	}
	else if(try4.includes(now))
	{		num=3;	}
	else {
		if(try5.includes(now) && try5.length>250)
		{		num=4;	}
		else{
			num=0;
		}
}
	count=0;
	// if(try5.length<250){
	// 	num=0;

	// }
	for(let w=0;w<6;w++)
	{
		if(first[w].includes("prev-day"))
		{
			console.log("eye");
			count++;
		}
		}
	console.log(weekc);
		console.log(first);
	if(tr){
		week=num;
		weekCountsContainer.innerHTML = all[week];
		console.log(week);
		tr=false;
	}
	else{
		if(try5.length>250 && filled)
		{
			week=4;
			filled=false;
		}
		console.log(filled);
		weekCountsContainer.innerHTML = all[week];
	}

	if(flag){
		if(week==0)
	{
		for(let u=0;u<count;u++){
			eventContALL[u].innerHTML="";
			updateEvents(allFor[week][u], month-1);
		}
		for(let o=count;o<7;o++){
			eventContALL[o].innerHTML="";
			updateEvents(allFor[week][o], month);
		}
	}
	else{
		for(let o=0;o<7;o++){
			eventContALL[o].innerHTML="";
				updateEvents(allFor[week][o], month);
		}
		}
	// for(let k=0;k<7;k++){
	// 	updateEvents(allFor[4][k], month);
	// }
		flag=false;
	}
	addListener();
}
initWeek();
function prevWeek(){

	week--;
	if(week<0)
	{
			month--;
			if(month<0){
				month=11;
				year--;
			}
		week=3;
			filled=true;
	}
	initWeek();
	if(week==0)
	{
		for(let u=0;u<count;u++){
			eventContALL[u].innerHTML="";
			updateEvents(allFor[week][u], month-1);
		}
		for(let o=count;o<7;o++){
			eventContALL[o].innerHTML="";
			updateEvents(allFor[week][o], month);
		}
	}
	else{
		for(let o=0;o<7;o++){
			eventContALL[o].innerHTML="";
				updateEvents(allFor[week][o], month);
		}
		}
}
function nextWeek(){
	week++;
	if(week>3)
	{
		if(try5.length>250 && !filled)
		{
			week=4;
			filled=true;
		}
	 else{
			month++;
			if(month>11){
				month=0;
				year++;
			}
			filled=false;
			week=0;
		}
	}
	initWeek();
	if(week==0)
	{
		for(let u=0;u<count;u++){
			eventContALL[u].innerHTML="";
			updateEvents(allFor[week][u], month-1);
		}
		for(let o=count;o<7;o++){
			eventContALL[o].innerHTML="";
			updateEvents(allFor[week][o], month);
		}
	}
	else{
		for(let o=0;o<7;o++){
			eventContALL[o].innerHTML="";
				updateEvents(allFor[week][o], month);
		}
		}
}
document.getElementById('week-nextButton').addEventListener("click", nextWeek);
document.getElementById('week-backButton').addEventListener("click", prevWeek);

//здесь про слушание нажатий на даты чтобы записать дело

addEventTit.addEventListener("input", (e)=>{
addEventTit.value=addEventTit.value.slice(0,50);
});


//нажатие на день недели
function addListener(){
	const days = document.querySelectorAll(".day");
	console.log(days);
	days.forEach((day)=>{
		day.addEventListener("click", (e)=>{
			activeDay = Number(e.target.innerHTML);
			let west=new Date(year, month-1, activeDay);
			getActiveDay(e.target.innerHTML);
			console.log(activeDay, month);
			if(week==0 && activeDay>25)
			{
				newMonth=month-1;
				updateEvents(Number(e.target.innerHTML), newMonth);
			}
			else{
				newMonth=month;
				updateEvents(Number(e.target.innerHTML), newMonth);
			}
			console.log(month, newMonth);
			days.forEach((day)=>{
				day.classList.remove("active");
			});
			if(e.target.classList.contains("prev-day")){//если самый глубокий элемент,вызывающий событие
				setTimeout(()=>{//вызывает функцию каждые 0.1 с
					const days = document.querySelectorAll(".day");
					console.log(e.target.innerHTML, day);
					console.log(day.classList.contains("prev-day"));
					days.forEach((day)=>{
						if(
							day.classList.contains("prev-day") &&
							day.innerHTML === e.target.innerHTML
						){
							console.log("ты тут?");
							console.log(day.classList);
							day.classList.add("active");
							console.log(day.classList);
							console.log(e.target.classList);
							e.target.classList.add("active");
						}
					});
				}, 100);
			}
			else{
				 console.log("HELLOFUCKYOU");
				e.target.classList.add("active");
			}
			console.log(e.target.classList);
		})
	})
}
function getActiveDay(date){//выписывает выбранный день недели и дату
	const day = new Date(year, month, date);
	const dayName = day.toString().split(" ")[0];
	const numDay=getWeekDayNumber(dayName);
}
function getWeekDayNumber(weekDay)//в помощь предыдущей функции
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
//выписывание дел
function updateEvents(date, month){
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
            for(qq = 0; qq<data.data.length; qq++)
            {
                if(data.data[qq].day == day1 && data.data[qq].month == month1 && data.data[qq].year == year1)
                {
                    newEvent= {title: data.data[qq].todo};
                    eventsArr[eventsArr.length - 1].events.push(newEvent);
                }
                else
                {
                    newEvent= {title: data.data[qq].todo};
                    console.log(data.data[qq].todo);
                    eventsArr.push({
                    day: Number(data.data[qq].day),
                    month: Number(data.data[qq].month),
                    year: Number(data.data[qq].year),
                    events: [newEvent]
                    });
                    day1 = data.data[qq].day;
                    month1 = data.data[qq].month;
                    year1 = data.data[qq].year;
                }
            }
        }
    });
	let events="", con=0;
	let i=1;
	console.log(date, month, newMonth);
	yadata=new Date(year, month, date);
	numYadata=yadata.getDay();
	console.log(yadata, numYadata);
	for(let i=0;i<=6;i++){
		if(numYadata==i){
			eventsArr.forEach((event)=>{
				if(
					(date===event.day &&
					month+1===event.month &&
					year===event.year) ||
					(date===event.day &&
						newMonth+1===event.month &&
						year===event.year)
				){
					console.log("мне плохо");
					event.events.forEach((event)=>{
						events+= `<div class="event">
						<div class="title">
							<i class="gg-shape-circle"></i>
							<h3 class="event-title">${event.title}</h3>
						</div>
				</div>`
					});
				}
			});
			if(events===""){
				events=`<div class="no-event">
				<h3>nothing</h3>
		</div>`
			}
			if(allFor[week].includes(date))
			{
				if(i==0){
					console.log("мама я дома");
					eventContALL[6].innerHTML=events;
				}
				else{
					console.log("мама я хочу писать");
					console.log(i);
					eventContALL[i-1].innerHTML=events;
				}
				}
			}
		}

	saveEvents();
}
addEvSubmit.addEventListener("click", ()=>{
	const eventTitle=addEventTit.value;
	if(week==0 && activeDay>25){
		eventsArr.forEach((event)=>{
			if(
				event.day===activeDay &&
				event.month===newMonth+1 &&
				event.year===year
			){
				console.log(eventsArr);
				console.log(activeDay, newMonth+1, year);
				event.events.forEach((event)=>{
					if(event.title===eventTitle){
						eventExist=true;
					}
				});
			}
		});
		}
	else{
		eventsArr.forEach((event)=>{
			if(
				event.day===activeDay &&
				event.month===month+1 &&
				event.year===year
			){
				console.log(eventsArr);
				console.log(activeDay, month+1, year);
				event.events.forEach((event)=>{
					if(event.title===eventTitle){
						eventExist=true;
					}
				});
			}
		});
		}
	const newEvent={
		title:eventTitle
	};
	let eventAdded=false;
	console.log(newMonth, month, week);
	if(eventsArr.length>0){
		if(week==0 && activeDay>25)
		{
			eventsArr.forEach((item)=>{
				if(item.day===activeDay &&
					item.month===newMonth+1 &&
					item.year===year){
						item.events.push(newEvent);
						eventAdded=true;
					}
			});
		}

		else{
			eventsArr.forEach((item)=>{
				if(item.day===activeDay &&
					item.month===month+1 &&
					item.year===year){
						item.events.push(newEvent);
						eventAdded=true;
					}
			});
		}
	}
			console.log(eventsArr);
	if(eventTitle===""){
		alert("Заполните поле");
		return;
	}
	if(!eventAdded){
		console.log("dksldkslkdsf");
		if(week==0 && activeDay>25){
			eventsArr.push({
				day:activeDay,
				month: newMonth+1,
				year:year,
				events: [newEvent]
			});
			}
			else{
				eventsArr.push({
					day:activeDay,
					month: month+1,
					year:year,
					events: [newEvent]
					});	}
	}
console.log(month);


	addEventTit.value="";
	console.log(activeDay, month, week);
	if(week==0 && activeDay>25)
			{
				newMonth=month-1;

			}
	else{
		newMonth=month;
			//updateEvents(activeDay, newMonth);
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
                        month: newMonth,
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
                updateEvents(activeDay, newMonth);
	console.log(activeDay, newMonth);
	const activeDayElem = document.querySelector(".day.active");
	if(!activeDayElem.classList.contains("event")){
		activeDayElem.classList.add("event");
	}
});

for(let c=0;c<7;c++){
	eventContALL[c].addEventListener("click", (e)=>{
		if(e.target.classList.contains("event")){
				console.log("lalalalal");

				console.log(activeDay);
				eventsArr.forEach((event)=>{
					if(week==0 && activeDay>25)
					{
						if(
							event.day===activeDay &&
							event.month===newMonth+1 &&
							event.year===year
						){
							if(confirm("Вы действительно хотите удалить запись?")){
								const eventTitle = e.target.children[0].children[1].innerHTML;

							event.events.forEach((item, index)=>{
								if(item.title===eventTitle){
									console.log("я тута");
									event.events.splice(index, 1);
								}
							});
							if(event.events.length===0){
								eventsArr.splice(eventsArr.indexOf(event), 1);
								const activeDayElem = document.querySelector(".day.active");
								console.log(activeDayElem);
								if(activeDayElem.classList.contains("event")){
									console.log("nene");
									activeDayElem.classList.remove("event");
								}
							}
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
                                month: newMonth,
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
					else
					{
						if(
							event.day===activeDay &&
							event.month===month+1 &&
							event.year===year
						){
							if(confirm("Вы действительно хотите удалить запись?")){
								 const eventTitle = e.target.children[0].children[1].innerHTML;
							event.events.forEach((item, index)=>{
								if(item.title===eventTitle){
									console.log("я тута");
									event.events.splice(index, 1);
								}
							});
							if(event.events.length===0){
								eventsArr.splice(eventsArr.indexOf(event), 1);
								const activeDayElem = document.querySelector(".day.active");
								console.log(activeDayElem);
								if(activeDayElem.classList.contains("event")){
									console.log("nene");
									activeDayElem.classList.remove("event");
								}
							}
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
                                month: newMonth,
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

		});
		console.log(activeDay, month);
		if(week==0 && activeDay>25)
		{
			newMonth=month-1;
		}
		else{
			newMonth=month;

		}
		console.log(newMonth);

           updateEvents(activeDay, newMonth);
		}
		});
	}






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
}
