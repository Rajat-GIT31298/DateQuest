document.addEventListener("DOMContentLoaded", () => {
    
    const btnNo = document.getElementById('btnNo');
    const btnYes1 = document.getElementById('btnYes1');
    const btnNext2 = document.getElementById('btnNext2');
    const btnNext3 = document.getElementById('btnNext3');
    
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

    btnNext3.addEventListener('click', () => {
        const dateVal = document.getElementById('datePicker').value;
        const timeVal = document.getElementById('timePicker').value;

        if(!dateVal || !timeVal) {
            alert("Please pick a day and time first! 📅");
            return;
        }
        showStep(3);
    });

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            showStep(4);
        });
    });

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
