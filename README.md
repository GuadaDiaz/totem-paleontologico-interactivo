# 🏛️ Kiosco Interactivo para Museo Paleontológico

Una aplicación de kiosco interactivo, optimizada para pantallas táctiles y diseñada para despliegues en espacios públicos. Construida bajo una arquitectura desacoplada para garantizar la eficiencia de memoria y alta disponibilidad en entornos de alto tráfico.

## 🚀 Características Arquitectónicas

- **Ergonomía Espacial:** Interfaz de usuario (UI) anclada en el tercio inferior de la pantalla, cumpliendo con la Ley de Fitts para pantallas públicas de 55 pulgadas.
- **Máquina de Estados Finitos (FSM):** Implementación de un sistema riguroso de enrutamiento (patrón Hub and Spoke) que separa las vistas de Bucle de Atracción (Attract Loop), Catálogo y Detalle.
- **Protección contra Abuso de Hardware:** Desarrollo de hooks personalizados (`useDebounce`) y mecanismos de bloqueo de UI para defender la base de datos PostgreSQL contra peticiones concurrentes masivas.
- **Proyección de Datos y Servidor Estático:** Consultas SQL optimizadas para prevenir el _over-fetching_, acopladas con un servidor de archivos estáticos en Express para entregar recursos binarios (assets) sin colapsar la memoria RAM del motor V8.
- **Interfaz Glassmorphism:** Estética moderna y translúcida construida con el compilador Just-In-Time de Tailwind CSS v4.

## 🛠️ Stack Tecnológico

- **Frontend:** React (Vite), TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express
- **Base de Datos:** PostgreSQL
- **Entorno de Despliegue:** Electron (Modo Kiosco) / Windows Edge LAN

## ⚙️ Instrucciones de Despliegue Local

1. **Clonar el repositorio:**
   `git clone https://github.com/tu-usuario/museo-sistema-interactivo.git`
2. **Instalar Dependencias:**
   - En `/backend`: `npm install`
   - En `/frontend`: `npm install`
3. **Configuración de la Base de Datos:**
   Crear un archivo `.env` en el directorio `/backend` con las siguientes variables:
   ```env
   DB_USER=tu_usuario_postgres
   DB_HOST=localhost
   DB_NAME=museum_db
   DB_PASSWORD=tu_contraseña
   DB_PORT=5432
   ```
