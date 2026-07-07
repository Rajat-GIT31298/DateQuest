document.addEventListener("DOMContentLoaded", () => {
    
    // UI Elements Hooking
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const screenInvitation = document.getElementById('screenInvitation');
    const screenSuccess = document.getElementById('screenSuccess');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const heartContainer = document.getElementById('heartContainer');

    /* --- Particle Engine: Generates Soft Ambient Falling Hearts --- */
    function createAmbientHearts() {
        const heartCount = 15;
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                
                // Randomizing horizontal anchors & sizes
                heart.style.left = Math.random() * 100 + 'vw';
                const size = Math.random() * 15 + 10;
                heart.style.width = `${size}px`;
                heart.style.height = `${size}px`;
                
                // Varied floating timelines
                heart.style.animationDuration = Math.random() * 4 + 6 + 's';
                heart.style.opacity = Math.random() * 0.4 + 0.3;
                
                heartContainer.appendChild(heart);

                // Safe clean up cycle
                heart.addEventListener('animationend', () => {
                    heart.remove();
                });
            }, i * 600);
        }
    }
    
    // Maintain regular interval generator loop
    createAmbientHearts();
    setInterval(createAmbientHearts, 10000);

    /* --- Core Mechanic: Interactive Impossible-To-Click "No" Button --- */
    function dodgeNoButton() {
        // Calculate safe responsive window vectors
        const padding = 20;
        const cardRect = document.getElementById('questCard').getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();

        // Convert context to absolute positioning coordinate values if not done
        if (btnNo.style.position !== 'fixed') {
            btnNo.style.width = btnRect.width + 'px';
            btnNo.style.height = btnRect.height + 'px';
            btnNo.style.position = 'fixed';
        }

        // Generate random placements constrained safely inside visible screen real-estate
        const maxX = window.innerWidth - btnRect.width - padding;
        const maxY = window.innerHeight - btnRect.height - padding;

        let randomX = Math.random() * maxX;
        let randomY = Math.random() * maxY;

        // Ensure button does not accidentally jump directly underneath the user's cursor pointer
        if (Math.abs(randomX - btnRect.left) < 100) randomX += 150;
        if (Math.abs(randomY - btnRect.top) < 100) randomY += 150;

        btnNo.style.left = `${Math.min(Math.max(padding, randomX), maxX)}px`;
        btnNo.style.top = `${Math.min(Math.max(padding, randomY), maxY)}px`;
    }

    // Capture standard desktop hover and rapid touch events for mobile screens
    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        dodgeNoButton();
    });

    /* --- Flow Logic: Successful State Transition --- */
    btnYes.addEventListener('click', () => {
        // Clean out dynamic temporary styles from No actions
        btnNo.style.position = 'relative';
        btnNo.style.left = '0';
        btnNo.style.top = '0';

        // Swap Layout state screens
        screenInvitation.classList.remove('active');
        
        setTimeout(() => {
            screenSuccess.classList.add('active');
            triggerConfettiBurst();
            // Optional: Auto-play music if not running when Yes is pressed
            if (bgMusic.paused) {
                toggleMusicState();
            }
        }, 300);
    });

    /* --- FX System: Canvas Confetti Explosions --- */
    function triggerConfettiBurst() {
        const duration = 4 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#ff4757', '#ff6b81', '#ff7f50', '#ffffff']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#ff4757', '#ff6b81', '#ff7f50', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    /* --- Audio Media Management Engine --- */
    function toggleMusicState() {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
            }).catch(err => {
                console.log("Browser block protection stopped autoplay: ", err);
            });
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
        }
    }

    musicToggle.addEventListener('click', toggleMusicState);
});
