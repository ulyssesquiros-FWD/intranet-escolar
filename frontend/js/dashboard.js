const usuarioGuardado = localStorage.getItem("usuarioLogueado");

if (!usuarioGuardado) {
    window.location.href = "./index.html";
} else {

    const usuario = JSON.parse(usuarioGuardado);

    const userName = document.getElementById("userName");
    const userRole = document.getElementById("userRole");
    const userInitial = document.getElementById("userInitial");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const pageTitle = document.getElementById("pageTitle");

    const logoutButton = document.getElementById("logoutButton");

    const navItems = document.querySelectorAll(".nav-item");
    const modules = document.querySelectorAll(".module");

    const roles = {
        administracion: "Administración",
        docente: "Docente",
        estudiante: "Estudiante / Familia"
    };

    function obtenerRol() {
        return roles[usuario.role] || "Usuario";
    }

    function cargarUsuario() {

        const nombre =
            usuario.name || usuario.username;

        userName.textContent = nombre;
        userRole.textContent = obtenerRol();

        userInitial.textContent =
            nombre.charAt(0).toUpperCase();

        welcomeMessage.textContent =
            `Bienvenido, ${nombre}`;
    }

    function aplicarPermisos() {

        navItems.forEach(item => {

            const requiredRole =
                item.dataset.role;

            if (
                requiredRole &&
                requiredRole !== usuario.role
            ) {
                item.hidden = true;
            }

        });
    }

    function mostrarModulo(nombre) {

        modules.forEach(module => {

            module.hidden = true;
            module.classList.remove(
                "active-module"
            );

        });

        const modulo =
            document.getElementById(
                `${nombre}Module`
            );

        if (!modulo) {
            return;
        }

        modulo.hidden = false;

        modulo.classList.add(
            "active-module"
        );
    }

    navItems.forEach(item => {

        item.addEventListener("click", function() {

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            this.classList.add("active");

            const modulo =
                this.dataset.module;

            pageTitle.textContent =
                this.textContent.trim();

            mostrarModulo(modulo);

        });

    });

    logoutButton.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "usuarioLogueado"
            );

            window.location.href =
                "./index.html";

        }
    );

    cargarUsuario();
    aplicarPermisos();
    mostrarModulo("inicio");

}