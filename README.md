# Intranet Escolar

Sistema web de gestión interna para una institución educativa pública.

## Descripción

La **Intranet Escolar** es un prototipo de aplicación web desarrollado para centralizar información y servicios de uso interno de una institución educativa.

El sistema permite que personal administrativo, docentes y estudiantes/familias accedan a las funciones correspondientes según su rol.

El proyecto se desarrolla con fines académicos y actualmente funciona como un prototipo web del sistema.

---

## Objetivo

Construir una intranet escolar funcional que permita:

- Gestionar usuarios.
- Registrar y consultar estudiantes.
- Registrar y consultar calificaciones.
- Controlar y consultar asistencia.
- Mostrar información de acuerdo con el rol del usuario.
- Mantener documentación técnica del proyecto.
- Utilizar Git y GitHub para controlar las versiones.
- Trabajar mediante ramas y Pull Requests.

---

## Roles del sistema

El sistema cuenta con tres perfiles principales:

| Rol | Funciones principales |
|---|---|
| Administración | Gestionar usuarios, estudiantes, calificaciones y asistencia. |
| Docente | Consultar estudiantes, registrar calificaciones y controlar asistencia. |
| Estudiante / Familia | Consultar información de estudiantes, calificaciones y asistencia. |

El acceso a las funcionalidades se controla mediante el rol almacenado durante la sesión.

---

## Funcionalidades implementadas

### Autenticación

El sistema cuenta con un inicio de sesión que permite identificar al usuario y determinar las funciones disponibles según su rol.

Después de iniciar sesión correctamente, el usuario es dirigido al Dashboard correspondiente.

La sesión se mantiene utilizando `localStorage`.

---

### Dashboard

El Dashboard funciona como panel principal del sistema.

Permite:

- Mostrar el nombre del usuario.
- Mostrar el rol del usuario.
- Navegar entre los módulos.
- Mostrar estadísticas de información académica.
- Cerrar sesión.
- Aplicar restricciones según el rol.

El Dashboard obtiene información almacenada en `localStorage` para mostrar indicadores dinámicos.

---

### Gestión de usuarios

El personal de Administración puede:

- Crear usuarios.
- Consultar usuarios.
- Editar usuarios.
- Eliminar usuarios.
- Asignar roles.

El acceso al módulo de usuarios está restringido al rol de Administración.

---

### Gestión de estudiantes

El módulo de estudiantes permite:

- Registrar estudiantes.
- Consultar estudiantes.
- Editar estudiantes.
- Eliminar estudiantes.
- Buscar estudiantes.
- Aplicar filtros.
- Mantener los registros mediante `localStorage`.

Los estudiantes registrados se utilizan posteriormente en los módulos académicos.

---

### Calificaciones

El módulo de calificaciones permite:

- Registrar calificaciones.
- Consultar calificaciones.
- Editar calificaciones.
- Eliminar calificaciones.
- Buscar registros.
- Aplicar filtros.
- Seleccionar estudiantes registrados.
- Mantener los registros mediante `localStorage`.

El módulo está integrado con el registro de estudiantes.

---

### Asistencia

El módulo de asistencia permite:

- Registrar asistencia.
- Consultar registros.
- Editar registros.
- Eliminar registros.
- Buscar información.
- Aplicar filtros.
- Seleccionar estudiantes registrados.
- Mantener los registros mediante `localStorage`.

El módulo está integrado con el registro de estudiantes.

---

## Integración entre módulos

Los módulos académicos utilizan información compartida mediante `localStorage`.

El flujo principal de integración es:

```text
Estudiantes
     │
     ├───────────────┐
     │               │
     ▼               ▼
Calificaciones    Asistencia