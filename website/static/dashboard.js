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

    let currentRotation = 0;
    let isAnimating = false;

    launches.forEach((launch, index) => {
        const angle = index * rotationStep;
        launch.style.transform = `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`;
    });

    function updateVisibility(rotation) {
        launches.forEach((launch, index) => {
            const angle = index * rotationStep - rotation;
            const normalized = ((angle % 360) + 360) % 360;
            const isVisible = normalized < 90 || normalized > 270;
    
            launch.style.opacity = isVisible ? '1' : '0';
            launch.style.pointerEvents = isVisible ? 'auto' : 'none';
        });
    }
    
    function rotateCarousel(direction) {
        if (isAnimating) return;
        isAnimating = true;

        currentRotation += direction * rotationStep;

        container.style.transition = 'transform 0.5s ease';
        container.style.transform = `rotateY(-${currentRotation}deg)`;

        updateVisibility(currentRotation);

        setTimeout(() => {
            container.style.transition = '';
            isAnimating = false;
        }, 500);
    }

    document.querySelector('#rotate-left').addEventListener('click', () => {
        rotateCarousel(-1);
    });

    document.querySelector('#rotate-right').addEventListener('click', () => {
        rotateCarousel(1);
    });

    updateVisibility(currentRotation);
});

