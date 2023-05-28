let btns = document.querySelector("*[data-modal-btn]");
let header = [], kol = [], outGOALS = [], outVALUE_ITEMS = [];
let goalsList = [], value_item = [];
let num_of_goals = 0, num_subpoint = 0;

// список в котором только название целей, при нажатии на который будем работать с подцелями
let outLIST_AIMS = document.querySelector(".list_goals");
// берем данные из локал стораж
if(localStorage.getItem('kol')){
    kol = JSON.parse(localStorage.getItem('kol'));
    header = JSON.parse(localStorage.getItem('header'));
    outGOALS = JSON.parse(localStorage.getItem('outGOALS'));
    outVALUE_ITEMS = JSON.parse(localStorage.getItem('outVALUE_ITEMS'));
    displayHeaders();
}

let name = btns.getAttribute('data-modal-btn');
let modal = document.querySelector("[data-modal-window='" + name + "']");

let add_subpoint = modal.querySelector("*[data-btn]");
let addGoal = modal.querySelector(".add__text");
let goals_todo = modal.querySelector(".input_goal");
let resumeData = modal.querySelector(".resume_goal");
let name_of_Goal = modal.querySelector(".goal_header");
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
// выводим названия целей на самой страницы целей вне модального окна
function displayHeaders(){
    let displayHeader = '';
    if (header.length > 0){
        header.forEach(function(item, i){
            displayHeader += `
            <li>
                <div class="container">
                    <div class="circular-progress" id='aimProgress_${i}'>
                        <span class = "progress-value" id='aimProgressValue_${i}'>0%</span>
                    </div>            
                </div>            
                <label id='aimHeader_${i}'>${item}</label>
            </li>
            `;
            // <input type='checkbox'  class='MAIN_checkbox' id='aimHeader_${i}' ${item.checked ? 'checked' : ''}></input>
            // goals_todo.innerHTML = displayMessage;
        });
    } 
    outLIST_AIMS.innerHTML = displayHeader;
}
// обработка всех функций внутри модального окна
btns.addEventListener('click', function(){
    num_subpoint = 0;

    modal.style.display = "block";
    displayMessages();
    add_subpoint.addEventListener('click', function(){
        if (num_subpoint < 10){
            let newAim = {
                goals_todo: addGoal.value,
                checked: false,
                important: false
            };

            if (newAim.goals_todo !== ""){
                goalsList.push(newAim);
                value_item.push(newAim.goals_todo);
                outGOALS.push(newAim);
                outVALUE_ITEMS.push(newAim.goals_todo);
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
        value_item.length = 0;
        modal.style.display = "none";
        name_of_Goal.value = "";
        addGoal.value = "";
    });

    // запоминает когда ставим галочки в окне добавления
    goals_todo.addEventListener('change', function(event){
        let idInput = event.target.getAttribute('id');
        let valueLabel = goals_todo.querySelector('[for=' + idInput + ']').innerHTML;
        outGOALS.forEach(function(item){
            if (item.goals_todo === valueLabel){
                item.checked = !item.checked;
            }
        });
        
    });
    

    // нажатие на кнопку Добавить
    resumeData.addEventListener('click', function(){
        let flag = 0;
        for (let j = 0; j < header.length && flag === 0; j++){
            if (name_of_Goal.value === header[j] || name_of_Goal.value === ""){
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
            header.push(name_of_Goal.value); kol.push(num_subpoint);
            localStorage.setItem('header', JSON.stringify(header));
            localStorage.setItem('kol', JSON.stringify(kol));
            localStorage.setItem('outGOALS', JSON.stringify(outGOALS));
            localStorage.setItem('outVALUE_ITEMS', JSON.stringify(outVALUE_ITEMS));

            console.log(outVALUE_ITEMS);
            while(goalsList.length > 0){
                goalsList.shift();
                value_item.shift();
            }

            num_of_goals++;
            name_of_Goal.value = "";
            addGoal.value = "";
            modal.style.display = "none";

            displayHeaders();
        }
    });

});


// список с названием целей, при нажатии откроется боковое модальное окно с инофрмацией о цели
let mainList = document.querySelector(".list_goals");
let elements_of_mainList = mainList.querySelectorAll('[id^="aimHeader_"]');
let circularProgress = mainList.querySelectorAll('[id^="aimProgress_"]');
let progressValue = mainList.querySelectorAll('[id^="aimProgressValue_"]');

function circles(which_circle, start_pos){
    // при загрузке страницы загружаем все кружки
    if (which_circle === -1 && start_pos === -1){
        elements_of_mainList.forEach(function(item){
            // считаем сколько пунков выполнено для каждой цели и будем высчитывать крудочек прогресс бара
            let index = header.indexOf(item.innerHTML);

            let index__from = 0, index__to = 0, k_done_subpoint = 0;
            for (let k = 0; k < index; k++){
                index__from += kol[k];
            }
            index__to = index__from + kol[index];

            for (let k = index__from; k < index__to; k++){
                if (outGOALS[k].checked){
                    k_done_subpoint++;
                }
            }
            let progressEndValue = 0;
            if (k_done_subpoint !== 0){
                progressEndValue = Math.ceil(k_done_subpoint*100/kol[index]);
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
            }, speed)
        });
    }
    //меняем конкретный кружок
    else{
        // считаем сколько пунков выполнено для каждой цели и будем высчитывать крудочек прогресс бара
        let index = which_circle;

        let index__from = 0, index__to = 0, k_done_subpoint = 0;
        for (let k = 0; k < index; k++){
            index__from += kol[k];
        }
        index__to = index__from + kol[index];

        for (let k = index__from; k < index__to; k++){
            if (outGOALS[k].checked){
                k_done_subpoint++;
            }
        }
        let progressEndValue = 0;
        if (k_done_subpoint !== 0){
            progressEndValue = Math.ceil(k_done_subpoint*100/kol[index]);
        }

        let progressStartValue = start_pos, speed = 100;
        // console.log("progressStartValue = " + progressStartValue + " progressEndValue = " + progressEndValue);
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
        }, speed)
    }
}
circles(-1, -1);


mainList.addEventListener('contextmenu', function(event){
    event.preventDefault();
    header.forEach(function(item, i){
        if (item === event.target.innerHTML){
            if (event.ctrlKey){
                console.log("внутри удаления");

                let index_del = header.indexOf(item);
                let index__from = 0, index__to = 0;
                for (let k = 0; k < index_del; k++){
                    index__from += kol[k];
                }
                index__to = index__from + kol[index_del];

                for (let k = index__from; k < index__to; k++){
                    outGOALS.splice(k, 1);
                    outVALUE_ITEMS.splice(k, 1);
                }
                kol.splice(i, 1);
                header.splice(i, 1);
            }
            displayHeaders();
            localStorage.setItem('header', JSON.stringify(header));
            localStorage.setItem('kol', JSON.stringify(kol));
            localStorage.setItem('outGOALS', JSON.stringify(outGOALS));
            localStorage.setItem('outVALUE_ITEMS', JSON.stringify(outVALUE_ITEMS));
        }
    });
});


mainList.addEventListener('click', function(event){
    // название нажатой цели
    let whichEl = event.target.innerHTML;
    let index = -1, index__from = 0, index__to = 0;
    if (whichEl !== ""){
        index = header.indexOf(whichEl);
        // console.log("index = " + index);
        // console.log("whichEl = " + whichEl +  " index = " + index); 

        if (index !== -1){
            let side_window = document.querySelector(".watching");
            let header_sideWindow = side_window.querySelector("#side___header");
            let side_goalsList = document.querySelector(".concrete__goal");
            let side__close = side_window.querySelector(".side__close_modal_window");
    
            header_sideWindow.innerHTML = whichEl;
            side_window.style.display = "block";
    
            function display__side(){
                let displayMessage = '';
                for (let k = 0; k < index; k++){
                    index__from += kol[k];
                }
                index__to = index__from + kol[index];
                // console.log("index__from = " + index__from);
                // console.log("index__to = " + index__to);
    
                for (let k = index__from; k < index__to; k++){
                    displayMessage += `
                    <li>
                        <input type='checkbox' class='custom_checkbox' id='side_goal_${k}' ${outGOALS[k].checked ? 'checked' : ''}></input>
                        <label for='side_goal_${k}' class="${outGOALS[k].important ? 'important': ''}">${outGOALS[k].goals_todo}</label>
                    </li>
                    `;
                }
    
                side_goalsList.innerHTML = displayMessage;        
            }
            display__side();

            // если в боковом окне просмотра цели ставим галочку, запоминаем все в локал стораж
            // НЕ РАБОТАЕТ ПРИ НАЖАТИИ НА ДРУГУЮ ЦЕЛЬ НАЧИНАЕТ МЕНЯТЬ item.checked = !item.checked; СТОЛЬКО РАЗ
            // СКОЛЬКО НАЖАТИЙ НА ЦЕЛИ БЫЛО Т.Е.
            // ПЕРВАЯ ЦЕЛЬ КОРРЕКТНА, А ДАЛЬШЕ ПРИ НАЖАТИИ НА ДРУГУЮ ЦЕЛЬ 2 РАЗА item.checked = !item.checked
            // ПОТОМ 3 И ТД
            // ОШИБКУ ПОЙМАТЬ НЕ МОГУ ВОЗМОЖНО С БД БУДЕТ БЕЗ ЭТОЙ ОШИБКИ
            side_goalsList.addEventListener('change', function(event){
                let idInput = event.target.getAttribute('id');
                let valueLabel = side_goalsList.querySelector('[for=' + idInput + ']').innerHTML;
                outGOALS.forEach(function(item){
                    if (item.goals_todo === valueLabel){
                        item.checked = !item.checked;
                        localStorage.setItem('outGOALS', JSON.stringify(outGOALS));
                    }
                });
                if (progressValue[header.indexOf(whichEl)].textContent !== "DONE!"){
                    let newStartProgressValue = progressValue[header.indexOf(whichEl)].textContent.split("%")[0];
                    // console.log("start = " + parseInt(newStartProgressValue, 10));
                    circles(header.indexOf(whichEl),  parseInt(newStartProgressValue, 10));
                }
                else{
                    circles(header.indexOf(whichEl),  100);
                }
            });

            side__close.addEventListener('click', function(){
                side_window.style.display = "none";
            });
            
        }
    }
});