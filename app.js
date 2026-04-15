/**
 * Classy Modern Minimalist App Logic
 */

document.addEventListener("DOMContentLoaded", () => {
    
    document.body.style.overflow = 'hidden';

    // 1. Initial Loader Logic
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                document.body.style.overflowY = 'auto';
                document.body.style.overflowX = 'hidden';
                initObserver();
            }, 1000);
        } else {
            document.body.style.overflowY = 'auto';
            document.body.style.overflowX = 'hidden';
            initObserver();
        }
    }, 1500);

    // 2. Cinematic Intersection Observer
    function initObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
        revealElements.forEach(el => observer.observe(el));
    }

    // 3. Crisp Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 4. Subtle AI Node Graph Canvas
    const canvas = document.getElementById('bg-canvas');
    let nodeColor = '255, 255, 255'; // global state for theme inversion
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        window.addEventListener('resize', resize);
        resize();

        class Node {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${nodeColor}, 0.2)`;
                ctx.fill();
            }
        }

        function initNodes() {
            nodes = [];
            let count = Math.floor((width * height) / 30000); 
            if(count > 60) count = 60; 
            for (let i = 0; i < count; i++) {
                nodes.push(new Node());
            }
        }
        initNodes();

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(${nodeColor}, ${0.08 - dist / 2000})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
                
                if(mouse.x != null) {
                    const dx = nodes[i].x - mouse.x;
                    const dy = nodes[i].y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if(dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(${nodeColor}, ${0.05 - dist / 4000})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // 5. Animated Counter Logic
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                let current = 0;
                const duration = 2000; 
                const stepTime = Math.abs(Math.floor(duration / (targetValue || 1)));
                
                const step = targetValue > 100 ? Math.ceil(targetValue / 100) : 1;
                let actualStepTime = targetValue > 100 ? 20 : stepTime;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= targetValue) {
                        target.innerText = targetValue;
                        clearInterval(timer);
                    } else {
                        target.innerText = current;
                    }
                }, actualStepTime);
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // 6. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    nodeColor = savedTheme === 'light' ? '0, 0, 0' : '255, 255, 255';
    updateIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            nodeColor = newTheme === 'light' ? '0, 0, 0' : '255, 255, 255';
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (!icon) return;
        if (theme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon'); // Show moon in light mode to switch BACK to dark
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun'); // Show sun in dark mode to switch TO light
        }
    }

    // 7. Mobile Menu Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflowY = 'hidden';
            } else {
                document.body.style.overflowY = 'auto';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflowY = 'auto';
            });
        });
    }
});