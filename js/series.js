const genres = [
    { title: "💥 Ação & Aventura", id: 10759 },
    { title: "🕵️ Crime", id: 80 },
    { title: "😂 Comédia", id: 35 },
    { title: "🧩 Mistério", id: 9648 },
    { title: "🚀 Ficção Científica & Fantasia", id: 10765 },
    { title: "❤️ Drama", id: 18 }
];

const sections = [
    {
        title: "Séries Populares",
        request: getPopularSeries
    },
    {
        title: "Top 10",
        request: getTopRatedSeries
    },
    {
        title: "No Ar",
        request: getOnTheAirSeries
    },
    {
        title: "Para Hoje",
        request: getAiringTodaySeries
    },
];


async function loadSeries() {

    const container = document.getElementById("series-container");

    for (const section of sections) {

        const data = await section.request();

        renderCategory(
            container,
            section.title,
            data.results,
            "tv"
        );
    }

    for (const genre of genres) {
        const data = await getSeriesByGenre(genre.id);
        renderCategory(container, genre.title, data.results);
    }
}

loadSeries();

const content = document.querySelector(".main-content");

content.addEventListener("click", (event) => {

    const card = event.target.closest(".list-card-item");

    if (!card) return;

    const id = card.dataset.id;
    const type = card.dataset.type;

    window.location.href = `details.html?id=${id}&media=${type}`;

});