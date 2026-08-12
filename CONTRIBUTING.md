# Guía de Contribución

## 1. Introducción

Este documento define el flujo de trabajo que utilizará el equipo para desarrollar la Intranet Escolar.

El objetivo es mantener un proyecto organizado, facilitar la colaboración y evitar que los cambios de desarrollo se realicen directamente sobre la rama principal.

## 2. Ramas

La rama `main` se utilizará como rama principal y estable del proyecto.

Las nuevas funcionalidades se desarrollarán utilizando ramas independientes.

### Convención de nombres

Las ramas de funcionalidades utilizarán el siguiente formato:

```text
feature/nombre-funcionalidad
```

Ejemplos:

```text
feature/login
feature/usuarios
feature/calificaciones
feature/asistencia
feature/comunicados
```

Las ramas destinadas a correcciones pueden utilizar:

```text
fix/nombre-correccion
```

Ejemplo:

```text
fix/error-login
```

## 3. Flujo de trabajo

El flujo general será:

```text
main
  │
  ▼
Crear rama de funcionalidad
  │
  ▼
Desarrollar
  │
  ▼
Realizar commits
  │
  ▼
Subir rama a GitHub
  │
  ▼
Crear Pull Request
  │
  ▼
Revisar cambios
  │
  ▼
Aprobar Pull Request
  │
  ▼
Integrar en main
```

## 4. Crear una rama

Antes de comenzar una nueva funcionalidad, se debe comprobar que se está trabajando sobre la versión actualizada de `main`.

Ejemplo:

```bash
git switch main
git pull origin main
git switch -c feature/login
```

## 5. Commits

Los commits deben describir claramente el cambio realizado.

Se utilizará una estructura similar a:

```text
tipo: descripción
```

Tipos principales:

| Tipo       | Uso                         |
| ---------- | --------------------------- |
| `feat`     | Nueva funcionalidad         |
| `fix`      | Corrección de errores       |
| `docs`     | Cambios en documentación    |
| `test`     | Pruebas                     |
| `refactor` | Reestructuración del código |
| `chore`    | Tareas de mantenimiento     |

### Ejemplos

```bash
git commit -m "feat: crear formulario de login"
```

```bash
git commit -m "fix: corregir validacion de usuario"
```

```bash
git commit -m "docs: actualizar arquitectura"
```

Los commits deben ser pequeños y estar relacionados con un cambio específico.

## 6. Subir cambios

Después de realizar los commits, se debe subir la rama al repositorio remoto.

Ejemplo:

```bash
git push -u origin feature/login
```

## 7. Pull Requests

Las funcionalidades no deben integrarse directamente en `main`.

Después de completar una funcionalidad se debe crear un Pull Request hacia `main`.

El Pull Request debe incluir:

* Descripción del cambio.
* Funcionalidades implementadas.
* Pruebas realizadas.
* Problemas conocidos, si existen.

## 8. Revisión

Antes de integrar una rama se deben revisar:

* Funcionamiento de la funcionalidad.
* Calidad del código.
* Cumplimiento de los requerimientos.
* Ausencia de información sensible.
* Pruebas realizadas.
* Documentación relacionada.

## 9. Integración

Una vez revisado y aprobado el Pull Request, la funcionalidad podrá integrarse en `main`.

Después de la integración se debe actualizar la rama local:

```bash
git switch main
git pull origin main
```

Las nuevas funcionalidades deberán partir nuevamente de la versión actualizada de `main`.

## 10. Reglas importantes

* No desarrollar funcionalidades directamente sobre `main`.
* No subir contraseñas ni credenciales.
* No subir archivos `.env`.
* Mantener commits descriptivos.
* Mantener las ramas enfocadas en una funcionalidad.
* Probar los cambios antes de crear el Pull Request.
* Actualizar la documentación cuando corresponda.
* Revisar los cambios antes de integrarlos.

## 11. Checklist para Pull Requests

Antes de solicitar la integración de una funcionalidad:

* [ ] La funcionalidad cumple su objetivo.
* [ ] Los cambios fueron probados.
* [ ] Los commits tienen mensajes descriptivos.
* [ ] No se incluyeron credenciales.
* [ ] La documentación fue actualizada cuando corresponde.
* [ ] La rama fue subida a GitHub.
* [ ] Se creó el Pull Request.
* [ ] El Pull Request fue revisado.
