const formularioShow = document.getElementById("formShow");
const formularioIMDB = document.getElementById("formIMDB");
const imdbShow = document.getElementById("imdbShow");
const nameShow = document.getElementById("nombreShow");
const divResultados = document.querySelector(".cartas");
const listado = document.querySelector(".lista");
const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
const fila = document.querySelector(".row");
var pagina = 0;

async function getShowsByName(name) {
    const urlFetch = "https://api.tvmaze.com/search/shows?q=" + encodeURIComponent(name);
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getShowsByIMDB(imdb) {
    const urlFetch = "https://api.tvmaze.com/lookup/shows?imdb=" + imdb;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getAllShows(page){
    const urlFetch = "https://api.tvmaze.com/shows?page=" + page;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getShowById(id) {
    const urlFetch = "https://api.tvmaze.com/shows/" + id;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}


window.addEventListener("DOMContentLoaded", e => {
    getAllShows(0)
    .then(shows => {
        shows.forEach(el => {
            const nuevoel = `<li class=${el.id}">${el.name}</li>`;
            listado.innerHTML += nuevoel;
        });
    });
    anterior.addEventListener("click", funcionAnterior);

    siguiente.addEventListener("click", funcionSiguiente);
    
});

formularioShow.addEventListener("submit", e => {
    e.preventDefault();
    anterior.disabled = true;
    siguiente.disabled = true;
    listado.innerHTML="";
    const name = nameShow.value.trim();
    getShowsByName(name)
        .then(shows => {
            if(shows.length != 0){
            shows.forEach(el => {
                const nuevoel = `<li class=${el.show.id}">${el.show.name}</li>`;
                listado.innerHTML += nuevoel;
            });
        } else {
            const nuevoel = `<h5 class="ml-5">NO EXISTE NINGUNA SERIE CON ESE NOMBRE</h5>`;
            fila.innerHTML = nuevoel;
        }
        }).catch(error=> {
            const nuevoel = `<h5 class="ml-5">NO SE PUEDEN LISTAR LAS SERIES</h5>`;
            fila.innerHTML = nuevoel;
        });
    
});

formularioIMDB.addEventListener("submit", e => {
    e.preventDefault();
    anterior.disabled = true;
    siguiente.disabled = true;
    listado.innerHTML="";
    const imdb = imdbShow.value.trim();
    getShowsByIMDB(imdb)
        .then(show => {
            if(show != null){
                const nuevoel = `<li class=${show.id}">${show.name}</li>`;
                listado.innerHTML += nuevoel;
        } else {
            const nuevoel = `<h5 class="ml-5">NO EXISTE NINGUNA SERIE CON ESE ID</h5>`;
            fila.innerHTML = nuevoel;
        }
        }).catch(error=> {
            const nuevoel = `<h5 class="ml-5">NO SE PUEDEN LISTAR LAS SERIES</h5>`;
            fila.innerHTML = nuevoel;
        });
    
});

listado.addEventListener("click", e => {
    btnClick(e);
});

function btnClick(e) {
    const id = parseInt(e.target.classList);
    getShowById(id)
        .then(el => {
            console.log(el.image);
                const nuevoDiv = `<div class="col">
            <div class="cards">
                <img class="card-img-top medida" src="${el.image.original}" alt="">
                <div class="card-body">
                    <h4 class="card-title">Nombre: ${el.name}</h4>
                    <a href="./episodios.html?id=${el.id}"><h5 class="card-title">Ver episodios</h5>
                </div>
            </div>
        </div>`

                divResultados.innerHTML += nuevoDiv;

        });
    divResultados.textContent = "";
};


nameShow.addEventListener("keyup", e => {
    e.preventDefault();
    const nombre = nameShow.value.trim();
    getShowsByName(nombre)
        .then(shows => {
            if(shows.length != 0){
            shows.forEach(el => {
                const nuevoel = `<li class=${el.show.id}">${el.show.name}</li>`;
                listado.innerHTML += nuevoel;
            });
        } else {
            const nuevoel = `<h5 class="ml-5">NO EXISTE NINGUNA SERIE CON ESE NOMBRE</h5>`;
            fila.innerHTML = nuevoel;
        }
        });
    listado.textContent = "";

});

var funcionAnterior = function(a){
    if(pagina > 0){
        pagina--;
        a.preventDefault();
        listado.innerHTML="";
        getAllShows(pagina)
        .then(shows => {
            shows.forEach(el => {
                const nuevoel = `<li class=${el.id}">${el.name}</li>`;
                listado.innerHTML += nuevoel;
            });
        });
    
    }
}

var funcionSiguiente = function(s){
    pagina++;
    s.preventDefault();
    listado.innerHTML="";
    getAllShows(pagina)
    .then(shows => {
        shows.forEach(el => {
            const nuevoel = `<li class=${el.id}">${el.name}</li>`;
            listado.innerHTML += nuevoel;
        });
    });
}