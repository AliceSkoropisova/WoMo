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

//отправка чеков на сервер
displayHeaders();


// выводим на экран список подцелей при добавлении в модальном окне
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

function db(){
$.ajax({
                    method: 'GET',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        action: 'get',
                        user_id: ID,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        arr_for_DB.length = 0;
                        podgoals = [];

                        for(i=0; i<data.goals.length; i++)
                        {
                            podgoals = [];
                            for(j=0; j<data.podgoals.length; j++)
                            {
                                if(data.podgoals[j].goal == data.goals[i].id)
                                {
                                    if(data.podgoals[j].checked == 'false')
                                    {
                                        ch= false;
                                    }
                                    else
                                    {
                                        ch= true;
                                    }
                                    let newAim = {
                                        goals_todo: data.podgoals[j].podgoal,
                                        checked: ch,
                                        important: false
                                    };
                                    podgoals.push(newAim);
                                }
                            }
                            let newGOAL_FOR_DB = {
                                header: data.goals[i].goal,
                                subpoints: podgoals
                            };
                            arr_for_DB.push(newGOAL_FOR_DB);

                        }
                    },
                    error: function (data) {
                        console.log("it didnt work");
                    }
          });

}

// выводим названия целей на самой странице целей вне модального окна
function displayHeaders(progressValue){
    $.ajax({
                    method: 'GET',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        action: 'get',
                        user_id: ID,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        arr_for_DB.length = 0;
                        podgoals = [];

                        for(i=0; i<data.goals.length; i++)
                        {
                            podgoals = [];
                            for(j=0; j<data.podgoals.length; j++)
                            {
                                if(data.podgoals[j].goal == data.goals[i].id)
                                {
                                    if(data.podgoals[j].checked == 'false')
                                    {
                                        ch= false;
                                    }
                                    else
                                    {
                                        ch= true;
                                    }
                                    let newAim = {
                                        goals_todo: data.podgoals[j].podgoal,
                                        checked: ch,
                                        important: false
                                    };
                                    podgoals.push(newAim);
                                }
                            }
                            let newGOAL_FOR_DB = {
                                header: data.goals[i].goal,
                                subpoints: podgoals
                            };
                            arr_for_DB.push(newGOAL_FOR_DB);

                        }
                    },
                    error: function (data) {
                        console.log("it didnt work");
                    }
          });


    let displayHeader = '';
    if (arr_for_DB.length > 0){
        arr_for_DB.forEach(function(item, i){

            displayHeader += `
            <li>
                <div class="container">
                    <div class="circular-progress" id='aimProgress_${i}'>
                        <span class = "progress-value" id='aimProgressValue_${i}'>0</span>
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
    let side_window = document.querySelector(".watching");
    side_window.style.display = "none";

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
            else if (goalsList.length === 0){
                flag = 2;
            }
        }
        if (flag !== 0){
            if (flag === 1){
                name_of_Goal.style.background = "#cf1c4f";
                setInterval(
                    function() {
                        name_of_Goal.style.backgroundColor = "#F7E7FF";
                    });
            }
            else if (flag === 2){
                addGoal.style.background = "#cf1c4f";
                setInterval(
                    function() {
                        addGoal.style.backgroundColor = "#F7E7FF";
                    });
            }
        }
        else{
            name_of_Goal.style.background = "#F7E7FF";
            addGoal.style.background = "#F7E7FF";

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
            //arr_for_DB.push(newGOAL_FOR_DB);
            //localStorage.setItem('arr_for_DB', JSON.stringify(arr_for_DB));

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
            //displayHeaders();
            location.reload();

        }

    });

});


// список с названием целей, при нажатии откроется боковое модальное окно с иноформацией о цели
let mainList = document.querySelector(".list_goals");

let elements_of_mainList = mainList.querySelectorAll('[id^="aimHeader_"]');

let circularProgress = mainList.querySelectorAll('[id^="aimProgress_"]');
/////
let progressValue = mainList.querySelectorAll('[id^="aimProgressValue_"]');


function static_circle(){
    elements_of_mainList.forEach(function(item){
        let k_done_subpoint = 0, index = -1, LEN = 0;
        // считаем сколько пунков выполнено для каждой цели и будем высчитывать кружочек прогресс бара
        for(let k = 0, flag = 1; k < arr_for_DB.length && flag === 1; k++){
            if (arr_for_DB[k].header === item.innerHTML){
                index = k;
                arr_for_DB[k].subpoints.forEach(function(item){
                    LEN++;
                    if (item.checked){
                        k_done_subpoint++;
                    }
                });
                //console.log("LEN = " + LEN + "\nindex = " + index + "\nk_done_subpoint = " + k_done_subpoint);
                let progressEndValue = Math.ceil(k_done_subpoint*100 /LEN);
                //console.log("progressEndValue = " + progressEndValue);

                progressValue[index].textContent = `${progressEndValue}%`;
                //console.log("progressValue[index].textContent = " + progressValue[index].textContent);
                circularProgress[index].style.background = `conic-gradient(#7d2ae8, ${progressEndValue * 3.6}deg, #ededed 0deg)`;
                if (progressValue[index].textContent === "100%"){
                    progressValue[index].textContent = "DONE!";
                }
                flag = 0;
            }
        }
        //////
        displayHeaders(progressValue);
    });

}

function circles(which_circle, start_pos){
    // при загрузке страницы загружаем все кружки
    if (which_circle === -1 && start_pos === -1){

        elements_of_mainList.forEach(function(item){
            let k_done_subpoint = 0, index = -1;
            // считаем сколько пунков выполнено для каждой цели и будем высчитывать кружочек прогресс бара
            for(let k = 0, flag = 1; k < arr_for_DB.length && flag === 1; k++){
                if (arr_for_DB[k].header === item.innerHTML){
                    index = k;
                    arr_for_DB[k].subpoints.forEach(function(item){
                        if (item.checked){
                            k_done_subpoint++;
                        }
                    });
                    flag = 0;
                }
            }

            let progressEndValue = 0;
            if (k_done_subpoint !== 0){
                progressEndValue = Math.ceil(k_done_subpoint*100/arr_for_DB[index].subpoints.length);
            }

            let progressStartValue = 0, speed = 100;
            let progress = setInterval(() => {
                if (progressEndValue !== 0){
                    progressStartValue++;
                }

                progressValue[index].textContent = `${progressStartValue}%`;
                circularProgress[index].style.background = `conic-gradient(#7d2ae8, ${progressStartValue * 3.6}deg, #ededed 0deg)`;
                if (progressValue[index].textContent === "100%"){
                    progressValue[index].textContent = "DONE!";
                }

                if (progressStartValue == progressEndValue){
                    clearInterval(progress);
                }
            })
        });
    }
    //меняем конкретный кружок
    else{
        // считаем сколько пунков выполнено для каждой цели и будем высчитывать крудочек прогресс бара
        let index = which_circle, k_done_subpoint = 0;
        arr_for_DB[index].subpoints.forEach(function(item){
            if (item.checked){
                k_done_subpoint++;
            }
        });

        let progressEndValue = 0;
        if (k_done_subpoint !== 0){
            progressEndValue = Math.ceil(k_done_subpoint*100/arr_for_DB[index].subpoints.length);
        }

        let progressStartValue = start_pos, speed = 100;
        // console.log("progressStartValue = " + progressStartValue + "\nprogressEndValue = " + progressEndValue);
        let progress = setInterval(() => {
            if (progressEndValue < progressStartValue){
                progressStartValue--;

                progressValue[index].textContent = `${progressStartValue}%`;
                circularProgress[index].style.background = `conic-gradient(#7d2ae8, ${progressStartValue * 3.6}deg, #ededed 0deg)`;
                if (progressValue[index].textContent === "100%"){
                    progressValue[index].textContent = "DONE!";
                }

                if (progressStartValue == progressEndValue){
                    clearInterval(progress);
                }
            }

            else{
                if (progressEndValue !== 0){
                    progressStartValue++;
                }

                progressValue[index].textContent = `${progressStartValue}%`;
                circularProgress[index].style.background = `conic-gradient(#7d2ae8, ${progressStartValue * 3.6}deg, #ededed 0deg)`;
                if (progressValue[index].textContent === "100%"){
                    progressValue[index].textContent = "DONE!";
                }

                if (progressStartValue == progressEndValue){
                    clearInterval(progress);
                }
            }
        })
    }
}
circles(-1, -1);
console.log("progressValue");
console.log(progressValue);


// удаление цели при нажатии правой кнопкой мыши и клавиши ctrl
mainList.addEventListener('contextmenu', function(event){
    event.preventDefault();
    arr_for_DB.forEach(function(item, i){
        if (item.header === event.target.innerHTML){
            if (event.ctrlKey){
                $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        action: 'delete',
                        user_id: ID,
                        header: item.header,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        console.log("it is deleted!");
                    },
                    error: function (data) {
                        console.log("it isnt deleted");
                    }
                });
                let side_window = document.querySelector(".watching");
                let header_sideWindow = side_window.querySelector("#side___header");
                // если удаляем цель, которая сбоку открыта,
                // то при ее удалении надо свернуть боковое модальное окно
                if (header_sideWindow.innerHTML === item.header){
                    side_window.style.display = "none";
                }
            }

            location.reload();
        }
    });
});

let side_window = document.querySelector(".watching");
            let header_sideWindow = side_window.querySelector("#side___header");
            let side_goalsList = document.querySelector(".concrete__goal");

            let side__close = side_window.querySelector(".side__close_modal_window");
            let index = -1;
mainList.addEventListener('click', function(event){
    // название нажатой цели
    let whichEl = event.target.innerHTML;
    index = -1;
    if (whichEl !== ""){
        for(let k = 0, flag = 1; k < arr_for_DB.length && flag === 1; k++){
            if (arr_for_DB[k].header === whichEl){
                index = k;
                console.log(index);
                flag = 0;
            }
        }
        console.log('index');
        if (index !== -1){

 side_window = document.querySelector(".watching");
             header_sideWindow = side_window.querySelector("#side___header");
             side_goalsList = document.querySelector(".concrete__goal");

            side__close = side_window.querySelector(".side__close_modal_window");

            header_sideWindow.innerHTML = whichEl;
            display__side();
            side_window.style.display = "block";

            // ПРИ ДОБАВЛЕНИИ ЦЕЛИ А ПОТОМ СРАЗУ ЖЕ НАЖАТИИ НА НЕЕ НЕ ОТОБРАЖАЕТСЯ НИЧЕГО
            // ЕСЛИ ОБНОВИТЬ ОКНО ТО СБОКУ ВСЕ ОТОБРАЗИТСЯ
            // ПРОБЛЕМА В ТОМ ЧТО ОН ДЛИНУ МАССИВА СЧИТАЕТ РАВНОЙ 0 ЕСЛИ НЕ ОБНОВЛЯТЬ СТРАНИЦУ
            //  ЕСЛИ ОБНОВИТЬ ТО ВСЕ КОРРЕКТНО
            function display__side(){
                let displaySide = '';
                //console.log(arr_for_DB[index]);
                if (arr_for_DB[index].subpoints.length > 0){
                    arr_for_DB[index].subpoints.forEach(function(item, i){
                            displaySide += `
                            <li>
                                <input type='checkbox' class='custom_checkbox' id='side_goal_${i}' ${item.checked ? 'checked' : ''}></input>
                                <label for='side_goal_${i}' class="${item.important ? 'important': ''}">${item.goals_todo}</label>
                            </li>
                            `;
                        side_goalsList.innerHTML = displaySide;
                    });
                }
            }

            // если в боковом окне просмотра цели ставим галочку, запоминаем все в локал стораж
            // НЕ РАБОТАЕТ ПРИ НАЖАТИИ НА ДРУГУЮ ЦЕЛЬ НАЧИНАЕТ МЕНЯТЬ item.checked = !item.checked; СТОЛЬКО РАЗ
            // СКОЛЬКО НАЖАТИЙ НА ЦЕЛИ БЫЛО Т.Е.
            // ПЕРВАЯ ЦЕЛЬ КОРРЕКТНА, А ДАЛЬШЕ ПРИ НАЖАТИИ НА ДРУГУЮ ЦЕЛЬ 2 РАЗА item.checked = !item.checked
            // ПОТОМ 3 И ТД
            // ОШИБКУ ПОЙМАТЬ НЕ МОГУ ВОЗМОЖНО С БД БУДЕТ БЕЗ ЭТОЙ ОШИБКИ

//circles(-1, -1);
            side__close.addEventListener('click', function(){
                side_window.style.display = "none";
            });
            
        }
    }
});
side_goalsList.addEventListener('change', function(event){
                let idInput = event.target.getAttribute('id');
                let stop = 1;
                for (let k = 0; k < arr_for_DB.length && stop; k++){
                    if (arr_for_DB[k].header === header_sideWindow.innerHTML){
                        let j = parseInt(idInput.split("_")[2], 10);

                                $.ajax({
                            method: 'POST',
                            async: false,
                            url: '',
                            dataType: 'json',
                            data: {
                                action: 'change',
                                user_id: ID,
                                title: arr_for_DB[k].header,
                                podgoals: arr_for_DB[k].subpoints[j].goals_todo,
                                index: j,
                                csrfmiddlewaretoken: getCookie('csrftoken')
                            },
                            success: function (data) {
                                console.log("it work");
                            },
                            error: function (data) {
                                console.log("it didnt work");
                            }
                        });
                        stop = 0;
                        db();
                        //displayHeaders();
                    }
                }

                if (progressValue[index].textContent !== "DONE!"){
                    let newStartProgressValue = progressValue[index].textContent.split("%")[0];
                    console.log("start = " + parseInt(newStartProgressValue, 10));
                    //circles(-1, -1);
                    circles(index,  parseInt(newStartProgressValue, 10));
                }
                else{
                //circles(-1, -1);
                    circles(index,  100);
                }
                //displayHeaders();


            });