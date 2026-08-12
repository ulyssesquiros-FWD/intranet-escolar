# AGENTS.md — Memoria del Proyecto Intranet Escolar

## 1. Contexto

Este proyecto consiste en el desarrollo de una Intranet Escolar para una institución educativa pública.

La aplicación será un sistema web de uso interno destinado a administración, docentes, estudiantes y familias.

El propósito principal es centralizar información y servicios del centro educativo mediante una aplicación web con acceso controlado por roles.

El proyecto se desarrolla como un prototipo académico y debe mantenerse documentado mediante archivos Markdown dentro del repositorio.

### Usuarios principales

* Administración.
* Docentes.
* Estudiantes y familias.

### Tecnologías

* HTML.
* CSS.
* JavaScript.
* Node.js.
* Express.
* PostgreSQL.
* Git.
* GitHub.
* Markdown.

---

## 2. Requerimientos

El sistema debe cumplir como mínimo con las siguientes funcionalidades:

### Autenticación

* Permitir iniciar sesión.
* Identificar al usuario.
* Determinar su rol.
* Mostrar las funciones correspondientes al rol.
* Impedir el acceso a funciones no autorizadas.

### Gestión de usuarios

Administración debe poder:

* Crear usuarios.
* Consultar usuarios.
* Editar usuarios.
* Eliminar usuarios.
* Gestionar roles.

### Módulo académico

El sistema debe permitir:

* Registrar calificaciones.
* Consultar calificaciones.
* Registrar asistencia.
* Consultar asistencia.

### Comunicados

El sistema debe permitir:

* Crear comunicados.
* Consultar comunicados.
* Mostrar información relevante de cada comunicado.

### Consulta según rol

Cada usuario debe visualizar únicamente las funciones y la información que le corresponden.

---

## 3. Reglas

### Código

* Mantener el código organizado por módulos.
* Utilizar nombres descriptivos.
* Evitar duplicación innecesaria.
* Separar responsabilidades entre frontend y backend.
* Validar los datos recibidos por formularios y solicitudes.
* Mantener una estructura clara de carpetas.

### JavaScript

* Utilizar JavaScript moderno.
* Preferir funciones pequeñas y específicas.
* Evitar variables globales innecesarias.
* Mantener una separación clara entre lógica de interfaz y lógica de negocio.

### Backend

* Mantener las rutas organizadas.
* Validar los datos recibidos.
* Aplicar control de acceso según el rol.
* No incluir credenciales directamente en el código.

### Documentación

* Utilizar Markdown para la documentación.
* Utilizar un solo `#` como encabezado principal por documento.
* Utilizar `##` y `###` para los niveles inferiores.
* Mantener un estilo consistente de listas.
* Utilizar bloques de código con el lenguaje correspondiente.
* Agregar texto alternativo cuando se utilicen imágenes.
* Documentar las decisiones técnicas importantes.

### Git

* Utilizar commits descriptivos.
* Realizar commits pequeños relacionados con un cambio específico.
* No utilizar mensajes de commit genéricos como `cambios` o `actualizacion`.
* Mantener el código sincronizado con el repositorio remoto.
* Utilizar ramas para funcionalidades cuando sea necesario.

---

## 4. Restricciones

El proyecto debe respetar las siguientes restricciones:

* No exponer información personal innecesaria.
* No almacenar contraseñas en texto plano.
* No permitir que un usuario acceda a funciones de otro rol sin autorización.
* No almacenar credenciales directamente en el código.
* No subir archivos `.env` al repositorio.
* No utilizar datos personales reales de estudiantes.
* No convertir el prototipo en un sistema de producción sin las medidas de seguridad necesarias.
* No agregar funcionalidades que aumenten considerablemente el alcance sin justificarlas.

---

## 5. Objetivos

### Objetivo general

Construir un prototipo funcional de una Intranet Escolar que permita gestionar información y servicios internos de una institución educativa pública.

### Objetivos específicos

* Implementar autenticación por roles.
* Implementar gestión de usuarios.
* Implementar un módulo académico.
* Implementar control de asistencia.
* Implementar un tablón de comunicados.
* Aplicar control de acceso según el rol.
* Mantener una interfaz clara y accesible.
* Proteger información sensible.
* Documentar las decisiones técnicas mediante Markdown.
* Mantener el proyecto versionado mediante Git y GitHub.

### Objetivos de desarrollo

* [ ] Implementar login.
* [ ] Implementar roles.
* [ ] Implementar dashboard.
* [ ] Implementar gestión de usuarios.
* [ ] Implementar calificaciones.
* [ ] Implementar asistencia.
* [ ] Implementar comunicados.
* [ ] Conectar PostgreSQL.
* [ ] Realizar pruebas.
* [ ] Completar documentación.

---

## 6. Memoria del proyecto

### Decisión inicial

Se decidió construir la aplicación como una intranet web para una institución educativa pública.

### Roles

Se establecieron tres perfiles principales:

1. Administración.
2. Docente.
3. Estudiante/Familia.

### Arquitectura

Se decidió separar el sistema en frontend, backend y base de datos.

```text
Frontend
   │
   ▼
Backend
   │
   ▼
PostgreSQL
```

### Tecnologías

Se seleccionaron HTML, CSS y JavaScript para el frontend y Node.js con Express para el backend.

PostgreSQL será utilizado como sistema de gestión de base de datos.

Git y GitHub serán utilizados para controlar las versiones del proyecto.

### Documentación

Se decidió utilizar Markdown como formato principal de documentación porque es un requisito central de la entrega.

### Cambios futuros

Las decisiones podrán actualizarse durante el desarrollo cuando aparezcan nuevos requisitos o restricciones.

Toda decisión técnica importante deberá quedar registrada en este archivo.

---

## 7. Buenas prácticas

* Mantener funciones pequeñas y fáciles de entender.
* Evitar duplicar código.
* Validar entradas del usuario.
* Separar frontend y backend.
* Aplicar permisos según el rol.
* Proteger información sensible.
* Mantener mensajes de error claros.
* Mantener una estructura de archivos organizada.
* Realizar commits frecuentes y descriptivos.
* Revisar los cambios antes de hacer push.
* Documentar decisiones técnicas.
* Actualizar el `CHANGELOG.md` cuando corresponda.
* Mantener el README actualizado.
* Probar las funcionalidades antes de considerarlas terminadas.
* Utilizar Markdown consistente y legible.

> Regla principal: documentar el "por qué" de las decisiones importantes y no solamente describir qué hace el código.
