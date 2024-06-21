const apiUrl = 'https://backgutzy3d.onrender.com/api/productos'; 

export async function articulos() {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    
    const articulosJSON = await response.json();
    const articulosAdecuados = adaptarFormato(articulosJSON); // Adaptamos el formato recibido filtrando los productos no habilitados
    
    return articulosAdecuados;
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}

function adaptarFormato(productos) {
  return productos
    .filter(producto => producto.Habilitado === "SI") // Filtramos los productos habilitados solamente
    .map(producto => ({
      id: producto.Id_Producto,
      nombre: producto.Nombre,
      descripcion: producto.Descripcion,
      img: `../assets/images/${producto.Imagen}`,
      precio: producto.Precio
    }));
}