let btns = document.querySelector("*[data-modal-btn]");
let arr_for_DB = [];
let goalsList = [];
let num_subpoint = 0;
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
// список в котором только название целей, при нажатии на который будем работать с подцелями
let outLIST_AIMS = document.querySelector(".list_goals");

let name = btns.getAttribute('data-modal-btn');
let modal = document.querySelector("[data-modal-window='" + name + "']");

let add_subpoint = modal.querySelector("*[data-btn]");
let addGoal = modal.querySelector(".add__text");
let goals_todo = modal.querySelector(".input_goal");
let resumeData = modal.querySelector(".resume_goal");
let name_of_Goal = modal.querySelector(".goal_header");

// загрузка массива из localStorage при ооткрытии страницы и вывод списка целей на экран
if(localStorage.getItem('arr_for_DB')){
    arr_for_DB = JSON.parse(localStorage.getItem('arr_for_DB'));
    displayHeaders();
}


// выводим на экран список подцелей при добавлении в модальном окне
// здесь сохранять в БД данные не надо!!!!!!!!!!!!!!!!
function displayMessages(){

    let displayMessage = '';
    if (goalsList.length > 0){
        goalsList.forEach(function(item, i){
            displayMessage += `
            <li>
                <input type='checkbox' class='goals_checkbox' id='aim_${i}' ${item.checked ? 'checked' : ''}></input>
                <label for='aim_${i}' class="${item.important ? 'important': ''}">${item.goals_todo}</label>
            </li>
            `;
            // goals_todo.innerHTML = displayMessage;
        });
    } 
    goals_todo.innerHTML = displayMessage;
}

// выводим названия целей на самой странице целей вне модального окна
function displayHeaders(){
    let displayHeader = '';
    if (arr_for_DB.length > 0){
        arr_for_DB.forEach(function(item, i){
            displayHeader += `
            <li>
                <div class="container">
                    <div class="circular-progress" id='aimProgress_${i}'>
                        <span class = "progress-value" id='aimProgressValue_${i}'>0%</span>
                    </div>            
                </div>            
                <label id='aimHeader_${i}'>${item.header}</label>
            </li>
            `;
        });
    } 
    outLIST_AIMS.innerHTML = displayHeader;
}



// обработка всех функций внутри модального окна
btns.addEventListener('click', function(){    
    num_subpoint = 0;
    modal.style.display = "block";
    displayMessages();

    // добавляем подцели в модальном окне, БД тоже здесь не нужна
    add_subpoint.addEventListener('click', function(){
        if (num_subpoint < 10){
            let newAim = {
                goals_todo: addGoal.value,
                checked: false,
                important: false
            };

            if (newAim.goals_todo !== ""){
                goalsList.push(newAim);
                
                num_subpoint++;
                if (num_subpoint === 10){
                    add_subpoint.display = "none";
                }
            } 
            displayMessages();
            addGoal.value = ""; 
        }
    });

    
    let close = modal.querySelector(".close_modal_window");
    close.addEventListener('click', function(){
        goalsList.length = 0;
        modal.style.display = "none";
        name_of_Goal.value = "";
        addGoal.value = "";
    });    

    // нажатие на кнопку Добавить
    resumeData.addEventListener('click', function(){
        // до 119 строки проверка, что цели с таким заголовком не существует или название цели не пустая строка
        let flag = 0;
        for (let j = 0; j < arr_for_DB.length && flag === 0; j++){
            if (arr_for_DB[j].header === name_of_Goal.value || name_of_Goal.value === ""){
                flag = 1;
            }
        }
        if (flag === 1){
            name_of_Goal.style.background = "#cf1c4f";

            setInterval(
                function() {
                    name_of_Goal.style.backgroundColor = "#F7E7FF";
                }, 1000);
        }
        else{
            name_of_Goal.style.background = "#F7E7FF";

            // элементы данной структуру будут хранится в массиве для БД
            let newGOAL_FOR_DB = {
                header: name_of_Goal.value, // название цели
                subpoints: goalsList // массив с элементами подцелей (внутри название подцели checked important)
            };
            podgoals = [];
            i = 0;
            goalsList.forEach((item) => {
                 podgoals[i] = item;
                 i++;
             });
            $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        action: 'post',
                        user_id: ID,
                        title: name_of_Goal.value,
                        podgoals: JSON.stringify(podgoals),
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        console.log("it work");
                    },
                    error: function (data) {
                        console.log("it didnt work");
                    }
                });
            arr_for_DB.push(newGOAL_FOR_DB);
            localStorage.setItem('arr_for_DB', JSON.stringify(arr_for_DB));

            // вывод массива на экран, если вдрыг захотите провериить, что внутри
            // arr_for_DB.forEach((item) => {
            //     console.log("header: " + item.header + "\nsubpoints: ");
            //     item.subpoints.forEach((podmains) => {
            //         console.log(podmains.goals_todo);
            //     });
                
            // });

            // очищаем массив подцелей, чтобы он был пустой при добавлении новой цели 
            while(goalsList.length > 0){
                goalsList.shift();
            }

            name_of_Goal.value = "";
            addGoal.value = "";
            modal.style.display = "none";

            displayHeaders();
        }
    });
});


// список с названием целей, при нажатии откроется боковое модальное окно с иноформацией о цели
let mainList = document.querySelector(".list_goals");
let elements_of_mainList = mainList.querySelectorAll('[id^="aimHeader_"]');
let circularProgress = mainList.querySelectorAll('[id^="aimProgress_"]');
let progressValue = mainList.querySelectorAll('[id^="aimProgressValue_"]');

// удаление цели при нажатии правой кнопкой мыши и клавиши ctrl
mainList.addEventListener('contextmenu', function(event){
    event.preventDefault();
    arr_for_DB.forEach(function(item, i){
        if (item.header === event.target.innerHTML){
            if (event.ctrlKey){
                arr_for_DB.splice(i, 1);
            }
            displayHeaders();
            localStorage.setItem('arr_for_DB', JSON.stringify(arr_for_DB));
        }
    });

    arr_for_DB.forEach((item) => {
        console.log("header: " + item.header + "\nsubpoints: ");
        // item.subpoints.forEach((podmains) => {
        //     console.log(podmains.goals_todo);
        // });
        
    });
    console.log("----------------------");

});


// mainList.addEventListener('click', function(event){
//     // название нажатой цели
//     let whichEl = event.target.innerHTML;
//     let index = -1, index__from = 0, index__to = 0;
//     if (whichEl !== ""){
//         index = header.indexOf(whichEl);
//         // console.log("index = " + index);
//         // console.log("whichEl = " + whichEl +  " index = " + index); 

//         if (index !== -1){
//             let side_window = document.querySelector(".watching");
//             let header_sideWindow = side_window.querySelector("#side___header");
//             let side_goalsList = document.querySelector(".concrete__goal");
//             let side__close = side_window.querySelector(".side__close_modal_window");
    
//             header_sideWindow.innerHTML = whichEl;
//             side_window.style.display = "block";
    
//             function display__side(){
//                 let displayMessage = '';
//                 for (let k = 0; k < index; k++){
//                     index__from += kol[k];
//                 }
//                 index__to = index__from + kol[index];
//                 // console.log("index__from = " + index__from);
//                 // console.log("index__to = " + index__to);
    
//                 for (let k = index__from; k < index__to; k++){
//                     displayMessage += `
//                     <li>
//                         <input type='checkbox' class='custom_checkbox' id='side_goal_${k}' ${outGOALS[k].checked ? 'checked' : ''}></input>
//                         <label for='side_goal_${k}' class="${outGOALS[k].important ? 'important': ''}">${outGOALS[k].goals_todo}</label>
//                     </li>
//                     `;
//                 }
    
//                 side_goalsList.innerHTML = displayMessage;        
//             }
//             display__side();

//             // если в боковом окне просмотра цели ставим галочку, запоминаем все в локал стораж
//             // НЕ РАБОТАЕТ ПРИ НАЖАТИИ НА ДРУГУЮ ЦЕЛЬ НАЧИНАЕТ МЕНЯТЬ item.checked = !item.checked; СТОЛЬКО РАЗ
//             // СКОЛЬКО НАЖАТИЙ НА ЦЕЛИ БЫЛО Т.Е.
//             // ПЕРВАЯ ЦЕЛЬ КОРРЕКТНА, А ДАЛЬШЕ ПРИ НАЖАТИИ НА ДРУГУЮ ЦЕЛЬ 2 РАЗА item.checked = !item.checked
//             // ПОТОМ 3 И ТД
//             // ОШИБКУ ПОЙМАТЬ НЕ МОГУ ВОЗМОЖНО С БД БУДЕТ БЕЗ ЭТОЙ ОШИБКИ
//             side_goalsList.addEventListener('change', function(event){
//                 let idInput = event.target.getAttribute('id');
//                 let valueLabel = side_goalsList.querySelector('[for=' + idInput + ']').innerHTML;
//                 outGOALS.forEach(function(item){
//                     if (item.goals_todo === valueLabel){
//                         item.checked = !item.checked;
//                         localStorage.setItem('outGOALS', JSON.stringify(outGOALS));
//                     }
//                 });
//                 if (progressValue[header.indexOf(whichEl)].textContent !== "DONE!"){
//                     let newStartProgressValue = progressValue[header.indexOf(whichEl)].textContent.split("%")[0];
//                     // console.log("start = " + parseInt(newStartProgressValue, 10));
//                 }
//                 else{

//                 }
//             });

//             side__close.addEventListener('click', function(){
//                 side_window.style.display = "none";
//             });
            
//         }
//     }
// });