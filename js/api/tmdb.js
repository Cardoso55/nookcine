async function fetchTMDB(endpoint) {

    const response = await fetch(
        `${BASE_URL}${endpoint}`,
        {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                accept: "application/json"
            }
        }
    );

    if (!response.ok) {

        throw new Error("Erro ao buscar dados da TMDB.");

    }

    return await response.json();

}

async function getGenres() {

    try {

        const response = await fetch(
            `${BASE_URL}/genre/movie/list`,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar gêneros.");
        }

        const data = await response.json();

        return data.genres;

    } catch (error) {

        console.error(error);

    }

}

async function getMoviesByGenre(genreId) {

    try {

        const response = await fetch(
            `${BASE_URL}/discover/movie?with_genres=${genreId}`,
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    accept: "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar filmes.");
        }

        const data = await response.json();

        return data.results;

    } catch (error) {

        console.error(error);

    }

}

async function getDetails(id, media) {

    const response = await fetch(
        `${BASE_URL}/${media}/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits,videos,recommendations`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar detalhes.");
    }

    return await response.json();

}

async function searchMedia(query) {

    const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${query}`
    );

    const data = await response.json();

    return data.results.filter(item =>
        item.media_type !== "person"
    );

}