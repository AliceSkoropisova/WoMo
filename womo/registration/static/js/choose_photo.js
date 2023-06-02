let avatars = document.querySelector(".avatar");
let which_cow = "cow_3"; //по умолчани. третья корова, если человек ничего не выбрал
document.getElementById("avatar").value = "static/img/cow_3.png";

avatars.addEventListener('click', function(event){
    let idCow = event.target.getAttribute('id');
    if (idCow !== null){
        if (idCow[0] === "c"){
            let choosed_cow = document.getElementById(idCow);
            choosed_cow.dataset.choosed = "yes";
            which_cow = idCow; //ВЫТЯНИТЕ НАЗВАНИЕ КАРТИНКИ С КОРОВОЙ, КОТОРУЮ ВЫБРАД ПОЛЬЗОВАТЕЛЬ
            document.getElementById("avatar").value = 'static/img/'+ which_cow + '.png';
            document.querySelectorAll("*[data-choosed]").forEach(function(item){
                if (item.getAttribute("id") !== idCow){
                    item.dataset.choosed = "no";
                }
            });    
        }
    }
});

let btn_create = document.querySelector(".btn__createAcc");

let inputs = document.querySelectorAll(`[class^="entry"]`);


