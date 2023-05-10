let addLogin =  document.querySelector('.entry_login'),
addPassword = document.querySelector('.entry_password',)
button__log_in = document.querySelector('.btn__log_in');

let personalData = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

button__log_in.addEventListener('click', function(){
    
});

