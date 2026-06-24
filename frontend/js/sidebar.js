fetch('components/sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // RENDER ICONS
        lucide.createIcons();

        // ROUTES

        const toHome = document.getElementById("toHome");
        const toMovie = document.getElementById("toMovie");
        const toSeries = document.getElementById("toSeries");

        toHome.addEventListener("click", () => {
            window.location.href = "index.html";
        });

        toMovie.addEventListener("click", () => {
            window.location.href = "movie.html";
        });

        toSeries.addEventListener("click", () => {
            window.location.href = "series.html";
        });

        // MENU TOGGLE

        const menuToggle = document.querySelector(".menu-toggle");
        const sidebar = document.querySelector(".sidebar");
        const overlay = document.querySelector(".overlay");

        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        overlay.addEventListener("click", () => {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        });

        // ADD CLASS ACTIVE TO CURRENT PAGE LINK
        const currentPage = window.location.pathname.split("/").pop();
        document.querySelectorAll('.menu-item').forEach(item => {

            const page =
                item.dataset.page;

            if (page === currentPage) {

                item.classList.add('active-menu-item');

            }

        });

    });