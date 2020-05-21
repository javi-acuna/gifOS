const apiKey = 'jmYK2Dbc6qUekM4f11S8Cn9bZOcQSDtg';

function dirigirPaginaPrincipal() {
    location.href = 'index.html';
}

function hiddenToggle(elementId) {
    let element = document.getElementById(elementId);
    element.classList.toggle("hidden");
}

function changeClassToHidden(elementId) {
    let element = document.getElementById(elementId);
    element.className = "hidden";
}

function changeClassToDisplay(elementId) {
    let element = document.getElementById(elementId);
    element.className = "display";
}

var elementIsClicked = true;
function clickHandler() {
    if (elementIsClicked == false) {
        return elementIsClicked = true;
    } else if (elementIsClicked == true) {
        return elementIsClicked = false;
    }
}

function getRandom(arr) {
    let randomPosition = Math.floor((arr.length - 0) * Math.random());
    return randomPosition;
}

function createGrid(x, y, arr){
    for (let i = 0; i < arr.length; i++) {
        let grid = document.getElementById(x);
        let gridDivs = document.createElement('div');
        grid.appendChild(gridDivs);
        if (arr[i].images.fixed_height.width <= '356') {
            gridDivs.className = y + '_gif_container min';
        } else {
            gridDivs.className = y + '_gif_container max';
        }
        let gifContainers = document.getElementsByClassName(y + '_gif_container');
        gifContainers[i].setAttribute('style', 'background:url(' + (arr[i].images.fixed_height.url) + ') center center; background-size: cover');
        gifContainers[i].addEventListener('click', () => {
            window.open(arr[i].url, '_blank');
        })
        let gifMax = document.getElementsByClassName('max');
        for (let j = 0; j < gifMax.length; j++) {
            gifMax[j].style.paddingBottom = '50%';
        }
        let gifMin = document.getElementsByClassName('min');
        for (let k = 0; k < gifMin.length; k++) {
            gifMin[k].style.paddingBottom = '100%';
        }
    }
}

function getSaveGifByIDAndGrid(x, y, id) {
    const gifsId = fetch('https://api.giphy.com/v1/gifs?api_key=' + apiKey + '&ids=' + id)
        .then(response => {
            return response.json();
        })
        .then(dt => {
            let gifsById = dt.data;
            createGrid(x, y, gifsById);
            return dt
        });
}

function getLink(x) {
    let aux = document.createElement("input");
    aux.setAttribute("value", x);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
}

function createRandomSearchGrid (x, y, arr){
    let dt = [];
    while (dt.length <= 11) {
        let number = getRandom(arr);
        if (dt.includes(arr[number]) == false) {
            dt.push(arr[number]);
        } 
    }
    createGrid(x, y, dt);
}

function createResults(searchValue) {
    getSearchResults(searchValue).then(function (response) {
        let searchGifs = response.data;   
        let x = document.getElementById('search');
        if (document.getElementById('search_grid_container')) {
            x.removeChild(x.lastChild);
            x.removeChild(x.lastChild);
        }
        if (document.getElementById('searched_title')) {
            let searchedTitle = document.getElementById('searched_title');
            searchedTitle.remove();
        }
        if (searchGifs.length == 0){
            let r = document.createElement('div');
            r.id = 'searched_title'
            r.innerHTML = 'No se han encontrado resultados de #' + searchValue;
            x.appendChild(r);
            return false;
        }
        let y = document.createElement("div");
        y.id = 'search_grid_container';
        x.appendChild(y);
        let z = document.createElement('h2');
        z.id = 'searched_title';
        z.innerHTML = searchValue.toLowerCase() + ' (resultados)';
        y.before(z);
        createRandomSearchGrid('search_grid_container', 'searched', searchGifs);
        if (searched.includes(searchValue) == false) {
            searched.push(searchValue);
            localStorage.setItem('search', searched);
            if (searched.length > 0) {
                let searchedContainer = document.getElementById('searched_container');
                searchedContainer.setAttribute('class', 'display');
                let x = document.createElement("div");
                x.innerHTML = '#' + searchValue;
                x.setAttribute('class', 'searched_items');
                searchedContainer.appendChild(x);
                let y = document.querySelectorAll('.searched_items');
                y.forEach(function (element) {
                    element.addEventListener('click', () => {
                        createResults(element.innerHTML.substring(1));
                    });
                });
            }
        }
    });
}