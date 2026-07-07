document.addEventListener("DOMContentLoaded", () => {
    
    // UI Elements 
    const btnNo = document.getElementById('btnNo');
    const btnYes1 = document.getElementById('btnYes1');
    const btnNext2 = document.getElementById('btnNext2');
    const btnNext3 = document.getElementById('btnNext3');
    
    const steps = {
        1: document.getElementById('step1'),
        2: document.getElementById('step2'),
        3: document.getElementById('step3'),
        4: document.getElementById('step4'),
        5: document.getElementById('step5'),
    };

    const heartContainer = document.getElementById('heartContainer');

    /* --- Helper: Navigation State Switcher --- */
    function navigateToStep(targetStep) {
        // Hide all steps
        Object.values(steps).forEach(step => step.classList.remove('active'));
        // Show selected step
        steps[targetStep].classList.add('active');
    }

    /* --- Feature: Run Away/Shrink No Button --- */
    function dodgeNoButton() {
        const padding = 20;
        const buttonRect = btnNo.getBoundingClientRect();
        
        // Compute random safe coordinates on view space
        const maxX = window.innerWidth - buttonRect.width - padding;
        const maxY = window.innerHeight - buttonRect.height - padding;

        let randomX = Math.random() * maxX;
        let randomY = Math.random() * maxY;

        // Force layout change to allow moving
        if (btnNo.style.position !== 'fixed') {
            btnNo.style.width = buttonRect.width + 'px';
            btnNo.style.position = 'fixed';
        }

        btnNo.style.left = `${Math.max(padding, Math.min(randomX, maxX))}px`;
        btnNo.style.top = `${Math.max(padding, Math.min(randomY, maxY))}px`;
    }

    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeNoButton();
    });

    /* --- Flow Navigation Mapping --- */
    
    // Step 1 -> Step 2
    btnYes1.addEventListener('click', () => {
        navigateToStep(2);
    });

    // Step 2 -> Step 3
    btnNext2.addEventListener('click', () => {
        navigateToStep(3);
    });

    // Step 3 -> Step 4 Validation
    btnNext3.addEventListener('click', () => {
        const dateVal = document.getElementById('datePicker').value;
        const timeVal = document.getElementById('timePicker').value;

        if(!dateVal || !timeVal) {
            alert("Please pick a day and time! 🥰");
            return;
        }
        navigateToStep(4);
    });

    // Step 4 Grid Selection -> Step 5
    const vibeCards = document.querySelectorAll('.vibe-card');
    vibeCards.forEach(card => {
        card.addEventListener('click', () => {
            const chosenVibe = card.getAttribute('data-vibe');
            console.log(`User selected Vibe: ${chosenVibe}`); // Accessible context variable
            navigateToStep(5);
        });
    });

    /* --- Background Particle Generator --- */
    function spawnHearts() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = Math.random() * 3 + 5 + 's';
                heartContainer.appendChild(heart);

                heart.addEventListener('animationend', () => heart.remove());
            }, i * 400);
        }
    }
    spawnHearts();
    setInterval(spawnHearts, 8000);
});
