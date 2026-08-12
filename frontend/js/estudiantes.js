// ============================================================
// CONTROL DE ACCESO
// ============================================================

const usuarioSesion =
    localStorage.getItem("usuarioLogueado");


if (!usuarioSesion) {

    window.location.href =
        "./index.html";

} else {

    const usuarioActual =
        JSON.parse(usuarioSesion);


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
            usuarioActual.role === "administracion";


        // ========================================================
        // DATOS INICIALES
        // ========================================================

        const estudiantesIniciales = [

            {
                id: 1,
                identification: "1-1001-0001",
                fullName: "Estudiante 01",
                birthDate: "2014-03-15",
                level: "primaria",
                grade: "4",
                section: "A",
                guardian: "Encargado 01",
                phone: "8888-0001",
                email: "estudiante01@correo.com",
                active: true
            },

            {
                id: 2,
                identification: "1-1002-0002",
                fullName: "Estudiante 02",
                birthDate: "2012-07-20",
                level: "secundaria",
                grade: "7",
                section: "A",
                guardian: "Encargado 02",
                phone: "8888-0002",
                email: "estudiante02@correo.com",
                active: true
            },

            {
                id: 3,
                identification: "1-1003-0003",
                fullName: "Estudiante 03",
                birthDate: "2010-11-05",
                level: "secundaria",
                grade: "9",
                section: "B",
                guardian: "Encargado 03",
                phone: "8888-0003",
                email: "estudiante03@correo.com",
                active: true
            },

            {
                id: 4,
                identification: "1-1004-0004",
                fullName: "Estudiante 04",
                birthDate: "2015-01-25",
                level: "primaria",
                grade: "3",
                section: "B",
                guardian: "Encargado 04",
                phone: "8888-0004",
                email: "estudiante04@correo.com",
                active: false
            }

        ];


        let estudiantes =
            JSON.parse(
                localStorage.getItem(
                    "estudiantes"
                )
            ) || estudiantesIniciales;


        let estudianteEditando = null;


        // ========================================================
        // ELEMENTOS
        // ========================================================

        const tableBody =
            document.getElementById(
                "studentsTableBody"
            );


        const studentCounter =
            document.getElementById(
                "studentCounter"
            );


        const totalCounter =
            document.getElementById(
                "totalCounter"
            );


        const primaryCounter =
            document.getElementById(
                "primaryCounter"
            );


        const secondaryCounter =
            document.getElementById(
                "secondaryCounter"
            );


        const activeCounter =
            document.getElementById(
                "activeCounter"
            );


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const levelFilter =
            document.getElementById(
                "levelFilter"
            );


        const gradeFilter =
            document.getElementById(
                "gradeFilter"
            );


        const newStudentButton =
            document.getElementById(
                "newStudentButton"
            );


        const formSection =
            document.getElementById(
                "formSection"
            );


        const form =
            document.getElementById(
                "studentForm"
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


        const studentId =
            document.getElementById(
                "studentId"
            );


        const identification =
            document.getElementById(
                "identification"
            );


        const fullName =
            document.getElementById(
                "fullName"
            );


        const birthDate =
            document.getElementById(
                "birthDate"
            );


        const level =
            document.getElementById(
                "level"
            );


        const grade =
            document.getElementById(
                "grade"
            );


        const section =
            document.getElementById(
                "section"
            );


        const guardian =
            document.getElementById(
                "guardian"
            );


        const phone =
            document.getElementById(
                "phone"
            );


        const email =
            document.getElementById(
                "email"
            );


        // ========================================================
        // GUARDAR
        // ========================================================

        function guardarEstudiantes() {

            localStorage.setItem(
                "estudiantes",
                JSON.stringify(
                    estudiantes
                )
            );

        }


        // ========================================================
        // GRADOS
        // ========================================================

        function obtenerGrados(levelValue) {

            if (
                levelValue ===
                "primaria"
            ) {

                return [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6"
                ];

            }


            if (
                levelValue ===
                "secundaria"
            ) {

                return [
                    "7",
                    "8",
                    "9",
                    "10",
                    "11"
                ];

            }


            return [];

        }


        function cargarGrados(
            levelValue,
            selectedGrade = ""
        ) {

            const grados =
                obtenerGrados(
                    levelValue
                );


            grade.innerHTML = `

                <option value="">
                    Seleccione un grado
                </option>

            `;


            grados.forEach(
                gradoValue => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        gradoValue;


                    option.textContent =
                        `${gradoValue}°`;


                    grade.appendChild(
                        option
                    );

                }
            );


            if (
                grados.includes(
                    selectedGrade
                )
            ) {

                grade.value =
                    selectedGrade;

            }

        }


        // ========================================================
        // FILTRO DE GRADOS
        // ========================================================

        function actualizarFiltroGrados() {

            const grados = [

                ...new Set(

                    estudiantes.map(
                        item =>
                            item.grade
                    )

                )

            ].sort(
                (a, b) =>
                    Number(a) -
                    Number(b)
            );


            const gradoActual =
                gradeFilter.value;


            gradeFilter.innerHTML = `

                <option value="todos">
                    Todos los grados
                </option>

            `;


            grados.forEach(
                gradoValue => {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        gradoValue;


                    option.textContent =
                        `${gradoValue}°`;


                    gradeFilter.appendChild(
                        option
                    );

                }
            );


            if (
                grados.includes(
                    gradoActual
                )
            ) {

                gradeFilter.value =
                    gradoActual;

            } else {

                gradeFilter.value =
                    "todos";

            }

        }


        // ========================================================
        // FILTRAR
        // ========================================================

        function obtenerEstudiantesFiltrados() {

            const texto =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const nivel =
                levelFilter.value;


            const grado =
                gradeFilter.value;


            return estudiantes.filter(
                item => {

                    const coincideTexto =

                        item.fullName
                            .toLowerCase()
                            .includes(texto)

                        ||

                        item.identification
                            .toLowerCase()
                            .includes(texto);


                    const coincideNivel =

                        nivel === "todos"

                        ||

                        item.level ===
                            nivel;


                    const coincideGrado =

                        grado === "todos"

                        ||

                        item.grade ===
                            grado;


                    return (

                        coincideTexto &&

                        coincideNivel &&

                        coincideGrado

                    );

                }
            );

        }


        // ========================================================
        // RESUMEN
        // ========================================================

        function actualizarResumen(
            lista
        ) {

            const total =
                lista.length;


            const primaria =
                lista.filter(
                    item =>
                        item.level ===
                        "primaria"
                ).length;


            const secundaria =
                lista.filter(
                    item =>
                        item.level ===
                        "secundaria"
                ).length;


            const activos =
                lista.filter(
                    item =>
                        item.active
                ).length;


            totalCounter.textContent =
                total;


            primaryCounter.textContent =
                primaria;


            secondaryCounter.textContent =
                secundaria;


            activeCounter.textContent =
                activos;


            studentCounter.textContent =

                `${total} estudiante${
                    total === 1
                        ? ""
                        : "s"
                }`;

        }


        // ========================================================
        // RENDERIZAR
        // ========================================================

        function renderizarEstudiantes() {

            actualizarFiltroGrados();


            const lista =
                obtenerEstudiantesFiltrados();


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
                            colspan="8"
                            class="empty-row"
                        >

                            No se encontraron
                            estudiantes.

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
                            ${item.identification}
                        </td>


                        <td>

                            <strong>
                                ${item.fullName}
                            </strong>

                        </td>


                        <td>
                            ${
                                item.level ===
                                "primaria"
                                    ? "Primaria"
                                    : "Secundaria"
                            }
                        </td>


                        <td>
                            ${item.grade}°
                        </td>


                        <td>
                            ${item.section}
                        </td>


                        <td>
                            ${item.guardian}
                        </td>


                        <td>

                            <span
                                class="status
                                ${
                                    item.active
                                        ? "status-active"
                                        : "status-inactive"
                                }"
                            >

                                ${
                                    item.active
                                        ? "Activo"
                                        : "Inactivo"
                                }

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
                    "Solo Administración puede gestionar estudiantes."
                );

                return;

            }


            formSection.hidden =
                false;


            fullName.focus();

        }


        function limpiarFormulario() {

            form.reset();


            studentId.value =
                "";


            estudianteEditando =
                null;


            formTitle.textContent =
                "Nuevo estudiante";


            formMessage.textContent =
                "";


            formMessage.className =
                "form-message";


            cargarGrados("");

        }


        function cerrarFormulario() {

            formSection.hidden =
                true;


            limpiarFormulario();

        }


        // ========================================================
        // EDITAR
        // ========================================================

        function editarEstudiante(id) {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración puede editar estudiantes."
                );

                return;

            }


            const item =
                estudiantes.find(
                    item =>
                        item.id === id
                );


            if (!item) {

                return;

            }


            estudianteEditando =
                item.id;


            studentId.value =
                item.id;


            identification.value =
                item.identification;


            fullName.value =
                item.fullName;


            birthDate.value =
                item.birthDate;


            level.value =
                item.level;


            cargarGrados(
                item.level,
                item.grade
            );


            section.value =
                item.section;


            guardian.value =
                item.guardian;


            phone.value =
                item.phone || "";


            email.value =
                item.email || "";


            formTitle.textContent =
                "Editar estudiante";


            mostrarFormulario();

        }


        // ========================================================
        // ELIMINAR
        // ========================================================

        function eliminarEstudiante(id) {

            if (!puedeGestionar) {

                alert(
                    "Solo Administración puede eliminar estudiantes."
                );

                return;

            }


            const item =
                estudiantes.find(
                    item =>
                        item.id === id
                );


            if (!item) {

                return;

            }


            const confirmar =
                window.confirm(

                    `¿Desea eliminar a ${item.fullName}?`

                );


            if (!confirmar) {

                return;

            }


            estudiantes =
                estudiantes.filter(
                    item =>
                        item.id !== id
                );


            guardarEstudiantes();


            renderizarEstudiantes();

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


                if (!puedeGestionar) {

                    mostrarMensaje(

                        "No tiene permisos para modificar estudiantes.",

                        "error"

                    );

                    return;

                }


                const identificationValue =
                    identification.value.trim();


                const fullNameValue =
                    fullName.value.trim();


                const birthDateValue =
                    birthDate.value;


                const levelValue =
                    level.value;


                const gradeValue =
                    grade.value;


                const sectionValue =
                    section.value.trim();


                const guardianValue =
                    guardian.value.trim();


                const phoneValue =
                    phone.value.trim();


                const emailValue =
                    email.value.trim();


                // ------------------------------------------------
                // VALIDACIONES
                // ------------------------------------------------

                if (

                    !identificationValue ||

                    !fullNameValue ||

                    !birthDateValue ||

                    !levelValue ||

                    !gradeValue ||

                    !sectionValue ||

                    !guardianValue

                ) {

                    mostrarMensaje(

                        "Complete todos los campos obligatorios.",

                        "error"

                    );

                    return;

                }


                // ------------------------------------------------
                // IDENTIFICACIÓN DUPLICADA
                // ------------------------------------------------

                const identificacionDuplicada =

                    estudiantes.some(
                        item =>

                            item.identification
                                .toLowerCase() ===
                            identificationValue
                                .toLowerCase()

                            &&

                            item.id !==
                            estudianteEditando
                    );


                if (
                    identificacionDuplicada
                ) {

                    mostrarMensaje(

                        "Ya existe un estudiante con esa identificación.",

                        "error"

                    );

                    return;

                }


                // ------------------------------------------------
                // EDITAR
                // ------------------------------------------------

                if (
                    estudianteEditando
                ) {

                    const item =
                        estudiantes.find(
                            item =>
                                item.id ===
                                estudianteEditando
                        );


                    if (!item) {

                        return;

                    }


                    item.identification =
                        identificationValue;


                    item.fullName =
                        fullNameValue;


                    item.birthDate =
                        birthDateValue;


                    item.level =
                        levelValue;


                    item.grade =
                        gradeValue;


                    item.section =
                        sectionValue;


                    item.guardian =
                        guardianValue;


                    item.phone =
                        phoneValue;


                    item.email =
                        emailValue;


                    mostrarMensaje(

                        "Estudiante actualizado correctamente.",

                        "success"

                    );

                }


                // ------------------------------------------------
                // NUEVO
                // ------------------------------------------------

                else {

                    const nuevoEstudiante = {

                        id:
                            Date.now(),

                        identification:
                            identificationValue,

                        fullName:
                            fullNameValue,

                        birthDate:
                            birthDateValue,

                        level:
                            levelValue,

                        grade:
                            gradeValue,

                        section:
                            sectionValue,

                        guardian:
                            guardianValue,

                        phone:
                            phoneValue,

                        email:
                            emailValue,

                        active:
                            true

                    };


                    estudiantes.push(
                        nuevoEstudiante
                    );


                    mostrarMensaje(

                        "Estudiante registrado correctamente.",

                        "success"

                    );

                }


                guardarEstudiantes();


                renderizarEstudiantes();


                setTimeout(
                    () => {

                        cerrarFormulario();

                    },
                    700
                );

            }
        );


        // ========================================================
        // NUEVO ESTUDIANTE
        // ========================================================

        if (
            newStudentButton
        ) {

            newStudentButton.addEventListener(
                "click",
                function() {

                    if (!puedeGestionar) {

                        alert(
                            "Solo Administración puede registrar estudiantes."
                        );

                        return;

                    }


                    limpiarFormulario();


                    formSection.hidden =
                        false;


                    fullName.focus();

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
        // CAMBIO DE NIVEL
        // ========================================================

        level.addEventListener(
            "change",
            function() {

                cargarGrados(
                    level.value
                );

            }
        );


        // ========================================================
        // FILTROS
        // ========================================================

        searchInput.addEventListener(
            "input",
            renderizarEstudiantes
        );


        levelFilter.addEventListener(
            "change",
            renderizarEstudiantes
        );


        gradeFilter.addEventListener(
            "change",
            renderizarEstudiantes
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

                    editarEstudiante(
                        id
                    );

                }


                if (
                    action === "delete"
                ) {

                    eliminarEstudiante(
                        id
                    );

                }

            }
        );


        // ========================================================
        // INICIALIZAR
        // ========================================================

        cargarGrados("");

        renderizarEstudiantes();

    }

}