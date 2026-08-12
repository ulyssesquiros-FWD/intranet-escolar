// ============================================================
// CONTROL DE ACCESO
// ============================================================

const usuarioSesion =
    localStorage.getItem("usuarioLogueado");

if (!usuarioSesion) {

    window.location.href = "./index.html";

} else {

    const usuarioActual =
        JSON.parse(usuarioSesion);

    // ============================================================
    // ROLES PERMITIDOS
    // ============================================================

    const rolesPermitidos = [
        "administracion",
        "docente",
        "estudiante"
    ];

    if (
        !rolesPermitidos.includes(
            usuarioActual.role
        )
    ) {

        alert(
            "No tiene permisos para acceder a este módulo."
        );

        window.location.href =
            "./dashboard.html";

    } else {

        // ========================================================
        // PERMISOS
        // ========================================================

        const puedeGestionar =
            usuarioActual.role === "administracion" ||
            usuarioActual.role === "docente";

        // ========================================================
        // DATOS INICIALES
        // ========================================================

        const asistenciaInicial = [

            {
                id: 1,
                student: "Estudiante 01",
                date: "2026-08-10",
                status: "presente",
                teacher: "Docente de Matemática",
                observation: ""
            },

            {
                id: 2,
                student: "Estudiante 02",
                date: "2026-08-10",
                status: "ausente",
                teacher: "Docente de Matemática",
                observation: "Ausencia sin justificar"
            },

            {
                id: 3,
                student: "Estudiante 01",
                date: "2026-08-11",
                status: "tardia",
                teacher: "Docente de Español",
                observation: "Llegó 15 minutos tarde"
            },

            {
                id: 4,
                student: "Estudiante 02",
                date: "2026-08-11",
                status: "justificada",
                teacher: "Docente de Ciencias",
                observation: "Cita médica"
            },

            {
                id: 5,
                student: "Estudiante 03",
                date: "2026-08-11",
                status: "presente",
                teacher: "Docente de Ciencias",
                observation: ""
            }

        ];

        let asistencias =
            JSON.parse(
                localStorage.getItem(
                    "asistencias"
                )
            ) || asistenciaInicial;

        let asistenciaEditando = null;

        // ========================================================
        // ELEMENTOS HTML
        // ========================================================

        const tableBody =
            document.getElementById(
                "attendanceTableBody"
            );

        const attendanceCounter =
            document.getElementById(
                "attendanceCounter"
            );

        const totalCounter =
            document.getElementById(
                "totalCounter"
            );

        const presentCounter =
            document.getElementById(
                "presentCounter"
            );

        const absentCounter =
            document.getElementById(
                "absentCounter"
            );

        const lateCounter =
            document.getElementById(
                "lateCounter"
            );

        const searchInput =
            document.getElementById(
                "searchInput"
            );

        const dateFilter =
            document.getElementById(
                "dateFilter"
            );

        const studentFilter =
            document.getElementById(
                "studentFilter"
            );

        const statusFilter =
            document.getElementById(
                "statusFilter"
            );

        const newAttendanceButton =
            document.getElementById(
                "newAttendanceButton"
            );

        const formSection =
            document.getElementById(
                "formSection"
            );

        const form =
            document.getElementById(
                "attendanceForm"
            );

        const formTitle =
            document.getElementById(
                "formTitle"
            );

        const cancelButton =
            document.getElementById(
                "cancelButton"
            );

        const cancelButtonBottom =
            document.getElementById(
                "cancelButtonBottom"
            );

        const formMessage =
            document.getElementById(
                "formMessage"
            );

        const attendanceId =
            document.getElementById(
                "attendanceId"
            );

        let student =
            document.getElementById(
                "student"
            );

        const date =
            document.getElementById(
                "date"
            );

        const status =
            document.getElementById(
                "status"
            );

        const teacher =
            document.getElementById(
                "teacher"
            );

        const observation =
            document.getElementById(
                "observation"
            );

        // ========================================================
        // GUARDAR ASISTENCIAS
        // ========================================================

        function guardarAsistencias() {

            localStorage.setItem(
                "asistencias",
                JSON.stringify(
                    asistencias
                )
            );

        }

        // ========================================================
        // OBTENER ESTUDIANTES REGISTRADOS
        // ========================================================

        function obtenerEstudiantesRegistrados() {

            const estudiantesGuardados =
                localStorage.getItem(
                    "estudiantes"
                );

            if (!estudiantesGuardados) {

                return [];

            }

            try {

                const estudiantes =
                    JSON.parse(
                        estudiantesGuardados
                    );

                if (
                    !Array.isArray(
                        estudiantes
                    )
                ) {

                    return [];

                }

                return estudiantes
                    .filter(
                        estudiante =>
                            estudiante &&
                            estudiante.fullName
                    )
                    .sort(
                        (a, b) =>
                            a.fullName.localeCompare(
                                b.fullName
                            )
                    );

            } catch (error) {

                console.error(
                    "Error al cargar estudiantes:",
                    error
                );

                return [];

            }

        }

        // ========================================================
        // CARGAR ESTUDIANTES EN EL FORMULARIO
        // ========================================================

        function cargarEstudiantesEnFormulario(
            estudianteSeleccionado = ""
        ) {

            const campoActual =
                document.getElementById(
                    "student"
                );

            if (!campoActual) {

                return;

            }

            // Si todavía es un input, lo convertimos en select
            if (
                campoActual.tagName !==
                "SELECT"
            ) {

                const select =
                    document.createElement(
                        "select"
                    );

                select.id =
                    "student";

                select.name =
                    "student";

                select.required =
                    true;

                select.className =
                    campoActual.className;

                campoActual.replaceWith(
                    select
                );

            }

            // Actualizar referencia
            student =
                document.getElementById(
                    "student"
                );

            const estudiantes =
                obtenerEstudiantesRegistrados();

            student.innerHTML = `

                <option value="">
                    Seleccione un estudiante
                </option>

            `;

            // ====================================================
            // ESTUDIANTES REGISTRADOS
            // ====================================================

            estudiantes.forEach(
                estudiante => {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        estudiante.fullName;

                    option.textContent =
                        `${estudiante.fullName} - ${
                            estudiante.identification ||
                            "Sin identificación"
                        }`;

                    student.appendChild(
                        option
                    );

                }
            );

            // ====================================================
            // COMPATIBILIDAD CON REGISTROS ANTERIORES
            // ====================================================

            const nombresExistentes = [

                ...new Set(

                    asistencias
                        .map(
                            item =>
                                item.student
                        )
                        .filter(Boolean)

                )

            ];

            nombresExistentes.forEach(
                nombre => {

                    const existe =
                        Array.from(
                            student.options
                        ).some(
                            option =>
                                option.value ===
                                nombre
                        );

                    if (!existe) {

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            nombre;

                        option.textContent =
                            `${nombre} (registro existente)`;

                        student.appendChild(
                            option
                        );

                    }

                }
            );

            if (
                estudianteSeleccionado
            ) {

                student.value =
                    estudianteSeleccionado;

            }

        }

        // ========================================================
        // NOMBRE DEL ESTADO
        // ========================================================

        function obtenerNombreEstado(valor) {

            const estados = {

                presente: "Presente",

                ausente: "Ausente",

                tardia: "Tardía",

                justificada: "Justificada"

            };

            return estados[valor] ||
                valor;

        }

        // ========================================================
        // CLASE DEL ESTADO
        // ========================================================

        function obtenerClaseEstado(valor) {

            return `status-${valor}`;

        }

        // ========================================================
        // ACTUALIZAR FILTRO DE ESTUDIANTES
        // ========================================================

        function actualizarFiltroEstudiantes() {

            const estudiantes = [

                ...new Set(

                    asistencias.map(
                        item =>
                            item.student
                    )

                )

            ].sort();

            const estudianteActual =
                studentFilter.value;

            studentFilter.innerHTML = `

                <option value="todos">
                    Todos los estudiantes
                </option>

            `;

            estudiantes.forEach(
                nombre => {

                    const option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        nombre;

                    option.textContent =
                        nombre;

                    studentFilter.appendChild(
                        option
                    );

                }
            );

            if (
                estudiantes.includes(
                    estudianteActual
                )
            ) {

                studentFilter.value =
                    estudianteActual;

            } else {

                studentFilter.value =
                    "todos";

            }

        }

        // ========================================================
        // FILTRAR ASISTENCIAS
        // ========================================================

        function obtenerAsistenciasFiltradas() {

            const texto =
                searchInput.value
                    .trim()
                    .toLowerCase();

            const fecha =
                dateFilter.value;

            const estudiante =
                studentFilter.value;

            const estado =
                statusFilter.value;

            return asistencias.filter(
                item => {

                    const coincideTexto =
                        item.student
                            .toLowerCase()
                            .includes(
                                texto
                            );

                    const coincideFecha =
                        !fecha ||
                        item.date ===
                            fecha;

                    const coincideEstudiante =
                        estudiante ===
                            "todos" ||
                        item.student ===
                            estudiante;

                    const coincideEstado =
                        estado ===
                            "todos" ||
                        item.status ===
                            estado;

                    return (

                        coincideTexto &&

                        coincideFecha &&

                        coincideEstudiante &&

                        coincideEstado

                    );

                }
            );

        }

        // ========================================================
        // ACTUALIZAR RESUMEN
        // ========================================================

        function actualizarResumen(
            lista
        ) {

            const total =
                lista.length;

            const presentes =
                lista.filter(
                    item =>
                        item.status ===
                        "presente"
                ).length;

            const ausentes =
                lista.filter(
                    item =>
                        item.status ===
                        "ausente"
                ).length;

            const tardias =
                lista.filter(
                    item =>
                        item.status ===
                        "tardia"
                ).length;

            totalCounter.textContent =
                total;

            presentCounter.textContent =
                presentes;

            absentCounter.textContent =
                ausentes;

            lateCounter.textContent =
                tardias;

            attendanceCounter.textContent =

                `${total} registro${
                    total === 1
                        ? ""
                        : "s"
                }`;

        }

        // ========================================================
        // RENDERIZAR TABLA
        // ========================================================

        function renderizarAsistencias() {

            actualizarFiltroEstudiantes();

            const lista =
                obtenerAsistenciasFiltradas();

            tableBody.innerHTML =
                "";

            actualizarResumen(
                lista
            );

            if (
                lista.length === 0
            ) {

                tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="6"
                            class="empty-row"
                        >

                            No se encontraron
                            registros de asistencia.

                        </td>

                    </tr>

                `;

                return;

            }

            lista.forEach(
                item => {

                    const row =
                        document.createElement(
                            "tr"
                        );

                    const acciones =

                        puedeGestionar

                        ? `

                            <button
                                type="button"
                                class="action-button edit"
                                data-action="edit"
                                data-id="${item.id}"
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                class="action-button delete"
                                data-action="delete"
                                data-id="${item.id}"
                            >
                                Eliminar
                            </button>

                        `

                        : `

                            <span class="read-only">
                                Solo consulta
                            </span>

                        `;

                    row.innerHTML = `

                        <td>

                            <strong>
                                ${item.student}
                            </strong>

                        </td>

                        <td>
                            ${item.date}
                        </td>

                        <td>

                            <span
                                class="status
                                ${obtenerClaseEstado(
                                    item.status
                                )}"
                            >

                                ${obtenerNombreEstado(
                                    item.status
                                )}

                            </span>

                        </td>

                        <td>
                            ${item.teacher}
                        </td>

                        <td>
                            ${item.observation || "—"}
                        </td>

                        <td>

                            <div class="actions">

                                ${acciones}

                            </div>

                        </td>

                    `;

                    tableBody.appendChild(
                        row
                    );

                }
            );

        }

        // ========================================================
        // FECHA ACTUAL
        // ========================================================

        function establecerFechaActual() {

            const hoy =
                new Date();

            const año =
                hoy.getFullYear();

            const mes =
                String(
                    hoy.getMonth() + 1
                ).padStart(
                    2,
                    "0"
                );

            const dia =
                String(
                    hoy.getDate()
                ).padStart(
                    2,
                    "0"
                );

            date.value =
                `${año}-${mes}-${dia}`;

        }

        // ========================================================
        // MOSTRAR FORMULARIO
        // ========================================================

        function mostrarFormulario() {

            if (!puedeGestionar) {

                alert(
                    "No tiene permisos para registrar asistencia."
                );

                return;

            }

            cargarEstudiantesEnFormulario();

            formSection.hidden =
                false;

            student.focus();

        }

        // ========================================================
        // LIMPIAR FORMULARIO
        // ========================================================

        function limpiarFormulario() {

            form.reset();

            attendanceId.value =
                "";

            asistenciaEditando =
                null;

            formTitle.textContent =
                "Nueva asistencia";

            formMessage.textContent =
                "";

            formMessage.className =
                "form-message";

            establecerFechaActual();

            cargarEstudiantesEnFormulario();

        }

        // ========================================================
        // CERRAR FORMULARIO
        // ========================================================

        function cerrarFormulario() {

            formSection.hidden =
                true;

            limpiarFormulario();

        }

        // ========================================================
        // EDITAR ASISTENCIA
        // ========================================================

        function editarAsistencia(
            id
        ) {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración y Docentes pueden editar la asistencia."
                );

                return;

            }

            const item =
                asistencias.find(
                    item =>
                        item.id === id
                );

            if (!item) {

                return;

            }

            asistenciaEditando =
                item.id;

            attendanceId.value =
                item.id;

            cargarEstudiantesEnFormulario(
                item.student
            );

            student.value =
                item.student;

            date.value =
                item.date;

            status.value =
                item.status;

            teacher.value =
                item.teacher;

            observation.value =
                item.observation ||
                "";

            formTitle.textContent =
                "Editar asistencia";

            mostrarFormulario();

        }

        // ========================================================
        // ELIMINAR ASISTENCIA
        // ========================================================

        function eliminarAsistencia(
            id
        ) {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración y Docentes pueden eliminar registros."
                );

                return;

            }

            const item =
                asistencias.find(
                    item =>
                        item.id === id
                );

            if (!item) {

                return;

            }

            const confirmar =
                window.confirm(

                    `¿Desea eliminar el registro de ${item.student} del ${item.date}?`

                );

            if (!confirmar) {

                return;

            }

            asistencias =
                asistencias.filter(
                    item =>
                        item.id !== id
                );

            guardarAsistencias();

            renderizarAsistencias();

        }

        // ========================================================
        // MENSAJE
        // ========================================================

        function mostrarMensaje(
            mensaje,
            tipo
        ) {

            formMessage.textContent =
                mensaje;

            formMessage.className =
                `form-message ${tipo}`;

        }

        // ========================================================
        // GUARDAR FORMULARIO
        // ========================================================

        form.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                console.log(
                    "Formulario de asistencia enviado"
                );

                if (!puedeGestionar) {

                    mostrarMensaje(

                        "No tiene permisos para modificar la asistencia.",

                        "error"

                    );

                    return;

                }

                const studentValue =
                    student.value.trim();

                const dateValue =
                    date.value;

                const statusValue =
                    status.value;

                const teacherValue =
                    teacher.value.trim();

                const observationValue =
                    observation.value.trim();

                console.log(
                    "Datos:",
                    {
                        studentValue,
                        dateValue,
                        statusValue,
                        teacherValue,
                        observationValue
                    }
                );

                // ====================================================
                // VALIDACIONES
                // ====================================================

                if (

                    !studentValue ||

                    !dateValue ||

                    !statusValue ||

                    !teacherValue

                ) {

                    mostrarMensaje(

                        "Complete todos los campos obligatorios.",

                        "error"

                    );

                    return;

                }

                // ====================================================
                // EDITAR
                // ====================================================

                if (
                    asistenciaEditando
                ) {

                    const item =
                        asistencias.find(
                            item =>
                                item.id ===
                                asistenciaEditando
                        );

                    if (!item) {

                        mostrarMensaje(

                            "No se encontró el registro.",

                            "error"

                        );

                        return;

                    }

                    item.student =
                        studentValue;

                    item.date =
                        dateValue;

                    item.status =
                        statusValue;

                    item.teacher =
                        teacherValue;

                    item.observation =
                        observationValue;

                    mostrarMensaje(

                        "Registro de asistencia actualizado correctamente.",

                        "success"

                    );

                }

                // ====================================================
                // NUEVO REGISTRO
                // ====================================================

                else {

                    const nuevoRegistro = {

                        id:
                            Date.now(),

                        student:
                            studentValue,

                        date:
                            dateValue,

                        status:
                            statusValue,

                        teacher:
                            teacherValue,

                        observation:
                            observationValue

                    };

                    asistencias.push(
                        nuevoRegistro
                    );

                    console.log(
                        "Nuevo registro:",
                        nuevoRegistro
                    );

                    mostrarMensaje(

                        "Asistencia registrada correctamente.",

                        "success"

                    );

                }

                // ====================================================
                // GUARDAR
                // ====================================================

                guardarAsistencias();

                // ====================================================
                // ACTUALIZAR TABLA
                // ====================================================

                renderizarAsistencias();

                // ====================================================
                // CERRAR
                // ====================================================

                setTimeout(
                    () => {

                        cerrarFormulario();

                    },
                    700
                );

            }
        );

        // ========================================================
        // BOTÓN NUEVA ASISTENCIA
        // ========================================================

        if (
            newAttendanceButton
        ) {

            newAttendanceButton.addEventListener(
                "click",
                function() {

                    if (!puedeGestionar) {

                        alert(
                            "Los estudiantes y familias tienen permisos de solo consulta."
                        );

                        return;

                    }

                    limpiarFormulario();

                    cargarEstudiantesEnFormulario();

                    formSection.hidden =
                        false;

                    student.focus();

                }
            );

        }

        // ========================================================
        // BOTONES CANCELAR
        // ========================================================

        if (
            cancelButton
        ) {

            cancelButton.addEventListener(
                "click",
                cerrarFormulario
            );

        }

        if (
            cancelButtonBottom
        ) {

            cancelButtonBottom.addEventListener(
                "click",
                cerrarFormulario
            );

        }

        // ========================================================
        // FILTROS
        // ========================================================

        searchInput.addEventListener(
            "input",
            renderizarAsistencias
        );

        dateFilter.addEventListener(
            "change",
            renderizarAsistencias
        );

        studentFilter.addEventListener(
            "change",
            renderizarAsistencias
        );

        statusFilter.addEventListener(
            "change",
            renderizarAsistencias
        );

        // ========================================================
        // ACCIONES DE LA TABLA
        // ========================================================

        tableBody.addEventListener(
            "click",
            function(event) {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!button) {

                    return;

                }

                const id =
                    Number(
                        button.dataset.id
                    );

                const action =
                    button.dataset.action;

                if (
                    action === "edit"
                ) {

                    editarAsistencia(
                        id
                    );

                }

                if (
                    action === "delete"
                ) {

                    eliminarAsistencia(
                        id
                    );

                }

            }
        );

        // ========================================================
        // ACTUALIZAR SI CAMBIAN LOS ESTUDIANTES
        // ========================================================

        window.addEventListener(
            "storage",
            function(event) {

                if (
                    event.key ===
                    "estudiantes"
                ) {

                    cargarEstudiantesEnFormulario();

                }

            }
        );

        // ========================================================
        // INICIALIZAR
        // ========================================================

        establecerFechaActual();

        cargarEstudiantesEnFormulario();

        renderizarAsistencias();

    }

}