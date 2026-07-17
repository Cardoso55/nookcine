const heroBanner = document.querySelector(".hero-banner");

const watchBtn = document.getElementById("btn-watch");
const modal = document.getElementById("modal-hero"); 

const heroTitle = document.querySelector(".hero-title");
const heroInfo = document.querySelector(".hero-info");
const heroDescription = document.querySelector(".hero-description");
const heroCategory = document.querySelector(".hero-category");
const btndetails = document.querySelector(".btn-details");

let heroMedia = [];
let currentHero = 0;
let heroType = "all";
let heroInterval;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
};


async function loadHero(type = "all") {

    heroType = type;

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

function startSlide() {

    clearInterval(heroInterval);

    heroInterval = setInterval(() => {

        currentHero++;

        if (currentHero >= heroMedia.length) {
            currentHero = 0;
        }

        changeHero(heroMedia[currentHero]);

    }, 7000);

}

function changeHero(media) {

    heroBanner.style.opacity = 0;

    setTimeout(() => {
        showHero(media);
        updateIndex();
        heroBanner.style.opacity = 1;
    }, 400);

}

async function openTrailer() {
    const media = heroMedia[currentHero];

    const type = media.media_type || "movie";

    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${media.id}/videos?language=pt-BR`,
        options
    );

    const data = await response.json();

    const trailer = data.results.find(video =>
        video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) {
        modal.classList.remove("hidden");

        modal.innerHTML = `
            <div class="trailer-modal-hero">
                <button class="close-trailer">&times;</button>

                <iframe
                    src="https://www.youtube.com/embed/${trailer.key}?autoplay=1"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
            </div>
        `;

        document.querySelector(".close-trailer").onclick = () => {
            modal.classList.add("hidden");
            modal.innerHTML = "";
        };
    } else {
        alert("Trailer não encontrado.");
    }
}

watchBtn.addEventListener("click", openTrailer);

btndetails.addEventListener("click", () => {

    window.location.href = `details.html?id=${heroMedia[currentHero].id}&media=${heroType === "all" ? heroMedia[currentHero].media_type : heroType}`;

});
