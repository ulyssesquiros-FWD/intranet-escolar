# Intranet Escolar

Sistema web de gestión interna para una institución educativa pública.

## Descripción

La **Intranet Escolar** es un prototipo de aplicación web diseñado para centralizar información y servicios de uso interno de una institución educativa.

El sistema permitirá que el personal administrativo, docentes, estudiantes y familias accedan a las funciones que correspondan según su rol.

El proyecto se desarrolla como una aplicación académica y no está destinado inicialmente a un entorno de producción.

## Objetivo

Construir una intranet escolar funcional que permita:

* Gestionar usuarios.
* Registrar y consultar calificaciones.
* Controlar la asistencia.
* Publicar y consultar comunicados.
* Mostrar información de acuerdo con el rol del usuario.
* Mantener una documentación técnica completa utilizando Markdown.
* Utilizar Git y GitHub para controlar las versiones del proyecto.

## Roles del sistema

El sistema contará con tres perfiles principales:

| Rol                | Funciones principales                                                         |
| ------------------ | ----------------------------------------------------------------------------- |
| Administración     | Gestionar usuarios, administrar información académica y publicar comunicados. |
| Docente            | Registrar calificaciones, controlar asistencia y consultar comunicados.       |
| Estudiante/Familia | Consultar calificaciones, asistencia, horarios y comunicados.                 |

## Funcionalidades

### Autenticación

El sistema contará con un inicio de sesión que permitirá identificar al usuario y determinar las funciones disponibles según su rol.

### Gestión de usuarios

El personal de administración podrá:

* Crear usuarios.
* Consultar usuarios.
* Editar usuarios.
* Eliminar usuarios.
* Asignar roles.

### Módulo académico

El sistema permitirá gestionar información académica, incluyendo:

* Registro de calificaciones.
* Consulta de calificaciones.
* Registro de asistencia.
* Consulta de asistencia.

### Comunicados

La administración podrá crear comunicados para la comunidad educativa.

Los usuarios podrán consultar los avisos publicados por la institución.

## Tecnologías

El proyecto utilizará las siguientes tecnologías:

* HTML
* CSS
* JavaScript
* Node.js
* Express
* PostgreSQL
* Git
* GitHub
* Markdown

## Requisitos previos

Para ejecutar el proyecto se necesitará tener instalado:

* [Node.js](https://nodejs.org/)
* Git
* Visual Studio Code
* PostgreSQL

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ulyssesquiros-FWD/intranet-escolar.git
```

### 2. Entrar en la carpeta

```bash
cd intranet-escolar
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Se utilizará un archivo `.env` para almacenar la configuración sensible de la aplicación.

Ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=intranet_escolar
DB_USER=postgres
DB_PASSWORD=tu_password
```

El archivo `.env` no debe subirse al repositorio porque está incluido en `.gitignore`.

### 5. Ejecutar el proyecto

Cuando el backend esté implementado, se podrá iniciar mediante:

```bash
npm start
```

## Ejemplo de uso

Un usuario ingresa al sistema utilizando sus credenciales.

```text
Usuario: docente01
Contraseña: ********
Rol: Docente
```

Después de iniciar sesión, el sistema mostrará el panel correspondiente al rol del usuario.

Por ejemplo, un docente podrá acceder a:

1. Calificaciones.
2. Asistencia.
3. Comunicados.

Un estudiante o familiar podrá consultar la información que le corresponda, sin acceder a las funciones administrativas.

## Estructura del proyecto

```text
intranet-escolar/
│
├── backend/
│
├── docs/
│
├── frontend/
│   ├── css/
│   └── js/
│
├── .gitignore
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── AGENTS.md
```

## Estado del proyecto

Actualmente el proyecto se encuentra en fase inicial de desarrollo.

### Progreso

* [x] Crear repositorio Git.
* [x] Crear estructura inicial.
* [x] Configurar `.gitignore`.
* [x] Crear `package.json`.
* [x] Conectar repositorio con GitHub.
* [x] Crear README.
* [ ] Crear documentación de arquitectura.
* [ ] Definir requerimientos detallados.
* [ ] Crear memoria del agente.
* [ ] Implementar autenticación.
* [ ] Implementar gestión de usuarios.
* [ ] Implementar módulo académico.
* [ ] Implementar asistencia.
* [ ] Implementar comunicados.
* [ ] Realizar pruebas.
* [ ] Completar documentación.
* [ ] Preparar versión final.

## Documentación

La documentación del proyecto se encuentra dentro de la carpeta `docs/`.

Los documentos principales serán:

* `docs/arquitectura.md` — decisiones técnicas y estructura del sistema.
* `docs/requerimientos.md` — requerimientos funcionales y no funcionales.
* `AGENTS.md` — memoria del proyecto para asistentes de código.
* `CONTRIBUTING.md` — reglas de colaboración.
* `CHANGELOG.md` — historial de cambios.

## Accesibilidad y privacidad

El proyecto busca mantener una interfaz clara y accesible, considerando:

* Contraste adecuado.
* Etiquetas para los campos de formularios.
* Navegación mediante teclado.
* Separación de permisos según el rol.
* Protección de información personal.
* No exposición innecesaria de datos sensibles.

## Licencia

Este proyecto se desarrolla con fines académicos para el proyecto final de Intranet Escolar.

Copyright © 2026 — Proyecto Intranet Escolar.
