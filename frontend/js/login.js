const usuarios = [
{
username: "admin01",
password: "Admin123",
role: "administracion",
name: "Administrador"
},
{
username: "docente01",
password: "Docente123",
role: "docente",
name: "Docente de prueba"
},
{
username: "estudiante01",
password: "Estudiante123",
role: "estudiante",
name: "Estudiante de prueba"
}
];

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

function mostrarMensaje(mensaje, tipo) {
loginMessage.textContent = mensaje;
loginMessage.className = `login-message ${tipo}`;
}

function buscarUsuario(username, password) {
return usuarios.find(
usuario =>
usuario.username === username &&
usuario.password === password
);
}

function iniciarSesion(usuario) {
const sesion = {
username: usuario.username,
name: usuario.name,
role: usuario.role
};

```
localStorage.setItem(
    "usuarioLogueado",
    JSON.stringify(sesion)
);

mostrarMensaje(
    "Inicio de sesión correcto.",
    "success"
);

setTimeout(() => {
    window.location.href = "dashboard.html";
}, 500);
```

}

loginForm.addEventListener("submit", function (event) {

```
event.preventDefault();

const username = usernameInput.value.trim();
const password = passwordInput.value.trim();

loginMessage.textContent = "";
loginMessage.className = "login-message";

if (!username || !password) {
    mostrarMensaje(
        "Debe completar usuario y contraseña.",
        "error"
    );

    return;
}

const usuario = buscarUsuario(username, password);

if (!usuario) {
    mostrarMensaje(
        "Usuario o contraseña incorrectos.",
        "error"
    );

    return;
}

iniciarSesion(usuario);
```

});
