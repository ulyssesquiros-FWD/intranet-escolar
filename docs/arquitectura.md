# Arquitectura del Sistema

## 1. Descripción

La Intranet Escolar será una aplicación web para la gestión interna de una institución educativa pública.

El sistema permitirá que administración, docentes, estudiantes y familias accedan a información y servicios de acuerdo con los permisos correspondientes a cada rol.

La arquitectura se organizará separando la interfaz de usuario, la lógica del servidor y la persistencia de los datos.

## 2. Arquitectura propuesta

El proyecto utilizará una arquitectura dividida en tres partes principales:

```text
┌──────────────────────────────┐
│          Frontend            │
│      HTML / CSS / JS         │
└──────────────┬───────────────┘
               │
               │ HTTP
               ▼
┌──────────────────────────────┐
│           Backend            │
│        Node.js / Express     │
└──────────────┬───────────────┘
               │
               │ SQL
               ▼
┌──────────────────────────────┐
│          PostgreSQL          │
│          Base de datos       │
└──────────────────────────────┘
```

### Frontend

El frontend será responsable de:

* Mostrar las interfaces del sistema.
* Permitir la interacción con los usuarios.
* Validar datos básicos de los formularios.
* Mostrar información según el rol.
* Comunicarse con el backend mediante solicitudes HTTP.

### Backend

El backend será responsable de:

* Procesar las solicitudes del frontend.
* Gestionar la autenticación.
* Aplicar las reglas de autorización.
* Gestionar usuarios.
* Gestionar información académica.
* Gestionar asistencia.
* Gestionar comunicados.
* Comunicarse con la base de datos.

### Base de datos

PostgreSQL será utilizada para almacenar la información persistente del sistema.

Entre las entidades previstas se encuentran:

* Usuarios.
* Estudiantes.
* Docentes.
* Calificaciones.
* Asistencias.
* Comunicados.

## 3. Stack tecnológico

| Tecnología | Uso                              |
| ---------- | -------------------------------- |
| HTML       | Estructura de las páginas        |
| CSS        | Diseño y presentación            |
| JavaScript | Interactividad del frontend      |
| Node.js    | Entorno de ejecución del backend |
| Express    | Framework para el servidor       |
| PostgreSQL | Base de datos relacional         |
| Git        | Control de versiones             |
| GitHub     | Repositorio remoto               |
| Markdown   | Documentación del proyecto       |

## 4. Estructura del proyecto

```text
intranet-escolar/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
├── docs/
│   ├── arquitectura.md
│   └── requerimientos.md
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   └── dashboard.html
│
├── .gitignore
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── AGENTS.md
```

## 5. Módulos principales

### Autenticación

Permitirá identificar al usuario y determinar el rol con el que accede al sistema.

Los perfiles principales serán:

* Administración.
* Docente.
* Estudiante/Familia.

### Gestión de usuarios

Permitirá a administración registrar, consultar, editar y eliminar usuarios.

### Módulo académico

Permitirá gestionar y consultar información relacionada con las calificaciones y la asistencia.

### Comunicados

Permitirá publicar y consultar avisos de la institución.

### Dashboard

Mostrará las opciones disponibles para cada usuario según su rol.

## 6. Control de acceso

El sistema aplicará autorización basada en roles.

```text
Usuario
   │
   ▼
Inicio de sesión
   │
   ▼
Identificación del rol
   │
   ├── Administración ──► Funciones administrativas
   │
   ├── Docente ─────────► Funciones docentes
   │
   └── Estudiante/Familia ► Funciones de consulta
```

Cada usuario deberá acceder únicamente a las funciones que correspondan a su rol.

## 7. Seguridad

El sistema tendrá en cuenta las siguientes medidas:

* Las contraseñas no deben almacenarse en texto plano.
* Los datos personales deben mantenerse protegidos.
* El acceso a los módulos debe controlarse mediante roles.
* Las variables sensibles deben mantenerse fuera del código fuente.
* El archivo `.env` no debe incluirse en Git.
* No se debe exponer información personal innecesaria.

## 8. Accesibilidad

La interfaz deberá considerar:

* Contraste adecuado.
* Etiquetas descriptivas.
* Navegación clara.
* Navegación mediante teclado.
* Formularios comprensibles.
* Mensajes claros para errores y validaciones.

## 9. Decisiones técnicas

### Node.js y Express

Se utilizarán para construir el backend porque permiten desarrollar una API web utilizando JavaScript y mantener una separación clara entre frontend y servidor.

### PostgreSQL

Se utilizará como base de datos relacional para almacenar de forma estructurada la información de usuarios, estudiantes, docentes, calificaciones, asistencias y comunicados.

### HTML, CSS y JavaScript

Se utilizarán para construir la interfaz del prototipo de forma sencilla y comprensible para el nivel del proyecto.

### Git y GitHub

Se utilizarán para mantener un historial de cambios y facilitar la colaboración entre los integrantes del proyecto.

### Markdown

Se utilizará como formato principal para la documentación técnica, siguiendo los requisitos establecidos para el proyecto.

## 10. Principios de diseño

El proyecto seguirá estos principios:

* Separación de responsabilidades.
* Código organizado por módulos.
* Validación de datos.
* Control de acceso por roles.
* Protección de información sensible.
* Documentación de decisiones importantes.
* Control de versiones mediante Git.

> La arquitectura puede ajustarse durante el desarrollo si aparecen nuevos requisitos o restricciones del proyecto.
