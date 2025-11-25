// anchoring-bias.js

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('nav ul');

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
    
// Rest of the module-specific code continues below...

    const anchorStage = document.getElementById('anchor-stage');
    const estimationStage = document.getElementById('estimation-stage');
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const anchorText = document.getElementById('anchor-text');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const submitEstimateBtn = document.getElementById('submit-estimate');
    const resetBtn = document.getElementById('reset-btn');
    const priceInput = document.getElementById('price-estimate');

    // Make feedback focusable for accessibility
    feedback.setAttribute('tabindex', '-1');

    // Randomly assign user to high or low anchor group
    const isHighAnchor = Math.random() > 0.5;
    const anchorValue = isHighAnchor ? 250 : 25;
    let userAnswer = '';

    // Set the anchor question
    anchorText.textContent = `Is the price of a wireless keyboard higher or lower than $${anchorValue}?`;

    // Handle anchor question answers
    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            userAnswer = this.dataset.answer;
            anchorStage.classList.add('hidden');
            estimationStage.classList.remove('hidden');
        });
    });

    // Handle price estimation
    submitEstimateBtn.addEventListener('click', analyzeEstimate);
    
    // Allow Enter key to submit
    priceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeEstimate();
        }
    });

    function analyzeEstimate() {
        const estimate = parseInt(priceInput.value);

        if (!estimate || estimate <= 0) {
            alert('Please enter a valid price estimate.');
            return;
        }

        const actualPrice = 80;
        const difference = Math.abs(estimate - actualPrice);
        const percentageDiff = Math.round((difference / actualPrice) * 100);

        let resultMessage = '';

        if (isHighAnchor) {
            resultMessage = `You were shown a high anchor of $${anchorValue} and estimated $${estimate}. The actual price is around $${actualPrice}. `;
            
            if (estimate > actualPrice) {
                resultMessage += `Your estimate was ${percentageDiff}% higher than the actual price. This demonstrates how the high anchor influenced you to estimate upward, even though the anchor was arbitrary and unrelated to the keyboard's actual value.`;
            } else if (estimate < actualPrice) {
                resultMessage += `Your estimate was close to the actual price. You may have successfully recognized the anchoring attempt, though the anchor may have still subtly influenced your thinking process.`;
            } else {
                resultMessage += `Your estimate matched the actual price exactly! Excellent judgment.`;
            }
        } else {
            resultMessage = `You were shown a low anchor of $${anchorValue} and estimated $${estimate}. The actual price is around $${actualPrice}. `;
            
            if (estimate < actualPrice) {
                resultMessage += `Your estimate was ${percentageDiff}% lower than the actual price. This shows how the low anchor pulled your estimate downward, demonstrating the power of anchoring bias.`;
            } else if (estimate > actualPrice) {
                resultMessage += `Your estimate was higher than the actual price. You may have adjusted away from the low anchor, recognizing it as unrealistic.`;
            } else {
                resultMessage += `Your estimate matched the actual price exactly! Well done.`;
            }
        }

        feedbackText.textContent = resultMessage;
        feedback.classList.remove('hidden');
        estimationStage.classList.add('hidden');
        
        // Smooth scroll to feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Move focus to feedback for screen readers
        setTimeout(() => {
            feedback.focus();
        }, 500);
    }

    // Reset function
    resetBtn.addEventListener('click', function() {
        anchorStage.classList.remove('hidden');
        estimationStage.classList.add('hidden');
        feedback.classList.add('hidden');
        priceInput.value = '';
        
        // Generate new random anchor
        const newIsHighAnchor = Math.random() > 0.5;
        const newAnchorValue = newIsHighAnchor ? 250 : 25;
        anchorText.textContent = `Is the price of a wireless keyboard higher or lower than $${newAnchorValue}?`;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});