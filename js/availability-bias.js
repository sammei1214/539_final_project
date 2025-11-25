// availability-bias.js

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
    const newsStage = document.getElementById('news-stage');
    const questionStage = document.getElementById('question-stage');
    const feedback = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    const continueBtn = document.getElementById('continue-btn');
    const resetBtn = document.getElementById('reset-btn');
    const questionText = document.getElementById('question-text');
    const timerDisplay = document.getElementById('timer');
    const optionButtons = document.querySelectorAll('.option-btn');

    // Make feedback focusable for accessibility
    feedback.setAttribute('tabindex', '-1');

    const questions = [
        {
            question: "Based on the headlines you just read, how would you rate the safety of air travel compared to car travel?",
            optionA: "Air travel is more dangerous",
            optionB: "Car travel is more dangerous",
            correctAnswer: "b"
        },
        {
            question: "If you had to travel 500 miles tomorrow, which option would feel safer to you right now?",
            optionA: "Driving",
            optionB: "Flying",
            correctAnswer: "b"
        }
    ];

    let currentQuestion = 0;
    let userAnswers = [];
    let timerInterval;
    let timeRemaining = 15;

    // Start module
    continueBtn.addEventListener('click', startQuestions);

    function startQuestions() {
        newsStage.classList.add('hidden');
        questionStage.classList.remove('hidden');
        displayQuestion();
    }

    function displayQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        const q = questions[currentQuestion];
        questionText.textContent = q.question;
        optionButtons[0].textContent = q.optionA;
        optionButtons[1].textContent = q.optionB;

        // Reset and start timer
        timeRemaining = 15;
        timerDisplay.textContent = timeRemaining;
        
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(function() {
            timeRemaining--;
            timerDisplay.textContent = timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                handleAnswer('timeout');
            }
        }, 1000);

        // Enable buttons
        optionButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
    }

    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.dataset.option;
            handleAnswer(answer);
        });
    });

    function handleAnswer(answer) {
        clearInterval(timerInterval);
        
        // Disable buttons
        optionButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });

        userAnswers.push({
            questionIndex: currentQuestion,
            answer: answer,
            timeTaken: 10 - timeRemaining
        });

        currentQuestion++;

        // Small delay before next question
        setTimeout(function() {
            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                showResults();
            }
        }, 1000);
    }

    function showResults() {
        questionStage.classList.add('hidden');
        
        let biasedAnswers = 0;
        userAnswers.forEach((answer, index) => {
            if (answer.answer === 'a' || answer.answer === 'timeout') {
                biasedAnswers++;
            }
        });

        let resultMessage = '';

        if (biasedAnswers === userAnswers.length) {
            resultMessage = `You answered all questions in a way that suggests the headlines influenced your perception. After reading dramatic flight-related news, you perceived air travel as more dangerous, even though statistically, flying is significantly safer than driving. This is a classic example of availability biasâ€”vivid, recent information made flight risks feel more "available" in your mind.`;
        } else if (biasedAnswers > 0) {
            resultMessage = `Some of your answers suggest the headlines influenced your risk perception. The dramatic flight news made air travel risks feel more immediate and probable, even though car travel is statistically far more dangerous. You demonstrated some awareness of availability bias, but the vivid headlines still affected your gut reactions.`;
        } else {
            resultMessage = `Your answers suggest you weren't significantly influenced by the headlines! You recognized that despite the dramatic flight news, air travel remains statistically safer than driving. This shows strong awareness of availability bias and the ability to look beyond memorable examples to actual probabilities.`;
        }

        feedbackText.textContent = resultMessage;
        feedback.classList.remove('hidden');
        
        // Smooth scroll to feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Move focus to feedback for screen readers
        setTimeout(() => {
            feedback.focus();
        }, 500);
    }

    resetBtn.addEventListener('click', function() {
        currentQuestion = 0;
        userAnswers = [];
        newsStage.classList.remove('hidden');
        questionStage.classList.add('hidden');
        feedback.classList.add('hidden');
        
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});