// ================================
// MENÚ RESPONSIVE (HAMBURGUESA)
// ================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// Abrir/cerrar menú en móviles
menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

// Cerrar menú al hacer clic en un enlace (mejor experiencia móvil)
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("active");
  });
});

// ================================
// SISTEMA DE NOTIFICACIONES
// ================================

const notification = document.getElementById("notification");
let notificationTimeout;

// Función para mostrar notificación
function showNotification(message) {
  // Limpiar timeout anterior si existe
  if (notificationTimeout) {
    clearTimeout(notificationTimeout);
  }

  // Establecer mensaje y mostrar
  notification.textContent = message;
  notification.classList.add("show");

  // Ocultar después de 3 segundos
  notificationTimeout = setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// ================================
// AÑADIR PRODUCTOS AL PEDIDO
// ================================

// Seleccionar todos los botones "Añadir"
const addButtons = document.querySelectorAll(".btn-add");

// Agregar evento a cada botón
addButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // Obtener nombre del producto desde el atributo data-product
    const productName = e.target.getAttribute("data-product");

    // Mostrar notificación
    showNotification(`Has añadido un ${productName} al pedido`);

    // Efecto visual en el botón
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "scale(1)";
    }, 100);
  });
});

// ================================
// FORMULARIO DE CONTACTO
// ================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  // Prevenir recarga de página
  e.preventDefault();

  // Obtener valores del formulario
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  // Simular envío exitoso
  showNotification(`¡Gracias ${nombre}! Tu mensaje ha sido enviado.`);

  // Limpiar formulario
  contactForm.reset();
});

// ================================
// SCROLL SUAVE PARA ENLACES INTERNOS
// ================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      // Calcular posición considerando el header fijo
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});
