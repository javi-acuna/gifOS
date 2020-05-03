let btnLight = document.getElementById('light');
btnLight.addEventListener('click', event =>{
    //console.log(event.target.id);
    cambiarTema(event.target.id); 
});

let btnDark = document.getElementById('dark');
btnDark.addEventListener('click', event =>{
    //console.log(event.target.id);
    cambiarTema(event.target.id); 
});

function cambiarTema(themeValue){
    if (themeValue != 'light'){
        document.getElementById('dark_tema').removeAttribute('disabled');
        document.getElementById('gifOF_logo').setAttribute('src', './assets/gifOF_logo_dark.png');
        document.getElementById('dark').classList.add('underline');
        document.getElementById('light').classList.remove('underline');
        document.getElementById("dropdown_icon").setAttribute('style', 'filter:invert();');
        
    }else{
        document.getElementById('dark_tema').setAttribute('disabled', '');
        document.getElementById('gifOF_logo').setAttribute('src', './assets/gifOF_logo.png');
        document.getElementById('light').classList.add('underline');
        document.getElementById('dark').classList.remove('underline');
        document.getElementById("dropdown_icon").removeAttribute('style');
    } 
}

let crearGuifosBtn = document.getElementById('guifos_btn');
crearGuifosBtn.addEventListener('click', () => {
    location.href = 'creargif.html';
});

let dropdownBtn = document.getElementById('dropdown_btn');
dropdownBtn.addEventListener('click', () => {
    changeClassToDisplay('tema_btns');
    clickHandler();
});
let themeBtn = document.getElementById('tema_btn');
themeBtn.addEventListener('click', () => {
    changeClassToDisplay('tema_btns');
    clickHandler();
});

document.addEventListener('click', event =>{
    let btn = document.getElementById('dropdown');
    let targetBtn = event.target;
    do {
        if (targetBtn == btn ){
            return;
        }
        targetBtn = targetBtn.parentNode;
    }while (targetBtn);
    changeClassToHidden('tema_btns');
    if (elementIsClicked == false){
        clickHandler();
    }
});

let themeMenu = document.getElementById('dropdown');
themeMenu.addEventListener('click', () => {
    if (elementIsClicked == true){
        changeClassToHidden('tema_btns');
    }
});