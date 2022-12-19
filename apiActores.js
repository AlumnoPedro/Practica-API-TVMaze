const formularioShow = document.getElementById("formShow");
const nameShow = document.getElementById("nombreShow");
const divResultados = document.querySelector(".cartas");
const listado = document.querySelector(".lista");
const anterior = document.querySelector(".anterior");
const siguiente = document.querySelector(".siguiente");
const fila = document.querySelector(".row");
var pagina = 0;

async function getActorsByName(name) {
    const urlFetch = "https://api.tvmaze.com/search/people?q=" + encodeURIComponent(name);
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getAllActors(page) {
    const urlFetch = "https://api.tvmaze.com/people?page=" + page;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getActorsById(id) {
    const urlFetch = "https://api.tvmaze.com/people/" + id;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}


window.addEventListener("DOMContentLoaded", e => {
    getAllActors(0)
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
    listado.innerHTML = "";
    const name = nameShow.value.trim();
    getActorsByName(name)
        .then(actors => {
            console.log(actors.length);
            if (actors.length != 0) {


                actors.forEach(el => {
                    console.log(el.person.name)
                    const nuevoel = `<li class=${el.person.id}>${el.person.name}</li>`;
                    listado.innerHTML += nuevoel;
                });
            } else {
                const nuevoel = `<h5 class="ml-5">NO EXISTE NINGUN ACTOR CON ESE NOMBRE</h5>`;
                fila.innerHTML = nuevoel;
            }
        });

});

listado.addEventListener("click", e => {
    btnClick(e);
});

function btnClick(e) {
    const id = parseInt(e.target.classList);
    getActorsById(id)
        .then(el => {
            console.log(el.image);
            const nuevoDiv = `<div class="col">
            <div class="cards">
                <img class="card-img-top medida" src=${el.image != null ? el.image.original : './images/no-image.jpg'} alt="">
                <div class="card-body">
                    <h4 class="card-title">Nombre: ${el.name}</h4>
                    <h4 class="card-title">Género: ${el.gender}</h4>
                    <h4 class="card-title">País: ${el.country != null ? el.country.name : el.country}</h4>
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
    getActorsByName(nombre)
        .then(shows => {
            if (shows.length != 0) {
                shows.forEach(el => {
                    const nuevoel = `<li>${el.person.name}</li>`;
                    listado.innerHTML += nuevoel;
                });
            } else {
                const nuevoel = `<h5 class="ml-5">NO EXISTE NINGUN ACTOR CON ESE NOMBRE</h5>`;
                fila.innerHTML = nuevoel;
            }
        });
    listado.textContent = "";

});

var funcionAnterior = function (a) {
    if (pagina > 0) {
        pagina--;
        a.preventDefault();
        listado.innerHTML = "";
        getAllActors(pagina)
            .then(shows => {
                shows.forEach(el => {
                    const nuevoel = `<li class=${el.show.id}">${el.show.name}</li>`;
                    listado.innerHTML += nuevoel;
                });
            });

    }
}

var funcionSiguiente = function (s) {
    pagina++;
    s.preventDefault();
    listado.innerHTML = "";
    getAllActors(pagina)
        .then(shows => {
            shows.forEach(el => {
                const nuevoel = `<li class=${el.id}">${el.name}</li>`;
                listado.innerHTML += nuevoel;
            });
        });
}