# 🚀 Portafolio Profesional de Erwan Gras

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-success?style=for-the-badge&logo=github)](https://erwangras.github.io/)
[![Estado](https://img.shields.io/badge/Estado-Disponible%20para%20Contrataci%C3%B3n-10b981?style=for-the-badge)](https://erwangras.github.io/#contacto)
[![Tecnologías](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-6366f1?style=for-the-badge)](https://erwangras.github.io/#habilidades)

Bienvenido al repositorio oficial del **Portafolio Web Profesional de Erwan Gras**.  
Diseñado bajo una estética moderna **Obsidian Glassmorphism**, optimizado para velocidad, accesibilidad y máxima conversión de clientes y reclutadores.

🔗 **Enlace web en vivo para compartir:**  
👉 **[https://erwangras.github.io/](https://erwangras.github.io/)**

---

## 👤 Perfil del Desarrollador

- **Nombre:** Erwan Gras
- **Edad:** 18 años
- **Ubicación:** Ciudad del Este, Alto Paraná, Paraguay
- **Formación Actual:** 3er Año (Graduando) de **Bachillerato Técnico en Informática (BTI)** en el **CRECE** (Centro Regional de Educación "Dr. José Gaspar Rodríguez de Francia").
- **Hitos & Reconocimientos:**
  - 🏆 **Ganador del 1er Puesto** en la Competencia de Creación de Videojuegos en Asunción.
  - 🚁 **Instructor Certificado** en Manejo y Pilotaje de Drones Profesionales & Filmación Aérea.
  - 📱 **Community Manager Certificado** por el SNPP (Servicio Nacional de Promoción Profesional).
  - 🎓 **Graduado con Honores** en el Colegio "La Paz" (2012 - 2023).
  - 🌐 **Perfil Políglota (6 Idiomas):** Español (100%), Francés (100%), Inglés (100%), Guaraní (100%), Portugués (60%), Chino Mandarín (40%).

---

## 🛠️ Servicios Profesionales que Ofrezco

1. **🚁 Clases e Instrucción en Manejo de Drones:**  
   Capacitación teórico-práctica personalizada para personas y empresas que desean aprender a volar drones profesionales o de filmación con total seguridad operacional, modos GPS, cine y maniobras de emergencia.

2. **🎥 Filmación Aérea Cinematográfica 4K:**  
   Tomas aéreas en resolución 4K UHD con estabilización gimbal en 3 ejes para eventos corporativos, proyectos arquitectónicos, bienes raíces, publicidad y producciones audiovisuales.

3. **🎮 Desarrollo de Videojuegos & Software a Medida:**  
   Creación de mecánicas 3D y videojuegos interactivos en Unreal Engine 5 y Scratch (primer puesto nacional en Asunción), además de desarrollo en Python, Visual Basic .NET y bases de datos relacionales SQL.

4. **📱 Community Manager & Marketing Digital (SNPP):**  
   Planificación estratégica de contenidos, diseño gráfico publicitario (Photoshop, Canva, CorelDRAW) y analítica de métricas digitales.

---

## 🎨 Características Técnicas del Portafolio

- **Diseño Glassmorphism Premium:** Paleta obsidian (`#07090e`), degradados cibernéticos (índigo eléctrico, cian neón y esmeralda) y superficies translúcidas con `backdrop-filter: blur()`.
- **Canvas Reactivo de Partículas:** Fondo interactivo en HTML5 Canvas con partículas que reaccionan sutilmente al cursor.
- **Efecto Mecanógrafo Dinámico:** Título animado en tiempo real en la cabecera.
- **Hub de Habilidades con Filtro en Vivo:** Filtros dinámicos por categorías (*Todas, Drones & Pilotaje, Software & Web, Videojuegos, Robótica & Hardware, Diseño & Ofimática, Habilidades Blandas*).
- **Showcase de Proyectos con Ventanas Modales:** Fichas técnicas detalladas con imágenes de alta fidelidad, objetivos, puntos destacados y tecnologías empleadas.
- **Doble Pasarela de Pagos Segura:**
  - Integración oficial de **PayPal** con selector interactivo de montos ($10, $25, $50, $100 o personalizado) y pago seguro con tarjetas de crédito/débito.
  - Transferencia bancaria directa local en Paraguay (**Banco Ueno**, Cuenta: `6191969491`, Titular: `Erwan Gras`) con botón inteligente de copiado al portapapeles y alerta interactiva.
- **Botón Flotante de WhatsApp:** Conectado directamente con saludo predeterminado al `+595 973 151 716`.
- **Currículum Vitae Descargable:** Enlace directo de descarga en PDF (`assets/Curriculum_Erwan_Gras.pdf`).
- **100% Responsivo:** Adaptado a pantallas móviles, tabletas, portátiles y monitores ultra panorámicos.

---

## 📁 Estructura del Proyecto

```text
Portafolio/
│
├── index.html                 # Estructura semántica principal y SEO
├── styles.css                 # Diseño obsidian glassmorphism y media queries
├── script.js                  # Lógica interactiva, canvas, filtros, modales y pagos
├── .gitignore                 # Archivos y carpetas ignorados por Git
├── README.md                  # Documentación oficial del proyecto
│
└── assets/                    # Recursos multimedia
    ├── profile.jpg            # Fotografía auténtica de Erwan Gras
    ├── Curriculum_Erwan_Gras.pdf # CV profesional descargable
    ├── project-drone.jpg      # Imagen del proyecto de drones y filmación
    ├── project-game.jpg       # Imagen del videojuego ganador en Asunción
    ├── project-robotics.jpg   # Imagen de robótica con Arduino y Makey Makey
    ├── project-management.jpg # Imagen del sistema de gestión SQL
    └── project-web.jpg        # Imagen de plataforma web e-commerce
```

---

## 🔄 Guía de Git y Flujo de Actualizaciones Automáticas

Este proyecto está conectado a **Git** y alojado en **GitHub**, con despliegue continuo mediante **GitHub Pages**.

### 1. ¿Cómo se configuró la conexión a Git?
1. Se inicializó el repositorio local con la rama principal `main`:
   ```bash
   git init -b main
   ```
2. Se vincularon los archivos y se creó el primer commit con todos los cambios y recursos:
   ```bash
   git add .
   git commit -m "feat: portafolio profesional completo de Erwan Gras"
   ```
3. Se creó el repositorio público en GitHub con GitHub CLI (`gh`):
   ```bash
   gh repo create Portafolio --public --source=. --remote=origin --push
   ```
4. Se habilitó **GitHub Pages** apuntando a la rama `main` en la raíz `/`, permitiendo que la web esté disponible inmediatamente en internet.

---

### 2. ¿Cómo subir una nueva actualización para que se refleje automáticamente en la web?

Cada vez que agregues un nuevo proyecto, cambies un texto o agregues una foto, sigue estos 3 simples pasos desde la terminal dentro de la carpeta `Portafolio`:

#### Paso 1: Revisa qué archivos modificaste
```bash
git status
```

#### Paso 2: Agrega todos los cambios y crea un commit con un mensaje descriptivo
```bash
git add .
git commit -m "Actualización: nuevo proyecto agregado"
```

#### Paso 3: Sube los cambios a GitHub
```bash
git push origin main
```

> ⚡ **¡Y listo!**  
> GitHub Pages detectará el nuevo `git push` y en aproximadamente **1 a 2 minutos** tu portafolio en vivo en **https://erwangras.github.io/** se actualizará automáticamente sin que tengas que hacer nada más.

---

## 📞 Canales Directos de Contacto

- **WhatsApp:** [+595 973 151 716](https://wa.me/595973151716)
- **Correo Electrónico:** [jsuauusjsuudud@gmail.com](mailto:jsuauusjsuudud@gmail.com)
- **LinkedIn:** [linkedin.com/in/erwan-gras-864860314](https://www.linkedin.com/in/erwan-gras-864860314)
- **GitHub:** [github.com/ErwanGras](https://github.com/ErwanGras)

---
© 2026 **Erwan Gras** · Bachillerato Técnico en Informática (CRECE). Todos los derechos reservados.
