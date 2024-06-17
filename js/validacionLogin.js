document.addEventListener("DOMContentLoaded", function () {
  const inputEmail = document.querySelector("#email");
  const inputPassword = document.querySelector("#password");
  const loginForm = document.querySelector("#loginForm");
  const btnSubmit = loginForm.querySelector("button[type='submit']");

  const email = {
      email: "",
      password: "",
  };

  // Asignar eventos
  inputPassword.addEventListener("input", validar);
  inputEmail.addEventListener("input", validar);
  inputPassword.addEventListener("blur", validar);
  inputEmail.addEventListener("blur", validar);

  loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usuario = {
          email: email.email,
          password: email.password
      };

      // Llama a la función para autenticar al usuario
      autenticarUsuario(usuario);
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

  async function autenticarUsuario(usuario) {
    try {
        const response = await fetch('https://backgutzy3d.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error('Usuario o contraseña incorrectos');
        }

        const data = await response.json();

        if (data.redirectUrl) {
            console.log('Redirigiendo a:', data.redirectUrl); // Añadir log para depuración
            window.location.href = data.redirectUrl;
        } else if (data.message && data.message === "Login exitoso") {
            console.log('Login exitoso como cliente');
            localStorage.setItem('isLoggedIn', 'true');
            mostrarBotonCerrarSesion();
            window.location.href = '/index.html'; // Redirigir al inicio
        } else {
            throw new Error('Respuesta no reconocida de la API');
        }
    } catch (error) {
        console.error('Error en el login:', error.message);
        // Muestra un mensaje de error al usuario
        mostrarAlerta(error.message, loginForm);
    }
}

function mostrarBotonCerrarSesion() {
    // Seleccionar el contenedor adecuado en el header
    const navList = document.querySelector(".nav-list");

    // Crear botón de cerrar sesión
    const btnCerrarSesion = document.createElement("li");
    const btnCerrarSesionLink = document.createElement("a");
    btnCerrarSesionLink.textContent = "Cerrar Sesión";
    btnCerrarSesionLink.classList.add("nav-menu-item", "nav-menu-logout");
    btnCerrarSesionLink.href = "#"; // Puedes cambiar esto si es necesario
    btnCerrarSesionLink.addEventListener("click", cerrarSesion);

    // Agregar el link al <li> y el <li> a la nav-list
    btnCerrarSesion.appendChild(btnCerrarSesionLink);
    navList.appendChild(btnCerrarSesion);


}


// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", ajustarVisibilidadBotones);


});