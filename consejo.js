let selectionMade = false;

// Datos de ejemplo para las 22 cartas
const cardData = Array.from({ length: 22 }, (_, i) => ({
    id: i + 1,
    title: `Carta ${i + 1}`,
    description: `El significado de la Carta ${i + 1} es una guía para tu camino.`,
}));

// Función para barajar (shuffle) (se mantiene)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[i], array[j]];
    }
}

// Función para generar las cartas e inyectarlas
function generateCards() {
    shuffle(cardData); // Barajamos los datos
    const cardsGrid = document.getElementById('cards-grid');

    if (!cardsGrid) {
        console.error("No se encontró el contenedor #cards-grid.");
        return;
    }
    
    // Generamos los 22 elementos de carta
    cardData.forEach(data => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.dataset.cardId = data.id; // Para identificarla

        // Añade el evento de clic
        cardContainer.addEventListener('click', () => {
            handleCardClick(cardContainer, data.title, data.description);
        });

        cardContainer.innerHTML = `
            <div class="card">
                <div class="front"></div>
                <div class="back">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                </div>
            </div>
        `;
        cardsGrid.appendChild(cardContainer);
    });
}
function handleCardClick(clickedCardContainer, title, description) {
    if (selectionMade) return;

    selectionMade = true;
    
    // Muestra el botón de reinicio
    document.getElementById('reset-button').style.display = 'block';

    // 1. Añade la clase principal de estado
    document.body.classList.add('card-selected');
    
    // 2. Voltea y marca como seleccionada
    clickedCardContainer.classList.add('flipped', 'selected-solo');

    const allCardContainers = document.querySelectorAll('.card-container');
    
    // 3. Oculta las cartas no seleccionadas
    allCardContainers.forEach(container => {
        if (container !== clickedCardContainer) {
            // Aplicamos 'hidden' para ocultar y animar su salida
            container.classList.add('hidden');
        }
    });

    // 4. Añade el contenido del resultado (Tag/Etiqueta)
    const resultContent = document.getElementById('result-content');
    resultContent.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
    `;
    
    // 5. Ocultar el grid principal (contenedor de todas las cartas)
    // Esto es importante para que la carta seleccionada no sea afectada por el ancho del grid.
    setTimeout(() => {
        const cardsGrid = document.getElementById('cards-grid');
        cardsGrid.classList.add('hidden');
    }, 500); // 0.5s coincide con la transición de 'hidden' en CSS
    
    // NOTA: ELIMINAMOS EL CÓDIGO QUE USABA .remove()
}

// Ejecuta la generación de cartas al cargar la página
generateCards();