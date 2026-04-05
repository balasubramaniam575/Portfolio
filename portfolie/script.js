// Smooth reveal on scroll
const revealSections = document.querySelectorAll('.section-reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once active if we don't want it to repeat
            // scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => scrollObserver.observe(section));

// Parallax effect on scroll for background elements
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Canvas Starfield Neural Network Background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    // Lower density for network connections to avoid lag
    const numParticles = Math.floor((width * height) / 8000); 
    
    for(let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.5, 
            vy: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? '#9d4edd' : '#00f5ff'
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(157, 78, 221, ${1 - dist / 120})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
    
    // Draw and update particles
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.y += p.vy;
        p.x += p.vx;
        
        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
    });
    
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    init();
});

init();
animate();

// Initial reveal for hero section immediately
setTimeout(() => {
    document.querySelector('.hero').classList.add('active');
}, 100);

// Orchestrate Skills Orbit to stay upright
const orbit1Icons = document.querySelectorAll('.orbit-1 .skill-icon');
const orbit2Icons = document.querySelectorAll('.orbit-2 .skill-icon');

function animateIcons() {
    const time = Date.now();
    const angle1 = ((time % 20000) / 20000 * 360); // Matches 20s animation
    const angle2 = -((time % 35000) / 35000 * 360); // Matches 35s reverse animation

    orbit1Icons.forEach((icon, i) => {
        const baseAngle = i * (360 / orbit1Icons.length);
        icon.style.transform = `rotate(${baseAngle}deg) translateX(120px) rotate(${-baseAngle - angle1}deg)`;
    });

    orbit2Icons.forEach((icon, i) => {
        const baseAngle = i * (360 / orbit2Icons.length);
        icon.style.transform = `rotate(${baseAngle}deg) translateX(200px) rotate(${-baseAngle - angle2}deg)`;
    });

    requestAnimationFrame(animateIcons);
}

animateIcons();
