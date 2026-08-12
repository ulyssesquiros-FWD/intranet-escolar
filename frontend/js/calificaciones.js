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
    // ROLES
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

        const calificacionesIniciales = [

            {
                id: 1,
                student: "Estudiante 01",
                subject: "Matemática",
                period: "I Periodo",
                grade: 85,
                teacher: "Docente de Matemática"
            },

            {
                id: 2,
                student: "Estudiante 01",
                subject: "Español",
                period: "I Periodo",
                grade: 90,
                teacher: "Docente de Español"
            },

            {
                id: 3,
                student: "Estudiante 02",
                subject: "Matemática",
                period: "I Periodo",
                grade: 78,
                teacher: "Docente de Matemática"
            },

            {
                id: 4,
                student: "Estudiante 02",
                subject: "Ciencias",
                period: "I Periodo",
                grade: 92,
                teacher: "Docente de Ciencias"
            }

        ];


        let calificaciones =
            JSON.parse(
                localStorage.getItem(
                    "calificaciones"
                )
            ) || calificacionesIniciales;


        let calificacionEditando = null;


        // ========================================================
        // ELEMENTOS
        // ========================================================

        const tableBody =
            document.getElementById(
                "gradesTableBody"
            );


        const gradeCounter =
            document.getElementById(
                "gradeCounter"
            );


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const studentFilter =
            document.getElementById(
                "studentFilter"
            );


        const subjectFilter =
            document.getElementById(
                "subjectFilter"
            );


        const newGradeButton =
            document.getElementById(
                "newGradeButton"
            );


        const formSection =
            document.getElementById(
                "formSection"
            );


        const form =
            document.getElementById(
                "gradeForm"
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


        const gradeId =
            document.getElementById(
                "gradeId"
            );


        const student =
            document.getElementById(
                "student"
            );


        const subject =
            document.getElementById(
                "subject"
            );


        const period =
            document.getElementById(
                "period"
            );


        const grade =
            document.getElementById(
                "grade"
            );


        const teacher =
            document.getElementById(
                "teacher"
            );


        // ========================================================
        // GUARDAR CALIFICACIONES
        // ========================================================

        function guardarCalificaciones() {

            localStorage.setItem(
                "calificaciones",
                JSON.stringify(
                    calificaciones
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
                        item =>
                            item &&
                            item.fullName
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

            if (!student) {

                return;

            }


            /*
             * Convertimos el campo actual en SELECT
             * solamente si todavía no lo es.
             */

            if (
                student.tagName !==
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
                    student.className;


                student.replaceWith(
                    select
                );

            }


            const studentSelect =
                document.getElementById(
                    "student"
                );


            const estudiantes =
                obtenerEstudiantesRegistrados();


            studentSelect.innerHTML = `

                <option value="">
                    Seleccione un estudiante
                </option>

            `;


            // ====================================================
            // ESTUDIANTES DEL MÓDULO
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
                            estudiante.identification
                        }`;


                    studentSelect.appendChild(
                        option
                    );

                }
            );


            // ====================================================
            // COMPATIBILIDAD CON DATOS ANTIGUOS
            // ====================================================

            /*
             * Si existen calificaciones antiguas con estudiantes
             * que todavía no están en el módulo Estudiantes,
             * los agregamos temporalmente para no perder datos.
             */

            const nombresExistentes = [

                ...new Set(

                    calificaciones
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
                            studentSelect.options
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


                        studentSelect.appendChild(
                            option
                        );

                    }

                }
            );


            if (
                estudianteSeleccionado
            ) {

                studentSelect.value =
                    estudianteSeleccionado;

            }

        }


        // ========================================================
        // CLASE DE CALIFICACIÓN
        // ========================================================

        function obtenerClaseCalificacion(
            valor
        ) {

            if (valor >= 90) {

                return "grade-excellent";

            }


            if (valor >= 80) {

                return "grade-good";

            }


            if (valor >= 70) {

                return "grade-warning";

            }


            return "grade-fail";

        }


        // ========================================================
        // ESTADO
        // ========================================================

        function obtenerEstado(
            valor
        ) {

            return valor >= 70
                ? "Aprobado"
                : "Reprobado";

        }


        function obtenerClaseEstado(
            valor
        ) {

            return valor >= 70
                ? "status-approved"
                : "status-failed";

        }


        // ========================================================
        // ACTUALIZAR FILTROS
        // ========================================================

        function actualizarFiltros() {

            /*
             * Los filtros también se alimentan de las
             * calificaciones existentes.
             */

            const estudiantes = [

                ...new Set(

                    calificaciones.map(
                        item =>
                            item.student
                    )

                )

            ].sort();


            const materias = [

                ...new Set(

                    calificaciones.map(
                        item =>
                            item.subject
                    )

                )

            ].sort();


            const estudianteActual =
                studentFilter.value;


            const materiaActual =
                subjectFilter.value;


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


            subjectFilter.innerHTML = `

                <option value="todos">
                    Todas las materias
                </option>

            `;


            materias.forEach(
                materia => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        materia;


                    option.textContent =
                        materia;


                    subjectFilter.appendChild(
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


            if (
                materias.includes(
                    materiaActual
                )
            ) {

                subjectFilter.value =
                    materiaActual;

            } else {

                subjectFilter.value =
                    "todos";

            }

        }


        // ========================================================
        // FILTRAR
        // ========================================================

        function obtenerCalificacionesFiltradas() {

            const texto =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const estudiante =
                studentFilter.value;


            const materia =
                subjectFilter.value;


            return calificaciones.filter(
                item => {

                    const coincideTexto =

                        item.student
                            .toLowerCase()
                            .includes(texto)

                        ||

                        item.subject
                            .toLowerCase()
                            .includes(texto);


                    const coincideEstudiante =

                        estudiante === "todos"

                        ||

                        item.student ===
                            estudiante;


                    const coincideMateria =

                        materia === "todos"

                        ||

                        item.subject ===
                            materia;


                    return (

                        coincideTexto &&

                        coincideEstudiante &&

                        coincideMateria

                    );

                }
            );

        }


        // ========================================================
        // RENDERIZAR TABLA
        // ========================================================

        function renderizarCalificaciones() {

            actualizarFiltros();


            const lista =
                obtenerCalificacionesFiltradas();


            tableBody.innerHTML =
                "";


            gradeCounter.textContent =

                `${lista.length} calificación${
                    lista.length === 1
                        ? ""
                        : "es"
                }`;


            if (
                lista.length === 0
            ) {

                tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="7"
                            class="empty-row"
                        >

                            No se encontraron
                            calificaciones.

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
                            ${item.subject}
                        </td>


                        <td>
                            ${item.period}
                        </td>


                        <td>

                            <span
                                class="grade
                                ${obtenerClaseCalificacion(
                                    item.grade
                                )}"
                            >

                                ${item.grade}

                            </span>

                        </td>


                        <td>
                            ${item.teacher}
                        </td>


                        <td>

                            <span
                                class="status
                                ${obtenerClaseEstado(
                                    item.grade
                                )}"
                            >

                                ${obtenerEstado(
                                    item.grade
                                )}

                            </span>

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
        // FORMULARIO
        // ========================================================

        function mostrarFormulario() {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración y Docentes pueden gestionar calificaciones."
                );

                return;

            }


            cargarEstudiantesEnFormulario();


            formSection.hidden =
                false;


            const studentSelect =
                document.getElementById(
                    "student"
                );


            if (studentSelect) {

                studentSelect.focus();

            }

        }


        function limpiarFormulario() {

            form.reset();


            gradeId.value =
                "";


            calificacionEditando =
                null;


            formTitle.textContent =
                "Nueva calificación";


            formMessage.textContent =
                "";


            formMessage.className =
                "form-message";


            cargarEstudiantesEnFormulario();

        }


        function cerrarFormulario() {

            formSection.hidden =
                true;


            limpiarFormulario();

        }


        // ========================================================
        // EDITAR
        // ========================================================

        function editarCalificacion(
            id
        ) {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración y Docentes pueden editar calificaciones."
                );

                return;

            }


            const item =
                calificaciones.find(
                    item =>
                        item.id === id
                );


            if (!item) {

                return;

            }


            calificacionEditando =
                item.id;


            gradeId.value =
                item.id;


            cargarEstudiantesEnFormulario(
                item.student
            );


            const studentSelect =
                document.getElementById(
                    "student"
                );


            if (studentSelect) {

                studentSelect.value =
                    item.student;

            }


            subject.value =
                item.subject;


            period.value =
                item.period;


            grade.value =
                item.grade;


            teacher.value =
                item.teacher;


            formTitle.textContent =
                "Editar calificación";


            mostrarFormulario();

        }


        // ========================================================
        // ELIMINAR
        // ========================================================

        function eliminarCalificacion(
            id
        ) {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración y Docentes pueden eliminar calificaciones."
                );

                return;

            }


            const item =
                calificaciones.find(
                    item =>
                        item.id === id
                );


            if (!item) {

                return;

            }


            const confirmar =
                window.confirm(

                    `¿Desea eliminar la calificación de ${item.student} en ${item.subject}?`

                );


            if (!confirmar) {

                return;

            }


            calificaciones =
                calificaciones.filter(
                    item =>
                        item.id !== id
                );


            guardarCalificaciones();


            renderizarCalificaciones();

        }


        // ========================================================
        // MENSAJES
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


                if (!puedeGestionar) {

                    mostrarMensaje(

                        "No tiene permisos para modificar calificaciones.",

                        "error"

                    );

                    return;

                }


                const studentSelect =
                    document.getElementById(
                        "student"
                    );


                const studentValue =
                    studentSelect
                        ? studentSelect.value.trim()
                        : "";


                const subjectValue =
                    subject.value.trim();


                const periodValue =
                    period.value;


                const gradeValue =
                    Number(
                        grade.value
                    );


                const teacherValue =
                    teacher.value.trim();


                // ====================================================
                // VALIDACIONES
                // ====================================================

                if (

                    !studentValue ||

                    !subjectValue ||

                    !periodValue ||

                    !teacherValue

                ) {

                    mostrarMensaje(

                        "Complete todos los campos obligatorios.",

                        "error"

                    );

                    return;

                }


                if (
                    !Number.isFinite(
                        gradeValue
                    )
                ) {

                    mostrarMensaje(

                        "Ingrese una calificación válida.",

                        "error"

                    );

                    return;

                }


                if (

                    gradeValue < 0 ||

                    gradeValue > 100

                ) {

                    mostrarMensaje(

                        "La calificación debe estar entre 0 y 100.",

                        "error"

                    );

                    return;

                }


                // ====================================================
                // EDITAR
                // ====================================================

                if (
                    calificacionEditando
                ) {

                    const item =
                        calificaciones.find(
                            item =>
                                item.id ===
                                calificacionEditando
                        );


                    if (!item) {

                        return;

                    }


                    item.student =
                        studentValue;


                    item.subject =
                        subjectValue;


                    item.period =
                        periodValue;


                    item.grade =
                        gradeValue;


                    item.teacher =
                        teacherValue;


                    mostrarMensaje(

                        "Calificación actualizada correctamente.",

                        "success"

                    );


                } else {


                    // =================================================
                    // NUEVA CALIFICACIÓN
                    // =================================================

                    const nuevaCalificacion = {

                        id:
                            Date.now(),

                        student:
                            studentValue,

                        subject:
                            subjectValue,

                        period:
                            periodValue,

                        grade:
                            gradeValue,

                        teacher:
                            teacherValue

                    };


                    calificaciones.push(
                        nuevaCalificacion
                    );


                    mostrarMensaje(

                        "Calificación registrada correctamente.",

                        "success"

                    );

                }


                guardarCalificaciones();


                renderizarCalificaciones();


                setTimeout(
                    () => {

                        cerrarFormulario();

                    },
                    500
                );

            }
        );


        // ========================================================
        // NUEVA CALIFICACIÓN
        // ========================================================

        if (
            newGradeButton
        ) {

            newGradeButton.addEventListener(
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


                    const studentSelect =
                        document.getElementById(
                            "student"
                        );


                    if (studentSelect) {

                        studentSelect.focus();

                    }

                }
            );

        }


        // ========================================================
        // CANCELAR
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
        // BÚSQUEDA
        // ========================================================

        searchInput.addEventListener(
            "input",
            renderizarCalificaciones
        );


        studentFilter.addEventListener(
            "change",
            renderizarCalificaciones
        );


        subjectFilter.addEventListener(
            "change",
            renderizarCalificaciones
        );


        // ========================================================
        // ACCIONES DE TABLA
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

                    editarCalificacion(
                        id
                    );

                }


                if (
                    action === "delete"
                ) {

                    eliminarCalificacion(
                        id
                    );

                }

            }
        );


        // ========================================================
        // ACTUALIZAR ESTUDIANTES AUTOMÁTICAMENTE
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

        cargarEstudiantesEnFormulario();

        renderizarCalificaciones();

    }

}