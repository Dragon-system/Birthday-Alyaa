/* ==========================================================
   INTERACTIVE BIRTHDAY EXPERIENCE - VANILLA JAVASCRIPT
   Handles Canvas Animations (Stars, Fireworks, Particles, Hearts)
   Transitions, Audio, and Typing Effect
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');

    let width, height;
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- PARTICLE / STAR / FIREWORK SYSTEMS ---
    let stars = [];
    let particles = [];
    let fireworks = [];
    let activeEffect = 'ambient'; // 'ambient' or 'celebration' or 'finale'

    // Initialize Twinkling Stars
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8,
            alpha: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        });
    }

    // Floating Hearts & Balloons Class
    class Particle {
        constructor(x, y, type) {
            this.x = x || Math.random() * width;
            this.y = y || height + 50;
            this.type = type || (Math.random() > 0.5 ? 'heart' : 'balloon');
            this.size = Math.random() * 14 + 10;
            this.speedY = Math.random() * 1.5 + 1;
            this.speedX = (Math.random() - 0.5) * 1.2;
            this.color = ['#ff65a3', '#ffd700', '#ff9a9e', '#fff', '#e91e63'][Math.floor(Math.random() * 5)];
            this.angle = Math.random() * Math.PI * 2;
            this.spin = (Math.random() - 0.5) * 0.03;
        }

        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.angle) + this.speedX;
            this.angle += this.spin;
            if (this.y < -50) {
                this.y = height + 50;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;

            if (this.type === 'heart') {
                ctx.font = `${this.size}px Arial`;
                ctx.fillText('❤️', 0, 0);
            } else if (this.type === 'rose') {
                ctx.font = `${this.size}px Arial`;
                ctx.fillText('🌹', 0, 0);
            } else {
                ctx.font = `${this.size}px Arial`;
                ctx.fillText('🎈', 0, 0);
            }
            ctx.restore();
        }
    }

    // Firework Particle Class
    class FireworkParticle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.08; // gravity
            this.alpha -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Launch Firework function
    function launchFirework(startX, startY) {
        const colors = ['#ff65a3', '#ffd700', '#ff4081', '#ffffff', '#e040fb'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const count = 50;
        for (let i = 0; i < count; i++) {
            fireworks.push(new FireworkParticle(startX, startY, color));
        }
    }

    // Initialize floating ambient particles
    for (let i = 0; i < 25; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw and update stars
        stars.forEach(star => {
            star.alpha += star.speed;
            if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
            ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Update and draw fireworks
        fireworks.forEach((fw, index) => {
            fw.update();
            fw.draw();
            if (fw.alpha <= 0) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Periodic automatic fireworks in celebration mode
    setInterval(() => {
        if (activeEffect === 'celebration' || activeEffect === 'finale') {
            launchFirework(Math.random() * width, Math.random() * (height / 2));
        }
    }, 800);

    // --- DOM ELEMENTS & FLOW CONTROL ---
    const startBtn = document.getElementById('start-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const letterScreen = document.getElementById('letter-screen');
    const bgMusic = document.getElementById('bg-music');
    const giftSection = document.getElementById('gift-section');
    const giftBox = document.getElementById('gift-box');
    const openGiftBtn = document.getElementById('open-gift-btn');
    const typingTextElement = document.getElementById('typing-text');
    const finalFinale = document.getElementById('final-finale');

    // Arabic Message to type out
    const arabicMessage = `منذ ما يقارب ست سنوات، تعرفت على أجمل شخص في الكون، وأصبحتِ شريكة حياتي وتفاصيل أيامي الجميلة.

واليوم نحتفل بعيد ميلادك السادس وأنتِ ما زلتِ أجمل هدية رزقني الله بها.

أتمنى لكِ في عيد ميلادك القادم أن تحققي كل ما تتمنين، وأن أراكِ دائمًا في أفضل حال، سعيدة، ناجحة، ومبتسمة كما أحب أن أراكِ دائمًا.

أسأل الله أن يديم عليكِ الصحة والعافية، وأن يجعل كل أيامكِ فرحًا وسعادة، وأن نبقى معًا في كل عيد ميلاد قادم بإذن الله.

كل عام وأنتِ أغلى كنوزي، وأجمل ما في حياتي.

❤️ تحياتي لكِ يا لولتي.

صديقك العزيز محمد.`;

    // 1. Click "ابدأ الحفل"
    startBtn.addEventListener('click', () => {
        // Play audio safely
        bgMusic.play().catch(e => console.log("Audio autoplay restricted:", e));

        // Fade out welcome, show celebration screen
        welcomeScreen.classList.remove('active');
        celebrationScreen.classList.add('active');

        // Increase particles and intensity
        activeEffect = 'celebration';
        for (let i = 0; i < 25; i++) {
            particles.push(new Particle(undefined, undefined, 'balloon'));
        }

        // Launch initial fireworks burst
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                launchFirework(Math.random() * width, Math.random() * height * 0.6);
            }, i * 300);
        }

        // Show gift section after short animation delay
        setTimeout(() => {
            giftSection.classList.remove('hidden');
        }, 2000);
    });

    // 2. Click "افتحي هديتك" or Gift Box
    function openGiftAction() {
        giftBox.classList.add('opening');
        openGiftBtn.style.display = 'none';

        // Intense confetti & rose explosion
        for (let i = 0; i < 40; i++) {
            particles.push(new Particle(width / 2, height / 2, Math.random() > 0.5 ? 'rose' : 'heart'));
        }

        // Huge fireworks burst
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                launchFirework(Math.random() * width, Math.random() * height * 0.5);
            }, i * 200);
        }

        // Transition to Letter screen after opening animation
        setTimeout(() => {
            celebrationScreen.classList.remove('active');
            letterScreen.classList.add('active');
            startTypingEffect();
        }, 1200);
    }

    openGiftBtn.addEventListener('click', openGiftAction);
    giftBox.addEventListener('click', openGiftAction);

    // 3. Typing Effect Function
    function startTypingEffect() {
        let charIndex = 0;
        typingTextElement.innerHTML = "";
        
        function type() {
            if (charIndex < arabicMessage.length) {
                typingTextElement.innerHTML += arabicMessage.charAt(charIndex);
                charIndex++;
                setTimeout(type, 45); // Typing speed
            } else {
                // Typing finished -> Trigger Finale
                activeEffect = 'finale';
                finalFinale.classList.add('show');
                
                // Launch massive fireworks cascade
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        launchFirework(Math.random() * width, Math.random() * height * 0.7);
                    }, i * 350);
                }
            }
        }
        type();
    }
});