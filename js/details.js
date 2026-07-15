const params = new URLSearchParams(window.location.search);

const id = params.get("id");
const media = params.get("media");

const elements = {
    banner: document.querySelector(".media-banner"),
    poster: document.querySelector(".media-poster"),
    title: document.querySelector(".media-title"),
    rating: document.querySelector(".media-rating"),
    date: document.querySelector(".media-date"),
    runtime: document.querySelector(".media-runtime"),
    genres: document.querySelector(".genres"),
    overview: document.querySelector(".media-overview"),
    directors: document.querySelector(".info-director"),
    cast: document.querySelector(".info-cast"),
    productionCompanies: document.querySelector(".info-production-companies")
};

const relatedGrid = document.querySelector(".related-grid");

async function init() {

    if (!id || !media) {
        console.error("ID ou tipo de mídia não encontrado.");
        return;
    }

    try {

        const data = await getDetails(id, media);

        renderDetails(data);

    } catch (error) {

        console.error(error);

    }

}

init();

function renderDetails(data) {

    elements.banner.style.backgroundImage =
    `linear-gradient(
        rgba(15,17,21,.2),
        rgba(15,17,21,.9)
    ),
    url(${BACKDROP_URL}${data.backdrop_path})`;

    elements.poster.src = `${IMAGE_URL}${data.poster_path}`;
    elements.poster.alt = data.title || data.name;

    elements.title.textContent = data.title || data.name;

    elements.rating.innerHTML = `
    <i data-lucide="star"></i>
    ${data.vote_average.toFixed(1)}
`;

    elements.date.innerHTML = `
    <i data-lucide="calendar"></i>
    ${data.release_date || data.first_air_date}
`;

    elements.overview.textContent = data.overview;

    elements.genres.innerHTML = "";

    data.genres.forEach(genre => {

        elements.genres.innerHTML += `
        <span>${genre.name}</span>
    `;

    });
    
    elements.cast.innerHTML = "";

    if (data.credits && data.credits.cast) {
        const cast = data.credits.cast.slice(0, 8);

        cast.forEach(actor => {
            elements.cast.innerHTML += `
            <li>${actor.name}</li>
        `;
        });
    }

    elements.productionCompanies.innerHTML = "";

    if (data.production_companies) {
        data.production_companies.forEach(company => {
            elements.productionCompanies.innerHTML += `
            <li>${company.name}</li>
        `;
        });
    }

    renderRelated(data.recommendations.results, media);

    lucide.createIcons();

}

function renderRelated(mediaList, mediaType) {

    relatedGrid.innerHTML = "";

    mediaList.slice(0, 8).forEach(media => {

        const poster = media.poster_path
            ? `${IMAGE_URL}${media.poster_path}`
            : "assets/images/no-poster.png";

        relatedGrid.innerHTML += `
            <div
                class="list-card-item"
                data-id="${media.id}"
                data-type="${mediaType}"
            >
                <div class="card-image">
                    <img src="${poster}" alt="${media.title || media.name}">
                </div>

                <span class="card-title">
                    ${media.title || media.name}
                </span>
            </div>
        `;

    });

}

relatedGrid.addEventListener("click", (event) => {

    const card = event.target.closest(".list-card-item");

    if (!card) return;

    const id = card.dataset.id;
    const type = card.dataset.type;

    window.location.href = `details.html?id=${id}&media=${type}`;

});