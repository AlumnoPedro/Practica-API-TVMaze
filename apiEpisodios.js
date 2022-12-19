const listadoEpisodios = document.querySelector(".lista");
const divResultados = document.querySelector(".cartas");

async function getEpisodesById() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get("id");
    const urlFetch = "https://api.tvmaze.com/shows/" + id + "/episodes";
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getSingleEpisodeById(id) {
    const urlFetch = "https://api.tvmaze.com/episodes/" + id;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}


window.addEventListener("DOMContentLoaded", e => {
    getEpisodesById()
    .then(episodes => {
        episodes.forEach(el => {
            const nuevoel = `<li class=${el.id}>${el.name}</li>`;
            listadoEpisodios.innerHTML += nuevoel;
        });
    });    
});

listadoEpisodios.addEventListener("click", e => {
    btnClick(e);
});

function btnClick(e) {
    const id = parseInt(e.target.classList);
    console.log(id);
    getSingleEpisodeById(id)
        .then(elem => {
            const nuevoDiv = `<div class="col">
            <div class="cards">
                <img class="card-img-top medida" src=${elem.image != null ? elem.image.original : './images/no-image.jpg'} alt="">
                <div class="card-body">
                    <h4 class="card-title">Nombre: ${elem.name}</h4>
                    <h4 class="card-title">Temporada: ${elem.season}</h4>
                    <h4 class="card-title">Episodio: ${elem.number}</h4>
                    <h4 class="card-title">Nota: ${elem.rating.average != null ? elem.rating.average : 'No registrada'}</h4>
                    <h5>Descripcion:</h5> 
                    <p class="text-left">${elem.summary}</p>
                </div>
            </div>
        </div>`
        divResultados.innerHTML += nuevoDiv;
    });
    divResultados.textContent = "";
  
};