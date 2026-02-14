// ==========================================
// REPORTEADOR DE CLIMA - KEVWEB
// API: OpenWeatherMap
// ==========================================

// CONFIGURACIÓN DE LA API
// ⚠️ IMPORTANTE: Reemplaza 'TU_API_KEY_AQUI' con tu API Key de OpenWeatherMap
const API_KEY = 'TU_API_KEY_AQUI';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const ICON_BASE_URL = 'https://openweathermap.org/img/wn/';

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const elementos = {
  // Inputs y botones
  ciudadInput: document.getElementById('ciudadInput'),
  btnBuscarClima: document.getElementById('btnBuscarClima'),
  
  // Estados de carga y error
  loading: document.getElementById('loading'),
  errorMsg: document.getElementById('errorMsg'),
  errorText: document.getElementById('errorText'),
  
  // Tarjeta de clima
  climaCard: document.getElementById('climaCard'),
  
  // Datos de ubicación
  ciudadNombre: document.getElementById('ciudadNombre'),
  paisNombre: document.getElementById('paisNombre'),
  fechaActual: document.getElementById('fechaActual'),
  
  // Temperatura y clima
  temperatura: document.getElementById('temperatura'),
  climaIcono: document.getElementById('climaIcono'),
  descripcionClima: document.getElementById('descripcionClima'),
  
  // Detalles
  humedad: document.getElementById('humedad'),
  viento: document.getElementById('viento'),
  sensacion: document.getElementById('sensacion'),
  presion: document.getElementById('presion'),
  
  // Información adicional
  tempMin: document.getElementById('tempMin'),
  tempMax: document.getElementById('tempMax'),
  visibilidad: document.getElementById('visibilidad'),
  nubosidad: document.getElementById('nubosidad'),
};

// ==========================================
// FUNCIONES PRINCIPALES
// ==========================================

/**
 * Obtener datos del clima desde la API
 * @param {string} ciudad - Nombre de la ciudad
 */
async function obtenerClima(ciudad) {
  try {
    // Validar API Key
    if (API_KEY === 'TU_API_KEY_AQUI') {
      mostrarError('⚠️ Error de Configuración: Por favor, configura tu API Key de OpenWeatherMap en el archivo clima.js');
      return;
    }

    // Mostrar loading
    mostrarLoading();

    // Construir URL de la API
    const url = `${API_BASE_URL}?q=${encodeURIComponent(ciudad)}&appid=${API_KEY}&units=metric&lang=es`;

    // Realizar petición
    const response = await fetch(url);

    // Verificar respuesta
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ciudad no encontrada. Verifica el nombre e intenta nuevamente.');
      } else if (response.status === 401) {
        throw new Error('API Key inválida. Verifica tu configuración.');
      } else {
        throw new Error('Error al obtener datos del clima. Intenta nuevamente.');
      }
    }

    // Parsear datos
    const data = await response.json();

    // Mostrar datos en la interfaz
    mostrarDatosClima(data);

  } catch (error) {
    console.error('Error al obtener clima:', error);
    mostrarError(error.message);
  }
}

/**
 * Mostrar datos del clima en la interfaz
 * @param {Object} data - Datos de la API
 */
function mostrarDatosClima(data) {
  // Ocultar loading y errores
  ocultarLoading();
  ocultarError();

  // Extraer datos
  const {
    name,
    sys: { country },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    weather,
    wind: { speed, deg },
    visibility,
    clouds: { all: cloudiness },
  } = data;

  // Formatear fecha actual
  const fechaFormateada = formatearFecha();

  // Llenar datos de ubicación
  elementos.ciudadNombre.textContent = name;
  elementos.paisNombre.textContent = obtenerNombrePais(country);
  elementos.fechaActual.textContent = fechaFormateada;

  // Temperatura principal
  elementos.temperatura.textContent = Math.round(temp);

  // Icono y descripción del clima
  const climaInfo = weather[0];
  elementos.climaIcono.src = `${ICON_BASE_URL}${climaInfo.icon}@4x.png`;
  elementos.climaIcono.alt = climaInfo.description;
  elementos.descripcionClima.textContent = climaInfo.description;

  // Detalles del clima
  elementos.humedad.textContent = `${humidity}%`;
  elementos.viento.textContent = `${speed} m/s ${obtenerDireccionViento(deg)}`;
  elementos.sensacion.textContent = `${Math.round(feels_like)}°C`;
  elementos.presion.textContent = `${pressure} hPa`;

  // Información adicional
  elementos.tempMin.textContent = `${Math.round(temp_min)}°C`;
  elementos.tempMax.textContent = `${Math.round(temp_max)}°C`;
  elementos.visibilidad.textContent = `${(visibility / 1000).toFixed(1)} km`;
  elementos.nubosidad.textContent = `${cloudiness}%`;

  // Mostrar tarjeta de clima
  elementos.climaCard.style.display = 'block';

  // Animación de entrada
  elementos.climaCard.style.animation = 'none';
  setTimeout(() => {
    elementos.climaCard.style.animation = 'fadeIn 0.5s ease';
  }, 10);
}

/**
 * Mostrar estado de carga
 */
function mostrarLoading() {
  elementos.loading.style.display = 'block';
  elementos.errorMsg.style.display = 'none';
  elementos.climaCard.style.display = 'none';
}

/**
 * Ocultar estado de carga
 */
function ocultarLoading() {
  elementos.loading.style.display = 'none';
}

/**
 * Mostrar mensaje de error
 * @param {string} mensaje - Mensaje de error
 */
function mostrarError(mensaje) {
  ocultarLoading();
  elementos.errorText.textContent = mensaje;
  elementos.errorMsg.style.display = 'flex';
  elementos.climaCard.style.display = 'none';
}

/**
 * Ocultar mensaje de error
 */
function ocultarError() {
  elementos.errorMsg.style.display = 'none';
}

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

/**
 * Formatear fecha actual
 * @returns {string} Fecha formateada
 */
function formatearFecha() {
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date().toLocaleDateString('es-ES', opciones);
}

/**
 * Obtener nombre completo del país
 * @param {string} codigo - Código del país (ISO 3166-1 alpha-2)
 * @returns {string} Nombre del país
 */
function obtenerNombrePais(codigo) {
  const paises = {
    EC: 'Ecuador',
    ES: 'España',
    US: 'Estados Unidos',
    MX: 'México',
    CO: 'Colombia',
    PE: 'Perú',
    AR: 'Argentina',
    CL: 'Chile',
    BR: 'Brasil',
    VE: 'Venezuela',
    // Agregar más países según necesidad
  };

  return paises[codigo] || codigo;
}

/**
 * Obtener dirección del viento
 * @param {number} grados - Grados de dirección (0-360)
 * @returns {string} Dirección del viento
 */
function obtenerDireccionViento(grados) {
  const direcciones = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const indice = Math.round(grados / 45) % 8;
  return direcciones[indice];
}

/**
 * Validar entrada de ciudad
 * @returns {boolean} True si es válida
 */
function validarCiudad() {
  const ciudad = elementos.ciudadInput.value.trim();

  if (!ciudad) {
    mostrarError('Por favor, ingresa el nombre de una ciudad');
    return false;
  }

  if (ciudad.length < 2) {
    mostrarError('El nombre de la ciudad debe tener al menos 2 caracteres');
    return false;
  }

  return true;
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Buscar clima al hacer clic en el botón
elementos.btnBuscarClima.addEventListener('click', () => {
  if (validarCiudad()) {
    const ciudad = elementos.ciudadInput.value.trim();
    obtenerClima(ciudad);
  }
});

// Buscar clima al presionar Enter en el input
elementos.ciudadInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && validarCiudad()) {
    const ciudad = elementos.ciudadInput.value.trim();
    obtenerClima(ciudad);
  }
});

// Botones de sugerencias
document.querySelectorAll('.btn-sugerencia').forEach(boton => {
  boton.addEventListener('click', () => {
    const ciudad = boton.getAttribute('data-ciudad');
    elementos.ciudadInput.value = ciudad;
    obtenerClima(ciudad);
  });
});

// ==========================================
// CARGAR CLIMA POR DEFECTO (OPCIONAL)
// ==========================================

// Descomentar para cargar clima de una ciudad por defecto al cargar la página
/*
window.addEventListener('DOMContentLoaded', () => {
  elementos.ciudadInput.value = 'Quito,EC';
  obtenerClima('Quito,EC');
});
*/

// ==========================================
// CONSOLA DE INFORMACIÓN
// ==========================================
console.log(`
╔════════════════════════════════════════════╗
║   REPORTEADOR DE CLIMA - KEVWEB           ║
║   Powered by OpenWeatherMap API           ║
╚════════════════════════════════════════════╝

⚠️ IMPORTANTE: Configura tu API Key en la línea 8 del archivo clima.js

📚 Instrucciones:
1. Registrarse en https://openweathermap.org/
2. Crear un API Key gratuito
3. Reemplazar 'TU_API_KEY_AQUI' con tu API Key
4. Guardar y recargar la página

© 2026 Kevin López - KevWeb
`);
