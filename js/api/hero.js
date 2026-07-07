const heroBanner = document.querySelector(".hero-banner");

const heroTitle = document.querySelector(".hero-title");
const heroInfo = document.querySelector(".hero-info");
const heroDescription = document.querySelector(".hero-description");
const heroCategory = document.querySelector(".hero-category");

let heroMovies = [];
let currentHero = 0;


async function loadingHero() {

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    const response = await fetch(`${BASE_URL}/movie/top_rated?language=pt-BR&page=1`, options);

    const data = await response.json();

    heroMovies = data.results.filter(movie =>
        movie.overview &&
        movie.backdrop_path &&
        movie.vote_average >= 7
    ).slice(0,5);

    showHero(heroMovies[0]);

    createIndex();

    startSlide();

}

loadingHero();

const heroIndicators = document.querySelector(".hero-indicators");

function createIndex(){

    heroIndicators.innerHTML = "";

    heroMovies.forEach((movie, index)=>{

        const indicator = document.createElement("div");

        indicator.classList.add("hero-indicator");

        if(index === 0){
            indicator.classList.add("active");
        }

        indicator.onclick = ()=>{

            currentHero = index;

            changeHero(heroMovies[index]);

        }

        heroIndicators.appendChild(indicator);

    });

}

function updateIndex(){

    const indicators = document.querySelectorAll(".hero-indicator");

    indicators.forEach((item,index)=>{

        item.classList.toggle("active", index === currentHero);

    });

}

function showHero(movie){

    heroBanner.style.backgroundImage =
        `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

    heroTitle.textContent = movie.title;

    heroDescription.textContent = movie.overview;

    heroCategory.textContent = "Filme";

    heroInfo.textContent =
        `${movie.release_date.substring(0,4)} • ⭐ ${movie.vote_average.toFixed(1)}`;

}

function startSlide(){

    setInterval(()=>{

        currentHero++;

        if(currentHero >= heroMovies.length){
            currentHero = 0;
        }

        changeHero(heroMovies[currentHero]);

    },7000);

}

function changeHero(movie){

    heroBanner.style.opacity = 0;

    setTimeout(()=>{
        showHero(movie);
        updateIndex();
        heroBanner.style.opacity = 1;
    },400);

}
