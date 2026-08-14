# Pruebas del Sistema – Intranet Escolar

## 1. Objetivo

Verificar el correcto funcionamiento de los módulos principales de la Intranet Escolar y comprobar el acceso de acuerdo con los roles definidos.

---

## 2. Prueba de inicio de sesión

### Administración

**Usuario:** admin01  
**Contraseña:** Admin123

Resultado esperado:

- El usuario puede iniciar sesión.
- El sistema redirige al Dashboard.
- Se muestra el nombre del usuario.
- Se muestra el rol Administración.

**Resultado:** APROBADO

---

## 3. Prueba del Dashboard

Se verificó:

- Carga correcta del Dashboard.
- Visualización del usuario autenticado.
- Visualización del rol.
- Navegación mediante el menú lateral.
- Visualización de estadísticas.
- Funcionamiento del botón Cerrar sesión.

**Resultado:** APROBADO

---

## 4. Prueba del módulo Usuarios

Se verificó:

- Acceso para Administración.
- Registro de usuarios.
- Consulta de usuarios.
- Edición de usuarios.
- Eliminación de usuarios.
- Control de acceso según rol.

**Resultado:** APROBADO

---

## 5. Prueba del módulo Estudiantes

Se verificó:

- Registro de estudiantes.
- Consulta de estudiantes.
- Edición de estudiantes.
- Eliminación de estudiantes.
- Búsqueda.
- Filtros.
- Persistencia mediante localStorage.

**Resultado:** APROBADO

---

## 6. Prueba del módulo Calificaciones

Se verificó:

- Registro de calificaciones.
- Selección de estudiantes registrados.
- Edición de calificaciones.
- Eliminación de calificaciones.
- Búsqueda.
- Filtros.
- Persistencia mediante localStorage.

**Resultado:** APROBADO

---

## 7. Prueba del módulo Asistencia

Se verificó:

- Registro de asistencia.
- Selección de estudiantes registrados.
- Edición de asistencia.
- Eliminación de asistencia.
- Búsqueda.
- Filtros.
- Persistencia mediante localStorage.

**Resultado:** APROBADO

---

## 8. Integración entre módulos

Se verificó que los estudiantes registrados desde el módulo Estudiantes estén disponibles en:

- Calificaciones.
- Asistencia.

Los módulos utilizan los datos almacenados en localStorage.

**Resultado:** APROBADO

---

## 9. Control de roles

### Administración

Puede acceder a:

- Usuarios.
- Estudiantes.
- Calificaciones.
- Asistencia.

### Docente

Puede acceder a:

- Estudiantes.
- Calificaciones.
- Asistencia.

### Estudiante / Familia

Puede consultar:

- Estudiantes.
- Calificaciones.
- Asistencia.

El acceso a Usuarios está restringido a Administración.

**Resultado:** APROBADO

---

## 10. Cierre de sesión

Se verificó que al seleccionar:

**Cerrar sesión**

el sistema elimina la sesión almacenada y redirige al inicio de sesión.

**Resultado:** APROBADO

---

## 11. Consola del navegador

Durante las pruebas se verificó la consola del navegador para detectar errores de JavaScript.

**Resultado:** APROBADO

---

## 12. Resultado general

El sistema cuenta con los módulos principales implementados y conectados.

### Estado final

- Login: APROBADO
- Dashboard: APROBADO
- Usuarios: APROBADO
- Estudiantes: APROBADO
- Calificaciones: APROBADO
- Asistencia: APROBADO
- Integración de datos: APROBADO
- Control de roles: APROBADO
- Cierre de sesión: APROBADO

**Estado general del proyecto: APROBADO**