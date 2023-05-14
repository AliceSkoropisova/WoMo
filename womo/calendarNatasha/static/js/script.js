let nav = 0;//счетчик месяцев
let clicked = null;//для отслеживания нажатого дня
let events = localStorage.getItem('events')? JSON.parse(localStorage.getItem('events')):[];
//необходимо убедиться что запись существует в памяти localStorage до того как
//переобразовывать строку из JSON обратно в объект
//если мы можем получить объект из памяти, то мы знаем что он существует
//тогда мы можем вызвать метод JSON.parse и получить объект, иначе просто вернем пустой массив
const calendar = document.getElementById('calendar');   //все getElementById просто получаю элементы с таким id из html
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays=['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];//для правильного отображения по дням недели
var button=document.getElementsByTagName('button');//получили кнопки все

function openModal(date){//ф-я для окошка для записи
	clicked=date;//
	const eventForDay = events.find(e=>e.date===clicked);//ищем записи этой даты
	if(eventForDay){
		document.getElementById('eventText').innerText = eventForDay.title;//имеющаяся задачка
		deleteEventModal.style.display = 'block';//просто блочное отображение
	}else{
		newEventModal.style.display = 'block';
	}
	backDrop.style.display = 'block';
}
function load(){//главная ф-я для отображения календаря, месяца
	const dt = new Date();//объект типа Дата
	if(nav!==0)//если мы листаем
	{
		dt.setMonth(new Date().getMonth() + nav);//то меняем отображение месяца
	}
	const day = dt.getDate();//нынешняя дата
	const month = dt.getMonth();//нынешние месяц и год
	const year = dt.getFullYear();
	const firstDayOfMonth = new Date(year, month, 1);//получаем первый день любого месяца
	const daysInMonth = new Date(year, month+1, 0).getDate();//и количество дней в любом месяце
	const dateString = firstDayOfMonth.toLocaleDateString('ru', {//правило записи числа
		weekday: 'long', 
		year: 'numeric', 
		month: 'numeric', 
		day: 'numeric',
	});
	const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);//дни другого месяца,которые лезут в нынешний
	const monthDisp=dt.toLocaleDateString('ru', {month: 'long'});//отобразим название месяца
	const upperMonth=monthDisp[0].toUpperCase()+monthDisp.slice(1);
	console.log();
	document.getElementById('monthDisplay').innerText=`${upperMonth} ${year}`;
	console.log(upperMonth);
	calendar.innerHTML=' ';     //очищение салендаря для листания
	for(let i=1;i<=paddingDays+daysInMonth;i++){//пройдемся по всем дням(прошлого,этого и будущего месяцев)
		const daySquare = document.createElement('div');//создаем элемент с тэгом див
		daySquare.classList.add('day');//добавляем класс день
		const dayString=`${i-paddingDays}/${month+1}/${year}`;//просто строка для числа
		//const lastDay=`${}`;
		console.log(dayString);
		if(i>paddingDays){//если мы в этом месяце
			daySquare.innerText=i-paddingDays;//тогда пишем число в квадратик
			const eventForDay = events.find(e=>e.date=== dayString);//если у даты есть событие,мы прибережем его для записи в этот день
			if(i-paddingDays===day && nav===0){//определяю нынешний день,выделяю его цветом
				daySquare.id = 'currentDay';
			}
			
			if(eventForDay)//запись имеющихся событий под дату
			{
				const eventDiv = document.createElement('div');//элемент с тэгом див
				eventDiv.classList.add('event');//добавляем класс событие
				eventDiv.innerText = eventForDay.title;//и записываем дело
				daySquare.appendChild(eventDiv);//вставляем полученный элемент
			}
			daySquare.addEventListener('click', ()=>openModal(dayString));//для окошка с записью задач
		}
		else{
			daySquare.classList.add('padding');//иначе добавляем класс неактуальных дней
		}
		calendar.appendChild(daySquare);
		//calendar.appendChild(daySquare);//добавляем квадратик со днем
	}
}
function closeModal()//закрываем окошко для записи
{
	eventTitleInput.classList.remove('error');//удалить класс ашипка
	newEventModal.style.display = 'none';//скрываем элементы,сброс стилей
	deleteEventModal.style.display = 'none';
	backDrop.style.display = 'none';
	eventTitleInput.value = '';
	clicked = null;
	load();//но продолжаем жить!
}
function saveEvent(){//сохранение записей
	if(eventTitleInput.value){//мы существуем
		eventTitleInput.classList.remove('error');
		events.push({//пихаем в массив дату и что записали 
			date:clicked,
			title: eventTitleInput.value,
		});
		localStorage.setItem('events', JSON.stringify(events));//в память тоже засунем
		closeModal();//и закроем окошко
	}else{
		eventTitleInput.classList.add('error');
	}
}
function deleteEvent(){//удаление записанных задач
	events = events.filter(e=>e.date!==clicked);//сортируем чтобы удалить только запись с выбранного дня
	localStorage.setItem('events', JSON.stringify(events));
	closeModal();
}
function initButtons(){//ф-я для определения всех кнопок
	document.getElementById('nextButton').addEventListener('click', ()=>{
		nav++;
		load();
	});
	document.getElementById('backButton').addEventListener('click', ()=>{
		nav--;
		load();
	});
	document.getElementById('saveButton').addEventListener('click', saveEvent);
	document.getElementById('cancelButton').addEventListener('click', closeModal);
	document.getElementById('deleteButton').addEventListener('click', deleteEvent);
	document.getElementById('closeButton').addEventListener('click', closeModal);
}

load();
initButtons();





