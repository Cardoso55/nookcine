function createMediaCard(media) {

    const title = media.title || media.name;

    const poster = media.poster_path
        ? `${IMAGE_URL}${media.poster_path}`
        : "assets/images/no-poster.png";

    const type = media.media_type || "movie";

    return `
        <div class="list-card-item" data-id="${media.id}" data-type="${type}">
            <div class="card-image">
                <img src="${poster}" alt="${title}">
            </div>

            <span class="card-title">
                ${title}
            </span>
        </div>
    `;

}

function renderCategory(container, title, mediaList) {

    container.innerHTML += createMediaSection(title);

    const section = container.lastElementChild;

    const cardLine = section.querySelector(".card-line");

    mediaList.forEach(media => {

        cardLine.innerHTML += createMediaCard(media);

    });

    return section;

}
