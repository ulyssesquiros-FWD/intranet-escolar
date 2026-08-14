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

---

## Instalación y ejecución local

Este proyecto es un prototipo estático basado en HTML/CSS/JS que utiliza `localStorage` para persistencia en el navegador. Para ejecutar la aplicación en su máquina local hay dos opciones simples:

- Abrir `frontend/index.html` directamente en el navegador (modo demo). Algunas funcionalidades pueden requerir servir los archivos mediante HTTP para evitar restricciones del navegador.
- Servir la carpeta `frontend/` con un servidor estático. Ejemplo con Python 3:

```bash
cd frontend
python -m http.server 3000
# Abrir: http://localhost:3000
```

O usando `npx` (si dispone de Node.js/npm):

```bash
npx http-server ./frontend -p 3000
# Abrir: http://localhost:3000
```

## Usuarios de ejemplo (credenciales para pruebas)

Estos usuarios sirven para probar roles y permisos en el prototipo:

- Usuario: `admin` / Contraseña: `1234` — Rol: Administración
- Usuario: `docente` / Contraseña: `1234` — Rol: Docente
- Usuario: `estudiante` / Contraseña: `1234` — Rol: Estudiante

Además el módulo de `Usuarios` contiene usuarios iniciales almacenados en `localStorage` (ver `frontend/js/usuarios.js`).

## Uso básico

1. Abra la aplicación en el navegador (`index.html` o servidor local).
2. Inicie sesión con uno de los usuarios de ejemplo.
3. El `dashboard` mostrará únicamente las opciones permitidas según el rol.
4. Los datos (usuarios, estudiantes, calificaciones, asistencias, comunicados) se guardan en `localStorage` del navegador.

## Documentación y memoria del proyecto

- Memoria del agente: [AGENTS.md](AGENTS.md)
- Requerimientos: [docs/requerimientos.md](docs/requerimientos.md)
- Arquitectura: [docs/arquitectura.md](docs/arquitectura.md)
- Contribución: [CONTRIBUTING.md](CONTRIBUTING.md)
- Historial de cambios: [CHANGELOG.md](CHANGELOG.md)

## Observaciones de seguridad (prototipo)

Este prototipo guarda contraseñas en `localStorage` y en texto claro para facilitar las pruebas de UI. Para una versión productiva es obligatorio:

- Implementar un backend seguro y almacenamiento de contraseñas con hash (bcrypt o similar).
- No almacenar contraseñas ni datos sensibles en `localStorage`.
- Añadir autenticación real (tokens de sesión/HTTP-only cookies) y validación del lado servidor.

Nota: Se ha añadido un mecanismo de hashing en el frontend (SHA-256 via Web Crypto) para almacenar contraseñas en `localStorage` como valores hashed en lugar de texto plano en esta versión de prototipo. Esto mejora la seguridad en modo demo, pero no sustituye un backend seguro y almacenamiento con hashing + sal en servidor.

## Licencia

Este proyecto no tiene una licencia especificada. Para incluir una, añada un archivo `LICENSE` o actualice este `README.md`.