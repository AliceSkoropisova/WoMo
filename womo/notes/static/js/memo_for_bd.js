const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.add__note');
const noteArr = JSON.parse(localStorage.getItem('noteArr')) || {};
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
viewNote(noteArr);
function setitem(param) {
    localStorage.setItem('noteArr', JSON.stringify(param));
}

function getitem() {
    JSON.parse(localStorage.getItem('noteArr'));
}

function setText(param1, param2, param3) {
    noteArr[param1][0] = param2;
    noteArr[param1][1] = param3;
}

document.onclick = function(event) {
    if (event.target.classList.contains('note__delete') || event.target.classList.contains('fa-trash')) {
        const dellIt = event.target.getAttribute('data-dell');
        delete noteArr[dellIt];
        viewNote(noteArr);
        setitem(noteArr);
    }
    if (event.target.classList.contains('note__edit') || event.target.classList.contains('fa-pen-to-square')) {
        const editBtn = event.target.getAttribute('data-edit');
        const titleVall = document.querySelector(`#note-title-input[data-dell=${editBtn}]`).value;
        const descVall = document.querySelector(`#note-textarea[data-dell=${editBtn}]`).value;

        if (document.querySelector(`button[data-edit=${editBtn}]`).classList.contains("toogle")) {
            document.querySelectorAll(`.hidden-readonly[data-dell=${editBtn}]`).forEach(function(index) {
                index.setAttribute('readonly', true);
                setText(editBtn, titleVall, descVall);
                console.log(noteArr[editBtn]);
                setitem(noteArr);

            })
        } else {
            document.querySelectorAll(`.hidden-readonly[data-dell=${editBtn}]`).forEach(function(index) {
                index.removeAttribute('readonly');
            });
        }
        document.querySelector(`button[data-edit=${editBtn}]`).classList.toggle("toogle");
        document.querySelectorAll(`.hidden-readonly[data-dell=${editBtn}]`).forEach(function(index) {

            index.classList.toggle("no-readonly");
        });
    }

}

function viewNote(param) {
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
                        console.log(noteArr.length);
                        for(i = 0; i<data.data.length; i++)
                        {
                            noteArr[i]=data[i].num;
                            noteArr[i][0]=data[i].topic;
                            noteArr[i][1]=data[i].text;
                            console.log(9);
                        }
                        console.log(noteArr);
                        console.log(7);
                    },
                    error: function (data) {
                        console.log("it didnt work");
                    }
                });
    let contNote = '';
    for (let items in param) {
        let noteTitle = param[items][0];
        let noteDesc = param[items][1];
        contNote += `
        <div class="note">
            <div class="note__header">
                <div class="small_area">
                    <textarea id="note-title-input" class="hidden-readonly" 
                    readonly data-dell="${items}" placeholder="Заголовок"
                    maxlength='9'>${noteTitle}</textarea>
                </div>
                <div class="buttons">
                    <button class="note__edit" data-edit="${items}"><i class="fa-solid fa-pen-to-square" data-edit="${items}"></i></button>
                    <button class="note__delete" data-dell="${items}"><i class="fa-solid fa-trash" data-dell="${items}"></i></button>
                </div>
            </div>
            <div class="big_area">
                <textarea id="note-textarea" class="hidden-readonly" readonly data-dell="${items}" 
                placeholder="Ваш текст">${noteDesc}</textarea>                
            </div>
        </div>`;
    }
    notesEl.innerHTML = contNote;

}

addBtn.addEventListener('click', (e) => {
    noteArr[`item-${(new Date()).getTime()}`] = ['', ''];
    setitem(noteArr);
    viewNote(noteArr);
});