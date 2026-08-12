console.log("LOGIN JS CARGADO");

const usuarios = [
    {
        username: "admin",
        password: "1234",
        role: "administracion",
        name: "Administrador"
    },
    {
        username: "docente",
        password: "1234",
        role: "docente",
        name: "Docente de prueba"
    },
    {
        username: "estudiante",
        password: "1234",
        role: "estudiante",
        name: "Estudiante de prueba"
    }
];

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

console.log("Formulario:", loginForm);

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        console.log("LOGIN SUBMIT DETECTADO");

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {

            loginMessage.textContent =
                "Debe completar usuario y contraseña.";

            loginMessage.className =
                "login-message error";

            return;
        }

        const usuario = usuarios.find(function(usuario) {

            return (
                usuario.username === username &&
                usuario.password === password
            );

        });

        if (!usuario) {

            loginMessage.textContent =
                "Usuario o contraseña incorrectos.";

            loginMessage.className =
                "login-message error";

            return;
        }

        const sesion = {
            username: usuario.username,
            name: usuario.name,
            role: usuario.role
        };

        localStorage.setItem(
            "usuarioLogueado",
            JSON.stringify(sesion)
        );

        console.log("Sesión guardada correctamente.");

        loginMessage.textContent =
            "Inicio de sesión correcto.";

        loginMessage.className =
            "login-message success";

        setTimeout(function() {

            window.location.href = "./dashboard.html";

        }, 500);

    });

} else {

    console.error(
        "No se encontró el formulario con id loginForm."
    );
}