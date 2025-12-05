// Array que contiene las rutas de las 22 imágenes únicas
const cardBackImages = [
    'Tarotimg/0_El loco.jpg',
    'Tarotimg/1_El Mago.jpg',
    'Tarotimg/2_La suma sacerdotiza.jpg',
    'Tarotimg/3_La Emperatriz.jpg', // Reemplaza con tus 22 rutas reales
    'Tarotimg/4_El Emperador.jpg',
    'Tarotimg/5_El sacerdote.jpg',
    'Tarotimg/6_Los enamorados.jpg',
    'Tarotimg/7_El carro.jpg',
    'Tarotimg/8_La justicia.jpg',
    'Tarotimg/9_El hermitaño.jpg',
    'Tarotimg/10_La rueda.jpg',
    'Tarotimg/11_La fuerza.jpg',
    'Tarotimg/12_El colgado.jpg',
    'Tarotimg/13_La muerte.jpg',
    'Tarotimg/14_La templanza.jpg',
    'Tarotimg/15_El devil.jpg',
    'Tarotimg/16_La torre.jpg',
    'Tarotimg/17_La estrella.jpg',
    'Tarotimg/18_La Luna.jpg',
    'Tarotimg/19_El sol.jpg',
    'Tarotimg/20_El juicio.jpg',
    'Tarotimg/21_El mundo.jpg'
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
