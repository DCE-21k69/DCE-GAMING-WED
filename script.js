document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Icon change
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-xmark');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Header Background Change on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Glitch Text Randomizer (Simple Effect)
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            const original = glitchElement.getAttribute('data-text');
            // Very subtle occasional glitch logic could go here
            // For now CSS does the heavy lifting, this is a placeholder for future complex JS anims
        }, 3000);
    }
    // Background Slideshow Logic
    const slideshowImages = [
        'eugene-du-.jpg',
        'eugene-du-2.jpg',
        'eugene-du-air-exchange-public.jpg',
        'eugene-du-walls.jpg',
        'eugene-du-warehouse-robbery.jpg'
    ];

    const slideshowContainer = document.createElement('div');
    slideshowContainer.id = 'bg-slideshow';

    // Create image elements
    slideshowImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('bg-slide');
        if (index === 0) img.classList.add('active');
        slideshowContainer.appendChild(img);
    });

    // Inser at the start of body
    document.body.prepend(slideshowContainer);

    // Rotation Logic
    let currentSlide = 0;
    const slides = document.querySelectorAll('.bg-slide');

    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000); // Change every 5 seconds

    // Minecraft Launcher Toggle
    const launcherTrigger = document.getElementById('launcher-trigger');
    const launcherSection = document.getElementById('launcher-section');

    if (launcherTrigger && launcherSection) {
        launcherTrigger.addEventListener('click', () => {
            if (launcherSection.style.display === 'none') {
                launcherSection.style.display = 'block';
                launcherTrigger.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Ocultar Launcher de Minecraft';

                // Smooth scroll to the section
                setTimeout(() => {
                    launcherSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                launcherSection.style.display = 'none';
                launcherTrigger.innerHTML = '<i class="fa-solid fa-rocket"></i> Ver Launcher de Minecraft';
            }
        });
    }

});
