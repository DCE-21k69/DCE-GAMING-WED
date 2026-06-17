document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       LOADING SCREEN
       ============================================================ */
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 900);
        });
        // Fallback — hide after 2.5s regardless
        setTimeout(() => loadingScreen.classList.add('hidden'), 2500);
    }
    /* ============================================================
       MOBILE NAVIGATION
       ============================================================ */
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
                hamburger.classList.remove('active');
            });
        });
    }

    /* ============================================================
       HEADER SCROLL
       ============================================================ */
    const header = document.querySelector('header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ============================================================
       PARTICLES CANVAS (Hero)
       ============================================================ */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const COUNT = 60;

        function resize() {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        function createParticle() {
            return {
                x:     Math.random() * canvas.width,
                y:     Math.random() * canvas.height,
                vx:    (Math.random() - 0.5) * 0.4,
                vy:    -Math.random() * 0.6 - 0.2,
                radius: Math.random() * 1.5 + 0.4,
                alpha:  Math.random() * 0.5 + 0.1,
                color:  Math.random() > 0.6 ? '255,170,0' : '0,255,170',
            };
        }

        for (let i = 0; i < COUNT; i++) particles.push(createParticle());

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Draw dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
                ctx.fill();

                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.0008;

                if (p.alpha <= 0 || p.y < -10) {
                    Object.assign(p, createParticle());
                    p.y = canvas.height + 10;
                    p.alpha = Math.random() * 0.5 + 0.1;
                }
            });

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255,170,0,${0.06 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    /* ============================================================
       BACKGROUND SLIDESHOW
       ============================================================ */
    const slideshowImages = [
        'eugene-du-.jpg',
        'eugene-du-2.jpg',
        'eugene-du-air-exchange-public.jpg',
        'eugene-du-walls.jpg',
        'eugene-du-warehouse-robbery.jpg'
    ];

    const slideshowContainer = document.createElement('div');
    slideshowContainer.id = 'bg-slideshow';

    slideshowImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('bg-slide');
        if (index === 0) img.classList.add('active');
        img.loading = 'lazy';
        slideshowContainer.appendChild(img);
    });

    document.body.prepend(slideshowContainer);

    let currentSlide = 0;
    const slides = slideshowContainer.querySelectorAll('.bg-slide');

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 6000);

    /* ============================================================
       SCROLL REVEAL (IntersectionObserver)
       ============================================================ */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Trigger progress bar fill if inside project card
                    const fill = entry.target.querySelector('.progress-fill');
                    if (fill) {
                        const target = fill.getAttribute('data-width') || '0';
                        setTimeout(() => { fill.style.width = target; }, 200);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: show everything
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // Trigger progress bars visible on load if already in view
    document.querySelectorAll('.progress-fill').forEach(fill => {
        const target = fill.getAttribute('data-width');
        if (target) fill.style.width = '0%';
    });

    /* ============================================================
       ANIMATED COUNTERS (Stats)
       ============================================================ */
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statsObserver.observe(el));
    }

    /* ============================================================
       COPY IP BUTTON
       ============================================================ */
    document.querySelectorAll('.copy-ip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const ip = btn.getAttribute('data-ip');
            if (!ip) return;
            navigator.clipboard.writeText(ip).then(() => {
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const ta = document.createElement('textarea');
                ta.value = ip;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                document.execCommand('copy');
                document.body.removeChild(ta);
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });

    /* ============================================================
       MINECRAFT LAUNCHER TOGGLE
       ============================================================ */
    const launcherTrigger = document.getElementById('launcher-trigger');
    const launcherSection = document.getElementById('launcher-section');

    if (launcherTrigger && launcherSection) {
        launcherTrigger.addEventListener('click', () => {
            const isHidden = launcherSection.style.display === 'none' || launcherSection.style.display === '';
            if (isHidden) {
                launcherSection.style.display = 'block';
                launcherTrigger.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ocultar Launcher';
                setTimeout(() => launcherSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            } else {
                launcherSection.style.display = 'none';
                launcherTrigger.innerHTML = '<i class="fa-solid fa-rocket"></i> Ver Launcher de Minecraft';
            }
        });
    }

});
