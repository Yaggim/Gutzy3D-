// Selecciona el botón de alternancia de la barra de navegación
const navToggle = document.querySelector(".nav-toggle")

// Selecciona la lista de navegación
const navList = document.querySelector(".nav-list")

// Agrega un evento de clic al botón de alternancia
navToggle.addEventListener("click", () => {
    // Alterna la visibilidad de la lista de navegación al hacer clic
    navList.classList.toggle("nav-list_visible")
})
document.addEventListener("DOMContentLoaded", function () {
    // Verificar el estado de sesión al cargar la página
    ajustarVisibilidadBotones();

    // Configurar el evento de submit para el formulario de login si es necesario
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Evitar envío por defecto del formulario
            // Aquí puedes añadir la lógica para manejar el login si es necesario
        });
    }

    // Configurar el evento de click para el botón de cerrar sesión si está presente
    const btnCerrarSesion = document.querySelector('.nav-menu-logout');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', cerrarSesion);
    }
});

// Función para ajustar la visibilidad de los botones según el estado de sesión
function ajustarVisibilidadBotones() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const btnLogin = document.querySelector(".nav-menu-login");
    const navList = document.querySelector(".nav-list");

    if (isLoggedIn) {
        // Ocultar botón de login si el usuario está autenticado
        if (btnLogin) {
            btnLogin.style.display = "none";
        }

        // Mostrar botón de cerrar sesión si no está ya presente
        if (!document.querySelector(".nav-menu-logout")) {
            const btnCerrarSesion = document.createElement("li");
            const btnCerrarSesionLink = document.createElement("a");
            btnCerrarSesionLink.textContent = "Cerrar Sesión";
            btnCerrarSesionLink.classList.add("nav-menu-item", "nav-menu-logout");
            btnCerrarSesionLink.href = "#"; // Puedes cambiar esto si es necesario
            btnCerrarSesionLink.addEventListener("click", cerrarSesion);

            btnCerrarSesion.appendChild(btnCerrarSesionLink);
            navList.appendChild(btnCerrarSesion);
        }
    } else {
        // Mostrar botón de login si el usuario no está autenticado y estamos en login.html
        if (btnLogin && esPaginaLogin()) {
            btnLogin.style.display = "block";
        }

        // Ocultar el botón de cerrar sesión si está presente
        const btnCerrarSesion = document.querySelector(".nav-menu-logout");
        if (btnCerrarSesion) {
            btnCerrarSesion.parentElement.removeChild(btnCerrarSesion);
        }
    }
}

// Función para verificar si estamos en la página de login.html
function esPaginaLogin() {
    return window.location.pathname.includes('login.html');
}

// Función para cerrar sesión
function cerrarSesion(e) {
    e.preventDefault();
    // Limpiar el estado de sesión
    localStorage.removeItem('isLoggedIn');
    // Redirigir al inicio si estamos en login.html
    if (esPaginaLogin()) {
        ajustarVisibilidadBotones(); // Asegurar que el botón de login se muestre
    } else {
        window.location.href = '/index.html';
    }
}