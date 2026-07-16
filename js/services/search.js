const input = document.querySelector(".search-bar input");

const mainContainer = document.getElementById("media-container");
const moviesContainer = document.getElementById("movies-container");
const seriesContainer = document.getElementById("series-container");
const favoritesContainer = document.getElementById("favorites-container");

const searchContainer = document.getElementById("search-container");

let timer;

input.addEventListener("input", () => {

    clearTimeout(timer);

    timer = setTimeout(async () => {

        const query = input.value.trim();

        // Se apagar a pesquisa
        if (query === "") {

            searchContainer.classList.add("hidden");
            mainContainer?.classList.remove("hidden");
            moviesContainer?.classList.remove("hidden");
            seriesContainer?.classList.remove("hidden");
            favoritesContainer?.classList.remove("hidden");
            heroBanner.classList.remove("hidden");
            searchContainer.innerHTML = "";

            return;
        }

        // Busca na API
        const results = await searchMedia(query);

        // Mostra a pesquisa
        mainContainer?.classList.add("hidden");
        moviesContainer?.classList.add("hidden");
        seriesContainer?.classList.add("hidden");
        favoritesContainer?.classList.add("hidden");
        searchContainer.classList.remove("hidden");
        heroBanner.classList.add("hidden");

        // Limpa resultados antigos
        searchContainer.innerHTML = "";

        if (results.length === 0) {

            searchContainer.innerHTML = `
                <div class="empty-search">

                    <i data-lucide="search-x"></i>

                    <h2>Nenhum resultado encontrado</h2>

                    <p>
                        Não encontramos "<strong>${query}</strong>".
                        Tente pesquisar outro filme ou série.
                    </p>

                </div>
            `;

            lucide.createIcons();

            return;

        }

        // Renderiza os novos
        renderCategory(
            searchContainer,
            `Resultados para "${query}"`,
            results
        );

    }, 300);

});