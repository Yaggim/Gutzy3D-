// conexionAPI.js
const apiUrl = 'https://backgutzy3d.onrender.com/api/productos'; // URL de tu API

export async function articulos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error('Error:', error);
  }
}