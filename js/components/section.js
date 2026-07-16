function generateSectionId(title) {
    return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .toLowerCase()
        .replace(/\s+/g, "-"); // Espaços -> hífen
}



function createMediaSection(title, id) {

    const sectionId = generateSectionId(title);

    return `
        <section class="cards-section">
    
            <h3>${title}</h3>

            <div class="card-line" id="${sectionId}"></div>

        </section>
    `;

}
