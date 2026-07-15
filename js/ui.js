export function enableCardNavigation(container) {

    container.addEventListener("click", (event) => {

        const card = event.target.closest(".list-card-item");

        if (!card) return;

        const id = card.dataset.id;
        const type = card.dataset.type;

        window.location.href = `details.html?id=${id}&media=${type}`;

    });

}