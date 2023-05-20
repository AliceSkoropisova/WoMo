const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.add__note');

// нигде не использую этот масси втак как пока не знаю как 
let notesList = []; 

function createNote(title, text){
    const noteEl = document.createElement('div');
    noteEl.classList.add('note');
    noteEl.innerHTML = `
    <div class = "note__header">
        <p id = "note__title">${title}</p>
        <input id = "note__title__input" class = "hidden" 
        onfocus="if(this.value==this.defaultValue)this.value=''"    
        onblur="if(this.value=='')this.value=this.defaultValue" 
        value=${title} maxlength="9"
        />
        <div class = "note__actions">
            <div class="note__edit">
                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#000000" fill="none" stroke-linejoin="round" stroke-width="1.125" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M15.1476 5.17537L18.8452 8.83255M19.2372 3.91422L20.0861 4.76321C20.8672 5.54426 20.8672 6.81059 20.0861 7.59164L8.85031 18.8274C8.63076 19.047 8.36311 19.2124 8.06856 19.3106L3.94902 20.6838C3.55814 20.8141 3.18627 20.4422 3.31656 20.0513L4.68974 15.9318C4.78793 15.6372 4.95335 15.3696 5.1729 15.15L16.4087 3.91421C17.1898 3.13317 18.4561 3.13317 19.2372 3.91422Z"></path></svg>
            </div>
            <div class="note__delete">
                <svg width="32" height="32" viewBox="0 0 24 24" stroke="#000000" fill="none" stroke-linejoin="round" stroke-width="1.125" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M18 7H18.5C19.0523 7 19.5 6.55228 19.5 6V5.5C19.5 4.94772 19.0523 4.5 18.5 4.5H15.5M18 7V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V7M18 7H6M6 7H5.5C4.94772 7 4.5 6.55228 4.5 6V5.5C4.5 4.94772 4.94772 4.5 5.5 4.5H8.5M10 10.5V17.5M14 10.5V17.5M15.5 4.5V4C15.5 2.89543 14.6046 2 13.5 2H10.5C9.39543 2 8.5 2.89543 8.5 4V4.5M15.5 4.5H8.5"></path></svg>
            </i></div>
        </div>
    </div>
    <div class = "TN">
        <p id = "note__text">${text}</p>
    
    <textarea id = "note__textarea" class = "hidden" 
    onfocus="if(this.value==this.defaultValue)this.value=''"    
    onblur="if(this.value=='')this.value=this.defaultValue" 
    value=${text}>${text}</textarea>


    </div> 
    `

    const editBtn = noteEl.querySelector('.note__edit');
    const deleteBtn = noteEl.querySelector('.note__delete');
    const titleEl = noteEl.querySelector('#note__title');
    const textEl = noteEl.querySelector('#note__text');
    const titleInputEl = noteEl.querySelector('#note__title__input');
    const textInputEl = noteEl.querySelector('#note__textarea');

    editBtn.addEventListener('click', (e) => {
        titleEl.classList.toggle('hidden');
        textEl.classList.toggle('hidden');

        titleInputEl.classList.toggle('hidden');
        textInputEl.classList.toggle('hidden');    
    });

    deleteBtn.addEventListener('click', (e) => {
        noteEl.remove();
        console.log(noteEl.);
        console.log(e);
    });

    titleInputEl.addEventListener('input', (e) => {
        titleEl.innerText = e.target.value;
        console.log(e.target.value);
    });

    textInputEl.addEventListener('input', (e) => {
        textEl.innerText = e.target.value;
        console.log(e.target.value);
    });


    return noteEl;
}

addBtn.addEventListener('click', (e) => {
    const el = createNote("Заголовок", "Ваш текст");
    notesEl.appendChild(el);

});


