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
