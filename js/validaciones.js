document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const product_name = params.get("product_name");
    const product_price = params.get("product_price");
    const total_price = params.get("total_price");
    const message = params.get("message");

    const messageField = document.querySelector("textarea[name='mensaje']");
    messageField.value = message;
});

import { mensajes, tiposError } from "./customErrors.js";

const camposDeFormulario = document.querySelectorAll("[required]");
const botonEnviar = document.getElementById("boton-enviar");

camposDeFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("input", () => verificarCampo(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarCampo(campo) {
    let mensaje = "";
    campo.setCustomValidity("");

    tiposError.forEach((error) => {
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error];
            console.log(mensaje);
        }
    });

    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck = campo.checkValidity();

    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = "";
    }

    verificarCampos();
}

function verificarCampos() {
    let todosCamposValidos = true;

    camposDeFormulario.forEach((campo) => {
        if (!campo.checkValidity()) {
            todosCamposValidos = false;
            console.log(todosCamposValidos);
        }
    });

    botonEnviar.disabled = !todosCamposValidos;
}
