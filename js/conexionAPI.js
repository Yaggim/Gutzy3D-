// conexionAPI.js

const apiUrl = 'https://backgutzy3d.onrender.com/api/productos'; // URL de tu API

export async function articulos() {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    
    const articulosJSON = await response.json();
    const articulosAdecuados = adaptarFormato(articulosJSON); // Adaptamos el formato recibido
    
    return articulosAdecuados;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-lanzamos el error para manejarlo en el componente que llame a esta función
  }
}

// Función para adaptar el formato de los productos
function adaptarFormato(productos) {
  return productos.map(producto => ({
    id: producto.Id_Producto,
    nombre: producto.Nombre,
    descripcion: producto.Descripcion,
    img: `../assets/images/${producto.Imagen}`,
    precio: producto.Precio
  }));
}