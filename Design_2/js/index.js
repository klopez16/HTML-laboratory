document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".btn-add");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const nombre = btn.dataset.nombre;
      const precio = btn.dataset.precio;
      addToCart(id, nombre, precio);
      showNotification(`Has añadido un ${nombre} al carrito.`);
    });
  });

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showNotification("Gracias por tu mensaje. Te contactaremos pronto.");
      contactForm.reset();
    });
  }
});
