const usuariosIniciales = [
    {
        id: 1,
        username: "admin01",
        name: "Administrador",
        email: "admin@intranet.local",
        role: "administracion",
        status: "activo",
        password: "Admin123"
    },
    {
        id: 2,
        username: "docente01",
        name: "Docente de prueba",
        email: "docente@intranet.local",
        role: "docente",
        status: "activo",
        password: "Docente123"
    },
    {
        id: 3,
        username: "estudiante01",
        name: "Estudiante de prueba",
        email: "estudiante@intranet.local",
        role: "estudiante",
        status: "activo",
        password: "Estudiante123"
    }
];

let usuarios = JSON.parse(
    localStorage.getItem("usuarios")
) || usuariosIniciales;

let usuarioEditando = null;

const tableBody =
    document.getElementById("usersTableBody");

const userCounter =
    document.getElementById("userCounter");

const searchInput =
    document.getElementById("searchInput");

const roleFilter =
    document.getElementById("roleFilter");

const newUserButton =
    document.getElementById("newUserButton");

const formSection =
    document.getElementById("formSection");

const form =
    document.getElementById("userForm");

const formTitle =
    document.getElementById("formTitle");

const cancelButton =
    document.getElementById("cancelButton");

const cancelButtonBottom =
    document.getElementById("cancelButtonBottom");

const formMessage =
    document.getElementById("formMessage");

const userId =
    document.getElementById("userId");

const username =
    document.getElementById("username");

const nameInput =
    document.getElementById("name");

const email =
    document.getElementById("email");

const role =
    document.getElementById("role");

const password =
    document.getElementById("password");

const status =
    document.getElementById("status");


function guardarUsuarios() {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );
}


function obtenerNombreRol(valor) {

    const roles = {
        administracion: "Administración",
        docente: "Docente",
        estudiante: "Estudiante / Familia"
    };

    return roles[valor] || valor;
}


function obtenerClaseRol(valor) {

    const clases = {
        administracion: "badge-admin",
        docente: "badge-docente",
        estudiante: "badge-estudiante"
    };

    return clases[valor] || "";
}


function obtenerClaseEstado(valor) {

    return valor === "activo"
        ? "status-activo"
        : "status-inactivo";
}


function obtenerUsuariosFiltrados() {

    const texto =
        searchInput.value
            .trim()
            .toLowerCase();

    const filtro =
        roleFilter.value;

    return usuarios.filter(usuario => {

        const coincideTexto =
            usuario.username
                .toLowerCase()
                .includes(texto) ||

            usuario.name
                .toLowerCase()
                .includes(texto) ||

            usuario.email
                .toLowerCase()
                .includes(texto);

        const coincideRol =
            filtro === "todos" ||
            usuario.role === filtro;

        return coincideTexto && coincideRol;
    });
}


function renderizarUsuarios() {

    const lista =
        obtenerUsuariosFiltrados();

    tableBody.innerHTML = "";

    userCounter.textContent =
        `${lista.length} usuario${lista.length === 1 ? "" : "s"}`;

    if (lista.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="6"
                    class="empty-row"
                >
                    No se encontraron usuarios.
                </td>
            </tr>
        `;

        return;
    }

    lista.forEach(usuario => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>
                    ${usuario.username}
                </strong>
            </td>

            <td>
                ${usuario.name}
            </td>

            <td>
                ${usuario.email}
            </td>

            <td>
                <span
                    class="badge ${obtenerClaseRol(usuario.role)}"
                >
                    ${obtenerNombreRol(usuario.role)}
                </span>
            </td>

            <td>
                <span
                    class="status ${obtenerClaseEstado(usuario.status)}"
                >
                    ${usuario.status}
                </span>
            </td>

            <td>
                <div class="actions">

                    <button
                        type="button"
                        class="action-button edit"
                        data-action="edit"
                        data-id="${usuario.id}"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        class="action-button delete"
                        data-action="delete"
                        data-id="${usuario.id}"
                    >
                        Eliminar
                    </button>

                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


function mostrarFormulario() {

    formSection.hidden = false;

    username.focus();
}


function limpiarFormulario() {

    form.reset();

    userId.value = "";

    usuarioEditando = null;

    formTitle.textContent =
        "Nuevo usuario";

    password.required = true;

    formMessage.textContent = "";

    formMessage.className =
        "form-message";
}


function cerrarFormulario() {

    formSection.hidden = true;

    limpiarFormulario();
}


function editarUsuario(id) {

    const usuario =
        usuarios.find(
            usuario => usuario.id === id
        );

    if (!usuario) {
        return;
    }

    usuarioEditando = usuario.id;

    userId.value = usuario.id;

    username.value =
        usuario.username;

    nameInput.value =
        usuario.name;

    email.value =
        usuario.email;

    role.value =
        usuario.role;

    status.value =
        usuario.status;

    password.value = "";

    password.required = false;

    formTitle.textContent =
        "Editar usuario";

    formMessage.textContent =
        "Deja la contraseña vacía para conservar la actual.";

    formMessage.className =
        "form-message";

    mostrarFormulario();
}


function eliminarUsuario(id) {

    const usuario =
        usuarios.find(
            usuario => usuario.id === id
        );

    if (!usuario) {
        return;
    }

    const confirmar =
        window.confirm(
            `¿Desea eliminar al usuario "${usuario.username}"?`
        );

    if (!confirmar) {
        return;
    }

    usuarios =
        usuarios.filter(
            usuario => usuario.id !== id
        );

    guardarUsuarios();

    renderizarUsuarios();
}


function mostrarMensaje(mensaje, tipo) {

    formMessage.textContent =
        mensaje;

    formMessage.className =
        `form-message ${tipo}`;
}


form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const usernameValue =
            username.value.trim();

        const nameValue =
            nameInput.value.trim();

        const emailValue =
            email.value.trim();

        const roleValue =
            role.value;

        const statusValue =
            status.value;

        const passwordValue =
            password.value;

        if (
            !usernameValue ||
            !nameValue ||
            !emailValue ||
            !roleValue ||
            !statusValue
        ) {

            mostrarMensaje(
                "Complete todos los campos obligatorios.",
                "error"
            );

            return;
        }

        const usernameDuplicado =
            usuarios.some(usuario =>
                usuario.username === usernameValue &&
                usuario.id !== usuarioEditando
            );

        if (usernameDuplicado) {

            mostrarMensaje(
                "El nombre de usuario ya existe.",
                "error"
            );

            return;
        }


        if (!usuarioEditando && !passwordValue) {

            mostrarMensaje(
                "La contraseña es obligatoria para nuevos usuarios.",
                "error"
            );

            return;
        }


        if (
            passwordValue &&
            passwordValue.length < 6
        ) {

            mostrarMensaje(
                "La contraseña debe tener al menos 6 caracteres.",
                "error"
            );

            return;
        }


        if (usuarioEditando) {

            const usuario =
                usuarios.find(
                    usuario =>
                        usuario.id === usuarioEditando
                );

            usuario.username =
                usernameValue;

            usuario.name =
                nameValue;

            usuario.email =
                emailValue;

            usuario.role =
                roleValue;

            usuario.status =
                statusValue;

            if (passwordValue) {
                usuario.password =
                    passwordValue;
            }

            mostrarMensaje(
                "Usuario actualizado correctamente.",
                "success"
            );

        } else {

            const nuevoUsuario = {

                id:
                    Date.now(),

                username:
                    usernameValue,

                name:
                    nameValue,

                email:
                    emailValue,

                role:
                    roleValue,

                status:
                    statusValue,

                password:
                    passwordValue
            };

            usuarios.push(nuevoUsuario);

            mostrarMensaje(
                "Usuario creado correctamente.",
                "success"
            );
        }

        guardarUsuarios();

        renderizarUsuarios();

        setTimeout(() => {
            cerrarFormulario();
        }, 500);
    }
);


newUserButton.addEventListener(
    "click",
    function() {

        limpiarFormulario();

        formSection.hidden = false;

        username.focus();
    }
);


cancelButton.addEventListener(
    "click",
    cerrarFormulario
);


cancelButtonBottom.addEventListener(
    "click",
    cerrarFormulario
);


searchInput.addEventListener(
    "input",
    renderizarUsuarios
);


roleFilter.addEventListener(
    "change",
    renderizarUsuarios
);


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
            Number(button.dataset.id);

        const action =
            button.dataset.action;

        if (action === "edit") {
            editarUsuario(id);
        }

        if (action === "delete") {
            eliminarUsuario(id);
        }
    }
);


renderizarUsuarios();