/* =========================================
/* =========================================
   SPRING BOOT SPLASH SCREEN SEQUENCE
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const splashLogs = document.getElementById("splash-logs");
    const splashScreen = document.getElementById("splash-screen");
    const springBanner = document.getElementById("spring-banner");
    
    document.body.style.overflow = "hidden"; // Prevent scrolling during boot

    const logs = [
        "<span class='log-info'>INFO</span>  [main] <span class='log-class'>n.a.PortfolioApplication</span> : Starting NikhilOS Application using Java 17...",
        "<span class='log-info'>INFO</span>  [main] <span class='log-class'>n.a.PortfolioApplication</span> : No active profile set, falling back to 1 default profile: 'production'",
        "<span class='log-info'>INFO</span>  [main] <span class='log-class'>org.apache.kafka.main</span> : Starting Kafka Producer/Consumer instances...",
        "<span class='log-info'>INFO</span>  [main] <span class='log-class'>n.a.SkillsService</span> : Injecting dependencies: Java, Spring Boot, MySQL, Aerospike... [OK]",
        "<span class='log-info'>INFO</span>  [main] <span class='log-class'>n.a.AIOrchestrator</span> : Connecting to LLM Models via MCP... [Connected]",
        "<span class='log-info'>INFO</span>  [main] <span class='log-class'>n.a.PortfolioApplication</span> : Started NikhilOS in 1.42 seconds (JVM running for 1.83)"
    ];

    let logIdx = 0;

    function renderLogs() {
        if(logIdx === 0 && springBanner) {
            springBanner.style.display = "block";
        }
        
        if (logIdx < logs.length && splashLogs) {
            const timeStr = new Date().toISOString().split('T')[1].substring(0,8);
            splashLogs.innerHTML += `<div class="log-line">2026-04-11 ${timeStr} ${logs[logIdx]}</div>`;
            logIdx++;
            
            let speed = Math.random() * 200 + 50; 
            setTimeout(renderLogs, speed);
        } else {
            setTimeout(() => {
                if(splashScreen) {
                    splashScreen.classList.add("hidden");
                    document.body.style.overflow = "auto";
                    setTimeout(() => splashScreen.remove(), 800);
                }
            }, 800);
        }
    }
    
    setTimeout(renderLogs, 400);
});

/* =========================================
   MOBILE MENU TOGGLE
   ========================================= */
const sidemenu = document.getElementById("sidemenu");

window.openmenu = function() {
    sidemenu.style.right = "0";
}

window.closemenu = function() {
    sidemenu.style.right = "-250px";
}

const navLinksList = document.querySelectorAll('.nav-links li a');
navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        closemenu();
    });
});

/* =========================================
   CUSTOM CURSOR
   ========================================= */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

// Only initialize custom cursor if device has pointer
if (matchMedia('(pointer:fine)').matches) {
    window.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for outline for a smooth trailing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Handle hover effects on interactive elements
    const interactives = document.querySelectorAll("a, button, input, .menu-icon");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => {
            document.body.classList.add("cursor-hover");
        });
        el.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-hover");
        });
    });
}

/* =========================================
   SCROLL EFFECTS (Navbar & Reveal)
   ========================================= */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/* =========================================
   TYPEWRITER EFFECT
   ========================================= */
const titles = [
    "Developing Robust Java Backends.",
    "Architecting Scalable Microservices.",
    "Integrating Advanced LLMs & AI.",
    "Building High-Throughput Event Pipelines."
];
const typeWriterElement = document.getElementById("typewriter");
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeDelay = 100;

function type() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 50; // Faster when deleting
    } else {
        typeWriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end
        typeDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeDelay = 500; // Pause before new word
    }

    setTimeout(type, typeDelay);
}
if(typeWriterElement) setTimeout(type, 1000);

/* =========================================
   MODAL LOGIC
   ========================================= */
window.openModal = function(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
}

window.closeModal = function(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* =========================================
   DEVELOPER TERMINAL Logic
   ========================================= */
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = {
    'help': `Available commands:<br>
             <span class="highlight-code">whoami</span>   - Display profile info<br>
             <span class="highlight-code">skills</span>   - List technical expertise<br>
             <span class="highlight-code">projects</span> - View current work<br>
             <span class="highlight-code">clear</span>    - Clear terminal output<br>
             <span class="highlight-code">contact</span>  - Show contact information`,
    
    'whoami':  `Nikhil Agrawal<br>
             Role: Software Engineer 1<br>
             Company: Snapdeal<br>
             Focus: Java Microservices & AI Orchestration`,
             
    'skills':  `> Languages: Java 17, Python<br>
             > Frameworks: Spring Boot, Hibernate<br>
             > Data: Kafka, MySQL, Cassandra, Aerospike<br>
             > Cloud/AI: Kubernetes, Advanced LLMs, Spring AI`,
             
    'projects':`1. AI-Powered Ecommerce Platform (MCP & Spring AI)<br>
             2. High-Performance Ads Reporting Engine (₹15L Daily Rev)<br>
             Type 'help' to return.`,
             
    'contact': `Email: niknir136@gmail.com<br>
             LinkedIn: linkedin.com/in/nikhilagrawxl<br>
             GitHub: github.com/nikhilagrawxl`
};

if(terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const val = this.value.trim().toLowerCase();
            this.value = '';
            
            // Print user command
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span class="prompt">nikhil@portfolio:~$ </span><span>${val}</span>`;
            terminalOutput.appendChild(cmdLine);
            
            if (val === 'clear') {
                terminalOutput.innerHTML = '';
            } else if (val === '') {
                // do nothing
            } else {
                const response = commands[val] || `<span class="term-error">Command not found: ${val}. Type 'help' to see available commands.</span>`;
                const resLine = document.createElement('div');
                resLine.innerHTML = response + '<br><br>';
                terminalOutput.appendChild(resLine);
            }
            
            // Scroll to bottom
            const termBody = document.getElementById('terminal-body');
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
}

/* =========================================
   PARTICLE BACKGROUND CANVAS
   ========================================= */
const canvas = document.getElementById('particle-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Create particle
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            // For Microservices effect
            this.label = Math.random() > 0.95 ? ['API Gateway', 'Kafka Node', 'Database', 'LLM'][Math.floor(Math.random()*4)] : null;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            if(this.label) {
                ctx.font = "10px Fira Code";
                ctx.fillStyle = "rgba(255,255,255,0.3)";
                ctx.fillText(this.label, this.x + 5, this.y - 5);
            }
        }
        
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            
            // Interactive repelling
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = 'rgba(0, 229, 255, 0.5)';
            if(Math.random() > 0.5) color = 'rgba(123, 44, 191, 0.5)';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = (dx*dx + dy*dy);
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = `rgba(255,255,255, ${opacityValue * 0.1})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                    
                    // Super cool Data Pulse effect
                    if(Math.random() > 0.995 && particlesArray[a].label) {
                        ctx.strokeStyle = "rgba(0, 229, 255, 0.8)";
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        let progress = Math.random(); // random position along line
                        let pulseX = particlesArray[a].x - dx*progress;
                        let pulseY = particlesArray[a].y - dy*progress;
                        ctx.arc(pulseX, pulseY, 2, 0, Math.PI*2);
                        ctx.stroke();
                    }
                }
            }
        }
    }

    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        initParticles();
    });

    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    initParticles();
    animateParticles();
}

/* =========================================
   LIVE TELEMETRY DASHBOARD CHARTS
   ========================================= */
function initCharts() {
    function drawChart(canvasId, color, variance, base) {
        const c = document.getElementById(canvasId);
        if(!c) return;
        const cCtx = c.getContext('2d');
        c.width = c.parentElement.clientWidth;
        c.height = c.parentElement.clientHeight;
        
        let pathData = [];
        for(let i=0; i<30; i++) {
            pathData.push(base + Math.random() * variance - variance/2);
        }
        
        function animateChart() {
            // Dynamic resolution matching to fix CSS grid delays
            if(c.parentElement && c.parentElement.clientWidth > 0) {
                if(c.width !== c.parentElement.clientWidth || c.height !== c.parentElement.clientHeight) {
                    c.width = c.parentElement.clientWidth;
                    c.height = c.parentElement.clientHeight;
                }
            }

            cCtx.clearRect(0, 0, c.width, c.height);
            pathData.shift();
            pathData.push(base + Math.random() * variance - variance/2);
            
            cCtx.beginPath();
            cCtx.strokeStyle = color;
            cCtx.lineWidth = 2;
            let step = c.width / (pathData.length - 1);
            
            // Fill gradient
            let gradient = cCtx.createLinearGradient(0, 0, 0, c.height);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            cCtx.fillStyle = gradient;
            
            cCtx.moveTo(0, c.height);
            for(let i=0; i<pathData.length; i++) {
                cCtx.lineTo(i * step, c.height - pathData[i]);
            }
            cCtx.lineTo(c.width, c.height);
            cCtx.fill();
            cCtx.stroke();
            
            setTimeout(() => requestAnimationFrame(animateChart), 500); // 2 fps update
        }
        animateChart();
        
        window.addEventListener('resize', () => {
            if(c.parentElement && c.parentElement.clientWidth > 0) {
                c.width = c.parentElement.clientWidth;
                c.height = c.parentElement.clientHeight;
            }
        });
    }

    drawChart('chart-load', 'rgba(0, 229, 255, 0.6)', 30, 50); // Server load
    drawChart('chart-kafka', 'rgba(255, 183, 3, 0.6)', 50, 70); // Kafka
    
    // Animate Latency Value slightly
    const latVal = document.getElementById('latency-val');
    setInterval(() => {
        if(latVal) {
            let flicker = 40 + Math.floor(Math.random() * 8);
            latVal.innerHTML = `${flicker}<span class="unit">ms</span>`;
        }
    }, 800);
}

document.addEventListener("DOMContentLoaded", initCharts);