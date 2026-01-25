/**
 * db-connection.js
 * Sistema de conexión con la API de PostgreSQL
 * KevWeb - 2026
 */

// URL base de la API
const API_URL = "http://localhost:3000/api";

// ===================================================
// FUNCIONES DE CONSULTA (CRUD - READ)
// ===================================================

/**
 * Obtener información de la empresa
 */
async function obtenerDatosEmpresa() {
  try {
    const response = await fetch(`${API_URL}/empresa`);
    if (!response.ok) throw new Error("Error al obtener datos de empresa");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

/**
 * Obtener todas las categorías
 */
async function obtenerCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) throw new Error("Error al obtener categorías");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/**
 * Obtener todos los servicios
 */
async function obtenerServicios() {
  try {
    const response = await fetch(`${API_URL}/servicios`);
    if (!response.ok) throw new Error("Error al obtener servicios");
    const data = await response.json();
    console.log("📊 Servicios recibidos:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/**
 * Obtener servicios en oferta
 */
async function obtenerServiciosEnOferta() {
  try {
    const response = await fetch(`${API_URL}/servicios/ofertas/activas`);
    if (!response.ok) throw new Error("Error al obtener ofertas");
    const data = await response.json();
    console.log("🎁 Ofertas recibidas:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/**
 * Obtener servicio por ID
 */
async function obtenerServicioPorId(id) {
  try {
    const response = await fetch(`${API_URL}/servicios/${id}`);
    if (!response.ok) throw new Error("Error al obtener servicio");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

/**
 * Obtener servicios por categoría
 */
async function obtenerServiciosPorCategoria(categoriaId) {
  try {
    const response = await fetch(
      `${API_URL}/servicios/categoria/${categoriaId}`,
    );
    if (!response.ok)
      throw new Error("Error al obtener servicios por categoría");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/**
 * Obtener proyectos del portafolio
 */
async function obtenerPortafolio() {
  try {
    const response = await fetch(`${API_URL}/portafolio`);
    if (!response.ok) throw new Error("Error al obtener portafolio");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/**
 * Obtener todas las noticias
 */
async function obtenerNoticias() {
  try {
    const response = await fetch(`${API_URL}/noticias`);
    if (!response.ok) throw new Error("Error al obtener noticias");
    const data = await response.json();
    console.log("📰 Noticias recibidas:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

/**
 * Calcular precio con descuento
 */
function calcularPrecioConDescuento(precio, descuento) {
  return precio - (precio * descuento) / 100;
}

// ===================================================
// FUNCIONES DE ESCRITURA (CRUD - CREATE)
// ===================================================

/**
 * Guardar mensaje de contacto
 */
async function guardarMensajeContacto(mensaje) {
  try {
    const response = await fetch(`${API_URL}/contacto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensaje),
    });

    if (!response.ok) throw new Error("Error al guardar mensaje");

    const result = await response.json();
    console.log("✅ Mensaje guardado:", result);
    return true;
  } catch (error) {
    console.error("❌ Error al guardar mensaje:", error);
    return false;
  }
}

// ===================================================
// LOG DE INICIALIZACIÓN
// ===================================================
console.log("✅ db-connection.js cargado correctamente");
console.log("🔗 Conectando con API en:", API_URL);
