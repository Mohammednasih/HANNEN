document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('curtainVideo');
    const playOverlay = document.getElementById('playOverlay');
    const textOverlay = document.getElementById('textOverlay');
    const music = document.getElementById('bgMusic');
   

    if (music) {
        music.volume = 0.3;
    }

    const startExperience = () => {
        playOverlay.style.opacity = '0';

        setTimeout(() => {
            playOverlay.style.display = 'none';
        }, 500);

        // Play music first before video to ensure mobile browsers grant audio context
        if (music) {
            music.play().then(() => {
                const mIcon = document.getElementById('musicIcon');
                if (mIcon) mIcon.textContent = '🔊';
                try { isPlaying = true; } catch (e) { }
            }).catch(error => {
                console.error("Music playback failed:", error);
            });
        }

        video.play().catch(error => {
            console.error("Video playback failed:", error);
        });
    };

   
        }
    );

    
    ;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    const scrollElements = document.querySelectorAll('.scroll-animate, .stagger-anim');
    scrollElements.forEach(el => observer.observe(el));

    setupCountdown();
;

function setupCountdown() {
    // Current placeholder target date
    const countdownDate = new Date("july 18, 2026 10:00:00").getTime();

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        days = days < 10 ? '0' + days : days;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (dEl) dEl.innerHTML = days;
        if (hEl) hEl.innerHTML = hours;
        if (mEl) mEl.innerHTML = minutes;
        if (sEl) sEl.innerHTML = seconds;
    }, 1000);
}



const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('rsvpMessage');

if (yesBtn && noBtn) {

    yesBtn.addEventListener('click', (e) => {
        message.innerText = "Yay! Can't wait to celebrate with you 🎉";
        message.style.opacity = '1';

        yesBtn.classList.add('happy');
        setTimeout(() => yesBtn.classList.remove('happy'), 600);

        let originY = 0.8;
        let originX = 0.5;
        if (e.target) {
            const rect = e.target.getBoundingClientRect();
            originY = (rect.top + rect.height / 2) / window.innerHeight;
            originX = (rect.left + rect.width / 2) / window.innerWidth;
        }

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { x: originX, y: originY },
                colors: ['#D4AF37', '#ffffff', '#e12a2a'],
                zIndex: 9999
            });
        }
    });

    noBtn.addEventListener('click', () => {
        message.innerText = "We’ll miss you... but you’ll be in our hearts ❤️ ";
        message.style.opacity = '1';

        noBtn.classList.add('sad');
        setTimeout(() => noBtn.classList.remove('sad'), 500);
    });
}


// ❤️ HEART TRAIL EFFECT
document.addEventListener('touchstart', createHeart);
document.addEventListener('mousemove', createHeart);

const detailsSection = document.getElementById('detailsSection');
const detailsSection2 = document.getElementById('detailsSection2');
const beforeFlower = document.getElementById('beforeFlower');
const afterFlower = document.getElementById('afterFlower');
const firstText = document.querySelector('.first-text');
const secondText = document.querySelector('.second-text');
const scrollHint = document.querySelector('.scroll-hint');
const gettingMarriedText = document.querySelector('.getting-married-text');

if (
    detailsSection &&
    beforeFlower &&
    afterFlower &&
    firstText &&
    secondText &&
    scrollHint
) {

    detailsSection.addEventListener('click', () => {

        // fade old elements
        beforeFlower.classList.add('fade-out');
        firstText.classList.add('fade-out');

        // reveal new flower
        afterFlower.classList.add('fade-in');

        setTimeout(() => {

            // hide old text
            firstText.style.display = 'none';

            // prepare second text
            secondText.style.display = 'block';

            // smooth fade
            requestAnimationFrame(() => {
                secondText.classList.add('fade-in');
                scrollHint.classList.add('fade-in');

                if (gettingMarriedText) {
                    gettingMarriedText.classList.add('show');
                }
            });

        }, 600);

        // second click scroll
        if (detailsSection2) {

            detailsSection.addEventListener('click', () => {

                detailsSection2.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }, { once: true });

        }

    }, { once: true });

}


function createHeart(e) {
    let x, y;

    if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }

    const heart = document.createElement("div");
    heart.className = "heart";

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    document.body.appendChild(heart);

    // remove after animation
    setTimeout(() => {
        heart.remove();
    }, 1000);
}


const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;

if (music && musicToggle && musicIcon) {
    let userHasToggled = false;

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent global interaction trigger
        userHasToggled = true;
        if (isPlaying) {
            music.pause();              // 🔇 OFF
            musicIcon.textContent = '🔇';
        } else {
            music.play().catch(() => { });
            musicIcon.textContent = '🔊'; // 🔊 ON
        }
        isPlaying = !isPlaying;
    });

    // Autoplay on first interaction
    function autoPlayMusic() {
        if (!isPlaying && !userHasToggled) {
            music.play().then(() => {
                isPlaying = true;
                musicIcon.textContent = '🔊';
                // Only remove listeners after successful playback
                document.removeEventListener('touchstart', autoPlayMusic);
                document.removeEventListener('click', autoPlayMusic);
                document.removeEventListener('scroll', autoPlayMusic);
            }).catch(() => {
                // Keep listeners if playback failed (e.g. strict mobile policies)
            });
        } else {
            // Already playing or user manually paused, we can remove listeners
            document.removeEventListener('touchstart', autoPlayMusic);
            document.removeEventListener('click', autoPlayMusic);
            document.removeEventListener('scroll', autoPlayMusic);
        }
    }

    document.addEventListener('touchstart', autoPlayMusic, { passive: true });
    document.addEventListener('click', autoPlayMusic, { passive: true });
    document.addEventListener('scroll', autoPlayMusic, { passive: true });

    const audio = document.querySelector("audio");
    let wasPlaying = false;

    /* Detect hide / show */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            // Save state before pausing
            wasPlaying = !audio.paused;
            audio.pause();
        } else {
            // Resume only if it was playing before
            if (wasPlaying) {
                audio.play().catch(() => {
                    // autoplay blocked (mobile case)
                });
            }
        }
    });

    /* iOS Safari support */
    window.addEventListener("pagehide", () => {
        wasPlaying = !audio.paused;
        audio.pause();
    });
}
