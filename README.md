# Winpot CMS - Demo Version 🎰

Este repositorio contiene una versión **DEMO** completamente funcional del sistema de gestión de contenidos (CMS) para casinos Winpot.

La aplicación ha sido adaptada para funcionar **sin dependencia de un backend en vivo** (Supabase), permitiendo desplegar y probar todas las funcionalidades de la interfaz de usuario directamente en el navegador.

## 🚀 Características de la Demo

Esta versión incluye las siguientes adaptaciones para demostración:

- **Autenticación Simulada**: Login simplificado de un solo clic que otorga acceso total de administrador.
- **Persistencia Local**: Todos los cambios (textos, imágenes, juegos, eventos) se guardan en el `localStorage` del navegador, simulando una base de datos real.
- **Mock Data Enriquecido**: El sistema inicia con datos de ejemplo completos (juegos, eventos, galerías) para evitar secciones vacías.
- **Dev Switcher en Producción**: Herramienta flotante habilitada para navegar rápidamente entre las diferentes marcas y sucursales (Winpot, Veneto, Capri, etc.).
- **Gestión de Medios Simulada**: Las URLs de imágenes se normalizan y manejan localmente.

## 🛠️ Tecnologías

El proyecto está construido con un stack moderno de React:

- **Framework**: React + Vite
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Componentes UI**: Shadcn UI (basado en Radix Primitives)
- **Estado/Data Fetching**: TanStack Query (React Query)
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

## 📦 Instalación y Ejecución

Para correr el proyecto localmente:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/winpot-cms-demo.git
    cd winpot-cms-demo
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    pnpm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```

4.  Abrir `http://localhost:8080` en tu navegador.

## 🧪 Guía de Uso Rápido

1.  Al abrir la aplicación, verás una pantalla de **Login Simplificado**.
2.  Haz clic en **"Entrar al Dashboard"**. No se requiere contraseña.
3.  Accederás al panel principal. Desde aquí puedes:
    -   Usar el **Dev Switcher** (esquina inferior derecha) para ver cómo luce el sitio público de cada casino.
    -   Navegar a las secciones de **Juegos**, **Eventos** o **Galería** para agregar/editar contenido.
    -   Los cambios se reflejarán instantáneamente en la vista pública correspondiente.

## ⚠️ Nota sobre Persistencia

Dado que esta es una demo *client-side*, si borras la caché de tu navegador o abres la app en modo incógnito, los datos volverán a su estado inicial (reset).

---

Desarrollado para demostración de arquitectura y UX/UI.
