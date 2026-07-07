document.addEventListener("DOMContentLoaded", () => {
    
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

    /* --- Handles the Flow Sequence --- */
    function navigateToStep(stepNumber) {
        Object.keys(steps).forEach(key => {
            steps[key].classList.remove('active');
        });
        steps[stepNumber].classList.add('active');
    }

    /* --- The Runaway No Button Feature --- */
    function teleportNoButton() {
        const padding = 30;
        
        // Compute available runtime windows
        const maxX = window.innerWidth - btnNo.offsetWidth - padding;
        const maxY = window.innerHeight - btnNo.offsetHeight - padding;

        // Pick completely random viewport coordinates
        const randomX = Math.floor(Math.random() * (maxX - padding)) + padding;
        const randomY = Math.floor(Math.random() * (maxY - padding)) + padding;

        // Apply instant override styles to move it out of layout flow
        btnNo.style.position = 'fixed';
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    }

    // Capture standard mice hovers and pointer coordinates
    btnNo.addEventListener('mouseenter', teleportNoButton);
    btnNo.addEventListener('mouseover', teleportNoButton);
    
    // Smooth compatibility hook for mobile devices
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Blocks clicks from landing
        teleportNoButton();
    });

    /* --- Interactive Steps Navigation --- */
    
    btnYes1.addEventListener('click', () => {
        // Reset No button state behind scenes if needed later
        btnNo.style.position = 'relative';
        btnNo.style.left = 'auto';
        btnNo.style.top = 'auto';
        navigateToStep(2);
    });

    btnNext2.addEventListener('click', () => {
        navigateToStep(3);
    });

    btnNext3.addEventListener('click', () => {
        const dateInput = document.getElementById('datePicker').value;
        const timeInput = document.getElementById('timePicker').value;

        if (!dateInput || !timeInput) {
            alert("Please select a date and time first! 🥰");
            return;
        }
        navigateToStep(4);
    });

    // Grid Vibe Selectors mapping to Final Screen
    const vibeCards = document.querySelectorAll('.vibe-card');
    vibeCards.forEach(card => {
        card.addEventListener('click', () => {
            navigateToStep(5);
        });
    });

    /* --- Soft Falling Hearts Engine --- */
    function makeHearts() {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
                
                heartContainer.appendChild(heart);
                heart.addEventListener('animationend', () => heart.remove());
            }, i * 350);
        }
    }
    makeHearts();
    setInterval(makeHearts, 6000);
});
