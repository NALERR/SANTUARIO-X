//array para guardar los animales de la DB y voluntarios
let listaVoluntarios = [];

//cargar la tabla
function cargarDatos() {
    fetch("get_voluntarios.php")
        .then(res => res.json())
        .then(data => {
            listaVoluntarios = data;
            pintarTablaVoluntarios();
        });
}

//dibujar la tabla de acuerdo con la DB
function pintarTablaVoluntarios() {
    const tbody = document.querySelector("#tablaVoluntarios tbody");
    tbody.innerHTML = "";

    listaVoluntarios.forEach(voluntario => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${voluntario.id_voluntario}</td>
            <td>${voluntario.nombre}</td>
            <td>${voluntario.telefono}</td>
            <td>${voluntario.animales || 'Sin asignar'}</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"  onclick="modificarVoluntario(${voluntario.id_voluntario})">Editar</button>
                <button class="btn btn-md btn-danger" onclick="eliminarVoluntario(${voluntario.id_voluntario})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

window.onload = function () {
    cargarDatos();
}

function modificarVoluntario(id) {
    const voluntario = listaVoluntarios.find(a => a.id_voluntario == id);
    if (voluntario) {
        document.getElementById("editId").value = voluntario.id_voluntario;

        document.getElementById("editNombre").value = voluntario.nombre;

        document.getElementById("editTelefono").value = voluntario.telefono;

        //document.getElementById("modalEditar").classList.remove("oculto");
    }

}

document.getElementById("formEditarVoluntario").onsubmit = function (e) {
    e.preventDefault();

    const datosEditar = new FormData();
    datosEditar.append('id', document.getElementById("editId").value);
    datosEditar.append('nombre', document.getElementById("editNombre").value);
    datosEditar.append('telefono', document.getElementById("editTelefono").value);


    fetch("modificar_voluntario.php", {
        method: "POST",
        body: datosEditar
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                alert("¡Los datos del voluntario han sido actualizados con exito!");
                //document.getElementById("modalEditar").classList.add("oculto");
                //document.getElementById("formEditarVoluntario").reset();
                cargarDatos();
            }
        });
};


document.getElementById("altaVoluntarioForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitamos que la página se recargue

    // Recogemos los datos del HTML
    // Usamos FormData para empaquetar los datos
    const datosParaEnviar = new FormData();
    datosParaEnviar.append('nombre', document.getElementById("nombreVoluntario").value);
    datosParaEnviar.append('telefono', document.getElementById("telefonoVoluntario").value);

    // Enviamos los datos a PHP
    fetch("insertar_voluntario.php", {
        method: "POST",
        body: datosParaEnviar
    })
        .then(res => res.json())
        .then(respuesta => {
            if (respuesta.success) {
                alert("¡Voluntario insertado correctamente en la base de datos!");

                // Actualizamos la tabla sin recargar toda la página
                cargarDatos();

                // cerramos el formulario
                //this.reset();
                //document.getElementById("altaVoluntarioForm").classList.add("oculto");
            } else {
                alert("Error del servidor: " + respuesta.error);
            }
        })
        .catch(error => {
            console.error("Error en la comunicación AJAX:", error);
        });
});


//document.getElementById("btnCerrarModal").onclick = () => {
//document.getElementById("modalEditar").classList.add("oculto");
//};



function eliminarVoluntario(id) {
    if (!confirm("¿Deseas eliminar este registro?")) return;

    const datos = new FormData();
    datos.append('id', id);

    fetch("eliminar_voluntario.php", {
        method: "POST",
        body: datos
    })
        .then(res => res.json())
        .then(respuesta => {
            console.log(respuesta);
            if (respuesta.success) {
                alert("Eliminado correctamente");
                cargarDatos();
            } else {
                alert("Error: " + respuesta.error);
            }
        });

}






/*

// mostrar/ocultar el formulario
document.getElementById("btnMostrarAlta").addEventListener("click", () => {
    document.getElementById("formAltaVoluntario").classList.remove("oculto");
});

document.getElementById("cancelarAlta").addEventListener("click", () => {
    document.getElementById("formAltaVoluntario").classList.add("oculto");
});

*/