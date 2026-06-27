// RENDER ICONS
lucide.createIcons();

// ROUTES

const btnDetails = document.getElementById("btn-details");

btnDetails.addEventListener("click", () => {
    window.location.href = "details.html";
});


function enableDragScroll() {
    document.querySelectorAll(".card-line").forEach(cardLine => {

        let isDragging = false;
        let startX;
        let scrollLeft;

        cardLine.addEventListener("mousedown", (e) => {

            isDragging = true;

            startX = e.pageX - cardLine.offsetLeft;

            scrollLeft = cardLine.scrollLeft;

            cardLine.style.cursor = "grabbing";

        });

        cardLine.addEventListener("mouseleave", () => {

            isDragging = false;

            cardLine.style.cursor = "grab";

            cardLine.classList.remove("dragging");

        });

        cardLine.addEventListener("mouseup", () => {

            isDragging = false;

            cardLine.style.cursor = "grab";

        });

        cardLine.addEventListener("mousemove", (e) => {

            if (!isDragging) return;

            e.preventDefault();

            const x = e.pageX - cardLine.offsetLeft;

            const walk = (x - startX) * 0.8;

            cardLine.scrollLeft = scrollLeft - walk;

            cardLine.classList.add("dragging");

        });

    });

}

function enableWheelScroll(cardLine) {

    let targetScroll = 0;
    let animationFrame;

    cardLine.addEventListener("wheel", (e) => {

        e.preventDefault();

        targetScroll += e.deltaY;

        targetScroll = Math.max(
            0,
            Math.min(targetScroll, cardLine.scrollWidth - cardLine.clientWidth)
        );

        cancelAnimationFrame(animationFrame);

        animate();

    });

    function animate() {

        cardLine.scrollLeft += (targetScroll - cardLine.scrollLeft) * 0.8;

        if (Math.abs(targetScroll - cardLine.scrollLeft) > 0.5) {
            animationFrame = requestAnimationFrame(animate);
        }

    }

}