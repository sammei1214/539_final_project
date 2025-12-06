document.addEventListener('DOMContentLoaded', function() {
    // Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navUl.classList.toggle('nav-open');
            hamburger.classList.toggle('active');
        });

        // Keyboard nav for hamburger
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

    // 3D Module Card Effects
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        // Isometric effect and shadow
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const cardWidth = rect.width;
            const cardHeight = rect.height;
            
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const tiltX = ((mouseY / cardHeight) - 0.5) * -10;
            const tiltY = ((mouseX / cardWidth) - 0.5) * 10;
            
            card.style.transform = `
                rotateX(${tiltX}deg)
                rotateY(${tiltY}deg)
                scale(1.02)
            `;
            
            // Shadow
            const shadowX = ((mouseX / cardWidth) - 0.5) * -16;
            const shadowY = ((mouseY / cardHeight) - 0.5) * -16;
            
            card.style.boxShadow = `${shadowX}px ${shadowY + 8}px 0 rgb(229, 225, 242)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = '0 8px 0 rgb(229, 225, 242)';
        });
    });
});