// Array que contiene los datos completos (Imagen, Nombre, Consejo)
const cardData = [
    { name: 'El Loco', image: 'Tarotimg/0_El loco.jpg', counsel: 'Emprende nuevas aventuras con mente abierta, pero con cuidado.' },
    { name: 'El Mago', image: 'Tarotimg/1_El Mago.jpg', counsel: 'Tienes todas las herramientas para manifestar tus deseos. ¡Actúa!' },
    { name: 'La Sacerdotisa', image: 'Tarotimg/2_La suma sacerdotiza.jpg', counsel: 'Confía en tu intuición y busca la sabiduría interior antes de decidir.' },
    { name: 'La Emperatriz', image: 'Tarotimg/3_La Emperatriz.jpg', counsel: 'Es tiempo de creatividad, belleza y fertilidad. Nutre tu entorno.' },
    { name: 'El Emperador', image: 'Tarotimg/4_El Emperador.jpg', counsel: 'Establece límites, afirma tu autoridad y busca la estructura.' },
    { name: 'El Sacerdote', image: 'Tarotimg/5_El sacerdote.jpg', counsel: 'Busca la guía de un maestro o sigue las tradiciones y valores establecidos.' },
    { name: 'Los Enamorados', image: 'Tarotimg/6_Los enamorados.jpg', counsel: 'Debes tomar una decisión crucial del corazón. Escucha ambas opciones.' },
    { name: 'El Carro', image: 'Tarotimg/7_El carro.jpg', counsel: 'Avanza con determinación. La victoria se logra con control y voluntad.' },
    { name: 'La Justicia', image: 'Tarotimg/8_La justicia.jpg', counsel: 'Busca el equilibrio, la verdad y la equidad en todas tus acciones.' },
    { name: 'El Ermitaño', image: 'Tarotimg/9_El hermitaño.jpg', counsel: 'Necesitas un periodo de introspección y soledad para encontrar respuestas.' },
    { name: 'La Rueda de la Fortuna', image: 'Tarotimg/10_La rueda.jpg', counsel: 'El cambio es inminente. Acepta el ciclo y prepárate para un nuevo destino.' },
    { name: 'La Fuerza', image: 'Tarotimg/11_La fuerza.jpg', counsel: 'Usa la compasión y el valor interior, no la fuerza bruta, para superar obstáculos.' },
    { name: 'El Colgado', image: 'Tarotimg/12_El colgado.jpg', counsel: 'Espera y cambia tu perspectiva. Un sacrificio puede ser necesario.' },
    { name: 'La Muerte', image: 'Tarotimg/13_La muerte.jpg', counsel: 'Fin de un ciclo. Prepárate para una transformación profunda y necesaria.' },
    { name: 'La Templanza', image: 'Tarotimg/14_La templanza.jpg', counsel: 'Busca la moderación y el equilibrio. La paciencia es tu aliada.' },
    { name: 'El Diablo', image: 'Tarotimg/15_El devil.jpg', counsel: 'Libérate de las ataduras materiales o mentales que te limitan.' },
    { name: 'La Torre', image: 'Tarotimg/16_La torre.jpg', counsel: 'Una revelación o crisis está a la vista. Es dolorosa pero purificadora.' },
    { name: 'La Estrella', image: 'Tarotimg/17_La estrella.jpg', counsel: 'Esperanza e inspiración. Sigue tu camino con optimismo y fe.' },
    { name: 'La Luna', image: 'Tarotimg/18_La Luna.jpg', counsel: 'Trata con tus miedos e ilusiones. No todo es lo que parece.' },
    { name: 'El Sol', image: 'Tarotimg/19_El sol.jpg', counsel: 'Felicidad, éxito y vitalidad. Brilla con confianza y alegría.' },
    { name: 'El Juicio', image: 'Tarotimg/20_El juicio.jpg', counsel: 'Momento de rendir cuentas y hacer un gran despertar o llamado.' },
    { name: 'El Mundo', image: 'Tarotimg/21_El mundo.jpg', counsel: 'Completitud y éxito total. Has llegado a la meta, celebra tus logros.' }
];

// Variable global para almacenar los datos de la carta (después del shuffle)
let shuffledCardData = []; 
let selectionMade = false;


// Función para barajar el array (Algoritmo de Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para generar las 22 cartas dinámicamente
function generateCards() {
    // Barajamos el array de datos COMPLETO
    shuffledCardData = [...cardData]; // Clonamos el array original
    shuffle(shuffledCardData);
    
    const cardsGrid = document.getElementById('cards-grid');

    for (let i = 0; i < shuffledCardData.length; i++) {
        const data = shuffledCardData[i];
        
        const container = document.createElement('div');
        container.className = 'card-container';
        // Usamos un data-attribute para guardar el índice, más limpio que el 'onclick'
        container.dataset.index = i; 

        container.innerHTML = `
            <div class="card">
                <div class="front"></div>
                <div class="back">
                    <h3 style="margin-top: 150px;">${data.name}</h3> 
                </div>
            </div>
        `;
        cardsGrid.appendChild(container);

        // APLICACIÓN DINÁMICA DE LA IMAGEN DE FONDO
        const backElement = container.querySelector('.back');
        backElement.style.backgroundImage = url('${data.image}');
        // Ajustamos el tamaño para que la imagen se muestre bien
        backElement.style.backgroundSize = 'cover'; 
    }
}


function handleCardClick(event) {
    // Usamos event.currentTarget para asegurarnos de que es el contenedor
    const clickedCardContainer = event.currentTarget; 
    const cardIndex = parseInt(clickedCardContainer.dataset.index);

    if (selectionMade) return;
    selectionMade = true;
    
    // 1. Mostrar contenido de resultado y girar la carta
    const resultContent = document.getElementById('result-content');
    const selectedCardData = shuffledCardData[cardIndex];

    resultContent.innerHTML = `
        <h2>${selectedCardData.name}</h2>
        <p>${selectedCardData.counsel}</p>
    `;

    clickedCardContainer.classList.add('flipped');

    // 2. Ocultar el grid y mover las cartas
    document.body.classList.add('card-selected');
    const allCardContainers = document.querySelectorAll('.card-container');
    const cardsGrid = document.getElementById('cards-grid');

    // Oculta el grid completo
    cardsGrid.classList.add('hidden');

    // Esperar a que la transición de ocultamiento termine (500ms en CSS)
    setTimeout(() => {
        // Eliminar las cartas restantes y mover la seleccionada
        allCardContainers.forEach(container => {
            if (container !== clickedCardContainer) {
                container.remove();
            }
        });

        // Aplicar la clase final de posición a la carta seleccionada
        clickedCardContainer.classList.add('selected-solo');
        
    }, 500); 
}

// Ejecuta la generación de cartas al cargar la página
generateCards();

// *** AÑADIDO: Delegación de Eventos ***
// Debes añadir el evento de click DESPUÉS de que las cartas son generadas.
document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos todas las cartas después de generarlas
    const allCardContainers = document.querySelectorAll('.card-container');
    allCardContainers.forEach(container => {
        // Asignamos la función de manejo de click
        container.addEventListener('click', handleCardClick);
    });
});