
const API_BASE_URL = "https://dniruc.apisperu.com/api/v1";
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlbnIuZGF2aXRzLjJAZ21haWwuY29tIn0.kijb4xhrsPZTlqKRjcKWPxeCZmPKnEnD7lF5Llhq5j8";  // Reemplaza con tu token de APIsPERU

// Función para mostrar mensaje de error
function mostrarError(mensaje) {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `<p style='color:red;'>${mensaje}</p>`;
}

// Función para mostrar estado de carga
function mostrarCargando() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "Consultando...";
}

// Función para validar DNI
function validarDNI(dni) {
  return dni.length === 8 && !isNaN(dni);
}

// Función para validar RUC
function validarRUC(ruc) {
  return ruc.length === 11 && !isNaN(ruc);
}

// Función para consultar DNI usando APIsPERU
async function consultarDNI() {
  const dni = document.getElementById("dni").value.trim();
  
  if (!validarDNI(dni)) {
    mostrarError("Ingresa un DNI válido de 8 dígitos.");
    return;
  }

  mostrarCargando();

  try {
    const response = await fetch(`${API_BASE_URL}/dni/${dni}?token=${TOKEN}`);
    
    // Log para debug
    console.log('Status:', response.status);
    console.log('OK:', response.ok);
    
    const data = await response.json();
    console.log('Respuesta DNI:', data);

    // Verificar si hay error en la respuesta
    if (!response.ok) {
      mostrarError(`Error ${response.status}: ${data.message || 'Error desconocido'}`);
      return;
    }

    // Verificar si la respuesta tiene un mensaje de error
    if (data.success === false || data.message) {
      mostrarError(data.message || "DNI no encontrado.");
      return;
    }

    // Verificar que tenemos los datos necesarios
    if (!data.dni) {
      mostrarError("No se encontraron datos para este DNI.");
      return;
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
      <div class="resultado-exitoso">
        <h3>✅ Información del DNI</h3>
        <p><strong>DNI:</strong> ${data.dni}</p>
        <p><strong>Nombres:</strong> ${data.nombres || 'No disponible'}</p>
        <p><strong>Apellido Paterno:</strong> ${data.apellidoPaterno || 'No disponible'}</p>
        <p><strong>Apellido Materno:</strong> ${data.apellidoMaterno || 'No disponible'}</p>
        <p><strong>Código de Verificación:</strong> ${data.codVerifica || 'No disponible'}</p>
      </div>
    `;
    
  } catch (error) {
    mostrarError("Error al conectar con la API.");
    console.error('Error completo:', error);
  }
}

// Función para consultar RUC usando APIsPERU
async function consultarRUC() {
  const ruc = document.getElementById("ruc").value.trim();
  
  if (!validarRUC(ruc)) {
    mostrarError("Ingresa un RUC válido de 11 dígitos.");
    return;
  }

  mostrarCargando();

  try {
    const response = await fetch(`${API_BASE_URL}/ruc/${ruc}?token=${TOKEN}`);
    
    // Log para debug
    console.log('Status:', response.status);
    console.log('OK:', response.ok);
    
    const data = await response.json();
    console.log('Respuesta RUC:', data);

    // Verificar si hay error en la respuesta
    if (!response.ok) {
      mostrarError(`Error ${response.status}: ${data.message || 'Error desconocido'}`);
      return;
    }

    // Verificar si la respuesta tiene un mensaje de error
    if (data.success === false || data.message) {
      mostrarError(data.message || "RUC no encontrado.");
      return;
    }

    // Verificar que tenemos los datos necesarios
    if (!data.ruc) {
      mostrarError("No se encontraron datos para este RUC.");
      return;
    }

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `
      <div class="resultado-exitoso">
        <h3>✅ Información del RUC</h3>
        <p><strong>RUC:</strong> ${data.ruc}</p>
        <p><strong>Razón Social:</strong> ${data.razonSocial || 'No disponible'}</p>
        <p><strong>Nombre Comercial:</strong> ${data.nombreComercial || 'No especificado'}</p>
        <p><strong>Teléfonos:</strong> ${data.telefonos ? data.telefonos.join(', ') : 'No especificado'}</p>
        <p><strong>Estado:</strong> ${data.estado || 'No disponible'}</p>
        <p><strong>Condición:</strong> ${data.condicion || 'No disponible'}</p>
        <p><strong>Dirección:</strong> ${data.direccion || 'No disponible'}</p>
        <p><strong>Departamento:</strong> ${data.departamento || 'No disponible'}</p>
        <p><strong>Provincia:</strong> ${data.provincia || 'No disponible'}</p>
        <p><strong>Distrito:</strong> ${data.distrito || 'No disponible'}</p>
        <p><strong>Ubigeo:</strong> ${data.ubigeo || 'No disponible'}</p>
        <p><strong>Capital:</strong> ${data.capital || 'No disponible'}</p>
      </div>
    `;
    
  } catch (error) {
    mostrarError("Error al conectar con la API.");
    console.error('Error completo:', error);
  }
}

// Función para limpiar formularios
function limpiarFormularios() {
  document.getElementById("dni").value = "";
  document.getElementById("ruc").value = "";
  document.getElementById("resultado").innerHTML = "";
}

// Event listeners para mejorar la experiencia del usuario
document.addEventListener('DOMContentLoaded', function() {
  // Permitir búsqueda con Enter
  document.getElementById('dni').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      consultarDNI();
    }
  });

  document.getElementById('ruc').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      consultarRUC();
    }
  });

  // Limpiar el otro campo cuando se escribe en uno
  document.getElementById('dni').addEventListener('input', function() {
    if (this.value.length > 0) {
      document.getElementById('ruc').value = '';
      document.getElementById('resultado').innerHTML = '';
    }
  });

  document.getElementById('ruc').addEventListener('input', function() {
    if (this.value.length > 0) {
      document.getElementById('dni').value = '';
      document.getElementById('resultado').innerHTML = '';
    }
  });
});