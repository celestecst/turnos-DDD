# 📅 Sistema de Gestión de Turnos

Un sistema integral para la gestión de citas y turnos, construido con buenas prácticas de la industria, aplicando Clean Architecture y un Diseño Guiado por el Dominio (DDD).

![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

---

## 🚀 Tecnologías Utilizadas

### Backend
* **Framework:** NestJS (Node.js / TypeScript)
* **Base de Datos:** MySQL
* **ORM:** TypeORM
* **Infraestructura:** Docker & Docker Compose
* **Gestor de paquetes:** Yarn
---

## 🗺️ Roadmap (Estado del Proyecto)

- [x] **Backend:** Configuración del servidor con NestJS.
- [x] **Backend:** Modelado de Base de Datos MySQL con TypeORM y Docker.
- [x] **Backend:** CRUD funcional con Arquitectura Limpia (Dominio, Casos de Uso, Controladores).
- [x] **Frontend:** Inicialización del proyecto web.
- [x] **Frontend:** Consumo de la API REST y diseño de pantallas.
- [ ] **Backend:** Refinamiento, mejoras y expansión. 

---

## 📁 Estructura del Proyecto

El proyecto está dividido en dos aplicaciones principales para mantener las responsabilidades separadas:

* `/backend`: Contiene toda la lógica de negocio, la API REST y la conexión a la base de datos.
* `/frontend`: Interfaz de usuario para interactuar con el sistema.

---

## ⚙️ Requisitos Previos

Para ejecutar este proyecto de manera local, necesitas tener instalado:
* [Node.js](https://nodejs.org/) (y Yarn)
* [Docker](https://www.docker.com/) y Docker Desktop

---

## 🛠️ Instalación y Ejecución (Backend)

Sigue estos pasos para encender el servidor y la base de datos:

1. **Clonar el repositorio y entrar a la carpeta del backend:**
```bash
git clone <https://github.com/celestecst/turnos-DDD>
cd turnos-project/backend
```

2. **Instalar las dependencias:**
```bash
yarn install
```

3. **Configurar las variables de entorno:**
Crea un archivo `.env` en la raíz de la carpeta `backend` basándote en la configuración de Docker. Necesitarás variables como `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, y `MYSQL_DB`.

4. **Levantar la base de datos MySQL con Docker:**
```bash
docker-compose up -d
```

5. **Iniciar el servidor en modo desarrollo:**
```bash
yarn start:dev
```
El servidor estará corriendo en `http://localhost:3000`.

---

## 📡 Endpoints Principales (API REST)

El sistema cuenta con un flujo CRUD funcional para la gestión de turnos:

* **`POST /turnos/agendar`**: Crea un nuevo turno validando que la fecha no sea en el pasado.
* **`GET /turnos`**: Obtiene la lista de todos los turnos registrados.
* **`PATCH /turnos/:id/estado`**: Modifica el estado de un turno específico (ej. a `CONFIRMADO` o `CANCELADO`), actuando como un borrado lógico seguro.

---
## 🧠 Arquitectura

Este proyecto aplica **Clean Architecture**. La lógica central de la aplicación está encapsulada en la capa de Dominio, aislada de los frameworks externos. 

