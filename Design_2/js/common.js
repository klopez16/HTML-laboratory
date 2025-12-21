/* Autor: Kevin López // Fecha: 21-dic-2025 // Proyecto Final*/

/* Función de carrito, simulado en localStorage */
function getCart() {
  const data = localStorage.getItem("carritoCafe");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem("carritoCafe", JSON.stringify(cart));
}

/* Función para añadir productos o aumentar cantidades */
function addToCart(id, nombre, precio) {
  const cart = getCart();
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.cantidad += 1;
  } else {
    cart.push({ id, nombre, precio: Number(precio), cantidad: 1 });
  }
  saveCart(cart);
}

/* Función para actualizar cantidad */
function updateQuantity(id, nuevaCantidad) {
  let cart = getCart();
  cart = cart
    .map((item) =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    )
    .filter((item) => item.cantidad > 0);
  saveCart(cart);
}

/* Función para eliminar productos */
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);
}

/* Función para limpiar el carrito y el envío */
function clearOrder() {
  localStorage.removeItem("carritoCafe");
  localStorage.removeItem("datosEnvioCafe");
}

/* Función para registrar los datos de envío */
function saveShipping(data) {
  localStorage.setItem("datosEnvioCafe", JSON.stringify(data));
}

function getShipping() {
  const data = localStorage.getItem("datosEnvioCafe");
  return data ? JSON.parse(data) : null;
}

/* Función para las notificaciones flotantes */
function showNotification(message) {
  const notification = document.getElementById("notification");
  if (!notification) return;
  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

/* Función para el menú de navgación */
function initMenu() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

/* Función para cargar al inicio  */
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});
