let listaAnimales = [];

fetch("animales.json")
    .then(res => res.json())
    .then(data => {
        listaAnimales = data;
        pintarTabla();
    });

function pintarTabla() {
    const tbody = document.querySelector("#tablaAnimales tbody");
    tbody.innerHTML = "";

    listaAnimales.forEach(animal => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
    <td>${animal.id}</td>
    <td>${animal.nombre}</td>
    <td>${animal.especie}</td>
    <td>${animal.estado}</td>
    <td>${animal.cuidadores}</td>
        <td>
        <button class="btn-ver" data-id="${animal.id}">VER</button>
        <button class="btn-editar" data-id="${animal.id}">EDITAR</button>
        <button class="btn-eliminar" data-id="${animal.id}">ELIMINAR</button>
    </td>
    `;

        tbody.appendChild(fila);
    });
}

document.querySelector("#tablaAnimales").addEventListener("click", e => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains("btn-ver")) {
        verAnimal(id);
    }

    if (e.target.classList.contains("btn-editar")) {
        editarAnimal(id);
    }

    if (e.target.classList.contains("btn-eliminar")) {
        eliminarAnimal(id);
    }
});

function verAnimal(id) {
    const animal = listaAnimales.find(a => a.id == id);

    alert(`
ID: ${animal.id}
Nombre: ${animal.nombre}
Especie: ${animal.especie}
Estado: ${animal.estado}
Cuidadores: ${animal.cuidadores}
  `);
}

function editarAnimal(id) {
    const animal = listaAnimales.find(a => a.id == id);

    const nuevoNombre = prompt("Nuevo nombre:", animal.nombre);
    if (nuevoNombre === null || nuevoNombre === "") return;

    animal.nombre = nuevoNombre;
    pintarTabla();
}

function eliminarAnimal(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar este animal?");
    if (!confirmar) return;

    listaAnimales = listaAnimales.filter(a => a.id != id);
    pintarTabla();
}


const btnMostrarAlta = document.getElementById("btnMostrarAlta");
const formAltaAnimal = document.getElementById("formAltaAnimal");
const btnCancelarAlta = document.getElementById("cancelarAlta");

btnMostrarAlta.addEventListener("click", () => {
    formAltaAnimal.classList.remove("oculto");
});

btnCancelarAlta.addEventListener("click", () => {
    formAltaAnimal.classList.add("oculto");
});


document
    .getElementById("altaAnimalForm")
    .addEventListener("submit", e => {
        e.preventDefault();

        const nuevoAnimal = {
            id: generarNuevoId(),
            nombre: document.getElementById("nombreAnimal").value,
            especie: document.getElementById("especieAnimal").value,
            estado: document.getElementById("estadoAnimal").value,
            cuidadores: document.getElementById("cuidadoresAnimal").value
        };

        listaAnimales.push(nuevoAnimal);
        pintarTabla();

        e.target.reset();
        formAltaAnimal.classList.add("oculto");
    });

function generarNuevoId() {
    if (listaAnimales.length === 0) return 1;
    return Math.max(...listaAnimales.map(a => a.id)) + 1;
}