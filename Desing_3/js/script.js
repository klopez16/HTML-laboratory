// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================

// Referencias a elementos del formulario
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const edadInput = document.getElementById('edad');
const validarBtn = document.getElementById('validarBtn');
const limpiarBtn = document.getElementById('limpiarBtn');
const statusMessage = document.getElementById('statusMessage');

// Referencias a mensajes de error
const nombreError = document.getElementById('nombreError');
const emailError = document.getElementById('emailError');
const edadError = document.getElementById('edadError');

// Función para validar nombre
function validarNombre() {
    const nombre = nombreInput.value.trim();
    nombreError.textContent = '';
    
    if (nombre === '') {
        nombreError.textContent = 'El nombre es obligatorio';
        return false;
    }
    
    if (nombre.length < 3) {
        nombreError.textContent = 'El nombre debe tener al menos 3 caracteres';
        return false;
    }
    
    return true;
}

// Función para validar email
function validarEmail() {
    const email = emailInput.value.trim();
    emailError.textContent = '';
    
    if (email === '') {
        emailError.textContent = 'El email es obligatorio';
        return false;
    }
    
    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Ingrese un email válido (ej: usuario@correo.com)';
        return false;
    }
    
    return true;
}

// Función para validar edad
function validarEdad() {
    const edad = parseInt(edadInput.value);
    edadError.textContent = '';
    
    if (isNaN(edad)) {
        edadError.textContent = 'La edad es obligatoria';
        return false;
    }
    
    if (edad < 18 || edad > 99) {
        edadError.textContent = 'La edad debe estar entre 18 y 99 años';
        return false;
    }
    
    return true;
}

// Función para validar todo el formulario
function validarFormulario() {
    const nombreValido = validarNombre();
    const emailValido = validarEmail();
    const edadValida = validarEdad();
    
    if (nombreValido && emailValido && edadValida) {
        // Mostrar mensaje de éxito
        statusMessage.textContent = '✅ ¡Formulario válido! Todos los datos son correctos.';
        statusMessage.style.backgroundColor = '#d4edda';
        statusMessage.style.color = '#155724';
        statusMessage.style.border = '1px solid #c3e6cb';
        statusMessage.style.display = 'block';
        
        // Aquí normalmente enviaríamos los datos al servidor
        console.log('Datos válidos para enviar:', {
            nombre: nombreInput.value.trim(),
            email: emailInput.value.trim(),
            edad: parseInt(edadInput.value)
        });
        
        return true;
    } else {
        // Mostrar mensaje de error
        statusMessage.textContent = '⚠️ Por favor, corrija los errores en el formulario.';
        statusMessage.style.backgroundColor = '#f8d7da';
        statusMessage.style.color = '#721c24';
        statusMessage.style.border = '1px solid #f5c6cb';
        statusMessage.style.display = 'block';
        
        return false;
    }
}

// Función para limpiar el formulario
function limpiarFormulario() {
    nombreError.textContent = '';
    emailError.textContent = '';
    edadError.textContent = '';
    statusMessage.style.display = 'none';
}

// Event listeners para validación en tiempo real (opcional)
nombreInput.addEventListener('blur', validarNombre);
emailInput.addEventListener('blur', validarEmail);
edadInput.addEventListener('blur', validarEdad);

// Event listener para el botón de validar
validarBtn.addEventListener('click', validarFormulario);

// Event listener para el botón de limpiar
limpiarBtn.addEventListener('click', limpiarFormulario);

// ============================================
// ANIMACIÓN BÁSICA
// ============================================

// Referencias a elementos de animación
const animationBox = document.getElementById('animationBox');
const moverBtn = document.getElementById('moverBtn');
const saltarBtn = document.getElementById('saltarBtn');
const resetBtn = document.getElementById('resetBtn');

// Estado de la animación
let posicionX = 0;
let estaAnimando = false;

// Función para mover el cuadrado a la derecha
function moverDerecha() {
    if (estaAnimando) return;
    
    estaAnimando = true;
    
    // Calcular nueva posición (máximo 400px para que no salga de la pantalla)
    if (posicionX >= 400) {
        posicionX = 0;
    } else {
        posicionX += 50;
    }
    
    // Aplicar animación con transición CSS
    animationBox.style.transition = 'transform 0.3s ease-in-out';
    animationBox.style.transform = `translateX(${posicionX}px)`;
    
    // Cambiar color durante la animación
    animationBox.style.backgroundColor = '#28a745';
    
    // Restaurar estado después de la animación
    setTimeout(() => {
        animationBox.style.backgroundColor = '#007bff';
        estaAnimando = false;
    }, 300);
}

// Función para hacer saltar el cuadrado
function hacerSaltar() {
    if (estaAnimando) return;
    
    estaAnimando = true;
    
    // Aplicar múltiples transformaciones para el salto
    animationBox.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    animationBox.style.transform = `translateX(${posicionX}px) translateY(-50px)`;
    animationBox.style.backgroundColor = '#ffc107';
    
    // Volver a la posición original
    setTimeout(() => {
        animationBox.style.transform = `translateX(${posicionX}px) translateY(0)`;
        
        // Restaurar color
        setTimeout(() => {
            animationBox.style.backgroundColor = '#007bff';
            estaAnimando = false;
        }, 500);
    }, 500);
}

// Función para reiniciar la posición
function reiniciarPosicion() {
    posicionX = 0;
    animationBox.style.transition = 'transform 0.5s ease-in-out';
    animationBox.style.transform = 'translateX(0)';
    animationBox.style.backgroundColor = '#007bff';
}

// Event listeners para los botones de animación
moverBtn.addEventListener('click', moverDerecha);
saltarBtn.addEventListener('click', hacerSaltar);
resetBtn.addEventListener('click', reiniciarPosicion);

// Event listener para teclado (accesibilidad)
document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        moverDerecha();
    } else if (event.key === '2') {
        hacerSaltar();
    } else if (event.key === '3') {
        reiniciarPosicion();
    }
});