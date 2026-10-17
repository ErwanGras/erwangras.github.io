/* ==========================================================================
   ERWAN GRAS - PORTAFOLIO PROFESIONAL
   Lógica Interactiva, Animaciones y Conectividad
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. CANVAS DE PARTÍCULAS / CONEXIONES SUTILES
       -------------------------------------------------------------------------- */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 120 };

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.6;
                this.speedY = (Math.random() - 0.5) * 0.6;
                this.color = Math.random() > 0.5 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(6, 182, 212, 0.35)';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const maxDistance = mouse.radius;
                        const force = (maxDistance - distance) / maxDistance;
                        this.x -= forceDirectionX * force * 1.5;
                        this.y -= forceDirectionY * force * 1.5;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 75);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        }

        function connectParticles() {
            const maxDistance = 110;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = 1 - (distance / maxDistance);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.15})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animateCanvas);
        }

        resizeCanvas();
        animateCanvas();
    }

    /* --------------------------------------------------------------------------
       2. TYPEWRITER EFFECT (HERO SUBTITLE)
       -------------------------------------------------------------------------- */
    const typewriterElem = document.getElementById('typewriter-text');
    if (typewriterElem) {
        const phrases = [
            "Desarrollador de Software",
            "3er Año BTI · CRECE (18 Años)",
            "🏆 Ganador Competencia Videojuegos Asunción",
            "🚁 Instructor de Vuelo & Manejo de Drones",
            "📱 Community Manager Certificado (SNPP)",
            "🌐 Políglota Internacional · 6 Idiomas"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 90;

        function typeLoop() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElem.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 45;
            } else {
                typewriterElem.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 90;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2200; // Pause at end of phrase
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; // Pause before typing new phrase
            }

            setTimeout(typeLoop, typeSpeed);
        }

        typeLoop();
    }

    /* --------------------------------------------------------------------------
       3. NAVBAR SCROLL & ACTIVE LINK SPY
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Progress bar
        if (scrollProgressBar && totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            scrollProgressBar.style.width = `${progress}%`;
        }

        // Navbar appearance
        if (navbar) {
            if (scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Scroll to top button visibility
        if (scrollTopBtn) {
            if (scrollY > 450) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Scrollspy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --------------------------------------------------------------------------
       4. MENÚ MÓVIL (DRAWER)
       -------------------------------------------------------------------------- */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close when clicking nav items
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. REVEAL ANIMATIONS ON SCROLL (INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    const langProgressBars = document.querySelectorAll('.lang-progress-bar');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate progress bars if inside this container
                if (entry.target.classList.contains('languages-section')) {
                    langProgressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-percent') || '100';
                        bar.style.width = `${targetWidth}%`;
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Also observe language section specifically for progress bar trigger
    const langSection = document.getElementById('idiomas');
    if (langSection) {
        revealObserver.observe(langSection);
    }

    /* --------------------------------------------------------------------------
       6. FILTRO DE HABILIDADES (SKILLS TABS)
       -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       7. TOAST NOTIFICATION UTILITY
       -------------------------------------------------------------------------- */
    const toast = document.getElementById('global-toast');
    const toastText = document.getElementById('toast-text');
    let toastTimeout;

    function showToast(message, iconClass = 'fa-solid fa-circle-check') {
        if (!toast || !toastText) return;
        toastText.textContent = message;
        const icon = toast.querySelector('i');
        if (icon) icon.className = iconClass;

        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    /* --------------------------------------------------------------------------
       8. COPIAR CUENTA BANCARIA & DATOS
       -------------------------------------------------------------------------- */
    const copyBankBtn = document.getElementById('copy-bank-btn');
    if (copyBankBtn) {
        copyBankBtn.addEventListener('click', () => {
            const accountNumber = "6191969491";
            navigator.clipboard.writeText(accountNumber).then(() => {
                showToast("¡Número de cuenta Ueno copiado con éxito!");
            }).catch(() => {
                showToast("Cuenta: 6191969491 (Copia manual)");
            });
        });
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = "jsuauusjsuudud@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                showToast("¡Correo electrónico copiado al portapapeles!");
            }).catch(() => {
                showToast("jsuauusjsuudud@gmail.com");
            });
        });
    }

    /* --------------------------------------------------------------------------
       9. GESTOR DE PAGOS / PAYPAL SDK
       -------------------------------------------------------------------------- */
    const amountInput = document.getElementById('donation-amount');
    const amountChips = document.querySelectorAll('.amount-chip');

    amountChips.forEach(chip => {
        chip.addEventListener('click', () => {
            amountChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            if (amountInput) {
                amountInput.value = chip.getAttribute('data-amount');
            }
        });
    });

    if (amountInput) {
        amountInput.addEventListener('input', () => {
            amountChips.forEach(c => c.classList.remove('active'));
        });
    }

    // Inicialización del botón PayPal
    if (typeof paypal !== 'undefined') {
        const paypalContainer = document.getElementById('paypal-button-container');
        if (paypalContainer) {
            paypal.Buttons({
                style: {
                    color: 'blue',
                    shape: 'rect',
                    label: 'pay',
                    height: 48
                },
                createOrder: function(data, actions) {
                    const amountVal = amountInput ? (amountInput.value || '25') : '25';
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Servicio / Apoyo Profesional - Erwan Gras',
                            amount: {
                                currency_code: 'USD',
                                value: amountVal
                            }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        showToast(`¡Pago completado con éxito! Gracias por tu confianza, ${details.payer.name.given_name}.`);
                    });
                },
                onError: function(err) {
                    console.error('Error en pasarela PayPal:', err);
                    showToast('Ocurrió un detalle en la conexión con PayPal. Puedes usar transferencia Ueno.', 'fa-solid fa-triangle-exclamation');
                }
            }).render('#paypal-button-container');
        }
    }

    /* --------------------------------------------------------------------------
       10. FORMULARIO DE CONTACTO
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                showToast('Por favor completa todos los campos requeridos.', 'fa-solid fa-circle-exclamation');
                return;
            }

            // Opciones de contacto directo
            showToast(`¡Gracias ${name}! Mensaje recibido. Te responderé a la brevedad.`, 'fa-solid fa-paper-plane');
            contactForm.reset();
        });
    }

    /* --------------------------------------------------------------------------
       11. MODAL DETALLES DE PROYECTOS
       -------------------------------------------------------------------------- */
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body-content');

    const projectData = {
        'robotics': {
            title: 'Controlador Interactivo Makey Makey & Arduino IDE',
            category: 'Robótica, Circuitos & Hardware',
            img: 'assets/project-robotics.jpg',
            description: 'Proyecto de ingeniería interactiva que combina hardware físico con control computacional en tiempo real. Utilizando placas Arduino y módulos Makey Makey con sensores táctiles capacitivos y actuadores, el sistema traduce interacciones físicas y objetos cotidianos en señales digitales de comando para aplicaciones y videojuegos.',
            highlights: [
                'Programación y compilación en lenguaje C/C++ sobre Arduino IDE.',
                'Diseño de circuitos sobre protoboard, medición de señales y cableado estructurado.',
                'Integración de sensores de presencia, pulsadores táctiles y displays LCD/OLED.',
                'Conexión USB Human Interface Device (HID) para control de periféricos.'
            ],
            tech: ['Arduino IDE', 'Makey Makey', 'C/C++', 'Electrónica Básica', 'Sensores']
        },
        'videogame': {
            title: 'Videojuego 3D (Ganador Competencia Nacional Asunción)',
            category: '🏆 1er Puesto Nacional · Videojuegos',
            img: 'assets/project-game.jpg',
            description: 'Proyecto galardonado con el Primer Lugar en la destacada competencia de creación y desarrollo de videojuegos celebrada en Asunción. Diseñado y programado integrando mecánicas de movimiento en tiempo real, sistemas de colisiones, cinemáticas inmersivas, iluminación volumétrica y lógica de combate mediante Unreal Engine y prototipado ágil.',
            highlights: [
                'Ganador Absoluto / 1er Puesto en la competencia de desarrollo de videojuegos en Asunción.',
                'Programación visual avanzada mediante Blueprints en Unreal Engine 5 y scripts en Scratch/C++.',
                'Diseño de mecánicas de interacción, físicas de gravedad, cámaras dinámicas e interfaz HUD.',
                'Optimización de tasa de cuadros (FPS) y empaquetado para plataformas de escritorio.'
            ],
            tech: ['🏆 1er Puesto Asunción', 'Unreal Engine 5', 'Blueprints', 'Scratch', 'Físicas 3D', 'C++']
        },
        'drone': {
            title: 'Instrucción & Filmación Aérea con Drones Profesionales',
            category: '🚁 Drones, Filmación & Capacitación',
            img: 'assets/project-drone.jpg',
            description: 'Servicio técnico especializado y profesional de capacitación práctica en pilotaje de drones, además de filmación cinematográfica en resolución 4K. Con certificación oficial como Instructor de Manejo de Drones, se ofrecen cursos personalizados desde principiantes hasta nivel avanzado, así como capturas aéreas para eventos, proyectos arquitectónicos y publicidad.',
            highlights: [
                'Certificación Profesional Oficial como Instructor en Manejo y Pilotaje de Drones.',
                'Cursos teórico-prácticos: aerodinámica, seguridad operacional, calibración de sensores y modos de vuelo.',
                'Filmación aérea 4K con estabilización gimbal para eventos, empresas, inmuebles y cine.',
                'Planificación de rutas de vuelo satelitales y protocolos ante emergencias climáticas.'
            ],
            tech: ['Certificación Instructor', 'Pilotaje de Drones', 'Filmación 4K UHD', 'Gimbal 3 Ejes', 'Capacitación']
        },
        'management': {
            title: 'Sistema de Gestión Empresarial & Base de Datos',
            category: 'Software de Gestión & Backend',
            img: 'assets/project-management.jpg',
            description: 'Software administrativo desarrollado para la gestión de inventarios, registro de transacciones comerciales y reportes operativos. Desarrollado con arquitectura cliente-servidor y consultas relacionales SQL estructuradas para garantizar integridad y velocidad.',
            highlights: [
                'Arquitectura modular con formularios interactivos en Visual Studio Basic (.NET) y Python.',
                'Conexión a motor de base de datos relacional mediante consultas optimizadas SQL (CRUD).',
                'Módulos de autenticación con control de roles y permisos de usuarios.',
                'Generación y exportación de informes analíticos de inventario a formatos compatibles con Microsoft Excel.'
            ],
            tech: ['Visual Studio Basic', 'Python', 'SQL', 'Bases de Datos', 'Microsoft Excel / Ofimática']
        },
        'web': {
            title: 'E-Commerce & Plataforma Web Dinámica',
            category: 'Desarrollo Web & UI/UX',
            img: 'assets/project-web.jpg',
            description: 'Plataforma web moderna y responsiva construida con estándares HTML5, CSS3 y JavaScript moderno, diseñada con un enfoque de alto impacto visual y experiencia de usuario fluida en todos los dispositivos móviles y de escritorio.',
            highlights: [
                'Diseño moderno tipo Glassmorphism con paleta oscura obsidian y acentos ciber-tecnológicos.',
                'Catálogo interactivo con filtrado por categorías y renderizado dinámico en tiempo real.',
                'Integración de pasarela de pagos digital y canal directo de atención vía WhatsApp.',
                'Diseño de identidades y elementos visuales con Adobe Photoshop, Canva y CorelDRAW.'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Photoshop', 'Canva', 'CorelDRAW', 'UI/UX']
        }
    };

    window.openProjectModal = function(projectId) {
        const data = projectData[projectId];
        if (!data || !projectModal || !modalBody) return;

        let techBadges = data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');
        let highlightsList = data.highlights.map(h => `<li><i class="fa-solid fa-check text-cyan" style="color:var(--accent-cyan); margin-right:8px;"></i>${h}</li>`).join('');

        modalBody.innerHTML = `
            <div style="margin-bottom: 1.5rem;">
                <span class="section-tag" style="font-size:0.75rem; margin-bottom:0.5rem;">${data.category}</span>
                <h2 style="font-size: 1.85rem; margin-top: 0.5rem; margin-bottom: 1rem;">${data.title}</h2>
            </div>
            <div style="width:100%; height:260px; border-radius:12px; overflow:hidden; margin-bottom:1.5rem; background:#000;">
                <img src="${data.img}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem; font-size:1rem;">
                ${data.description}
            </p>
            <div style="margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.8rem; font-size:1.1rem; color:var(--text-primary);">Puntos Destacados</h4>
                <ul style="display:flex; flex-direction:column; gap:0.6rem; color:var(--text-secondary); font-size:0.95rem;">
                    ${highlightsList}
                </ul>
            </div>
            <div>
                <h4 style="margin-bottom: 0.8rem; font-size:1.1rem; color:var(--text-primary);">Tecnologías Empleadas</h4>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
                    ${techBadges}
                </div>
            </div>
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    if (modalCloseBtn && projectModal) {
        modalCloseBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});
