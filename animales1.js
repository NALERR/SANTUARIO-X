//array para guardar los animales de la DB
let listaAnimales = [];

//cargar la tabla
function cargarDatos() {
    fetch("get_animales.php")
        .then(res => res.json())
        .then(data => {
            listaAnimales = data;
            pintarTabla();
        });
}

//dibujar la tabla de acuerdo con la DB
function pintarTabla() {
    const tbody = document.querySelector("#tablaAnimales tbody");
    tbody.innerHTML = "";

    listaAnimales.forEach(animal => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${animal.id_animal}</td>
            <td>${animal.nombre}</td>
            <td>${animal.nombre_especie}</td>
            <td>${animal.edad}</td>
            <td>${animal.estado}</td>
            <td>${animal.nombre_voluntario || 'Sin asignar'}</td>
            <td>
                
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="modificarAnimal(${animal.id_animal})">Editar</button>
                <button class="btn btn-md btn-danger" onclick="eliminarAnimal(${animal.id_animal})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

//cargar información necesaria para los formularios de alta y modificación VOLUNTARIOS Y ESPECIES
function cargarVoluntarios() {

    fetch("get_voluntarios.php")
        .then(res => res.json())
        .then(data => {

            const select = document.getElementById("cuidadoresAnimal");
            const selectEdit = document.getElementById("editVoluntario");

            data.forEach(voluntario => {

                const option = document.createElement("option");

                option.value = voluntario.id_voluntario;  // lo que se enviará al PHP
                option.textContent = voluntario.nombre;   // lo que ve el usuario

                select.appendChild(option.cloneNode(true));
                selectEdit.appendChild(option.cloneNode(true));
            });

        });
}

function cargarEspecies() {

    fetch("get_especies.php")
        .then(res => res.json())
        .then(data => {

            const select = document.getElementById("especieAnimal");
            const selectEdit = document.getElementById("editEspecie");

            data.forEach(especie => {

                const option = document.createElement("option");

                option.value = especie.id_especie;  // lo que se enviará al PHP
                option.textContent = especie.nombre_especie;   // lo que ve el usuario

                select.appendChild(option.cloneNode(true));
                selectEdit.appendChild(option.cloneNode(true));

            });

        });
}

//primera acción que muestra el boton DETALLES / MODIFICAR 

function modificarAnimal(id) {

    const animal = listaAnimales.find(a => a.id_animal == id);
    if (animal) {
        document.getElementById("editId").value = animal.id_animal;
        document.getElementById("editNombre").value = animal.nombre;
        document.getElementById("editEspecie").value = animal.id_especie;
        document.getElementById("editEdad").value = animal.edad;
        document.getElementById("editEstado").value = animal.estado;
        document.getElementById("editVoluntario").value = animal.id_voluntario || "";

        //quitar oculto del modal con css puro document.getElementById("modalEditar").classList.remove("oculto");

        // FORMA CORRECTA DE ABRIR MODAL EN BOOTSTRAP 5
        /*const modalElement = document.getElementById('staticBackdrop');
        const modalEdit = new bootstrap.Modal(modalElement);
        modalEdit.show();*/

    }

}
/* ocultar el modal con css puro
// Cerrar el overlay si se le presiona CANCELAR
document.getElementById("btnCerrarModal").onclick = () => {
    document.getElementById("modalEditar").classList.add("oculto");
};
*/
//accion que se hace para guardar la modificación del formulario de un animal existente
document.getElementById("formEditarAnimal").onsubmit = function (e) {
    e.preventDefault();

    const datosEditar = new FormData();
    datosEditar.append('id', document.getElementById("editId").value);
    datosEditar.append('nombre', document.getElementById("editNombre").value);
    datosEditar.append('edad', document.getElementById("editEdad").value);
    datosEditar.append('estado', document.getElementById("editEstado").value);
    datosEditar.append('especieAnimal', document.getElementById("editEspecie").value);
    datosEditar.append('cuidadoresAnimal', document.getElementById("editVoluntario").value);

    fetch("modificar_animal.php", {
        method: "POST",
        body: datosEditar
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                alert("¡Los datos han sido actualizados con éxito!");
                cargarDatos();
                /*const modalElement = document.getElementById('staticBackdrop');
                const instance = bootstrap.Modal.getInstance(modalElement);
                if (instance) {
                    instance.hide();
                }
                //document.getElementById("modalEditar").classList.add("oculto");
                //document.getElementById("formEditarAnimal").reset();
                cargarDatos(); // Refresca la tabla*/
            }
        });
};




// Función para eliminar usando POST como pide la práctica
function eliminarAnimal(id) {
    if (!confirm("¿Deseas eliminar este registro?")) return;

    const datos = new FormData();
    datos.append('id', id);

    fetch("eliminar_animal.php", {
        method: "POST",
        body: datos
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                cargarDatos();
                alert("¡El animal ha sido eliminado correctamente de la base de datos!");
            }
        });
}

window.onload = function () {
    cargarDatos();
    cargarVoluntarios();
    cargarEspecies();
}


// añadir un animal nuevo
document.getElementById("altaAnimalForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evitamos que la página se recargue

    // Recogemos los datos del HTML
    // Usamos FormData para empaquetar los datos
    const datosParaEnviar = new FormData();
    datosParaEnviar.append('nombre', document.getElementById("nombreAnimal").value);
    datosParaEnviar.append('edad', document.getElementById("edadAnimal").value);
    datosParaEnviar.append('id_especie', document.getElementById("especieAnimal").value);
    datosParaEnviar.append('estado', document.getElementById("estadoAnimal").value);
    datosParaEnviar.append('id_voluntario', document.getElementById("cuidadoresAnimal").value);

    // Enviamos los datos a PHP
    fetch("insertar_animal.php", {
        method: "POST",
        body: datosParaEnviar
    })
        .then(res => res.json())
        .then(respuesta => {
            if (respuesta.success) {
                alert("¡Animal insertado correctamente en la base de datos!");
                /*const modalAlta = document.getElementById('altaAnimalForm'); // El ID del DIV del modal
                const instance = bootstrap.Modal.getInstance(modalAlta);
                instance.hide();*/
                // cerramos el formulario
                //this.reset();
                // Actualizamos la tabla sin recargar toda la página
                cargarDatos();
                //document.getElementById("formAltaAnimal").classList.add("oculto");
            } else {
                alert("Error del servidor: " + respuesta.error);
            }
        })
        .catch(error => {
            console.error("Error en la comunicación AJAX:", error);
        });
});

/*
// mostrar/ocultar el formulario
document.getElementById("btnMostrarAlta").addEventListener("click", () => {
    document.getElementById("formAltaAnimal").classList.remove("oculto");
});

document.getElementById("cancelarAlta").addEventListener("click", () => {
    document.getElementById("formAltaAnimal").classList.add("oculto");
});
*/