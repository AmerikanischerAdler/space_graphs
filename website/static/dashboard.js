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
    console.log("Launch Date String:", dateStr); // Add this
    startCountdown(dateStr, el);
});

