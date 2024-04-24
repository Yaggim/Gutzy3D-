document.addEventListener("DOMContentLoaded", function () {
  const inputNombre = document.querySelector("#nombre");
  const inputEmail = document.querySelector("#email");
  const inputMensaje = document.querySelector("#mensaje");
  const checkbox = document.querySelector("#checkbox");
  const btnSubmit = document.querySelector("#boton-enviar");

  const email = {
    email: "",
    nombre: "",
    mensaje: "",
    checkbox: false,
  };

  comprobarEmail();
  console.log(email);
  console.log(checkbox.checked);
  //Asignar eventos
  inputNombre.addEventListener("input", validar);
  inputEmail.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputNombre.addEventListener("blur", validar);
  inputEmail.addEventListener("blur", validar);
  inputMensaje.addEventListener("blur", validar);
  checkbox.addEventListener("input", validar);
  checkbox.addEventListener("blur", validar);

  function validar(e) {
    if (e.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      mostrarAlerta("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (!checkbox.checked) {
      mostrarAlerta(
        "Acepta los términos y condiciones",
        checkbox.parentElement
      );
      email[e.target.name] = false;
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);
    // Asignaar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarEmail(email);
  }

  function mostrarAlerta(mensaje, referencia) {
    //Limpiar alertas previas
    limpiarAlerta(referencia);
    //Generar alerta html
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2");
    //Inyectar error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail() {
    if (
      Object.values(email).includes("") ||
      Object.values(email).includes(false)
    ) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }
});
