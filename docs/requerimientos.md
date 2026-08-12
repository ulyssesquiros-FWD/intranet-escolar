# Requerimientos del Sistema

## 1. Introducción

Este documento define los requerimientos funcionales y no funcionales de la Intranet Escolar.

El sistema será un prototipo funcional de una intranet para una institución educativa pública y permitirá que administración, docentes, estudiantes y familias accedan a información y servicios según su rol.

## 2. Requerimientos funcionales

### RF-01 — Autenticación por roles

* [ ] El sistema debe permitir iniciar sesión.
* [ ] El sistema debe identificar al usuario.
* [ ] El sistema debe manejar los roles de administración, docente y estudiante/familia.
* [ ] El sistema debe mostrar las funciones correspondientes al rol del usuario.
* [ ] El sistema debe impedir el acceso a funciones no autorizadas.

### RF-02 — Gestión de usuarios

* [ ] Administración debe poder registrar personas.
* [ ] Administración debe poder consultar usuarios.
* [ ] Administración debe poder editar usuarios.
* [ ] Administración debe poder eliminar usuarios.
* [ ] Administración debe poder gestionar los roles de los usuarios.

### RF-03 — Módulo académico

* [ ] El sistema debe permitir registrar calificaciones.
* [ ] El sistema debe permitir consultar calificaciones.
* [ ] El sistema debe permitir registrar asistencia.
* [ ] El sistema debe permitir consultar información académica según el rol.

### RF-04 — Tablón de comunicados

* [ ] Administración debe poder crear comunicados.
* [ ] Los usuarios deben poder consultar los comunicados publicados.
* [ ] Los comunicados deben mostrar información relevante como título, fecha y contenido.

### RF-05 — Consulta según el rol

* [ ] Cada usuario debe visualizar únicamente las funciones que le corresponden.
* [ ] Administración debe tener acceso a las funciones administrativas.
* [ ] Docentes deben tener acceso a las funciones relacionadas con sus actividades.
* [ ] Estudiantes y familias deben poder consultar la información correspondiente.

## 3. Requerimientos no funcionales

### RNF-01 — Accesibilidad

* [ ] La interfaz debe ser clara.
* [ ] La interfaz debe utilizar etiquetas adecuadas.
* [ ] Debe existir una navegación comprensible.
* [ ] La aplicación debe considerar navegación mediante teclado.
* [ ] Debe existir un contraste adecuado entre los elementos de la interfaz.

### RNF-02 — Protección de datos

* [ ] No se debe exponer información personal innecesaria.
* [ ] La información sensible debe mantenerse protegida.
* [ ] Las contraseñas no deben almacenarse en texto plano.
* [ ] Los usuarios solo deben acceder a la información permitida por su rol.

### RNF-03 — Control de versiones

* [ ] El código debe mantenerse versionado mediante Git.
* [ ] El proyecto debe utilizar un repositorio remoto.
* [ ] Los cambios importantes deben registrarse mediante commits.
* [ ] El trabajo debe mantenerse organizado mediante ramas cuando corresponda.

## 4. Matriz de roles

| Funcionalidad            | Administración | Docente | Estudiante/Familia |
| ------------------------ | -------------: | ------: | -----------------: |
| Iniciar sesión           |             Sí |      Sí |                 Sí |
| Gestionar usuarios       |             Sí |      No |                 No |
| Registrar calificaciones |             Sí |      Sí |                 No |
| Consultar calificaciones |             Sí |      Sí |                 Sí |
| Registrar asistencia     |             Sí |      Sí |                 No |
| Consultar asistencia     |             Sí |      Sí |                 Sí |
| Crear comunicados        |             Sí |      No |                 No |
| Consultar comunicados    |             Sí |      Sí |                 Sí |

## 5. Criterios de aceptación generales

El sistema se considerará funcional cuando:

* [ ] Un usuario pueda iniciar sesión.
* [ ] El sistema pueda identificar su rol.
* [ ] Las funciones se muestren de acuerdo con el rol.
* [ ] Administración pueda gestionar usuarios.
* [ ] Se pueda registrar y consultar información académica.
* [ ] Se puedan crear y consultar comunicados.
* [ ] Se respeten las restricciones de acceso.
* [ ] La interfaz sea clara y accesible.

## 6. Estado de implementación

Los elementos marcados con `[ ]` representan requerimientos pendientes de implementar.

A medida que cada funcionalidad sea desarrollada y probada, se cambiará a `[x]`.

> El alcance técnico exacto del proyecto puede ajustarse de acuerdo con el nivel del curso y las indicaciones del docente.
