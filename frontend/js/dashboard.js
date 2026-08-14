// ============================================================
// CONTROL DE SESIÓN
// ============================================================

const usuarioGuardado =
    localStorage.getItem("usuarioLogueado");


if (!usuarioGuardado) {

    window.location.href =
        "./index.html";

} else {

    const usuario =
        JSON.parse(usuarioGuardado);


    // ============================================================
    // ELEMENTOS DEL DASHBOARD
    // ============================================================

    const userName =
        document.getElementById("userName");

    const userRole =
        document.getElementById("userRole");

    const userInitial =
        document.getElementById("userInitial");

    const welcomeMessage =
        document.getElementById("welcomeMessage");

    const pageTitle =
        document.getElementById("pageTitle");

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
    // OBTENER ROL
    // ============================================================

    function obtenerRol() {

        return (
            roles[usuario.role] ||
            "Usuario"
        );

    }


    // ============================================================
    // CARGAR INFORMACIÓN DEL USUARIO
    // ============================================================

    function cargarUsuario() {

        const nombre =
            usuario.name ||
            usuario.username ||
            "Usuario";


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
    // PERMISOS DEL MENÚ
    // ============================================================

    function aplicarPermisos() {

        navItems.forEach(
            item => {

                const requiredRole =
                    item.dataset.role;


                if (

                    requiredRole &&

                    requiredRole !==
                        usuario.role

                ) {

                    item.hidden =
                        true;

                }

            }
        );

    }


    // ============================================================
    // MOSTRAR MÓDULO
    // ============================================================

    function mostrarModulo(
        nombre
    ) {

        modules.forEach(
            module => {

                module.hidden =
                    true;


                module.classList.remove(
                    "active-module"
                );

            }
        );


        const modulo =
            document.getElementById(
                `${nombre}Module`
            );


        if (!modulo) {

            return;

        }


        modulo.hidden =
            false;


        modulo.classList.add(
            "active-module"
        );

    }


    // ============================================================
    // LEER DATOS DE LOCALSTORAGE
    // ============================================================

    function obtenerArrayLocalStorage(
        clave
    ) {

        try {

            const datos =
                JSON.parse(
                    localStorage.getItem(
                        clave
                    )
                );


            return Array.isArray(
                datos
            )
                ? datos
                : [];

        } catch (error) {

            console.error(
                `Error leyendo ${clave}:`,
                error
            );


            return [];

        }

    }


    // ============================================================
    // ESTADÍSTICAS DEL SISTEMA
    // ============================================================

    function obtenerEstadisticas() {

        const estudiantes =
            obtenerArrayLocalStorage(
                "estudiantes"
            );


        const calificaciones =
            obtenerArrayLocalStorage(
                "calificaciones"
            );


        const asistencias =
            obtenerArrayLocalStorage(
                "asistencias"
            );


        const usuarios =
            obtenerArrayLocalStorage(
                "usuarios"
            );


        // --------------------------------------------------------
        // ESTUDIANTES
        // --------------------------------------------------------

        const totalEstudiantes =
            estudiantes.length;


        // --------------------------------------------------------
        // CALIFICACIONES
        // --------------------------------------------------------

        const totalCalificaciones =
            calificaciones.length;


        // --------------------------------------------------------
        // ASISTENCIA
        // --------------------------------------------------------

        const totalAsistencias =
            asistencias.length;


        const presentes =
            asistencias.filter(
                item =>
                    item.status ===
                    "presente"
            ).length;


        const tardias =
            asistencias.filter(
                item =>
                    item.status ===
                    "tardia"
            ).length;


        const asistenciasFavorables =
            presentes +
            tardias;


        let porcentajeAsistencia =
            0;


        if (
            totalAsistencias > 0
        ) {

            porcentajeAsistencia =
                Math.round(
                    (
                        asistenciasFavorables /
                        totalAsistencias
                    ) *
                    100
                );

        }


        return {

            estudiantes:
                totalEstudiantes,

            calificaciones:
                totalCalificaciones,

            asistencias:
                totalAsistencias,

            presentes:
                presentes,

            tardias:
                tardias,

            porcentajeAsistencia:
                porcentajeAsistencia,

            usuarios:
                usuarios.length

        };

    }


    // ============================================================
    // ACTUALIZAR ESTADÍSTICAS EN EL DASHBOARD
    // ============================================================

    function actualizarEstadisticas() {

        const estadisticas =
            obtenerEstadisticas();


        // --------------------------------------------------------
        // ESTUDIANTES
        // --------------------------------------------------------

        const totalStudents =
            document.getElementById(
                "totalStudents"
            );


        if (totalStudents) {

            totalStudents.textContent =
                estadisticas.estudiantes;

        }


        // --------------------------------------------------------
        // CALIFICACIONES
        // --------------------------------------------------------

        const totalGrades =
            document.getElementById(
                "totalGrades"
            );


        if (totalGrades) {

            totalGrades.textContent =
                estadisticas.calificaciones;

        }


        // --------------------------------------------------------
        // ASISTENCIA
        // --------------------------------------------------------

        const attendancePercentage =
            document.getElementById(
                "attendancePercentage"
            );


        if (attendancePercentage) {

            attendancePercentage.textContent =
                `${estadisticas.porcentajeAsistencia}%`;

        }


        // --------------------------------------------------------
        // USUARIOS
        // --------------------------------------------------------

        const totalUsers =
            document.getElementById(
                "totalUsers"
            );


        if (totalUsers) {

            totalUsers.textContent =
                estadisticas.usuarios;

        }


        // --------------------------------------------------------
        // DETALLES
        // --------------------------------------------------------

        const studentsDescription =
            document.getElementById(
                "studentsDescription"
            );


        if (studentsDescription) {

            studentsDescription.textContent =

                `${estadisticas.estudiantes} estudiante${
                    estadisticas.estudiantes === 1
                        ? ""
                        : "s"
                } registrado${
                    estadisticas.estudiantes === 1
                        ? ""
                        : "s"
                }.`;

        }


        const gradesDescription =
            document.getElementById(
                "gradesDescription"
            );


        if (gradesDescription) {

            gradesDescription.textContent =

                `${estadisticas.calificaciones} calificación${
                    estadisticas.calificaciones === 1
                        ? ""
                        : "es"
                } registrada${
                    estadisticas.calificaciones === 1
                        ? ""
                        : "s"
                }.`;

        }


        const attendanceDescription =
            document.getElementById(
                "attendanceDescription"
            );


        if (attendanceDescription) {

            attendanceDescription.textContent =

                `${estadisticas.porcentajeAsistencia}% de asistencia registrada.`;

        }


        const usersDescription =
            document.getElementById(
                "usersDescription"
            );


        if (usersDescription) {

            if (
                estadisticas.usuarios > 0
            ) {

                usersDescription.textContent =

                    `${estadisticas.usuarios} usuario${
                        estadisticas.usuarios === 1
                            ? ""
                            : "s"
                    } registrado${
                        estadisticas.usuarios === 1
                            ? ""
                            : "s"
                    }.`;

            } else {

                usersDescription.textContent =
                    "Administración de usuarios y perfiles.";

            }

        }

    }


    // ============================================================
    // NAVEGACIÓN
    // ============================================================

    navItems.forEach(
        item => {

            item.addEventListener(
                "click",
                function () {

                    navItems.forEach(
                        nav => {

                            nav.classList.remove(
                                "active"
                            );

                        }
                    );


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
                    // INICIO
                    // =================================================

                    if (
                        modulo ===
                        "inicio"
                    ) {

                        mostrarModulo(
                            "inicio"
                        );

                        actualizarEstadisticas();

                        return;

                    }


                    // =================================================
                    // USUARIOS
                    // =================================================

                    if (
                        modulo ===
                        "usuarios"
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
                    // ESTUDIANTES
                    // =================================================

                    if (
                        modulo ===
                        "estudiantes"
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
                                "No tiene permisos para acceder a Estudiantes."
                            );

                            return;

                        }


                        window.location.href =
                            "./estudiantes.html";

                        return;

                    }


                    // =================================================
                    // CALIFICACIONES
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
                    // ASISTENCIA
                    // =================================================

                    if (
                        modulo ===
                        "asistencia"
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
                                "No tiene permisos para acceder a Asistencia."
                            );

                            return;

                        }


                        window.location.href =
                            "./asistencia.html";

                        return;

                    }


                    // =================================================
                    // COMUNICADOS
                    // =================================================

                    if (
                        modulo ===
                        "comunicados"
                    ) {

                        mostrarModulo(
                            "comunicados"
                        );

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

        }
    );


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
    // ACTUALIZAR SI CAMBIAN LOS DATOS
    // ============================================================

    window.addEventListener(
        "storage",
        function () {

            actualizarEstadisticas();

        }
    );


    // ============================================================
    // INICIALIZAR
    // ============================================================

    cargarUsuario();

    aplicarPermisos();

    actualizarEstadisticas();

    mostrarModulo(
        "inicio"
    );

}