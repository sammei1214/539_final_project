// script.js - Homepage Interactive 3D Card Effect and Hamburger Menu

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navUl.classList.toggle('nav-open');
            hamburger.classList.toggle('active');
        });

        // Keyboard support for hamburger menu
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navUl.classList.contains('nav-open')) {
                hamburger.click();
                hamburger.focus();
            }
        });
    }

    // 3D Card Effects
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        // Add perspective wrapper
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.2s ease';
        
        // Mouse move handler for 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const cardWidth = rect.width;
            const cardHeight = rect.height;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate rotation values (normalized to -1 to 1)
            const rotateX = ((mouseY / cardHeight) - 0.5) * -20; // Tilt up/down
            const rotateY = ((mouseX / cardWidth) - 0.5) * 20;   // Tilt left/right
            
            // Apply 3D transform
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.04, 1.04, 1.04)
            `;
            
            // Add subtle shadow based on tilt
            const shadowX = rotateY * 2;
            const shadowY = -rotateX * 2;
            card.style.boxShadow = `
                ${shadowX}px ${shadowY}px 20px rgba(28, 8, 84, 0.2)
            `;
        });
        
        // Mouse leave handler - reset card
        card.addEventListener('mouseleave', function() {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale3d(1, 1, 1)
            `;
            card.style.boxShadow = '0 4px 20px rgba(28, 8, 84, 0.2)';
        });
        
        // Add subtle parallax to image inside card
        const cardImage = card.querySelector('.module-image img');
        if (cardImage) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                const moveX = (mouseX / rect.width - 0.5) * 10;
                const moveY = (mouseY / rect.height - 0.5) * 10;
                
                cardImage.style.transform = `
                    translate(${moveX}px, ${moveY}px)
                    scale(1.1)
                `;
            });
            
            card.addEventListener('mouseleave', function() {
                cardImage.style.transform = 'translate(0, 0) scale(1)';
            });
        }
    });
    
    // Optional: Add subtle floating animation on page load
    moduleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});