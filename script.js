// --- CONFIGURE YOUR SETTINGS HERE ---
const YOUR_NAME = "Vishal";
const HER_NAME = "aaaa"; 

// Enter your phone number WITH the country code, but WITHOUT the '+' sign.
// Example for India: "919876543210"
const YOUR_PHONE_NUMBER = "919453601933"; 

document.addEventListener("DOMContentLoaded", () => {
    
    // Inject the names into the HTML
    document.getElementById('authorName').textContent = YOUR_NAME;
    document.getElementById('authorNameBtn').textContent = YOUR_NAME;
    document.getElementById('targetName').textContent = HER_NAME;

    // Variables to store her answers!
    let chosenDate = "";
    let chosenTime = "";
    let chosenFood = "";

    const btnNo = document.getElementById('btnNo');
    const btnYes1 = document.getElementById('btnYes1');
    const btnNext2 = document.getElementById('btnNext2');
    const btnNext3 = document.getElementById('btnNext3');
    const btnSend = document.getElementById('btnSend');
    
    const steps = [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4'),
        document.getElementById('step5')
    ];

    function showStep(stepIndex) {
        steps.forEach(step => step.classList.remove('active'));
        steps[stepIndex].classList.add('active');
    }

    btnYes1.addEventListener('click', () => { showStep(1); });
    btnNext2.addEventListener('click', () => { showStep(2); });

    // Save Date & Time
    btnNext3.addEventListener('click', () => {
        chosenDate = document.getElementById('datePicker').value;
        chosenTime = document.getElementById('timePicker').value;

        if(!chosenDate || !chosenTime) {
            alert("Please pick a day and time first! 📅");
            return;
        }
        showStep(3);
    });

    // Save Food Vibe
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Find the closest grid-item (in case they click the emoji inside it)
            const clickedItem = e.target.closest('.grid-item');
            chosenFood = clickedItem.getAttribute('data-food');
            showStep(4);
        });
    });

    // The WhatsApp Redirect
    btnSend.addEventListener('click', () => {
        // Build the message
        const message = `Hey ${YOUR_NAME}! I'd love to hang out! ✨%0A%0A📅 Date: ${chosenDate}%0A🕒 Time: ${chosenTime}%0A🍽️ Vibe: ${chosenFood}%0A%0ACan't wait!`;
        
        // Create the WhatsApp link
        const whatsappLink = `https://wa.me/${YOUR_PHONE_NUMBER}?text=${message}`;
        
        // Open WhatsApp in a new tab/app
        window.open(whatsappLink, '_blank');
    });

    // Runaway No Button
    function moveButton() {
        btnNo.style.position = 'fixed';
        btnNo.style.zIndex = '9999';

        const maxX = window.innerWidth - btnNo.offsetWidth - 20;
        const maxY = window.innerHeight - btnNo.offsetHeight - 20;

        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));

        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
    }

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        moveButton();
    });
});
