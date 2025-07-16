async function consultarDNI() {
  const dni = document.getElementById("dni").value;
  const resultado = document.getElementById("resultado");

  const token = "07688db5b0d5a5778ef043afd52866efeb1d4943d2b15679e11b2dce227f279f";

  if (dni.length !== 8 || isNaN(dni)) {
    resultado.innerHTML = "<p style='color:red;'>Ingresa un DNI válido de 8 dígitos.</p>";
    return;
  }

  resultado.innerHTML = "Consultando...";

  try {
    const response = await fetch("https://api.consultasperu.com/api/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "token": token,
        "type_document": "dni",
        "document_number": dni 
      })
    });

    const json = await response.json();

    if (!json.success) {
      resultado.innerHTML = "<p style='color:red;'>DNI no encontrado o token inválido.</p>";
      return;
    }

    const data = json.data;

    resultado.innerHTML = `
      <p><strong>DNI:</strong> ${data.number}</p>
      <p><strong>Nombre Completo:</strong> ${data.full_name}</p>
      <p><strong>Apellido Paterno:</strong> ${data.surname}</p>
      <p><strong>Nombres:</strong> ${data.name}</p>
      <p><strong>Fecha de Nacimiento:</strong> ${data.date_of_birth}</p>
      <p><strong>Dirección:</strong> ${data.address}</p>
      <p><strong>Departamento:</strong> ${data.department}</p>
      <p><strong>Provincia:</strong> ${data.province}</p>
      <p><strong>Distrito:</strong> ${data.district}</p>
    `;
  } catch (error) {
    resultado.innerHTML = "<p style='color:red;'>Error al conectar con la API.</p>";
    console.error(error);
  }
}
