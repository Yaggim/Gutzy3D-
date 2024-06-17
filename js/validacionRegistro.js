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
    if (comprobarFormulario()) {
      const usuario = {
        nombre: inputNombre.value.trim(),
        apellido: inputApellido.value.trim(),
        email: inputEmail.value.trim().toLowerCase(),
        contraseña: inputPassword.value,
        confirmarContraseña: inputConfirmPassword.value,
        idRol: 2 // Ajusta el id del rol según tu backend
      };

      registrarUsuario(usuario);
    }
  });

  function validar(e) {
    const input = e.target;
    const value = input.value.trim();

    if (value === "") {
      mostrarAlerta(`El campo ${input.id} es obligatorio`, input.parentElement);
      email[input.name] = "";
      comprobarEmail();
      return;
    }

    if (input.id === "email" && !validarEmail(value)) {
      mostrarAlerta("El email no es válido", input.parentElement);
      email[input.name] = "";
      comprobarEmail();
      return;
    }

    if (input.id === "confirmPassword" && value !== inputPassword.value) {
      mostrarAlerta("Las contraseñas no coinciden", input.parentElement);
      email[input.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(input.parentElement);
    // Asignar los valores
    email[input.name] = value.toLowerCase();
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    // Limpiar alertas previas
    limpiarAlerta(referencia);
    // Generar alerta html
    const error = document.createElement("p");
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
    const todosCompletos = Object.values(email).every(value => value !== "");
    if (!todosCompletos) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove("opacity-50");
      btnSubmit.disabled = false;
    }
  }

  function comprobarFormulario() {
    return Object.values(email).every(value => value !== "");
  }

  function registrarUsuario(usuario) {
    fetch('https://backgutzy3d.onrender.com/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }
      return response.json();
    })
    .then(data => {
      mostrarMensajeExito("Registro exitoso");
    })
    .catch(error => {
      console.error('Error:', error);
      mostrarAlerta('Error al registrar usuario', form);
    });
  }

  function mostrarMensajeExito(mensaje) {
    const mensajeExito = document.createElement("p");
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