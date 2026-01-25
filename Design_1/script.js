// Autor: Kevin López
// Este script se encarga de dar interactividad a la página web.

window.onload = function() { 
    console.log("Script cargado y window.onload ejecutado."); // Agregué un console.log porque no estaba funcionando el código y así verificar que el script se está ejecutando

    // Script relacionado con los elementos del DOM
    const startButton = document.getElementById('startExploration');
    const modal = document.getElementById('navigationModal');
    const closeButton = document.getElementById('closeModal');
    const navigationCards = document.querySelectorAll('.navigation_card');

    // Script que nos permite abrir el modal al hacer clic en el botón "Comienza la Exploración"
    // Solo si el botón existe en la página actual
    if (startButton) {
        startButton.addEventListener('click', function() {
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Nos permite bloquear el scroll del body
            }
        });
    }

    // Script que nos permite cerrar el modal al hacer clic en la "X"
    // Solo si el botón de cerrar modal existe
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto'; // Nos permite restaurar el scroll del body
            }
        });
    }

    // Script que nos permite cerrar el modal con la tecla "Escape"
    // Solo si el modal está presente en la página
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Script que nos permite cerrar el modal al hacer clic fuera de él
    // Solo si el modal está presente en la página
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Script para la navegación con las tarjetas
    navigationCards.forEach(card => {
        card.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                window.location.href = page;
            }
        });
    });

    // Script para incluir el menú tipo Hamburger para pantallas pequeñas como puede ser un celular o una tablet
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav_menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Array con los textos para las imagenes de la página El Sol
    const solarTexts = [
        "Pulsos del Sol: Una imagen detallada de la actividad solar.", 
        "Vista del sol con 3 telescopios: Combinación de datos para una visión completa.", 
        "El Sol emite explosiones masivas en el solsticio: Un evento energético capturado."
    ];

    // Bucle para asignar los textos a los elementos 'p' buscando su respectivo ID del Sol
    for (let i = 0; i < solarTexts.length; i++) {
        const elementId = `text${i + 1}`;
        console.log(`Intentando encontrar elemento con ID: ${elementId}`); // Agregué un console.log porque no estaba funcionando el código y así verificar qué ID se está buscando
        const element = document.getElementById(elementId); 
        if (element) {
            element.textContent = solarTexts[i];
            console.log(`Elemento ${elementId} encontrado y texto actualizado a: ${solarTexts[i]}`); // Agregué un console.log porque no estaba funcionando el código y así confirmar la actualización
        } else {
            console.log(`Elemento ${elementId} NO encontrado.`); // Agregué un console.log porque no estaba funcionando el código y así ver si el elemento no se encuentra
        }
    }

    // Array con los textos para las imagenes de la página Planetas
    const planetNames = [
        "Mercurio", "Venus", "La Tierra", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno"
    ];

    // Bucle para asignar los textos a los elementos 'p' buscando su respectivo ID de Planetas
    for (let j = 0; j < planetNames.length; j++) {
        const elementId = `planet${j + 1}`;
        console.log(`Intentando encontrar elemento con ID: ${elementId}`);
        const element = document.getElementById(`planet${j + 1}`);
        if (element) {
            element.textContent = planetNames[j];
            console.log(`Elemento ${elementId} encontrado y texto actualizado a: ${planetNames[j]}`);
        } else {
            console.log(`Elemento ${elementId} No encontrado.`);
        }
    }

    // Array con los textos para las imagenes de la página Lunas
    const sentencesMoon = [
        "Explicación Fases de la luna: ", "Fases de la luna - Video", 
        ];

    // Bucle para asignar los textos a los elementos 'p' buscando su respectivo ID de Lunas
    for (let k = 0; k < sentencesMoon.length; k++) {
        const elementId = `moon${k + 1}`;
        console.log(`Intentando encontrar elemento con ID: ${elementId}`);
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = sentencesMoon[k];
            console.log(`Elemento ${elementId} encontrado y texto actualizado a: ${sentencesMoon[k]}`);
        } else {
            console.log(`Elemento ${elementId} No encontrado.`);
        }
    }  
    
    // Array con los textos para las imagenes de la página Asteroides y Cometas
    const sentencesAsteroids = [
        "Asteroide 2024 YR4: ", "Asteroide Bennu: ", "Asteroide Dinkinesh & Selam: ", "1P/Halley: ", "Cometa 103P/Hartley (Hartley 2)", "109P/Swift-Tuttle"
        ];

    // Bucle para asignar los textos a los elementos 'p' buscando su respectivo ID de Lunas
    for (let l = 0; l < sentencesAsteroids.length; l++) {
        const elementId = `ast_com${l + 1}`;
        console.log(`Intentando encontrar elemento con ID: ${elementId}`);
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = sentencesAsteroids[l];
            console.log(`Elemento ${elementId} encontrado y texto actualizado a: ${sentencesAsteroids[l]}`);
        } else {
            console.log(`Elemento ${elementId} No encontrado.`);
        }
    }     
};
