let addNote =  document.querySelector('.add__text'),
addButton = document.querySelector('.btn__add_note'),
todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){

    let newToDo = {
        todo: addNote.value,
        // checked: false,
        important: false
    };
    todoList.push(newToDo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addNote.value = ""
});

function displayMessages(){
    let displayMessage = '';
    todoList.forEach(function(item, i){ 
        displayMessage += `
        <li>
             
            <label for='item_${i}' class="${item.important ? 'important': ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}
{/* <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}></input> */}

// todo.addEventListener('change', function(event){
//     let idInput = event.target.getAttribute('id');
//     let valueLabel = todo.querySelector('[for=' + idInput + ']').innerHTML;
//     todoList.forEach(function(item){
//         if (item.todo === valueLabel){
//             item.checked = !item.checked;
//             localStorage.setItem('todo', JSON.stringify(todoList));
//         }
//     });
// });

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if (item.todo === event.target.innerHTML){
            if (event.ctrlKey){
                todoList.splice(i, 1);
            }
            else{
                item.important = !item.important;

            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});
