const genres = [
    { title: "Ação", id: 28 },
    { title: "Comédia", id: 35 },
    { title: "Terror", id: 27 },
    { title: "Ficção Científica", id: 878 },
    { title: "Romance", id: 10749 }
];

const sections = [
    {
        title: "Filmes Populares",
        request: getPopularMovies
    },
    {
        title: "Top 10",
        request: getTopRatedMovies
    },
    {
        title: "Lançamentos",
        request: getNowPlayingMovies
    },
    {
        title: "Em Breve",
        request: getUpcomingMovies
    },
];

async function loadMovie() {

    const container = document.getElementById("movies-container");

    for (const section of sections) {

        const data = await section.request();

        renderCategory(
            container,
            section.title,
            data.results,
            "movie"
        );
    }

    for (const genre of genres) {
        const data = await getMoviesByGenre(genre.id);
        renderCategory(container, genre.title, data.results);
    }

}

loadMovie();

const content = document.querySelector(".main-content");

content.addEventListener("click", (event) => {

    const card = event.target.closest(".list-card-item");

    if (!card) return;

    const id = card.dataset.id;
    const type = card.dataset.type;

    window.location.href = `details.html?id=${id}&media=${type}`;

});