// Array que contiene las rutas de las 22 imágenes únicas
const cardBackImages = [
    'img/El_loco.webp',
    'img/La_fuerza.webp',
    'img/La_Justicia.webp',
    'img/El_mago.webp', // Reemplaza con tus 22 rutas reales
    'img/La_suma.webp',
    'img/La_emperatriz.webp',
    'img/El_emperador.webp',
    'img/El_sacerdote.webp',
    'img/Los_enamorados.webp',
    'img/El_carro.webp',
    'img/El_hermitano.webp',
    'img/La_rueda.jpg',
    'img/El_colgado.webp',
    'img/La_muerte.webp',
    'img/La_templanza.webp',
    'img/El_diablo.webp',
    'img/La_torre.webp',
    'img/La_estrella.webp',
    'img/La_luna.webp',
    'img/El_sol.webp',
    'img/El_juicio.webp',
    'img/El_mundo.webp'
];

// Función para generar las 22 cartas dinámicamente
function generateCards() {
    const body = document.body;
    const resetButton = document.getElementById('reset-button');
    body.removeChild(resetButton);
shuffle(cardBackImages);

    for (let i = 0; i < 22; i++) {
        const container = document.createElement('div');
        container.className = 'card-container';
        container.setAttribute('onclick', 'handleCardClick(this)');

        container.innerHTML = `
            <div class="card">
                <div class="front">
                     
                </div>
                <!-- Eliminamos el ID estático de aquí -->
                <div class="back">
                    <!-- Imagen de fondo se aplica con JS -->
                </div>
            </div>
        `;
        body.appendChild(container);

        // *** APLICACIÓN DINÁMICA DE LA IMAGEN ***
        const backElement = container.querySelector('.back');
        backElement.style.backgroundImage = `url('${cardBackImages[i]}')`;
    }
    
    body.appendChild(resetButton);
}

// Lógica de manejo de clics y selección (la misma que antes)
let selectionMade = false;

function handleCardClick(clickedCardContainer) {
    if (selectionMade) return;
    selectionMade = true;
    
    document.body.classList.add('card-selected');

    clickedCardContainer.classList.add('flipped');

    const allCardContainers = document.querySelectorAll('.card-container');
    allCardContainers.forEach(container => {
        if (container !== clickedCardContainer) {
            container.classList.add('hidden');
        }
    });

    setTimeout(() => {
        allCardContainers.forEach(container => {
            if (container !== clickedCardContainer) {
                container.remove();
            }
        });
    }, 500); 
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Ejecuta la generación de cartas al cargar la página
generateCards();
