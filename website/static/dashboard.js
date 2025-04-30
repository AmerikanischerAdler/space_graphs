// Countdown Init
function startCountdown(dateStr, countdownEl) {
    const countDownDate = new Date(dateStr).getTime();

    if (isNaN(countDownDate)) {
        countdownEl.textContent = "Unknown";
        return;
    }

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (isNaN(distance) || distance < 0) {
            countdownEl.textContent = "Launched";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if ([days, hours, minutes, seconds].some(val => isNaN(val))) {
            countdownEl.textContent = "Unknown";
            clearInterval(interval);
            return;
        }

        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

document.querySelectorAll(".countdown").forEach(el => {
    const dateStr = el.getAttribute("data-date");
    startCountdown(dateStr, el);
});

// Map Init 
document.querySelectorAll('.launch-map').forEach(mapEl => {
    const lat = parseFloat(mapEl.getAttribute('data-lat'));
    const lon = parseFloat(mapEl.getAttribute('data-lon'));

    if (!isNaN(lat) && !isNaN(lon)) {
        const map = L.map(mapEl).setView([lat, lon], 10); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
            .bindPopup('<b>Launch Pad</b><br>Launch location here.')
            .openPopup();
    }
});

// Carousel
document.addEventListener("DOMContentLoaded", () => {
    const launches = document.querySelectorAll('.launch');
    const container = document.querySelector('#launches');
    const total = launches.length;
    const rotationStep = 360 / total;
    const radius = 400;

    launches.forEach((launch, index) => {
        const angle = index * rotationStep;
        launch.dataset.angle = angle;
        launch.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    let currentRotation = 0;
    let velocity = 0;
    let isScrolling = false;
    let scrollEndTimeout;
    let animationFrame;

    function updateVisibility() {
        launches.forEach((launch) => {
            const angle = (parseFloat(launch.dataset.angle) - currentRotation) % 360;
            const visibleAngle = (angle + 360) % 360;

            const isVisible = visibleAngle < 90 || visibleAngle > 270;

            launch.style.opacity = isVisible ? '1' : '0';
            launch.style.pointerEvents = isVisible ? 'auto' : 'none';
        });
    }

    function animate() {
        if (Math.abs(velocity) < 0.001) {
            velocity = 0;
            snapToNearestCard();
            return;
        }

        currentRotation += velocity;
        velocity *= 0.9; 

        container.style.transform = `rotateY(-${currentRotation}deg)`;
        updateVisibility();

        animationFrame = requestAnimationFrame(animate);
    }

    function snapToNearestCard() {
        const normalizedRotation = ((currentRotation % 360) + 360) % 360;
        const index = Math.round(normalizedRotation / rotationStep) % total;
        currentRotation = index * rotationStep;

        container.style.transition = 'transform 0.3s ease';
        container.style.transform = `rotateY(-${currentRotation}deg)`;

        updateVisibility();

        setTimeout(() => {
            container.style.transition = '';
        }, 300);
    }

    document.addEventListener('wheel', (e) => {
        velocity += e.deltaY * 0.1;

        if (!isScrolling) {
            isScrolling = true;
            animate();
        }

        clearTimeout(scrollEndTimeout);
        scrollEndTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }, { passive: true });

    updateVisibility();
});

