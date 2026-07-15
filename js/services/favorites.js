const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const container = document.getElementById("favorites-container");

if(favorites.length === 0){

    container.innerHTML = `
        <div class="empty-favorites">

            <h2>Nenhum favorito encontrado.</h2>

            <p>
                Adicione filmes ou séries para vê-los aqui.
            </p>

        </div>
    `;

}

favorites.forEach(media => {

    container.innerHTML += createMediaCard(
        media,
        media.mediaType
    );

});

container.addEventListener("click",(event)=>{

    const card = event.target.closest(".list-card-item");

    if(!card) return;

    window.location.href =
`details.html?id=${card.dataset.id}&media=${card.dataset.type}`;

});