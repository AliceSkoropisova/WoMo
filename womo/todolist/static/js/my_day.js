let addNote =  document.querySelector('.add__text'),
addButton = document.querySelector('.btn__add_note'),
todo = document.querySelector('.todo');

let todoList = [];

displayMessages();

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


if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){

    let newToDo = {
        todo: addNote.value,
        checked: false,
        important: false
    };
    //todoList.push(newToDo);
    $.ajax({
        method: 'POST',
        async: false,
        url: '',
        dataType: 'json',
        data: {
            delo: newToDo.todo,
            importance: newToDo.important,
            checked: newToDo.checked,
            action: 'post',
            user_id: ID,
            day: headerDateArray[1],
            month: headerDateArray[0],
            year: headerDateArray[2],
            csrfmiddlewaretoken: getCookie('csrftoken')
        },
        success: function (data) {
            console.log("it worked!");
        },
        error: function (data) {
            console.log("it didnt work");
        }
    });
    displayMessages();

    //localStorage.setItem('todo', JSON.stringify(todoList));
    addNote.value = ""
});

function displayMessages(){
    let displayMessage = '';
    $.ajax(
    {
        type:'GET',
        async: false,
        url: '',
        dataType: 'json',
        data:{
                 csrfmiddlewaretoken: getCookie('csrftoken'),
                 action: 'get',
                 user_id: ID,
                 day: headerDateArray[1],
                 month: headerDateArray[0],
                 year: headerDateArray[2],
        },
        success: function(data)
        {
            todoList.length = 0;
            localStorage.clear();
            for(i = 0; i<data.data.length; i++)
            {
                if(data.data[i].important == 'false')
                {
                    imp= false;
                }
                else
                {
                    imp= true;
                }
                if(data.data[i].checked == 'false')
                {
                    che = false;
                }
                else
                {
                    che = true;
                }
                let newToDo = {
                    todo: data.data[i].todo,
                    important: imp,
                    checked: che,
                };
                todoList.push(newToDo);
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        }
    });
    if(todoList.length == 0)
    {
        todo.innerHTML = displayMessage;
    }
    todoList.forEach(function(item, i){ 
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}></input>

            <label for='item_${i}' class="${item.important ? 'important': ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}



 todo.addEventListener('change', function(event){
     let idInput = event.target.getAttribute('id');
     let valueLabel = todo.querySelector('[for=' + idInput + ']').innerHTML;
     todoList.forEach(function(item){
         if (item.todo === valueLabel){
             $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        delo: item.todo,
                        importance: item.important,
                        action: 'change checked',
                        user_id: ID,
                        checked: item.checked,
                        day: headerDateArray[1],
                        month: headerDateArray[0],
                        year: headerDateArray[2],
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        console.log("it is deleted!");
                    },
                    error: function (data) {
                        console.log("it isnt deleted");
                    }
             });
             //item.checked = !item.checked;
             //localStorage.setItem('todo', JSON.stringify(todoList));
         }
     });
 });

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        console.log(5);
        if (item.todo === event.target.innerHTML && flag===1){
            if (event.ctrlKey){
                //todoList.splice(i, 1);
                $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        delo: item.todo,
                        importance: item.important,
                        action: 'delete',
                        user_id: ID,
                        day: headerDateArray[1],
                        month: headerDateArray[0],
                        year: headerDateArray[2],
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
            else{
                if(flag===1)
                {
                    //item.important = !item.important;
                    $.ajax({
                        method: 'POST',
                        async: false,
                        url: '',
                        dataType: 'json',
                        data: {
                            delo: item.todo,
                            importance: item.important,
                            action: 'change',
                            user_id: ID,
                            day: headerDateArray[1],
                            month: headerDateArray[0],
                            year: headerDateArray[2],
                            csrfmiddlewaretoken: getCookie('csrftoken')
                        },
                        success: function (data) {
                            console.log("it is changed!");
                        },
                        error: function (data) {
                            console.log("it isnt changed");
                        }
                    });
                    //item.important = !item.important;
                }
            }

            //localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
    displayMessages();
});

let text_note_link = "Тут пока пусто";
let note_textMain = document.querySelector(".note_textMain");
function main_notes(){
    a = 1;
    $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        action: 'notes',
                        user_id: ID,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        a = data.note
                    },
                    error: function (data) {
                        console.log("it isnt deleted");
                    }
    });
    if (a != 'null'){
        note_textMain.innerHTML = a.topic;
    }
    else{
        note_textMain.innerHTML.innerHTML = "Тут пока пусто"; //строке из бд
    }
}
main_notes();

let text_goal_link;

let goal_textMain = document.querySelector(".goal_textMain");
let circularProgressMain = document.querySelector('.circular-progress_main');
let progressValueMain = document.querySelectorAll('.progress-value_main');
let k_done_subpoint = 5;

function main_circle(){
    // в следующую строку надо передать число последнего кружочка
    // в целях сколько процентов там выполнено в виде числа без
    // знака процента
    // пока для примера тут высчитывается Math.ceil(k_done_subpoint*100/10)
    $.ajax({
                    method: 'POST',
                    async: false,
                    url: '',
                    dataType: 'json',
                    data: {
                        action: 'goal',
                        user_id: ID,
                        csrfmiddlewaretoken: getCookie('csrftoken')
                    },
                    success: function (data) {
                        kol_vip = data.kol_vip;
                        kol_vsego = data.kol_vsego;
                        name = data.name;

                    },
                    error: function (data) {
                        console.log("it isnt deleted");
                    }
    });

    // сюда мы передаем название последней цели из бд в виде строки
    if (name != 'null'){
        text_goal_link = Math.ceil((kol_vip*100/kol_vsego));//Math.ceil(k_done_subpoint*100/10);
        goal_textMain.innerHTML = name; //строке из бд
        progressValueMain[0].innerHTML = `${text_goal_link}%`;
        circularProgressMain.style.background = `conic-gradient(#7d2ae8, ${text_goal_link * 3.6}deg, #ededed 0deg)`;
        if (progressValueMain[0].innerHTML === "100%"){
            progressValueMain[0].innerHTML = "DONE!";
        }
    }
    else{
        goal_textMain.innerHTML = "Тут пока пусто"; //строке из бд
        progressValueMain[0].innerHTML = `0%`;
        circularProgressMain.style.background = `conic-gradient(#7d2ae8, ${0 * 3.6}deg, #ededed 0deg)`;
    }
}

main_circle();