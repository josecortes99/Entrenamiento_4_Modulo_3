
const form = document.getElementById("form");
const name = document.getElementById("name");
const age = document.getElementById("age");
const result = document.getElementById("result")
const outputDiv = document.getElementById("output")

document.getElementById("save").addEventListener("click", function (e) {
  e.preventDefault();

  const nombre = name.value;
  const edad = age.value;

  if (!nombre || !edad) {
    result.textContent = "Ingrese todos los campos"
    result.style.color = "red"
    return;
  }

  const data = {
    "nombre": nombre,
    "edad": edad
  }

  const lista = JSON.parse(localStorage.getItem("lista")) || [];
  lista.push(data);
  localStorage.setItem("lista", JSON.stringify(lista));

  result.textContent = `Gracias usuario ${nombre} por registrarte con nosotros.`;
  result.style.color = "lime";
  result.style.textAlign = "center";

  mostrar();
  tabla();
  form.reset();

});

function mostrar() {

  const lista = JSON.parse(localStorage.getItem("lista")) || [];

  outputDiv.innerHTML = "";

  if (lista.length > 0){
    const usu = lista[lista.length - 1];
    outputDiv.textContent = `Hola ${usu.nombre}, tienes ${usu.edad} años.`;
    outputDiv.style.color = "blue";
    outputDiv.style.textAlign = "center";
  } else {
    outputDiv.textContent = "no hay datos en el LocalStorage"
  }
}

function mostrar() {
  const lista = JSON.parse(localStorage.getItem("lista")) || [];

  outputDiv.innerHTML = ""; 

  if (lista.length > 0) {
    const usu = lista[lista.length - 1];
    const mensaje = document.createElement("p");
    mensaje.textContent = `Hola ${usu.nombre}, tienes ${usu.edad} años.`;
    mensaje.style.color = "blue";
    mensaje.style.textAlign = "center";
    outputDiv.appendChild(mensaje);
  } else {
    outputDiv.textContent = "No hay datos en el LocalStorage";
  }
}

function tabla() {
  const lista = JSON.parse(localStorage.getItem("lista")) || [];

  if (lista.length > 0) {
    const tabla = document.createElement("table");
    tabla.id = "tablaUsuarios";
    tabla.border = "1";
    tabla.style.margin = "10px auto";
    tabla.style.textAlign = "center";

    const encabezado = document.createElement("tr");
    encabezado.innerHTML = "<th>Nombre</th><th>Edad</th>";
    tabla.appendChild(encabezado);

    lista.forEach(usu => {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td>${usu.nombre}</td><td>${usu.edad}</td>`;
      tabla.appendChild(fila);
    });

    outputDiv.appendChild(tabla);
  } else {
    outputDiv.textContent = "No hay datos en el LocalStorage";
  }
}

document.getElementById("delete").addEventListener("click", () => {
  localStorage.clear();
  result.textContent = "Se borraron todos los datos";
  result.style.color = "red";
  result.style.textAlign = "center"

  outputDiv.innerHTML = "";
});

if (!sessionStorage.getItem("interactionCount")) {
  sessionStorage.setItem("interactionCount", 0);
}

function updateInteractionCount() {
  let count = parseInt(sessionStorage.getItem("interactionCount")) || 0;
  count++;
  sessionStorage.setItem("interactionCount", count);
  document.getElementById("contador").textContent = `Interacciones esta sesión: ${count}`;
}

updateInteractionCount(); 

document.getElementById("save").addEventListener("click", updateInteractionCount);
document.getElementById("delete").addEventListener("click", updateInteractionCount);
