// DOM Elements
const screens = {
    1: document.getElementById('screen-welcome'),
    2: document.getElementById('screen-quiz'),
    3: document.getElementById('screen-gallery'),
    4: document.getElementById('screen-love-button'),
    5: document.getElementById('screen-final')
};

// State
let currentScreen = 1;
let quizIndex = 0;

// Quiz Data - USER TO EDIT
const quizQuestions = [
    {
        question: "ฮีโร่ตัวไหนน แก้ทาง murad ?",
        options: ["Marja", "Florentino", "Zata", "Qi"],
        answer: 3 // Index of correct answer (0-3)
    },
    {
        question: "ถ้าใกล้จะถึง 15 นาที ออฟเลนควรทำอะไร ?",
        options: ["วิ่งไปบวก", "ยืนบ่อรอ 15 นาที", "ดันเวฟฝั่งตรงข้าม", "ยืนวาร์ปหน้าบลู"],
        answer: 2
    },
    {
        question: "วันครบรอบของเราวันที่เท่าไหร่เอ่ยยยออฟเลนตัวจ้อยย",
        options: ["14 กุมภาพันธ์", "4 พฤศจิกายน", "13 เมษายน", "8 เมษายน"],
        answer: 1
    }
];

// Navigation
function nextScreen(screenId) {
    const current = screens[currentScreen];
    const next = screens[screenId + 1];

    if (current && next) {
        current.classList.remove('active');
        current.classList.add('hidden');

        next.classList.remove('hidden');
        next.classList.add('active');

        currentScreen = screenId + 1;

        // Play music on first interaction (Start Button)
        if (currentScreen === 2) {
            const audio = document.getElementById('bg-music');
            if (audio) {
                audio.volume = 0.5; // Set volume to 50%
                audio.play().catch(error => {
                    console.log("Audio play failed (browser policy): ", error);
                });
            }
            loadQuiz();
        }
        if (currentScreen === 5) typeWriter();
    }
}

// Quiz Logic
function loadQuiz() {
    if (quizIndex >= quizQuestions.length) {
        nextScreen(2); // Go to Gallery
        return;
    }

    const q = quizQuestions[quizIndex];
    document.getElementById('quiz-question').innerText = q.question;
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'btn-primary option-btn';
        btn.onclick = () => checkAnswer(idx, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const correctIndex = quizQuestions[quizIndex].answer;
    const feedback = document.getElementById('quiz-feedback');

    if (selectedIndex === correctIndex) {
        feedback.innerText = "ถือว่าใช้ได้ 💕";
        feedback.style.color = "green";
        setTimeout(() => {
            feedback.innerText = "";
            quizIndex++;
            loadQuiz();
        }, 1000);
    } else {
        feedback.innerText = "นี่แกกก ไม่จำที่สอนเลยนี่หว่าาา";
        feedback.style.color = "red";
        btnElement.classList.add('shake');
        setTimeout(() => btnElement.classList.remove('shake'), 500);
    }
}

// Gallery Logic
// Captions removed as requested.

// Love Button Logic
const btnNoLove = document.getElementById('btn-no-love');
const btnLove = document.getElementById('btn-love');
let loveBtnScale = 1;

function moveButton() {
    // Ensure button is fixed
    btnNoLove.style.position = 'fixed';

    // Get simple dimensions (safer than rect for this purpose)
    const w = btnNoLove.offsetWidth;
    const h = btnNoLove.offsetHeight;

    // LARGE Safety margin to prevent any edge clipping
    const margin = 50;

    // Viewport dimensions
    const vpW = window.innerWidth;
    const vpH = window.innerHeight;

    // Calculate strict bounds: [margin] to [vpW - w - margin]
    // If screen is too small, these Math.max ensure we default to 'margin' (top/left)
    const maxLeft = Math.max(margin, vpW - w - margin);
    const maxTop = Math.max(margin, vpH - h - margin);

    const randomX = Math.random() * (maxLeft - margin) + margin;
    const randomY = Math.random() * (maxTop - margin) + margin;

    btnNoLove.style.left = randomX + 'px';
    btnNoLove.style.top = randomY + 'px';

    // Grow the Love button
    loveBtnScale += 0.2;
    btnLove.style.transform = `scale(${loveBtnScale})`;
}

// Desktop: Mouseover
btnNoLove.addEventListener('mouseover', moveButton);
// Mobile: Touchstart (better than click for "running away")
btnNoLove.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click
    moveButton();
});

function handleLoveClick() {
    nextScreen(4); // Go to Final Screen
}

// Final Message Typewriter
const finalMessage = `ขอบคุณที่ให้โอกาสเราอีกรอบนะจั้ฟฟ ขอโทษที่ยังเป็นแฟนที่นิสัยไม่ดี แต่หน้าตาดีอยู่นะะ
เราสัญญาจะค่อย ๆ ปรับ ขอบคุณที่อยู่ด้วยกันมาตลอดนะ ขอบคุณที่พาไปเที่ยวจีน ถึงจะบ่น ๆ แต่ก็ชอบนะะ แค่กลัวเครื่องบินเฉยๆ
ไว้รอบหน้าเดี๋ยวไปเที่ยว ญี่ปุ่นกันนะะ รอเก็บเงินก่อนนน 💖 ขอโทษที่ไม่มีอะไรมาให้เลยย เพราะเงินหมดด 55555555
ขอบคุณที่หวังดีกับเราเสมอเลยนะจั้ฟฟ กราบบบบบ 555555 ละก็ช่วงนี้ก็สู้ ๆ นะเรื่องทีมม ไม่มีไรจะอวยพร แต่จะคอยซ้ำเติม
อยู่ดูแล เออเร่อ กับ แคสเปอร์กับเราไปนาน ๆ นะจั้ฟฟอ้ายย ช่วงนี้อาจไม่ค่อยได้คุยกันเลยยแต่ยังรักเหมือนเดิมจั้ฟอ้ายย
เราจะอยู่เป็นภาระของเธอต่อไปป 555555 แฟนกันหนักนิดเบาหน่อยก็อย่าไปยอมกันน ก็สู้ๆนะจั้ฟอย่านอนดึกมากก นอนเช้าไปเลย
เรื่องงานก็..... โนคอมเม้นน 555555 มึงเก่งอยู้แล้วว ก็สุขสันต์วันวาเลนไทน์นะจั้ฟฟอ้ายย 
รักเสมอออ มัวบๆ 💗`;

let charIndex = 0;
function typeWriter() {
    if (charIndex < finalMessage.length) {
        document.getElementById("final-message").innerText += finalMessage.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50); // Typing speed
    } else {
        document.getElementById('btn-hug').classList.remove('hidden');
    }
}

function showFinalHeart() {
    document.getElementById('big-heart').classList.remove('hidden');

    // Create extra flower/heart explosion
    for (let i = 0; i < 30; i++) {
        createFloatingHeart();
    }
}

// Floating Hearts Background
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerText = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';

    document.querySelector('.hearts-container').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Start creating hearts
setInterval(createFloatingHeart, 800);
