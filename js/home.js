const movieGenres = [
    { id: 28, title: "🍿 Filmes de Ação" },
    { id: 35, title: "😂 Filmes de Comédia" },
    { id: 27, title: "👻 Filmes de Terror" },
    { id: 878, title: "🚀 Filmes de Ficção Científica" }
];

const seriesGenres = [
    { id: 10759, title: "💥 Séries de Ação & Aventura" },
    { id: 80, title: "🕵️ Séries de Crime" },
    { id: 35, title: "😂 Séries de Comédia" },
    { id: 9648, title: "🧩 Séries de Mistério" }
];

const sections = [
    {
        title: "🔥 Em Alta",
        request: getTrending,
        mediaType: "all"
    },
    {
        title: "🎬 Filmes Populares",
        request: getPopularMovies,
        mediaType: "movie"
    },
    {
        title: "📺 Séries Populares",
        request: getPopularSeries,
        mediaType: "tv"
    }
];


async function loadHome() {

    const container = document.getElementById("media-container");

    for (const section of sections) {

        const data = await section.request();

        renderCategory(
            container,
            section.title,
            data.results,
            section.mediaType
        );
    }

    for (let i = 0; i < movieGenres.length; i++) {

        const movieGenre = movieGenres[i];
        const seriesGenre = seriesGenres[i];

        // Filmes
        const movies = await getMoviesByGenre(movieGenre.id);

        renderCategory(
            container,
            movieGenre.title,
            movies.results,
            "movie"
        );

        // Séries
        const series = await getSeriesByGenre(seriesGenre.id);

        renderCategory(
            container,
            seriesGenre.title,
            series.results,
            "tv"
        );

    }

}

loadHome();

const content = document.querySelector(".main-content");

content.addEventListener("click", (event) => {

    const card = event.target.closest(".list-card-item");

    if (!card) return;

    const id = card.dataset.id;
    const type = card.dataset.type;

    window.location.href = `details.html?id=${id}&media=${type}`;

});