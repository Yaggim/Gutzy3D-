import { articulos } from "./conexionAPI.js";

const seccionArticulos = document.querySelector(".container-section");

//Listar Productos
export async function listarArticulos() {
  const articulosLista = await articulos();
  articulosLista.forEach((articulo) => {
    const { id, nombre, descripcion, img, precio } = articulo;
    const articuloDiv = document.createElement("div");
    articuloDiv.innerHTML = `
    <div class="card" id="${id}">
    <img src="${img}" alt="Robert Plant">
    <h2>${nombre}</h2>
    <p>
        ${descripcion}
    </p>
    <p class="price">$${precio}</p>
    <button class="buy-button" type="button">Comprar</button>
</div>
    `;
    seccionArticulos.appendChild(articuloDiv);
  });
}
listarArticulos();

// ----------------------------------------------------------------

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

seccionArticulos.addEventListener("click", (event) => {
  if (event.target.classList.contains("buy-button")) {
    const itemId = event.target.parentNode;
    leerDatosArticulo(itemId);
  }
});

vaciarCarritoBtn.addEventListener("click", () => {
  articulosCarrito = [];
  limpiarHTML();
});

carrito.addEventListener('click',eliminarArticulo);
function eliminarArticulo(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const articuloId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((articulo) => articulo.id !== articuloId);
    carritoHTML(); 
  }
}

function leerDatosArticulo(articulo) {
  const infoArticulo = {
    id:articulo.querySelector("img").src,
    imagen: articulo.querySelector("img").src,
    nombre: articulo.querySelector("h2").textContent,
    descripcion: articulo.querySelector("p").textContent,
    precio: parseFloat(articulo.querySelector(".price").textContent.replace('$', '')),
    cantidad: 1,
  };
  console.log()
  let total = 0;
  const existe = articulosCarrito.some(
    (articulo) => articulo.id === infoArticulo.id
  );
  if (existe) {
    articulosCarrito.forEach((articulo) => {
      if (articulo.id === infoArticulo.id) {
        articulo.cantidad++;
      }
      total += articulo.cantidad * parseFloat(articulo.precio); 
    });
  } else {
    articulosCarrito.push(infoArticulo);
    total = articulosCarrito.reduce((acc, item) => acc + item.cantidad * parseFloat(item.precio), 0); 
  }
  carritoHTML();
  
  document.querySelector("#total").innerHTML = `Total: ${total}`;
}


function carritoHTML() {
  limpiarHTML();
  articulosCarrito.forEach((articulo) => {
    const { id, nombre, imagen, precio, cantidad } = articulo;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
        <img src="${imagen}" width=100>
      </td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <button class="borrar-curso" data-id="${id}">X</button>
      </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
