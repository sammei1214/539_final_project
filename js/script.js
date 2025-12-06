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
        // Mouse move handler for isometric effect and shadow
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const cardWidth = rect.width;
            const cardHeight = rect.height;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate isometric tilt values (subtle, equal angles)
            const tiltX = ((mouseY / cardHeight) - 0.5) * -10; // Reduced to 10 degrees max
            const tiltY = ((mouseX / cardWidth) - 0.5) * 10;   // Reduced to 10 degrees max
            
            // Apply isometric transform
            card.style.transform = `
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                scale(1.02)
            `;
            
            // Calculate shadow position based on pointer
            // Shadow moves opposite to pointer (away from light source)
            const shadowX = ((mouseX / cardWidth) - 0.5) * -16; // Max 8px offset in each direction
            const shadowY = ((mouseY / cardHeight) - 0.5) * -16; // Max 8px offset in each direction
            
            // Apply dynamic shadow
            card.style.boxShadow = `${shadowX}px ${shadowY + 8}px 0 rgb(229, 225, 242)`;
        });
        
        // Mouse leave handler - reset card
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            // Reset shadow to default
            card.style.boxShadow = '0 8px 0 rgb(229, 225, 242)';
        });
    });
});