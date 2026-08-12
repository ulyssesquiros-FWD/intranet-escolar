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

    const logoutButton =
        document.getElementById("logoutButton");

    const navItems =
        document.querySelectorAll(".nav-item");

    const modules =
        document.querySelectorAll(".module");


    // ============================================================
    // ROLES
    // ============================================================

    const roles = {

        administracion:
            "Administración",

        docente:
            "Docente",

        estudiante:
            "Estudiante / Familia"

    };


    // ============================================================
    // OBTENER NOMBRE DEL ROL
    // ============================================================

    function obtenerRol() {

        return roles[usuario.role] || "Usuario";

    }


    // ============================================================
    // CARGAR INFORMACIÓN DEL USUARIO
    // ============================================================

    function cargarUsuario() {

        const nombre =
            usuario.name || usuario.username;


        if (userName) {

            userName.textContent =
                nombre;

        }


        if (userRole) {

            userRole.textContent =
                obtenerRol();

        }


        if (userInitial) {

            userInitial.textContent =
                nombre
                    .charAt(0)
                    .toUpperCase();

        }


        if (welcomeMessage) {

            welcomeMessage.textContent =
                `Bienvenido, ${nombre}`;

        }

    }


    // ============================================================
    // APLICAR PERMISOS
    // ============================================================

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


    // ============================================================
    // MOSTRAR MÓDULO
    // ============================================================

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


    // ============================================================
    // NAVEGACIÓN
    // ============================================================

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            function () {

                navItems.forEach(nav => {

                    nav.classList.remove(
                        "active"
                    );

                });


                this.classList.add(
                    "active"
                );


                const modulo =
                    this.dataset.module;


                if (pageTitle) {

                    pageTitle.textContent =
                        this.textContent.trim();

                }


                // =================================================
                // USUARIOS
                // Solo Administración
                // =================================================

                if (
                    modulo === "usuarios"
                ) {

                    if (
                        usuario.role !==
                        "administracion"
                    ) {

                        alert(
                            "No tiene permisos para acceder a Usuarios."
                        );

                        return;

                    }


                    window.location.href =
                        "./usuarios.html";

                    return;

                }


                // =================================================
                // CALIFICACIONES
                // Administración, Docente y
                // Estudiante/Familia
                // =================================================

                if (
                    modulo ===
                    "calificaciones"
                ) {

                    const rolesPermitidos = [

                        "administracion",

                        "docente",

                        "estudiante"

                    ];


                    if (
                        !rolesPermitidos.includes(
                            usuario.role
                        )
                    ) {

                        alert(
                            "No tiene permisos para acceder a Calificaciones."
                        );

                        return;

                    }


                    window.location.href =
                        "./calificaciones.html";

                    return;

                }


                // =================================================
                // OTROS MÓDULOS
                // =================================================

                mostrarModulo(
                    modulo
                );

            }
        );

    });


    // ============================================================
    // CERRAR SESIÓN
    // ============================================================

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                localStorage.removeItem(
                    "usuarioLogueado"
                );


                window.location.href =
                    "./index.html";

            }
        );

    }


    // ============================================================
    // INICIALIZAR
    // ============================================================

    cargarUsuario();

    aplicarPermisos();

    mostrarModulo("inicio");

}