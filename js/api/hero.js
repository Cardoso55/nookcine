const heroBanner = document.querySelector(".hero-banner");

const heroTitle = document.querySelector(".hero-title");
const heroInfo = document.querySelector(".hero-info");
const heroDescription = document.querySelector(".hero-description");
const heroCategory = document.querySelector(".hero-category");

let heroMedia = [];
let currentHero = 0;
let heroType = "all";
let heroInterval;


async function loadHero(type = "all") {

    heroType = type;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    };

    let endpoint = "";

    switch (type) {

        case "movie":
            endpoint = "/movie/top_rated?language=pt-BR&page=1";
            break;

        case "tv":
            endpoint = "/tv/top_rated?language=pt-BR&page=1";
            break;

        default:
            endpoint = "/trending/all/week?language=pt-BR";
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const data = await response.json();

    heroMedia = data.results.filter(media =>
        media.overview &&
        media.backdrop_path &&
        media.vote_average >= 8
    ).slice(0, 5);

    showHero(heroMedia[0]);

    createIndex();

    startSlide();

}

const heroIndicators = document.querySelector(".hero-indicators");

function createIndex() {

    heroIndicators.innerHTML = "";

    heroMedia.forEach((media, index) => {

        const indicator = document.createElement("div");

        indicator.classList.add("hero-indicator");

        if (index === 0) {
            indicator.classList.add("active");
        }

        indicator.onclick = () => {

            currentHero = index;

            changeHero(heroMedia[index]);

        }

        heroIndicators.appendChild(indicator);

    });

}

function updateIndex() {

    const indicators = document.querySelectorAll(".hero-indicator");

    indicators.forEach((item, index) => {

        item.classList.toggle("active", index === currentHero);

    });

}

function showHero(media) {

    heroBanner.style.backgroundImage =
        `url(https://image.tmdb.org/t/p/original${media.backdrop_path})`;

    heroTitle.textContent = media.title || media.name;

    heroDescription.textContent = media.overview;

    if (heroType === "movie") {
        heroCategory.textContent = "Filme";
    }
    else if (heroType === "tv") {
        heroCategory.textContent = "Série";
    }
    else {
        heroCategory.textContent =
            media.media_type === "tv"
                ? "Série"
                : "Filme";
    }

    const date =
        media.release_date || media.first_air_date;

    heroInfo.textContent =
        `${date.substring(0, 4)} • ⭐ ${media.vote_average.toFixed(1)}`;

}

function startSlide(){

    clearInterval(heroInterval);

    heroInterval = setInterval(()=>{

        currentHero++;

        if(currentHero >= heroMedia.length){
            currentHero = 0;
        }

        changeHero(heroMedia[currentHero]);

    },7000);

}

function changeHero(media) {

    heroBanner.style.opacity = 0;

    setTimeout(() => {
        showHero(media);
        updateIndex();
        heroBanner.style.opacity = 1;
    }, 400);

}
