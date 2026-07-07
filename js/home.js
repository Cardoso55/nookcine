async function loadHome(){
    await loadingHero();
    
    await loadTrending();

    await loadPopularMovies();

    await loadPopularSeries();

    await loadMovieGenres();

    await loadSeriesGenres();

}

loadHome();
