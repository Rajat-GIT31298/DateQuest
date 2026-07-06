/*==========================================================
 DateQuest
 Premium Romantic Website
==========================================================*/

// ==============================
// Elements
// ==============================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const messageBox = document.getElementById("messageBox");

const successScreen =
document.getElementById("successScreen");

const celebrateBtn =
document.getElementById("celebrateBtn");

const musicToggle =
document.getElementById("musicToggle");

const bgMusic =
document.getElementById("bgMusic");

const clickSound =
document.getElementById("clickSound");

const successSound =
document.getElementById("successSound");

const emojiContainer =
document.getElementById("emojiContainer");

const sparkleContainer =
document.getElementById("sparkles");

// ==============================
// Funny Messages
// ==============================

const messages = [

    "Nice try 😏",

    "Nope... that's not happening 😂",

    "The NO button is shy 🙈",

    "Oops! It escaped again 💨",

    "Just press YES 😍",

    "Your destiny is YES ❤️",

    "The universe says YES ✨",

    "You almost had it 😆",

    "Mission Failed Successfully 🤣",

    "Love always wins 💖",

    "You can't catch me 😜",

    "Give up already 😂",

    "I'm programmed to avoid rejection 😎",

    "That button has trust issues 🤭",

    "Seriously... press YES 😁"

];

let messageIndex = 0;

// ==============================
// Music Toggle
// ==============================

let musicPlaying = false;

musicToggle.addEventListener("click", () => {

    if (musicPlaying) {

        bgMusic.pause();

        musicToggle.classList.remove("active");

    } else {

        bgMusic.play().catch(() => {});

        musicToggle.classList.add("active");

    }

    musicPlaying = !musicPlaying;

});

// ==============================
// Utility Functions
// ==============================

function playClick() {

    if (!clickSound) return;

    clickSound.currentTime = 0;

    clickSound.play().catch(() => {});

}

function random(min, max) {

    return Math.random() * (max - min) + min;

}

function randomInt(min, max) {

    return Math.floor(random(min, max));

}

// ==============================
// Funny Message Rotation
// ==============================

function showRandomMessage() {

    messageBox.textContent =

        messages[messageIndex];

    messageBox.classList.remove("fade-in");

    void messageBox.offsetWidth;

    messageBox.classList.add("fade-in");

    messageIndex++;

    if (messageIndex >= messages.length) {

        messageIndex = 0;

    }

}

// ==============================
// Move NO Button
// ==============================

function moveNoButton() {

    playClick();

    showRandomMessage();

    const parent = document.querySelector(".button-area");

    const maxX =
        parent.clientWidth - noBtn.offsetWidth;

    const maxY =
        parent.clientHeight - noBtn.offsetHeight;

    const x = randomInt(0, Math.max(maxX, 10));

    const y = randomInt(0, Math.max(maxY, 10));

    noBtn.style.left = `${x}px`;

    noBtn.style.top = `${y}px`;

}

/*==========================================================
 NO Button Escape Logic
==========================================================*/

// Desktop: move before the cursor reaches it
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile: move on touch
noBtn.addEventListener("touchstart", (e) => {

    e.preventDefault();

    moveNoButton();

}, { passive: false });

// If someone somehow clicks it...
noBtn.addEventListener("click", (e) => {

    e.preventDefault();

    moveNoButton();

});

// ======================================
// Sparkle Effect
// ======================================

function createSparkles(count = 25) {

    for (let i = 0; i < count; i++) {

        const sparkle =
            document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left =
            randomInt(0, window.innerWidth) + "px";

        sparkle.style.top =
            randomInt(0, window.innerHeight) + "px";

        sparkle.style.animationDelay =
            Math.random() + "s";

        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 1800);

    }

}

// ======================================
// Floating Celebration Emojis
// ======================================

const celebrationEmojis = [

    "❤️",
    "💖",
    "💕",
    "💘",
    "💝",
    "🥰",
    "😍",
    "🌹",
    "✨",
    "🎉"

];

function launchEmojis(total = 40) {

    for (let i = 0; i < total; i++) {

        const emoji =
            document.createElement("div");

        emoji.className = "emoji";

        emoji.textContent =
            celebrationEmojis[
                randomInt(0, celebrationEmojis.length)
            ];

        emoji.style.left =
            randomInt(0, 100) + "%";

        emoji.style.animationDelay =
            (Math.random() * 2) + "s";

        emoji.style.fontSize =
            randomInt(24, 42) + "px";

        emojiContainer.appendChild(emoji);

        setTimeout(() => {

            emoji.remove();

        }, 6000);

    }

}

// ======================================
// Confetti
// ======================================

function launchConfetti() {

    if (typeof confetti !== "function") return;

    confetti({

        particleCount: 180,

        spread: 90,

        origin: {

            y: 0.6

        }

    });

    setTimeout(() => {

        confetti({

            particleCount: 120,

            spread: 150,

            origin: {

                x: 0.2,
                y: 0.5

            }

        });

    }, 250);

    setTimeout(() => {

        confetti({

            particleCount: 120,

            spread: 150,

            origin: {

                x: 0.8,
                y: 0.5

            }

        });

    }, 500);

}

// ======================================
// YES Button
// ======================================

yesBtn.addEventListener("click", () => {

    playClick();

    if (successSound) {

        successSound.currentTime = 0;

        successSound.play().catch(() => {});

    }

    successScreen.style.display = "flex";

    successScreen.classList.add("fade-in");

    launchConfetti();

    launchEmojis();

    createSparkles(45);

});

/*==========================================================
 DateQuest
 Final Initialization & Events
==========================================================*/

// ======================================
// Celebrate Again Button
// ======================================

celebrateBtn.addEventListener("click", () => {

    playClick();

    launchConfetti();

    launchEmojis(50);

    createSparkles(50);

});

// ======================================
// Close Success Screen
// ======================================

successScreen.addEventListener("click", (e) => {

    if (e.target === successScreen) {

        successScreen.style.display = "none";

    }

});

// ======================================
// Keyboard Shortcuts
// ======================================

document.addEventListener("keydown", (event) => {

    switch (event.key.toLowerCase()) {

        case "y":

            yesBtn.click();

            break;

        case "n":

            moveNoButton();

            break;

        case "m":

            musicToggle.click();

            break;

        case "escape":

            successScreen.style.display = "none";

            break;

    }

});

// ======================================
// Resize Handling
// ======================================

window.addEventListener("resize", () => {

    noBtn.style.left = "";
    noBtn.style.top = "";

});

// ======================================
// Auto-play Music After First Interaction
// ======================================

function enableMusic() {

    if (!musicPlaying) {

        bgMusic.play().then(() => {

            musicPlaying = true;
            musicToggle.classList.add("active");

        }).catch(() => {});

    }

    document.removeEventListener("click", enableMusic);
    document.removeEventListener("touchstart", enableMusic);

}

document.addEventListener("click", enableMusic, { once: true });
document.addEventListener("touchstart", enableMusic, { once: true });

// ======================================
// Welcome Animation
// ======================================

window.addEventListener("load", () => {

    document.body.classList.add("fade-in");

    setTimeout(() => {

        createSparkles(20);

    }, 500);

});

// ======================================
// Periodic Floating Sparkles
// ======================================

setInterval(() => {

    createSparkles(8);

}, 6000);

// ======================================
// Prevent Image Dragging
// ======================================

document.querySelectorAll("img").forEach((img) => {

    img.setAttribute("draggable", "false");

});

// ======================================
// Prevent Text Selection on Buttons
// ======================================

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("dragstart", (e) => {

        e.preventDefault();

    });

});

// ======================================
// Console Greeting
// ======================================

console.log(`
❤️ ============================== ❤️

        Welcome to DateQuest!

      Made with ❤️ and JavaScript

❤️ ============================== ❤️
`);

// ======================================
// End of File
// ======================================
