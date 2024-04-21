// Selecciona el botón de alternancia de la barra de navegación
const navToggle = document.querySelector(".nav-toggle")

// Selecciona la lista de navegación
const navList = document.querySelector(".nav-list")

// Agrega un evento de clic al botón de alternancia
navToggle.addEventListener("click", () => {
    // Alterna la visibilidad de la lista de navegación al hacer clic
    navList.classList.toggle("nav-list_visible")
})

// Espera a que se cargue el contenido del documento antes de ejecutar el siguiente código
// document.addEventListener("DOMContentLoaded", function () {
//     // Selecciona todos los formularios de productos en la página
//     const productForms = document.querySelectorAll(".product-form");

//     // Itera sobre cada formulario de producto
//     productForms.forEach(function (form) {
//         // Agrega un evento de clic al botón de compra dentro de cada formulario
//         form.querySelector(".buy-button").addEventListener("click", function (event) {
//             // Evita que el formulario se envíe por el comportamiento predeterminado
//             event.preventDefault();

//             // Obtiene la cantidad, el nombre del producto, el precio y calcula el precio total
//             const quantity = form.querySelector("input[name='quantity']").value;
//             const product_name = form.querySelector("input[name='product_name']").value;
//             const product_price = form.querySelector("input[name='product_price']").value;
//             const total_price = quantity * product_price;

//             // Construye un mensaje con la información del producto y el precio total
//             const message = `¡Quiero comprar ${quantity} ${product_name} por un total de $${total_price.toFixed(2)}!`;

//             // Redirige al formulario de contacto en contact.html y pasa los datos a través de la URL
//             const contactFormURL = "contact.html?" +
//                 `product_name=${encodeURIComponent(product_name)}` +
//                 `&product_price=${encodeURIComponent(product_price)}` +
//                 `&total_price=${encodeURIComponent(total_price)}` +
//                 `&message=${encodeURIComponent(message)}`;

//             // Redirige a la página de contacto
//             window.location.href = contactFormURL;
//         });
//     });
// });