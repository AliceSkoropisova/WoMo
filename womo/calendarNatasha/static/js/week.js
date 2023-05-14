let nav = 0;
let clicked = null;
let events = localStorage.getItem('events')? JSON.parse(localStorage.getItem('events')):[];

const calendar = document.getElementById('calendar');
const weekdays=['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
const numbers = document.getElementById('numbers');

const dateByWeekNumber = (year, week) => {
  // Cоздаём дату, гарантированно входящую в первую неделю.
  const date = new Date(year, 0, 7);
  // Откатываемся до первого четверга года
  // По ГОСТ ИСО 8601-2001 первая неделя года должна содержать четверг
  date.setDate(date.getDate() - (date.getDay() + 10) % 7);
  // Переходим в нужную неделю
  date.setDate(date.getDate() + (week - 1) * 7);
  // Откатываемся до понедельника
  date.setDate(date.getDate() - 3);
  return date;
};




function load(){
	const dt = new Date();

	if(nav!==0)
	{
		dt.setDate(new Date().getDate() + nav*7);
		if(dt.setDate>31){
			dt.setDate(new Date().getDate() + nav);
		}
	}


	const day = dt.getDate();
	const d = dt.getDay();
	const month = dt.getMonth();
	const year = dt.getFullYear();

	startDate = new Date(dt.getFullYear(), 0, 1);
	var days = Math.floor((dt - startDate) /(24 * 60 * 60 * 1000));
	var weekNumber = Math.ceil(days / 7);
	var ya=dateByWeekNumber(year, weekNumber);
	first=ya.getDate();
	console.log(ya.getDate());

	const monthDisp=dt.toLocaleDateString('ru', {month: 'long'});
	const upperMonth=monthDisp[0].toUpperCase()+monthDisp.slice(1);
	document.getElementById('monthDisplay').innerText=`${upperMonth} ${year}`;
	const firstDayOfWeek = new Date(year, month, first);
	const daysInMonth = new Date(year, month+1, 0).getDate();
	const dateString = firstDayOfWeek.toLocaleDateString('ru', {
		weekday: 'long', 
		year: 'numeric', 
		month: 'numeric', 
		day: 'numeric',
	});
	numbers.setAttribute('style', 'white-space:pre;');
	numbers.innerHTML=' ';
	for(let i=0;i<=6;i++){
		 const content=document.createTextNode(first+i);
		 var probel=document.createTextNode(' ');
		numbers.appendChild(content);
		//numbers.appendChild(probel);
		//content.wholeText();
		console.log(content);
		if(content.nodeValue>=10)
		{
			probel=document.createTextNode('       ');
		}
		else
		{
			probel=document.createTextNode('         ');
		}
		numbers.appendChild(probel);
	}
}
load();
var item=document.querySelectorAll('button');
item[0].addEventListener('click', function(){nav--;load()});
item[1].addEventListener('click', function(){nav++;load()});


