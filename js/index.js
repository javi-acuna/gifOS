let btnLight = document.getElementById('light');
btnLight.addEventListener('click', event =>{
    switchTheme(event.target.id); 
});
let btnDark = document.getElementById('dark');
btnDark.addEventListener('click', event =>{
    switchTheme(event.target.id); 
});

function switchTheme(themeValue){
    if (themeValue != 'light'){
        document.getElementById('dark_theme').removeAttribute('disabled');
        document.getElementById('gifOS_logo').setAttribute('src', './assets/gifOF_logo_dark.png');
        document.getElementById('dark').classList.add('underline');
        document.getElementById('light').classList.remove('underline');
        document.getElementById("dropdown_icon").setAttribute('style', 'filter:invert();');
        if (document.getElementById('search_lupa')){
            document.getElementById('search_lupa').src = "./assets/Combined_Shape.svg";
        } 
    }else{
        document.getElementById('dark_theme').setAttribute('disabled', '');
        document.getElementById('gifOS_logo').setAttribute('src', './assets/gifOF_logo.png');
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
    changeClassToDisplay('themes_btns');
    clickHandler();
});

let themeBtn = document.getElementById('theme_btn');
themeBtn.addEventListener('click', () => {
    changeClassToDisplay('themes_btns');
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
    changeClassToHidden('themes_btns');
    if (elementIsClicked == false){
        clickHandler();
    }
});
 
let themeMenu = document.getElementById('dropdown');
themeMenu.addEventListener('click', () => {
    if (elementIsClicked == true){
        changeClassToHidden('themes_btns');
    }
});

const searched = [];

async function getSearchResults(search) {
    const found = await fetch('https://api.giphy.com/v1/gifs/search?q=' + search + '&api_key=' + apiKey)
    const data = await found.json();
    return data;
}

let searchBtn = document.getElementById('search_btn');
if (searchBtn){
    searchBtn.addEventListener('click', () => {
        var searchValue = document.getElementById('search_value').value;
        createResults(searchValue);
    });
}

function autocomplete(inp, arr) {
    var currentFocus;
    let searchAutocomplete = document.getElementById('search_autocomplete');
    if (inp){
        inp.addEventListener("input", function () {
            var a, b, i, val = this.value;
            closeAllLists();
            changeClassToDisplay('search_autocomplete');
            if (!val) { 
                changeClassToHidden('search_autocomplete');
                if(localStorage.getItem('theme') === 'light'){
                    document.getElementById('search_lupa').setAttribute("src", "./assets/lupa_inactive.svg");
                }else{
                    document.getElementById('search_lupa').setAttribute("src", "./assets/Combined_Shape.svg");
                }
                searchBtn.setAttribute("class", "search_btn_inactive");
                return false;}
            currentFocus = -1;
            a = document.createElement("div");
            a.setAttribute("id", this.id + "autocomplete_list");
            a.setAttribute("class", "autocomplete_items");
            searchAutocomplete.appendChild(a);
            var matchFound = [];
            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    matchFound.push(arr[i]);
                }
            }
            for (i = 0; i < 3; i++){
                if (matchFound.length > 0 && matchFound[i] != null){
                    changeClassToDisplay('search_autocomplete');
                    b = document.createElement("div");
                    b.innerHTML = matchFound[i];
                    b.innerHTML += "<input type='hidden' value='" + matchFound[i] + "'>";
                    b.addEventListener("click", function (e) {
                        inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                } else if (matchFound.length == 0){
                    changeClassToHidden('search_autocomplete');
                }
            }
            if (localStorage.getItem('theme') === 'light') {
                document.getElementById('search_lupa').setAttribute("src", "./assets/lupa.svg");
            } else {
                document.getElementById('search_lupa').setAttribute("src", "./assets/lupa_light.svg");
            }
            searchBtn.setAttribute("class", "search_btn_active");
            this.style.color = '#110038';
        });
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete_list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                    changeClassToHidden('search_autocomplete');
                }
            }
        });
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete_active");
        }
        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete_active");
            }
        }
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete_items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
            changeClassToHidden('search_autocomplete');
        });
    }
}
autocomplete(document.getElementById("search_value"), searched);

let gifContainers = document.getElementsByClassName('sugerencia_gif_container');
let gifTagContainers = document.getElementsByClassName("sugerencia_tag");
let randomTags = ['anime', 'exo', 'animation', 'adamdriver', 'starwars', 'haikyuu', 'gudetama', 'cats', 'criminalminds', 'janeausten', 'nct', 'naruto', 'itachi', 'exol', 'ghibli'];
for (let i=0; i<4; i++){
    let random = randomTags[getRandomNumber(randomTags)];
    async function getRandomGif() {
        const resp = await fetch('https://api.giphy.com/v1/gifs/random?&api_key=' + apiKey + '&tag=' + random);
        const datos = await resp.json();
        return datos;
    }
    getRandomGif().then(function (response) {
        gifContainers[i].setAttribute('style', 'background:url(' + (response.data.images.fixed_height.url) + ') center center; background-size: cover');
        gifTagContainers[i].textContent = '#'+random;
    })
    .catch((error) => {
        return ('Error al adquirir giphy random:' + error);
    });
}

let gifCloseBtns = document.getElementsByClassName("sugerencia_close_btn");
for (let i=0; i<gifCloseBtns.length; i++){
    gifCloseBtns[i].addEventListener('click', () =>{
        let random = randomTags[getRandomNumber(randomTags)];
        async function getRandomGif() {
            const resp = await fetch('https://api.giphy.com/v1/gifs/random?&api_key=' + apiKey + '&tag=' + random);
            const datos = await resp.json();
            return datos;
        }
        getRandomGif().then(function (response) {
            gifContainers[i].setAttribute('style', 'background:url(' + (response.data.images.fixed_height.url) + ') center center; background-size: cover');
            gifTagContainers[i].textContent = '#' + random;
        })
        .catch((error) => {
            return ('Error al adquirir giphy random:'+ error);
        });
    });
}
let verMasBtn = document.getElementsByClassName("ver_mas_btn");
for(let i = 0; i < verMasBtn.length; i++){
    verMasBtn[i].addEventListener('click', () => {
        createResults(gifTagContainers[i].textContent.substring(1));
    });
}

async function getTrendingGif() {
    const resp = await fetch('https://api.giphy.com/v1/gifs/trending?&api_key=' + apiKey);
    const dt = await resp.json();
    return dt;
}
getTrendingGif().then(function (response) {
    let trendingGifs = response.data;
    createGridWithGifos('grid_container', 'trending', trendingGifs);
})
    .catch((error) => {
        return ('Error al adquirir giphy trending:' + error)
    });