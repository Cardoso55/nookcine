const fakeMovies = [

    {
        id: 1,
        title: "Interstellar",
        poster: "https://cdn.folhape.com.br/upload/dn_arquivo/2024/03/forrest-gump.jpg"
    },

    {
        id: 2,
        title: "Batman",
        poster: "https://cdn.folhape.com.br/upload/dn_arquivo/2024/03/forrest-gump.jpg"
    }

];

function createMovieCard(movie) {

    return `
        <div class="list-card-item" data-id="${movie.id}">
            <div class="card-image">
                <img src="${movie.poster}" alt="${movie.title}">
            </div>

            <span class="card-title">
                ${movie.title}
            </span>
        </div>
    `;

}

function renderCategory(container, title, movies){

    container.innerHTML += createMovieSection(title);

    const section = container.lastElementChild;

    const cardLine = section.querySelector(".card-line");

    movies.forEach(movie => {

        cardLine.innerHTML += createMovieCard(movie);

    });

    return section;

}

const container = document.getElementById("movies-container");

renderCategory(
    container,
    "Populares",
    fakeMovies,
);