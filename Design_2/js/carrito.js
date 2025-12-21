/* Autor: Kevin López // Fecha: 21-dic-2025 // Proyecto Final*/

/* Función para cargar al inicio  */
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  const formDireccion = document.getElementById("form-direccion");

  /* Función para renderizar el carrito */

  function renderCart() {
    const cart = getCart();

    if (!cart.length) {
      cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
      return;
    }

    let total = 0;
    let html = `
      <table class="cart-table">
        <thead>
          <tr>
            <th>Café</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
    `;

    cart.forEach((item) => {
      const subtotal = item.cantidad * item.precio;
      total += subtotal;
      html += `
        <tr data-id="${item.id}">
          <td>${item.nombre}</td>
          <td>
            <input
              type="number"
              min="0"
              value="${item.cantidad}"
              class="input-cantidad"
            />
          </td>
          <td>$${item.precio.toFixed(2)}</td>
          <td class="celda-subtotal">$${subtotal.toFixed(2)}</td>
          <td>
            <button class="btn-remove">Eliminar</button>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
      <p style="margin-top:1rem;"><strong>Total: $${total.toFixed(
        2
      )}</strong></p>
    `;

    cartContainer.innerHTML = html;

    /* Función para listeners de cantidad */
    cartContainer.querySelectorAll(".input-cantidad").forEach((input) => {
      input.addEventListener("change", (e) => {
        const fila = e.target.closest("tr");
        const id = fila.dataset.id;
        const nuevaCantidad = Number(e.target.value);

        if (nuevaCantidad < 0) {
          e.target.value = 0;
        }

        updateQuantity(id, nuevaCantidad);
        renderCart();
      });
    });

    /* Función para listeners de eliminar*/
    cartContainer.querySelectorAll(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const fila = e.target.closest("tr");
        const id = fila.dataset.id;
        removeFromCart(id);
        showNotification("Producto eliminado del carrito.");
        renderCart();
      });
    });
  }

  /* Función para renderizar el carrito */

  renderCart();

  formDireccion.addEventListener("submit", (e) => {
    e.preventDefault();
    const cart = getCart();
    if (!cart.length) {
      showNotification("Tu carrito está vacío.");
      return;
    }

    const datos = {
      nombre: formDireccion.nombre.value,
      telefono: formDireccion.telefono.value,
      direccion: formDireccion.direccion.value,
      referencia: formDireccion.referencia.value,
    };

    saveShipping(datos);
    window.location.href = "pago.html";
  });
});
