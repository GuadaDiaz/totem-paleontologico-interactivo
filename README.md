# 🏛️ Paleontological Museum Interactive Kiosk

An interactive, touchscreen-optimized kiosk application designed for public deployment. Built with a decoupled architecture to ensure memory efficiency and high availability in high-traffic environments.

## 🚀 Architectural Highlights

- **Spatial Ergonomics:** UI anchored to the bottom third of the screen, complying with Fitts's Law for 55-inch public displays.
- **Finite State Machine (FSM):** Implemented a rigorous routing system (Hub and Spoke pattern) separating the Attract Loop, Catalog, and Detail views.
- **Hardware Abuse Protection:** Custom `useDebounce` hooks and UI locking mechanisms to defend the PostgreSQL database against rapid concurrent requests.
- **Data Projection & Static Serving:** Optimized SQL queries to prevent over-fetching, coupled with an Express static file server to deliver binary assets without crashing the V8 Engine RAM.
- **Glassmorphism UI:** Modern, translucent aesthetic built with Tailwind CSS v4 Just-In-Time compiler.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Deployment Target:** Electron (Kiosk Mode) / Windows Edge LAN

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   \`git clone https://github.com/your-username/museo-sistema-interactivo.git\`
2. **Install Dependencies:**
   - In `/backend`: \`npm install\`
   - In `/frontend`: \`npm install\`
3. **Database Configuration:**
   Create a \`.env\` file in the \`/backend\` directory with the following variables:
   \`\`\`env
   DB_USER=your_postgres_user
   DB_HOST=localhost
   DB_NAME=museum_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   \`\`\`
4. **Boot the System:** Start both the Vite frontend and Node backend servers.
