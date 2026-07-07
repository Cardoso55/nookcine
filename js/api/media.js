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


// MOVIES PG

async function getTopRatedMovies() {
    return await fetchTMDB("/movie/top_rated?language=pt-BR&page=1");
}

async function getNowPlayingMovies() {
    return await fetchTMDB("/movie/now_playing?language=pt-BR&page=1");
}

async function getUpcomingMovies() {
    return await fetchTMDB("/movie/upcoming?language=pt-BR&page=1");
}

async function getComedyMovies() {
    return await fetchTMDB("/discover/movie?language=pt-BR&with_genres=35&page=1");
}

async function getHorrorMovies() {
    return await fetchTMDB("/discover/movie?language=pt-BR&with_genres=27&page=1");
}

async function getSciFiMovies() {
    return await fetchTMDB("/discover/movie?language=pt-BR&with_genres=878&page=1");
}

async function getThrillerMovies() {
    return await fetchTMDB("/discover/movie?language=pt-BR&with_genres=53&page=1");
}

async function getRomanceMovies() {
    return await fetchTMDB("/discover/movie?language=pt-BR&with_genres=10749&page=1");
}

// SERIES PG

async function getTopRatedSeries() {
    return await fetchTMDB("/tv/top_rated?language=pt-BR&page=1");
}

async function getOnTheAirSeries() {
    return await fetchTMDB("/tv/on_the_air?language=pt-BR&page=1");
}

async function getAiringTodaySeries() {
    return await fetchTMDB("/tv/airing_today?language=pt-BR&page=1");
}