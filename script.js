const noBtn=document.getElementById("noBtn");

const yesBtn=document.getElementById("yesBtn");

noBtn.addEventListener("mouseover",()=>{

const x=Math.random()*(window.innerWidth-150);

const y=Math.random()*(window.innerHeight-100);

noBtn.style.position="absolute";

noBtn.style.left=x+"px";

noBtn.style.top=y+"px";

});

yesBtn.addEventListener("click",()=>{

document.body.innerHTML=`

<div style="height:100vh;display:flex;justify-content:center;align-items:center;flex-direction:column;background:#ff4d6d;color:white;font-family:Arial;text-align:center;">

<h1>Yayyyyy!! ❤️🥳</h1>

<h2>I can't wait for our date! 😊</h2>

<h1>🍕☕🎬💖</h1>

</div>

`;

});
