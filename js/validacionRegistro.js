document.addEventListener("DOMContentLoaded", function () {
  const inputNombre = document.querySelector("#nombre");
  const inputApellido = document.querySelector("#apellido");
  const inputEmail = document.querySelector("#email");
  const inputPassword = document.querySelector("#password");
  const inputConfirmPassword = document.querySelector("#confirmPassword");
  const btnSubmit = document.querySelector("#submit");
  const form = document.querySelector("#registerForm");

  const email = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  comprobarEmail();

  // Asignar eventos
  inputNombre.addEventListener("input", validar);
  inputApellido.addEventListener("input", validar);
  inputEmail.addEventListener("input", validar);
  inputPassword.addEventListener("input", validar);
  inputConfirmPassword.addEventListener("input", validar);
  inputNombre.addEventListener("blur", validar);
  inputApellido.addEventListener("blur", validar);
  inputEmail.addEventListener("blur", validar);
  inputPassword.addEventListener("blur", validar);
  inputConfirmPassword.addEventListener("blur", validar);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (comprobarEmail()) {
      mostrarMensajeExito("Registro exitoso");
    }
  });

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
      mostrarAlerta("El email no es válido", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    if (e.target.id === "confirmPassword" && e.target.value !== inputPassword.value) {
      mostrarAlerta("Las contraseñas no coinciden", e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);
    // Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    // Limpiar alertas previas
    limpiarAlerta(referencia);
    // Generar alerta html
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2");
    // Inyectar error al formulario
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
    return regex.test(email);
  }

  function comprobarEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return false;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
    return true;
  }

  function mostrarMensajeExito(mensaje) {
    const mensajeExito = document.createElement("P");
    mensajeExito.textContent = mensaje;
    mensajeExito.classList.add("bg-green-600", "text-white", "p-2", "mt-2");
    form.appendChild(mensajeExito);

    setTimeout(() => {
      mensajeExito.remove();
      form.reset();
      Object.keys(email).forEach(key => email[key] = "");
      comprobarEmail();
    }, 3000);
  }
});