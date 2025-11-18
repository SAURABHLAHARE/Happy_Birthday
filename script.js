// -------------------- Slideshow --------------------
let slideIndex = 0;
const slides = document.querySelectorAll(".slideshow img");

function showSlide(index){
    slides.forEach((img,i)=>img.classList.toggle("active", i===index));
}

function nextSlide(){
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

setInterval(nextSlide, 3000);
showSlide(slideIndex);

// -------------------- Questions --------------------
const questions=[
    {text:"What gift do you prefer from me? 🎁", btnYes:"Something emotional 💝", btnNo:"Something expensive 💎"},
    {text:"How do you want your special day to start? 🌅", btnYes:"Talking with me 🥰📞", btnNo:"Listening to your favorite song 🎶💗"},
    {text:"How do you want your birthday to feel today? 🥰", btnYes:"Romantic 💗", btnNo:"Fun & Crazy 🎈"},
    {text:"How should I tease you today? 😏", btnYes:"Cute teasing 😇💫", btnNo:"Flirty teasing 😏🔥"},
    {text:"Which moment do you want to create today? 💖", btnYes:"A romantic memory 🌹✨", btnNo:"A funny memory 😂🎉"},
    {text:"Which compliment do you love more from me? 💬", btnYes:"“You’re beautiful.” 💘✨", btnNo:"“I’m lucky to have you.” ❤️🌍"}
];

let currentIndex=0;

function showQuestion(index){
    const q=questions[index];
    document.getElementById('currentQuestion').textContent=q.text;
    document.getElementById('yesBtn').textContent=q.btnYes.toUpperCase();
    document.getElementById('noBtn').textContent=q.btnNo.toUpperCase();
    document.getElementById('noMessage').classList.remove('show');
}

// -------------------- FIXED ANSWERS (NOW LOVE LETTER WORKS) --------------------
function yesAnswer(){
    currentIndex++;
    if(currentIndex < questions.length){
        showQuestion(currentIndex);
    } else {
        showLoveLetter();
        startConfetti();
    }
}

function noAnswer(){
    currentIndex++;
    if(currentIndex < questions.length){
        showQuestion(currentIndex);
    } else {
        showLoveLetter();
        startConfetti();
    }
}

// Initialize first question
showQuestion(currentIndex);

// -------------------- Gift Surprise --------------------
function giftSurprise(){
    const message = "🎉 Surprise! You Are My Little Baby 🥰… And The Cutest Girl In The World, Sona! 💖🌸";
    const giftMessage = document.getElementById('giftMessage');
    giftMessage.innerHTML = "";
    giftMessage.style.opacity = 1;

    // Typing effect
    let i = 0;
    function typeWriter(){
        if(i < message.length){
            giftMessage.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();

    // Floating hearts effect
    const isMobile = window.innerWidth <= 600;
    for(let j=0; j<7; j++){
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.textContent = '💖';
        heart.style.left = (Math.random() * (isMobile ? 60 : 80) + 10) + "%";
        heart.style.animationDelay = (j*0.3) + "s";
        document.body.appendChild(heart);
        setTimeout(()=>{ heart.remove(); }, 2000);
    }
}

// -------------------- Romantic Love Letter --------------------
function showLoveLetter(){
    const letterBox = document.getElementById('letterBox');
    letterBox.style.display = 'block';
    letterBox.innerHTML = `
        <p style="line-height:1.6; font-size:1.4rem;">
            💖 <strong>Happy Birthday My Beloved Cutie Piee..!!!</strong> 🎂✨<br><br>
            On this special day, I just want to remind you how deeply I love you ❤️. 
            You are the light of my life 🌟, the smile that brightens my days 😘, 
            and the warmth that fills my heart 💓.<br><br>
            Every moment with you feels like a beautiful dream 🌈💞. 
            Your laughter is my favorite melody 🎶, your eyes are my favorite view 👀, 
            and your love is my most cherished treasure 💝.<br><br>
            Today, I wish to hold you close 🤗, shower you with hugs 🤗 and kisses 💋, 
            and make you feel as special as you truly are ✨💗.<br><br>
            Thank you for being my partner, my best friend, and my everything 💕. 
            I promise to love you endlessly, support you always, and make every day as magical as today 🌹💞.<br><br>
            Happy Birthday, my love 🎉❤️! You mean the world to me 🌎💖.<br><br>
            — <strong>Forever Yours, Saurabh 💌💗</strong>
        </p>
    `;
}

// -------------------- Confetti Animation --------------------
function startConfetti(){
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = window.innerWidth <= 600 ? 80 : 150;
    for(let i=0; i<confettiCount; i++){
        confetti.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*6+2,
            d: Math.random()*150+50,
            color: `hsl(${Math.random()*360},100%,50%)`,
            tilt: Math.random()*10-10,
            tiltAngleIncrement: Math.random()*0.07+0.05
        });
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confetti.forEach(f=>{
            ctx.beginPath();
            ctx.lineWidth = f.r/2;
            ctx.strokeStyle = f.color;
            ctx.moveTo(f.x+f.tilt+f.r/4, f.y);
            ctx.lineTo(f.x+f.tilt, f.y+f.tilt+f.r/4);
            ctx.stroke();
        });
        update();
        requestAnimationFrame(draw);
    }

    function update(){
        confetti.forEach(f=>{
            f.tiltAngle += f.tiltAngleIncrement;
            f.y += Math.cos(f.d)+1+f.r/2;
            f.x += Math.sin(f.d);
            f.tilt = Math.sin(f.tiltAngle)*12;
            if(f.y > canvas.height){ f.y = -10; f.x = Math.random()*canvas.width; }
        });
    }

    draw();
}
