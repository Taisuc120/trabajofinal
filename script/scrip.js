$(document).ready(() => {
    // Importacion de datos del xml docentes
    $.ajax({
        type: "GET",
        url: "data/data_xml/DOCENTES.xml",
        dataType: "xml",
    }).done((data) => {
        $(data).find('DOCENTE').each(function () {
            let fila = $('<tr>');
            fila.append($(`<td>${$(this).find('DNI').text()}</td>`));
            fila.append($(`<td>${$(this).find('Nombre').text()}</td>`));
            fila.append($(`<td>${$(this).find('Apellido').text()}</td>`));
            fila.append($(`<td>${$(this).find('Curso').text()}</td>`));
            $('#tdocente tbody').append(fila);
        });
    });
    // Importacion de datos del xml estudiantes
    $.ajax({
        type: "GET",
        url: "data/data_xml/ESTUDIANTES.xml",
        dataType: "xml",
    }).done((data) => {
        $(data).find('ESTUDIANTE').each(function () {
            let fila = $('<tr>');
            fila.append($(`<td>${$(this).find('DNI').text()}</td>`));
            fila.append($(`<td>${$(this).find('Nombre').text()}</td>`));
            fila.append($(`<td>${$(this).find('Apellido').text()}</td>`));
            fila.append($(`<td>${$(this).find('Edad').text()}</td>`));
            $('#talumno tbody').append(fila);
        });
    });
    // Importacion de datos del xml cursos
    $.ajax({
        type: "GET",
        url: "data/data_xml/CURSOS.xml",
        dataType: "xml",
    }).done((data) => {
        $(data).find('CURSO').each(function () {
            let fila = $('<tr>');
            fila.append($(`<td>${$(this).find('ID_CURSO').text()}</td>`));
            fila.append($(`<td>${$(this).find('NOMBRE_CURSO').text()}</td>`));
            fila.append($(`<td>${$(this).find('N_HORA').text()}</td>`));
            $('#tcurso tbody').append(fila);
        });
    });
});