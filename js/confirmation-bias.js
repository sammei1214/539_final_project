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

// Interactive module
    const submitBtn = document.getElementById('submit-evidence');
    const resetBtn = document.getElementById('reset-btn');
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const checkboxes = document.querySelectorAll('input[name="evidence"]');

    feedback.setAttribute('tabindex', '-1');

    submitBtn.addEventListener('click', analyzeSelections);
    resetBtn.addEventListener('click', resetModule);

    function analyzeSelections() {
        let positiveCount = 0;
        let negativeCount = 0;
        let totalSelected = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalSelected++;
                if (checkbox.value === 'positive') {
                    positiveCount++;
                } else {
                    negativeCount++;
                }
            }
        });

        if (totalSelected === 0) {
            feedbackText.textContent = 'Please select at least one piece of evidence to analyze your selection pattern.';
            feedback.classList.remove('hidden');
            feedback.focus();
            return;
        }

        const positivePercentage = Math.round((positiveCount / totalSelected) * 100);
        const negativePercentage = Math.round((negativeCount / totalSelected) * 100);

        let resultMessage = '';

        if (positiveCount > negativeCount) {
            resultMessage = `You selected ${positiveCount} positive pieces of evidence and ${negativeCount} negative pieces (${positivePercentage}% positive). This demonstrates confirmation bias in action! You gravitated toward information that supports the belief that coffee is healthy, while potentially overlooking evidence of its negative effects.`;
        } else if (negativeCount > positiveCount) {
            resultMessage = `You selected ${negativeCount} negative pieces of evidence and ${positiveCount} positive pieces (${negativePercentage}% negative). Interestingly, you focused more on the negative aspects. This could suggest you held a different initial belief about coffee, or you're actively working against confirmation bias!`;
        } else {
            resultMessage = `You selected ${positiveCount} positive and ${negativeCount} negative pieces of evidence equally (${positivePercentage}% each). This balanced approach suggests you're aware of confirmation bias and actively seeking diverse perspectives. Well done!`;
        }

        feedbackText.textContent = resultMessage;
        feedback.classList.remove('hidden');
        
        // Smooth scroll
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        setTimeout(() => {
            feedback.focus();
        }, 500);
    }

    function resetModule() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        feedback.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});