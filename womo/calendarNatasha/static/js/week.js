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
	let renn, curr1=[], curr2=[], curr3=[], curr4=[], all=[];
	let first, second, third, fourd, fifth, number;
	let try1, try2, try3, try4, try5, tr=true, filled=true, num;
	let num1=[], num2=[], num3=[], num4=[], num5=[], allFor=[];
	const eventContALL=[eventContOne, eventContTwo,
	eventContThree, eventContFour, eventContFive,
eventContSix, eventContSeven]

const eventsArr=[];
getEvents();

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
			 console.log(eventsArr);
			 
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
	number=[];
	number.push(first, second, third, fourd, fifth);
	let me="all";
	// console.log(allFor);
	for(let t=0;t<5;t++){
		allFor[t]=[];
		for(let u=0;u<7;u++)
		{
			if(number[t].length!=7)
			{
					number[t][u]="0";
			}
			allFor[t][u]=Number(number[t][u].replace(/[^0-9]/g,""));
		}
		
		
	}
//работа для массивов, чисел, дней недели	
	try1=first.join(" ");//каждый отдельный массив в строку
	try2=second.join(" ");
	try3=third.join(" ");
	try4=fourd.join(" ");
	try5=fifth.join(" ");
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
	else if(try5.includes(now))
	{		num=4;	}
	// if(try5.length>250 && filled)
	// {
	// 	week=4;
	// 	filled=false;
	// }

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
	//console.log(allFor[week][0]);
	for(let m=0;m<7;m++){
		updateEvents(allFor[week][m]);
	}
	updateEvents(20);
	updateEvents(15);
	// console.log(weekCountsContainer.innerHTML);
	addListener();
	// console.log(weekCountsContainer.innerHTML);
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
	for(let o=0;o<7;o++){
		eventContALL[o].innerHTML="";
		updateEvents(allFor[week][o]);
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
	for(let o=0;o<7;o++){
		eventContALL[o].innerHTML="";
		updateEvents(allFor[week][o]);
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
			getActiveDay(e.target.innerHTML);
			updateEvents(Number(e.target.innerHTML));
			console.log(activeDay);
			days.forEach((day)=>{
				day.classList.remove("active");
			});
			if(e.target.classList.contains("prev-day")){//если самый глубокий элемент,вызывающий событие
				// prevMonth();//имеет класс предыдущего дня
				// prevWeek();
				setTimeout(()=>{//вызывает функцию каждые 0.1 с
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
			else{
				// console.log("HELLOFUCKYOU");
				e.target.classList.add("active");
			}
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
function updateEvents(date){
	let events="";
	console.log(date);
	console.log(month+1);
	console.log(year);
	console.log(week);
	let yadata=new Date(year, month, date);
	console.log(yadata.getDay());
	let numYadata=yadata.getDay(),i=1;
	console.log(yadata);
	for(let i=0;i<=6;i++){
		if(numYadata==i){
			eventsArr.forEach((event)=>{
				console.log(event.day, event.month, event.year);
			});
			console.log(allFor[week].includes(date));
			eventsArr.forEach((event)=>{
				if(
					date===event.day &&
					month+1===event.month &&
					year===event.year 
				){
					event.events.forEach((event)=>{
						events+= `<div class="event">
						<div class="title">
							<i class="gg-shape-circle"></i>
							<h3 class="event-title">${event.title}</h3>
						</div>
				</div>`
				 console.log(events);
					});
					console.log(i);
				}
			});
			if(events===""){
				events=`<div class="no-event">
				<h3>nothing</h3>
		</div>`
			}
			console.log(eventsArr);
			console.log(second);
			if(allFor[week].includes(date))
			{
				if(i==0){
					eventContALL[6].innerHTML=events;
				}
				else{
					eventContALL[i-1].innerHTML=events;
				}
				}
			}
		}
	saveEvents();
}
addEvSubmit.addEventListener("click", ()=>{
	console.log(addEventTit.value)
	const eventTitle=addEventTit.value;
	eventsArr.forEach((event)=>{
		if(
			event.day===activeDay &&
			event.month===month+1 &&
			event.year===year
		){
			event.events.forEach((event)=>{
				if(event.title===eventTitle){
					eventExist=true;
				}
			});
		}
	});
	const newEvent={
		title:eventTitle
	};
	let eventAdded=false;
	if(eventsArr.length>0){
		eventsArr.forEach((item)=>{
			if(item.day===activeDay &&
				item.month===month+1 &&
				item.year===year){
					const nif=getWeekDayNumber(item.day);
					console.log(nif);
					item.events.push(newEvent);
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
			//num:activeDay.getDay(),
			events: [newEvent]
		});
	}
	addEventTit.value="";
	updateEvents(activeDay);
	const activeDayElem = document.querySelector(".day.active");
	if(!activeDayElem.classList.contains("event")){
		activeDayElem.classList.add("event");
	}
});
for(let c=0;c<7;c++){
	eventContALL[c].addEventListener("click", (e)=>{
		if(e.target.classList.contains("event")){
			// if(confirm("Вы действительно хотите удалить запись?")){
			// 	const eventTitle = e.target.children[0].children[1].innerHTML;
				//console.log(eventTitle);
				eventsArr.forEach((event)=>{
					if(
						event.day===activeDay &&
						event.month===month+1 &&
						event.year===year
					){
						console.log(event.day, event.month, event.year);
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
					}
			}
		});
		console.log(activeDay);
		updateEvents(activeDay);
		}
		});
	}






function saveEvents(){
	localStorage.setItem("events", JSON.stringify(eventsArr));
}
function getEvents(){
	if(localStorage.getItem("events"===null)){
		return;
	}
	eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}
