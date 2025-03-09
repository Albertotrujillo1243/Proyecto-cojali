function retraer(id) {
    let seccion = document.getElementById(id);
  
    if (seccion.classList.contains("activo")) {
      seccion.style.maxHeight = "0"; // Ocultar
      seccion.classList.remove("activo");
    } else {
      seccion.style.maxHeight = seccion.scrollHeight + "rem"; // Expandir
      seccion.classList.add("activo");
    }
  }
  function retraer2(id) {
    let seccion = document.getElementById(id);
  
    if (seccion.classList.contains("activo2")) {
      seccion.style.maxHeight = "0"; // Ocultar
      seccion.classList.remove("activo2");
    } else {
      seccion.style.maxHeight = seccion.scrollHeight + "rem"; // Expandir
      seccion.classList.add("activo2");
    }
  }
  function retraer3(id) {
    let seccion = document.getElementById(id);
  
    if (seccion.classList.contains("activo2")) {
      seccion.style.maxHeight = "0"; // Ocultar
      seccion.classList.remove("activo2");
    } else {
      seccion.style.maxHeight = seccion.scrollHeight + "rem"; // Expandir
      seccion.classList.add("activo2");
    }
  }

  function mostrarTarjeta(nombre, imagen, info, info2) {
    document.getElementById("nombre-personaje").textContent = nombre;
    document.getElementById("imagen-personaje").src = imagen;
    document.getElementById("imagen-personaje").alt = nombre;
    document.getElementById("info-personaje").textContent = info;
    document.getElementById("info-personaje2").textContent = info2;

    document.getElementById("modal").style.display = "flex";
  }

  function cerrarTarjeta() {
    document.getElementById("modal").style.display = "none";
  }


// Cargar comentarios desde la API al iniciar la página
function cargarComentarios() {
  fetch('https://jsonplaceholder.typicode.com/comments?_limit=5') // Trae 5 comentarios
      .then(response => response.json())
      .then(data => {
          const contenedor = document.getElementById("comentarios");
          contenedor.innerHTML = ""; // Limpiar antes de agregar nuevos
          
          data.forEach(comentario => {
              mostrarComentario(comentario);
          });
      })
      .catch(error => console.error("Error cargando comentarios:", error));
}

// Función para mostrar un comentario en pantalla
function mostrarComentario(comentario) {
  const contenedor = document.getElementById("comentarios");
  const div = document.createElement("div");
  div.classList.add("comentario");
  div.setAttribute("data-id", comentario.id); // Guardamos el ID

  div.innerHTML = `
      <strong>${comentario.name}</strong>: ${comentario.body} 
      <button onclick="eliminarComentario(${comentario.id})">❌</button>
  `;
  
  contenedor.appendChild(div);
}

// Simular envío de un comentario nuevo (POST)
document.getElementById("comentario-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar recarga de página

  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  if (nombre.trim() === "" || mensaje.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
  }

  const nuevoComentario = {
      id: Date.now(), // Generamos un ID único temporal
      name: nombre,
      body: mensaje
  };

  mostrarComentario(nuevoComentario); // Agregarlo a la lista

  // Limpiar los campos del formulario sin borrar comentarios previos
  document.getElementById("nombre").value = "";
  document.getElementById("mensaje").value = "";
});

// Simular eliminación de un comentario (DELETE)
function eliminarComentario(id) {
  const comentario = document.querySelector(`div[data-id='${id}']`);
  if (comentario) {
      comentario.remove();
  }
}

// Llamar a la función para cargar los comentarios cuando la página se cargue
window.addEventListener("load", cargarComentarios);
