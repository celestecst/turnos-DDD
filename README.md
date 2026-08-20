<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión de Turnos</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 40px auto;
            padding: 0 20px;
        }
        h1, h2 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
            margin-top: 24px;
        }
        code {
            background-color: #f6f8fa;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: "Courier New", Courier, monospace;
            font-size: 85%;
        }
        pre {
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow: auto;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            font-size: 100%;
        }
        a {
            color: #0366d6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul, ol {
            padding-left: 2em;
        }
        hr {
            height: 1px;
            background-color: #eaecef;
            border: none;
            margin: 24px 0;
        }
    </style>
</head>
<body>

    <h1>📅 Sistema de Gestión de Turnos</h1>
    
    <p>Un sistema integral para la gestión de citas y turnos, construido con las mejores prácticas de la industria, aplicando Arquitectura Limpia (Clean Architecture) y Diseño Guiado por el Dominio (DDD).</p>

    <hr>

    <h2>🚀 Tecnologías Utilizadas</h2>

    <h3>Backend</h3>
    <ul>
        <li><strong>Framework:</strong> NestJS (Node.js / TypeScript)</li>
        <li><strong>Base de Datos:</strong> MySQL</li>
        <li><strong>ORM:</strong> TypeORM</li>
        <li><strong>Infraestructura:</strong> Docker &amp; Docker Compose</li>
        <li><strong>Gestor de paquetes:</strong> Yarn</li>
    </ul>

    <h3>Frontend</h3>
    <ul>
        <li><em>(En construcción... 🚧)</em></li>
    </ul>

    <hr>

    <h2>📁 Estructura del Proyecto</h2>
    <p>El proyecto está dividido en dos aplicaciones principales para mantener las responsabilidades separadas:</p>
    <ul>
        <li><code>/backend</code>: Contiene toda la lógica de negocio, la API REST y la conexión a la base de datos.</li>
        <li><code>/frontend</code>: Interfaz de usuario para interactuar con el sistema.</li>
    </ul>

    <hr>

    <h2>⚙️ Requisitos Previos</h2>
    <p>Para ejecutar este proyecto de manera local, necesitas tener instalado:</p>
    <ul>
        <li><a href="https://nodejs.org/" target="_blank">Node.js</a> (y Yarn)</li>
        <li><a href="https://www.docker.com/" target="_blank">Docker</a> y Docker Desktop</li>
    </ul>

    <hr>

    <h2>🛠️ Instalación y Ejecución (Backend)</h2>
    <p>Sigue estos pasos para encender el servidor y la base de datos:</p>

    <ol>
        <li>
            <p><strong>Clonar el repositorio y entrar a la carpeta del backend:</strong></p>
            <pre><code>git clone &lt;URL_DE_TU_REPOSITORIO&gt;
cd turnos-project/backend</code></pre>
        </li>
        <li>
            <p><strong>Instalar las dependencias:</strong></p>
            <pre><code>yarn install</code></pre>
        </li>
        <li>
            <p><strong>Configurar las variables de entorno:</strong></p>
            <p>Crea un archivo <code>.env</code> en la raíz de la carpeta <code>backend</code> basándote en la configuración de Docker. Necesitarás variables como <code>MYSQL_HOST</code>, <code>MYSQL_PORT</code>, <code>MYSQL_USER</code>, <code>MYSQL_PASSWORD</code>, y <code>MYSQL_DB</code>.</p>
        </li>
        <li>
            <p><strong>Levantar la base de datos MySQL con Docker:</strong></p>
            <pre><code>docker-compose up -d</code></pre>
        </li>
        <li>
            <p><strong>Iniciar el servidor en modo desarrollo:</strong></p>
            <pre><code>yarn start:dev</code></pre>
            <p>El servidor estará corriendo en <code>http://localhost:3000</code>.</p>
        </li>
    </ol>

    <hr>

    <h2>📡 Endpoints Principales (API REST)</h2>
    <p>El sistema cuenta con un flujo CRUD funcional para la gestión de turnos:</p>
    <ul>
        <li><strong><code>POST /turnos/agendar</code></strong>: Crea un nuevo turno validando que la fecha no sea en el pasado.</li>
        <li><strong><code>GET /turnos</code></strong>: Obtiene la lista de todos los turnos registrados.</li>
        <li><strong><code>PATCH /turnos/:id/estado</code></strong>: Modifica el estado de un turno específico (ej. a <code>CONFIRMADO</code> o <code>CANCELADO</code>), actuando como un borrado lógico seguro.</li>
    </ul>

    <hr>

    <h2>🧠 Arquitectura</h2>
    <p>Este proyecto aplica <strong>Clean Architecture</strong>. La lógica central de la aplicación está encapsulada en la capa de Dominio, aislada de los frameworks externos. Las reglas de negocio, como la prevención de agendar turnos en fechas pasadas o la protección contra la confirmación de turnos previamente cancelados, viven directamente en las Entidades del sistema.</p>

</body>
</html>
