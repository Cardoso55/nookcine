async function getTrending() {
    return await fetchTMDB("/trending/all/week?language=pt-BR");
}

async function getPopularMovies() {
    return await fetchTMDB("/movie/popular?language=pt-BR&page=1");
}

async function getPopularSeries() {
    return await fetchTMDB("/tv/popular?language=pt-BR&page=1");
}

async function getMoviesByGenre(id) {
    return await fetchTMDB(
        `/discover/movie?language=pt-BR&with_genres=${id}&page=1`
    );
}

async function getSeriesByGenre(id) {
    return await fetchTMDB(
        `/discover/tv?language=pt-BR&with_genres=${id}&page=1`
    );
}