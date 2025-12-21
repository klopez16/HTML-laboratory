/* Autor: Kevin López // Fecha: 21-dic-2025 // Proyecto Final*/

/* Función para cargar al inicio  */
document.addEventListener("DOMContentLoaded", () => {
  const resumenDiv = document.getElementById("resumen");
  const formPago = document.getElementById("form-pago");
  const mensajeExito = document.getElementById("mensaje-exito");

  /*Función para renderizar el resumen del pedido*/
  function renderResumen() {
    const cart = getCart();
    const envio = getShipping();

    if (!cart.length || !envio) {
      resumenDiv.innerHTML =
        "<p>Falta información del carrito o de la dirección. Vuelve al carrito.</p>";
      return;
    }

    let total = 0;
    let html = "<h2>Resumen del pedido</h2>";
    html += "<ul>";

    cart.forEach((item) => {
      const subtotal = item.cantidad * item.precio;
      total += subtotal;
      html += `<li>${item.cantidad}x ${item.nombre} - $${subtotal.toFixed(
        2
      )}</li>`;
    });

    html += "</ul>";
    html += `<p style="margin-top:0.5rem;"><strong>Total: $${total.toFixed(
      2
    )}</strong></p>`;

    html += `
      <h3 style="margin-top:1rem;">Se enviará a:</h3>
      <p><strong>${envio.nombre}</strong></p>
      <p>${envio.direccion}</p>
      <p>${envio.telefono}</p>
      <p>${envio.referencia || ""}</p>
    `;

    resumenDiv.innerHTML = html;
  }

  renderResumen();

  /* Función para mostrar la notificación flotante en los casos requeridos  */
  formPago.addEventListener("submit", (e) => {
    e.preventDefault();

    const envio = getShipping();
    if (!envio) {
      showNotification("Faltan datos de envío.");
      return;
    }

    showNotification("Procesando pago ficticio...");

    setTimeout(() => {
      clearOrder();
      formPago.style.display = "none";
      mensajeExito.style.display = "block";
      mensajeExito.innerHTML = `
        <h2>Tu pedido ha sido correcto y está en camino</h2>
        <p>Gracias, <strong>${envio.nombre}</strong>. Tu pedido será enviado a:</p>
        <p>${envio.direccion}</p>
        <p>En pocos minutos estará en camino.</p>
        <a href="index.html">Volver al inicio</a>
      `;
      showNotification("Tu pedido ha sido correcto y está en camino.");
    }, 1000);
  });
});
