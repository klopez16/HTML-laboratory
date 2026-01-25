/**
 * db-connection.js
 * Sistema de conexión simulada con la base de datos SQLite
 * KevWeb - 2026
 */

// ===================================================
// DATOS SIMULADOS DE LA BASE DE DATOS
// ===================================================

// Datos de EMPRESA_INFO
const empresaInfoDB = {
  id_info: 1,
  horario_atencion: "Lunes a Viernes: 9:00 AM - 6:00 PM",
  telefono: "+593-99-123-4567",
  email: "contacto@kevweb.com",
  direccion: "Quito, Pichincha, Ecuador",
  descripcion_empresa:
    "KevWeb es una agencia digital especializada en desarrollo web, diseño UI/UX y soluciones de e-commerce. Ayudamos a empresas a establecer su presencia digital con sitios web profesionales y aplicaciones personalizadas.",
  mision:
    "Transformar ideas en experiencias digitales innovadoras que impulsen el crecimiento de nuestros clientes.",
  vision:
    "Ser la agencia líder en desarrollo web en Ecuador, reconocida por nuestra calidad, innovación y compromiso con el éxito de nuestros clientes.",
  latitud: -0.1807,
  longitud: -78.4678,
};

// Datos de CATEGORIAS_SERVICIO
const categoriasServicioDB = [
  {
    id_categoria: 1,
    nombre_categoria: "Desarrollo Web",
    descripcion: "Sitios web corporativos y landing pages",
    icono: "web",
  },
  {
    id_categoria: 2,
    nombre_categoria: "Desarrollo Web E-Commerce",
    descripcion: "Sitios web de Tiendas Online",
    icono: "shopping-cart",
  },
  {
    id_categoria: 3,
    nombre_categoria: "Desarrollo Web Diseño UI/UX",
    descripcion: "Sitios web con diseño de interfaz y experiencia de usuario",
    icono: "palette",
  },
  {
    id_categoria: 4,
    nombre_categoria: "Desarrollo Web Mantenimiento",
    descripcion: "Mantenimiento de Sitios Web",
    icono: "settings",
  },
];

// Datos de SERVICIOS
const serviciosDB = [
  {
    id_servicio: 1,
    nombre: "Sitio Web Corporativo",
    descripcion:
      "Sitio web completo de hasta 5 páginas con diseño personalizado",
    precio_desde: 799.99,
    id_categoria: 1,
    duracion_estimada: "3-4 semanas",
    imagen_url: "img/corporativo.jpg",
    tecnologias: "HTML5, CSS3, JavaScript, React",
    es_oferta: false,
    descuento_oferta: 0,
  },
  {
    id_servicio: 2,
    nombre: "Tienda Online Básica",
    descripcion: "E-commerce con catálogo de productos y pasarela de pago",
    precio_desde: 1299.99,
    id_categoria: 2,
    duracion_estimada: "4-6 semanas",
    imagen_url: "img/ecommerce.jpg",
    tecnologias: "WordPress, WooCommerce, PHP",
    es_oferta: true,
    descuento_oferta: 15,
  },
  {
    id_servicio: 3,
    nombre: "Landing Page Profesional",
    descripcion:
      "Página de aterrizaje optimizada para conversión con diseño moderno y responsivo",
    precio_desde: 299.99,
    id_categoria: 1,
    duracion_estimada: "1-2 semanas",
    imagen_url: "img/landing.jpg",
    tecnologias: "HTML5, CSS3, JavaScript, Bootstrap",
    es_oferta: true,
    descuento_oferta: 20,
  },
  {
    id_servicio: 4,
    nombre: "Diseño UI/UX",
    descripcion: "Diseño de interfaz centrado en la experiencia del usuario",
    precio_desde: 599.99,
    id_categoria: 3,
    duracion_estimada: "2-3 semanas",
    imagen_url: "img/design.jpg",
    tecnologias: "Figma, Adobe XD",
    es_oferta: false,
    descuento_oferta: 0,
  },
  {
    id_servicio: 5,
    nombre: "Mantenimiento Web Mensual",
    descripcion: "Actualizaciones, backups y soporte técnico",
    precio_desde: 99.99,
    id_categoria: 4,
    duracion_estimada: "Mensual",
    imagen_url: "img/maintenance.jpg",
    tecnologias: "Varios",
    es_oferta: false,
    descuento_oferta: 0,
  },
];

// Datos de PORTAFOLIO
const portafolioDB = [
  {
    id_proyecto: 1,
    nombre_proyecto: "Sistema Solar",
    descripcion:
      "Página web diseñada para enseñar sobre el Sistema Solar, la Luna y sus planetas",
    cliente: "Kevin L.",
    url_proyecto: "sistemasolar.com",
    imagen_url: "sistema_solar.jpg",
    tecnologias: "HTML5, CSS3, JavaScript",
    fecha_finalizacion: "2025-03-01",
    destacado: false,
  },
  {
    id_proyecto: 2,
    nombre_proyecto: "Cafetería Express Kevin",
    descripcion:
      "Página web diseñada para una cafetería con opción de E-commerce (compra en línea).",
    cliente: "Kevin L.",
    url_proyecto: "cafeexpresskevin.com",
    imagen_url: "cafeexpress.jpg",
    tecnologias: "HTML5, CSS3, JavaScript",
    fecha_finalizacion: "2025-12-01",
    destacado: false,
  },
];

// Datos de NOTICIAS_BLOG
const noticiasBlogDB = [
  {
    id_noticia: 1,
    titulo: "Tendencias de diseño web para 2026",
    contenido:
      "2026 será el año de la experiencia limpia, rápida y con propósito. El diseño web cambia cada año, pero 2026 marca un punto de inflexión real...",
    fecha_publicacion: "2026-01-15",
    imagen_url: "https://nairobiestudio.com/blog/tendencias-diseno-web-2026",
    categoria_blog: "Diseño Web",
    autor: "Nairobi Estudio",
  },
  {
    id_noticia: 2,
    titulo: "Web Design Trends to Expect in 2026",
    contenido:
      "2026 is redefining what great web design means. After a year of AI experimentation and bold minimalism...",
    fecha_publicacion: "2026-01-10",
    imagen_url: "https://elementor.com/blog/web-design-trends-2026/",
    categoria_blog: "Design Trends",
    autor: "Selin Romano",
  },
  {
    id_noticia: 3,
    titulo: "The 11 biggest web design trends of 2026",
    contenido:
      "Los equipos de diseño trabajan arduamente para asegurarse de que estén equipados con estos elementos...",
    fecha_publicacion: "2026-01-05",
    imagen_url: "https://www.wix.com/blog/web-design-trends",
    categoria_blog: "Elementos Esenciales",
    autor: "Jenna Romano",
  },
];

// ===================================================
// FUNCIONES DE CONSULTA (CRUD - READ)
// ===================================================

/**
 * Obtener información de la empresa
 * @returns {Object} Datos de la empresa
 */
function obtenerDatosEmpresa() {
  return empresaInfoDB;
}

/**
 * Obtener todas las categorías de servicio
 * @returns {Array} Array de categorías
 */
function obtenerCategorias() {
  return categoriasServicioDB;
}

/**
 * Obtener todos los servicios
 * @returns {Array} Array de servicios
 */
function obtenerServicios() {
  return serviciosDB;
}

/**
 * Obtener servicios en oferta
 * @returns {Array} Array de servicios en oferta
 */
function obtenerServiciosEnOferta() {
  return serviciosDB.filter((servicio) => servicio.es_oferta === true);
}

/**
 * Obtener servicio por ID
 * @param {number} id - ID del servicio
 * @returns {Object|null} Servicio encontrado o null
 */
function obtenerServicioPorId(id) {
  return serviciosDB.find((servicio) => servicio.id_servicio === id) || null;
}

/**
 * Obtener servicios por categoría
 * @param {number} categoriaId - ID de la categoría
 * @returns {Array} Array de servicios de esa categoría
 */
function obtenerServiciosPorCategoria(categoriaId) {
  return serviciosDB.filter(
    (servicio) => servicio.id_categoria === categoriaId,
  );
}

/**
 * Obtener proyectos del portafolio
 * @returns {Array} Array de proyectos
 */
function obtenerPortafolio() {
  return portafolioDB;
}

/**
 * Obtener proyectos destacados
 * @returns {Array} Array de proyectos destacados
 */
function obtenerProyectosDestacados() {
  return portafolioDB.filter((proyecto) => proyecto.destacado === true);
}

/**
 * Obtener todas las noticias
 * @returns {Array} Array de noticias
 */
function obtenerNoticias() {
  return noticiasBlogDB;
}

/**
 * Obtener noticias recientes (últimas 3)
 * @returns {Array} Array de las 3 noticias más recientes
 */
function obtenerNoticiasRecientes() {
  return noticiasBlogDB.slice(0, 3);
}

/**
 * Calcular precio con descuento
 * @param {number} precio - Precio original
 * @param {number} descuento - Porcentaje de descuento
 * @returns {number} Precio con descuento
 */
function calcularPrecioConDescuento(precio, descuento) {
  return precio - (precio * descuento) / 100;
}

// ===================================================
// FUNCIONES DE ESCRITURA (CRUD - CREATE)
// ===================================================

/**
 * Guardar mensaje de contacto
 * @param {Object} mensaje - Datos del mensaje
 * @returns {boolean} true si se guardó correctamente
 */
function guardarMensajeContacto(mensaje) {
  console.log("Mensaje guardado:", mensaje);
  // En producción, aquí se guardaría en la BD real
  // Por ahora solo lo mostramos en consola
  return true;
}

// ===================================================
// EXPORTAR FUNCIONES (para uso global)
// ===================================================

// Las funciones están disponibles globalmente
console.log("✅ db-connection.js cargado correctamente");
console.log("📊 Datos disponibles:", {
  empresa: empresaInfoDB,
  categorias: categoriasServicioDB.length,
  servicios: serviciosDB.length,
  portafolio: portafolioDB.length,
  noticias: noticiasBlogDB.length,
});
