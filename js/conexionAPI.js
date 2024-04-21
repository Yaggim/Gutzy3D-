const urlJSON = '../db/articulos.json';

export const articulos = async () => {
    const articulos = await fetch(urlJSON);
    const articulosJSON = await articulos.json();
    return articulosJSON;
};