// --- Carrito en localStorage ---
function getCart() {
  const data = localStorage.getItem("carritoCafe");
  return data ? JSON.parse(data) : [];
}

function saveCart(cart) {
  localStorage.setItem("carritoCafe", JSON.stringify(cart));
}

// Añadir producto (o aumentar cantidad)
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

// Actualizar cantidad
function updateQuantity(id, nuevaCantidad) {
  let cart = getCart();
  cart = cart
    .map((item) =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    )
    .filter((item) => item.cantidad > 0);
  saveCart(cart);
}

// Eliminar producto
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);
}

// Limpiar carrito y envío
function clearOrder() {
  localStorage.removeItem("carritoCafe");
  localStorage.removeItem("datosEnvioCafe");
}

// Datos de envío
function saveShipping(data) {
  localStorage.setItem("datosEnvioCafe", JSON.stringify(data));
}

function getShipping() {
  const data = localStorage.getItem("datosEnvioCafe");
  return data ? JSON.parse(data) : null;
}

// --- Notificación flotante (asume un div#notification) ---
function showNotification(message) {
  const notification = document.getElementById("notification");
  if (!notification) return;
  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// --- Menú responsive (asume #nav-toggle y #nav-menu) ---
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

// Ejecutar al cargar cada página
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});
