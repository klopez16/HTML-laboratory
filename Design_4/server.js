const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Servir archivos estáticos (HTML, CSS, JS, imágenes)

// Configuración de PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "kevweb_db",
  password: "liverpool",
  port: 5432,
});

// Probar conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error conectando a PostgreSQL:", err.stack);
  }
  console.log("Conectado a PostgreSQL");
  release();
});

// ==========================================
// RUTAS DE LA API
// ==========================================

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor KevWeb activo - API funcionando correctamente");
});

// ==========================================
// EMPRESA INFO
// ==========================================
app.get("/api/empresa", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM empresa_info LIMIT 1");
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener información de empresa" });
  }
});

// ==========================================
// CATEGORÍAS
// ==========================================
app.get("/api/categorias", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categorias_servicio ORDER BY id_categoria",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// ==========================================
// SERVICIOS
// ==========================================

// Obtener todos los servicios
app.get("/api/servicios", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM servicios ORDER BY id_servicios",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener servicios" });
  }
});

// Obtener servicios por categoría
app.get("/api/servicios/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM servicios WHERE id_categoria = $1",
      [id],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener servicios por categoría" });
  }
});

// Obtener servicio por ID
app.get("/api/servicios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM servicios WHERE id_servicios = $1",
      [id],
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener servicios en oferta
app.get("/api/servicios/ofertas/activas", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM servicios WHERE es_oferta = TRUE ORDER BY descuento_oferta DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener ofertas" });
  }
});

// ==========================================
// PORTAFOLIO
// ==========================================
app.get("/api/portafolio", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM portafolio ORDER BY fecha_finalizacion DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener portafolio" });
  }
});

// ==========================================
// NOTICIAS
// ==========================================
app.get("/api/noticias", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM noticias_blog ORDER BY fecha_publicacion DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener noticias" });
  }
});

// ==========================================
// CONTACTO (CREATE)
// ==========================================
app.post("/api/contacto", async (req, res) => {
  try {
    const { nombre, email, telefono, tipo_servicio_interes, mensaje } =
      req.body;

    const result = await pool.query(
      `INSERT INTO contacto_mensajes 
       (nombre, email, telefono, tipo_servicio_interes, mensaje) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [nombre, email, telefono, tipo_servicio_interes, mensaje],
    );

    res.status(201).json({
      success: true,
      message: "Mensaje guardado correctamente",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      error: "Error al guardar mensaje de contacto",
    });
  }
});

// Obtener mensajes de contacto
app.get("/api/contacto", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacto_mensajes ORDER BY fecha_envio DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================
app.listen(PORT, () => {
  console.log(`
  Servidor KevWeb iniciado
  Puerto: ${PORT}
  http://localhost:${PORT}
  Base de datos: PostgreSQL
  `);
});
