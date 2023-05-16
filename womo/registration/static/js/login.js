let addLogin =  document.querySelector('.entry_login'),
addPassword = document.querySelector('.entry_password',)
button__log_in = document.querySelector('.btn__log_in');

let personalData = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

button__log_in.addEventListener('click', function(){
    console.log(4);
    $.ajax({
        method: 'POST',
        async: false,
        url: '',
        dataType: 'json',
        data: {
            login: addLogin,
            password: addPassword,
            action: 'login',
            csrfmiddlewaretoken: getCookie('csrftoken')
        },
        success: function (data) {
            console.log("it is OK!");
        },
        error: function (data) {
            console.log("it is not OK");
        }
    });
});

