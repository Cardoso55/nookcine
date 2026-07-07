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
            data.results
        );
    }

    for (const genre of genres) {
        const data = await getMoviesByGenre(genre.id);
        renderCategory(container, genre.title, data.results);
    }

}

loadMovie();
loadHero("movie");