// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    
    // Form submission (just for demonstration)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This form is currently not connected to a backend service.');
        contactForm.reset();
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { 
                value:50, 
                density: { enable: true, value_area: 800 } 
            },
            color: { value: "#64ffda" },
            shape: { type: "circle" },
            opacity: { 
                value: 0.1,  // Increased opacity
                random: true 
            },
            size: { 
                value: 4,  // Slightly larger particles
                random: true 
            },
            line_linked: { 
                enable: true, 
                distance: 150, 
                color: "#64ffda", 
                opacity: 0.3,  // Slightly more visible lines
                width: 1 
            },
            move: { 
                enable: true, 
                speed: 2, 
                direction: "none", 
                random: true, 
                straight: false, 
                out_mode: "out",
                attract: { enable: false, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { 
                    enable: true, 
                    mode: "grab"  // Changed to grab for better visual effect
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                }
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: { opacity: 0.8 }
                }
            }
        }
    });

    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (elementPosition < screenPosition) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load*
    
    // Reverse projects order
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = Array.from(projectsGrid.children);
    
    // Remove all projects
    projectsGrid.innerHTML = '';
    
    // Add them back in reverse order
    projectCards.reverse().forEach(card => {
        projectsGrid.appendChild(card);
    });
});

// Modify this function in script.js to replace the existing skills waveform implementation

// Modify this function in script.js to replace the existing skills waveform implementation

document.addEventListener('DOMContentLoaded', function() {
    // Setup for skills waveform
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return; // Safety check
    
    const skillsList = [
        { name: "Programming", level: 70 },
        { name: "Robotics", level: 70 },
        { name: "Physics", level: 70 },
        { name: "Creative Media", level: 70 },
        { name: "Problem Solving", level: 70 }
    ];
    
    // Create canvas for waveform
    const waveformContainer = document.createElement('div');
    waveformContainer.className = 'waveform-container';
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 250;
    waveformContainer.appendChild(canvas);
    
    // Create skill label element
    const skillLabel = document.createElement('div');
    skillLabel.className = 'skill-highlight';
    waveformContainer.appendChild(skillLabel);
    
    // Insert after the skills section title
    const skillsTitle = skillsSection.querySelector('h2');
    if (skillsTitle) {
        skillsTitle.parentNode.insertBefore(waveformContainer, skillsTitle.nextSibling);
    } else {
        skillsSection.appendChild(waveformContainer);
    }
    
    // Drawing variables
    const ctx = canvas.getContext('2d');
    let isHovering = false;
    let currentHighlight = Math.floor(Math.random() * skillsList.length);
    let frame;
    let hueRotation = 0;
    
    // Colors for peaks
    const peakColors = [
        '#64ffda', // primary - teal
        '#ff4d5a', // accent - pink
        '#ae84ff', // purple
        '#ffce45', // yellow/gold
        '#45c7ff'  // light blue
    ];
    
    // Wave simulation parameters
    const wavePoints = 150;
    const waves = [];
    
    // Initialize wave parameters
    function initWaves() {
        waves.length = 0;
        
        // Create multiple wave components for a more complex pattern
        waves.push({
            amplitude: 20,
            wavelength: canvas.width / 2,
            speed: 0.02,
            phase: 0
        });
        
        waves.push({
            amplitude: 12,
            wavelength: canvas.width / 3.5,
            speed: 0.03,
            phase: Math.PI / 4
        });
        
        waves.push({
            amplitude: 8,
            wavelength: canvas.width / 5,
            speed: 0.015,
            phase: Math.PI / 2
        });
    }
    
    // Calculate wave height at a given x position
    function calculateWaveHeight(x, time) {
        let y = 0;
        
        for (const wave of waves) {
            y += wave.amplitude * Math.sin((x / wave.wavelength) * Math.PI * 2 + wave.phase + time * wave.speed);
        }
        
        return y;
    }
    
    function animateIdleWave() {
    if (!ctx) return; // Safety check

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerY = canvas.height / 2;
    const time = Date.now() * 0.001;
    
    // Slightly randomize wave parameters (but keep it smooth)
    waves.forEach(wave => {
        wave.amplitude = 15 + Math.sin(time * 0.3) * 5;
        wave.phase += 0.01; // Slow phase shift for smoother motion
    });

    // Draw the wave with fewer points
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    
    for (let i = 0; i <= wavePoints; i++) {
        const x = (canvas.width * i) / wavePoints;
        const y = centerY + calculateWaveHeight(x, time);
        ctx.lineTo(x, y);
    }
    
    ctx.lineTo(canvas.width, canvas.height);
    ctx.closePath();
    
    // Gradient fill (cached if possible)
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, `hsla(${hueRotation}, 100%, 70%, 0.2)`);
    gradient.addColorStop(1, `hsla(${hueRotation + 120}, 100%, 70%, 0.2)`);
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.lineWidth = 2;
    ctx.strokeStyle = `hsla(${hueRotation}, 100%, 70%, 0.6)`;
    ctx.stroke();
    
    hueRotation = (hueRotation + 0.3) % 360; // Slower hue rotation
    
    if (!isHovering) {
        frame = requestAnimationFrame(animateIdleWave);
    }
}
    
    // Skills wave animation (hover state)
    function animateSkillsWave() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Define the center line
        const centerY = canvas.height / 2;
        const peakSpacing = canvas.width / (skillsList.length);
        const time = Date.now() * 0.001;
        
        // Create path for filling
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Create points array to store calculated positions for the line
        const points = [];
        
        // Calculate and draw the wave with peaks
        for (let i = 0; i <= wavePoints; i++) {
            const x = (canvas.width * i) / wavePoints;
            let y = centerY;
            
            // Calculate the contribution of each skill peak
            for (let j = 0; j < skillsList.length; j++) {
                const skill = skillsList[j];
                const peakCenter = peakSpacing * (j + 0.5);
                const distance = Math.abs(x - peakCenter);
                
                // Calculate amplitude based on skill level
                const maxAmplitude = (skill.level / 100) * (canvas.height * 0.4);
                const amplitude = j === currentHighlight ? maxAmplitude : maxAmplitude * 0.6;
                
                // Create bell curve for each peak with improved smoothness
                const peakWidth = peakSpacing * 0.4;
                const influence = Math.exp(-(distance * distance) / (2 * peakWidth * peakWidth));
                
                // Add small wave motion to the peaks
                const waveMovement = j === currentHighlight ? 
                    Math.sin(time * 3 + j) * 5 : 
                    Math.sin(time * 2 + j) * 2;
                
                // Subtract to make peaks go up
                y -= (amplitude + waveMovement) * influence;
            }
            
            // Store the point for later use in stroke
            points.push({ x, y });
            
            // Add point to the fill path
            ctx.lineTo(x, y);
        }
        
        // Complete the fill path
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        // Create gradient fill
        const highlightColor = peakColors[currentHighlight];
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, highlightColor + '33'); // Very transparent at top
        gradient.addColorStop(0.7, highlightColor + '11'); // Most transparent at bottom
        gradient.addColorStop(1, highlightColor + '05'); // Almost invisible at bottom
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw the line on top with glow effect
        ctx.beginPath();
        
        // Add points to create the stroke path
        for (let i = 0; i < points.length; i++) {
            const { x, y } = points[i];
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                // Use quadratic curves for smoother lines
                const xc = (x + points[i-1].x) / 2;
                const yc = (y + points[i-1].y) / 2;
                ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
            }
        }
        
        // Style and stroke the path
        ctx.lineWidth = 3;
        ctx.strokeStyle = highlightColor;
        ctx.stroke();
        
        // Add glow effect
        ctx.save();
        ctx.filter = `blur(8px)`;
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = highlightColor;
        ctx.stroke();
        ctx.restore();
        
        // Update skill label
        const highlightedSkill = skillsList[currentHighlight];
        skillLabel.textContent = highlightedSkill.name;
        skillLabel.style.color = peakColors[currentHighlight];
        skillLabel.style.textShadow = `0 0 15px ${peakColors[currentHighlight]}`;
        skillLabel.style.opacity = '1';
        
        if (isHovering) {
            frame = requestAnimationFrame(animateSkillsWave);
        } else {
            cancelAnimationFrame(frame);
            transitionToIdleWave();
        }

        // Inside the animateSkillsWave function, after updating the skillLabel
// Add this line to set the data attribute for CSS targeting
waveformContainer.setAttribute('data-skill', highlightedSkill.name);
    }
    
    // Smooth transition from idle to skills wave
    function transitionToSkillsWave() {
        // Fade in skill label
        skillLabel.style.opacity = '1';
        
        // Start skills animation
        animateSkillsWave();
    }
    
    // Smooth transition from skills to idle wave
    function transitionToIdleWave() {
        // Fade out skill label
        skillLabel.style.opacity = '0';
        
        // Start idle animation
        animateIdleWave();
    }
    
    // Event listeners
    waveformContainer.addEventListener('mouseenter', function() {
        isHovering = true;
        cancelAnimationFrame(frame);
        currentHighlight = Math.floor(Math.random() * skillsList.length);
        transitionToSkillsWave();
    });
    
    waveformContainer.addEventListener('mouseleave', function() {
        isHovering = false;
        cancelAnimationFrame(frame);
        transitionToIdleWave();
    });
    
   // And replace it with something like this:
// Make the waveform show one skill consistently on hover
waveformContainer.addEventListener('mouseenter', function() {
    isHovering = true;
    // Only set the currentHighlight once when hovering starts
    // Remove the interval functionality completely
    cancelAnimationFrame(frame);
    currentHighlight = Math.floor(Math.random() * skillsList.length);
    transitionToSkillsWave();
});

waveformContainer.addEventListener('mouseleave', function() {
    isHovering = false;
    cancelAnimationFrame(frame);
    transitionToIdleWave();
});
    
    // Create the legend without the dots
    const legend = document.createElement('div');
    legend.className = 'waveform-legend';
    
    skillsList.forEach((skill, index) => {
        const item = document.createElement('div');
        item.textContent = skill.name;
        item.style.borderColor = peakColors[index];
        legend.appendChild(item);
        
        // Add interaction to legend items
        item.addEventListener('mouseenter', function() {
            // If not already hovering over the graph, simulate a hover
            if (!isHovering) {
                isHovering = true;
                cancelAnimationFrame(frame);
                transitionToSkillsWave();
            }
            currentHighlight = index;
        });
        
        item.addEventListener('mouseleave', function() {
            // Only transition back if not hovering over the graph
            if (!waveformContainer.matches(':hover')) {
                isHovering = false;
                cancelAnimationFrame(frame);
                transitionToIdleWave();
            }
        });
    });
    
    waveformContainer.parentNode.insertBefore(legend, waveformContainer.nextSibling);
    
    // Initialize and start animation
    initWaves();
    animateIdleWave(); // Start the idle animation immediately
});
