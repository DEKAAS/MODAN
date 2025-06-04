document.addEventListener('DOMContentLoaded', () => {
    // Secret section functionality
    const secretTrigger = document.querySelector('.secret-trigger');
    const secretContent = document.querySelector('.secret-content');

    secretTrigger.addEventListener('click', () => {
        secretTrigger.classList.toggle('active');
        secretContent.classList.toggle('active');
    });

    const galleryContainer = document.getElementById('galleryContainer');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    let currentImageIndex = 0;
    let galleryImages = [];

    // Function to create particles
    function createParticles(element) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${Math.random() * 4}s`);
            particle.style.setProperty('--size', `${Math.random() * 3 + 1}px`);
            particle.style.setProperty('--speed', `${Math.random() * 10 + 10}s`);
            particle.style.setProperty('--start-pos', `${Math.random() * 100}%`);
            particleContainer.appendChild(particle);
        }
        
        element.appendChild(particleContainer);
    }

    // Add particles to link cards
    document.querySelectorAll('.link-card').forEach(card => {
        createParticles(card);
    });

    // Function to load images from assets folder
    async function loadGalleryImages() {
        try {
            const images = [
                '14_Natura',
                '16_Natura_1',
                '17_Natura',
                '26_Natura_4',
                '31_Natura',
                '34_Natura_1',
                '42_Natura',
                '50_Natura',
                '51_Natura',
                '52_Natura',
                '54_Natura',
                '59_Natura',
                '59_Natura_32k'
            ];

            images.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.setProperty('--index', index + 1);

                const img = document.createElement('img');
                const extension = (image === '59_Natura' || image === '59_Natura_32k') ? '.jpg' : '.png';
                img.src = `assets/${image}${extension}`;
                img.alt = `Gallery image ${index + 1}`;
                img.loading = 'lazy';

                galleryItem.appendChild(img);
                galleryContainer.appendChild(galleryItem);
                galleryImages.push(img.src);

                // Add click event for lightbox
                galleryItem.addEventListener('click', () => {
                    openLightbox(index);
                });
            });
        } catch (error) {
            console.error('Error loading gallery images:', error);
        }
    }

    // Function to open lightbox with specific image
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImg.src = galleryImages[currentImageIndex];
        lightbox.classList.add('active');
    }

    // Function to navigate to next/previous image
    function navigateGallery(direction) {
        currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
    }

    // Close lightbox when clicking close button or outside the image
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    lightbox.classList.remove('active');
                    break;
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
            }
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all gallery items and link cards
    document.querySelectorAll('.gallery-item, .link-card').forEach(item => {
        observer.observe(item);
    });

    // Load gallery images
    loadGalleryImages();
}); 