let addNote =  document.querySelector('.add__text'),
addButton = document.querySelector('.btn__add_note'),
todo = document.querySelector('.todo');

let todoList = [];

ID = 2;

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
                checked: che
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
        if (item.todo === event.target.innerHTML){
            if (event.ctrlKey){
                todoList.splice(i, 1);
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

            //localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
    displayMessages();
});
