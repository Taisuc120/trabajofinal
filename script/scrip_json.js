$(document).ready(function() {
    $.ajax({
        url: "data/data_json/encabezado.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            $("#practica").text(data.Practica);
            $("#alumno").text(data.Alumno);
            $("#ud").text(data.UD);

        }
    });
});


$(document).ready(function() {
    $.ajax({
        url: "data/data_json/alumnos.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            let estudiantes = data.Estudiante;
            let tbody = $("#tabla-estudiantes tbody");
            estudiantes.forEach(function(est) {
                let fila = `
                    <tr>
                        <td>${est.dni}</td>
                        <td>${est.nombre}</td>
                        <td>${est.apellido}</td>
                        <td>${est.edad}</td>
                    </tr>
                `;
                tbody.append(fila);
            });

        }
    });
});

$(document).ready(function() {
    $.ajax({
        url: "data/data_json/cursos.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            let cursos = data.Cursos;
            let tbody = $("#tabla-cursos tbody");
           cursos.forEach(function(est) {
                let fila = `
                    <tr>
                        <td>${est.id_curso}</td>
                        <td>${est.nombre_curso}</td>
                        <td>${est.n_horas}</td>
                    </tr>
                `;
                tbody.append(fila);
            });

        }
    });
});

$(document).ready(function() {
    $.ajax({
        url: "data/data_json/docentes.json",
        method: "GET",
        dataType: "json",
        success: function(data) {
            let docentes = data.Docentes;
            let tbody = $("#tabla-docentes tbody");
           docentes.forEach(function(est) {
                let fila = `
                    <tr>
                        <td>${est.dni}</td>
                        <td>${est.nombre}</td>
                        <td>${est.apellido}</td>
                        <td>${est.curso}</td>
                    </tr>
                `;
                tbody.append(fila);
            });

        }
    });
});



