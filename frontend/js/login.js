console.log("LOGIN JS CARGADO");

async function hashPassword(password) {
    const enc = new TextEncoder();
    const data = enc.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

let usuarios = [
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

// Inicializar fuente de usuarios: preferir `localStorage` (migrado),
// si no existe usar el array por defecto pero con passwords hasheadas.
async function initUsuarios() {
    try {
        const stored = JSON.parse(localStorage.getItem('usuarios'));
        if (Array.isArray(stored) && stored.length > 0) {
            console.log('initUsuarios: usuarios encontrados en localStorage', stored.length);
            usuarios = stored;
            return;
        }
    } catch (e) {
        // ignore parse errors
    }

    // Hash passwords of default users so comparison uses hashed values
    usuarios = await Promise.all(
        usuarios.map(async u => ({
            ...u,
            password: await hashPassword(u.password || '')
        }))
    );

}

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");

console.log("Formulario:", loginForm);

if (loginForm) {

    // iniciar la inicialización y esperar en el handler para evitar carreras
    const initPromise = initUsuarios().catch(err => {
        console.error('initUsuarios error', err);
    });

    loginForm.addEventListener("submit", async function(event) {

        // esperar inicialización de usuarios guardados/hasheados
        await initPromise;

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

        const hashed = await hashPassword(password);
        console.log('login: hashed password:', hashed);
        console.log('login: usuarios en memoria:', usuarios.length, usuarios.map(u => u.username));

        let usuario = usuarios.find(function(usuario) {

            return (
                usuario.username === username &&
                usuario.password === hashed
            );

        });

        // Fallback: normalizar nombres (quitar dígitos finales) para coincidir
        if (!usuario) {
            const normalize = name => (name || '').toString().replace(/\d+$/,'');
            console.log('login: intentando fallback con normalización de usuarios');
            usuario = usuarios.find(u => normalize(u.username) === normalize(username) && u.password === hashed);
            if (usuario) {
                console.log('login: fallback encontró usuario', usuario.username);
            }
        }

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