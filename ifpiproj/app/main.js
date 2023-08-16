
const apiKey="8fcbaef17d8821ee9e930c22a8740b2f"
const baseUrl="http://api.themoviedb.org/3";
const selectElement = document.getElementById("categorias");
const filmesContainer = document.getElementById("filmes");

selectElement.addEventListener("change",()=>{

const categoria = selectElement.value;
const endPoint=`${baseUrl}/movie/${categoria}?language=pt-BR&api_key=${apiKey}`;


getDadosAPI(endPoint)
.then(filmes=>mostrarValores(filmes))
.catch(error=>console.error("Erro ao obter os dados da API:",error));
});

async function getDadosAPI(endPoint){
    try{
        const res=await fetch(endPoint);
        const data=await res.json();
        const filmes=data.results;
        return filmes;
    }catch(error){
        throw error;
    }
    }
function mostrarValores(filmes){
    filmesContainer.innerHTML = "";

    filmes.forEach(filme => {
        const filmeCard = document.createElement("div");
        filmeCard.className = "col-md-4 mb-4";
        filmeCard.innerHTML = `
   
            <div class="card" style = "width: 20rem;">
                <img src="https://image.tmdb.org/t/p/w500/${filme.poster_path}" class="card-img-top" alt="${filme.title}" style="width: 100%;">
                <div class="card-body">
                    <h5 class="card-title">${filme.title}</h5>
                    <p class="card-text">${filme.overview}</p>
                    <p class="card-text">Data de lançamento:${filme.release_date}</p>
                    <p class="card-text">Avaliação: ${filme.vote_average}</p>
                </div>
            </div>
        `;
    filmesContainer.appendChild(filmeCard);
});
}