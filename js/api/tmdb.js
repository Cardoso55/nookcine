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

    } catch(error) {

        console.error(error);

    }

}