let mouseX, lastEventTime;
const steeringWheel = document.getElementById("steeringWheel");
window.steerSpeed = 0, window.steerDegree = 0;
let isDragging = false, currentDegree = 0, lastDegree = 0;

steeringWheel.addEventListener("mousedown", function(event) {
    isDragging = true;
    mouseX = event.clientX;
    lastEventTime = Date.now();
    event.preventDefault();
    steeringWheel.style.transition = "none";
});

document.addEventListener("mouseup", function() {
    isDragging = false;
    steeringWheel.style.transition = "transform 0.5s ease-out";
});

document.addEventListener("mousemove", function(event) {
    if (!isDragging) return;
    let currentTime = Date.now();
    let timeDiff = currentTime - lastEventTime;
    let distanceMoved = event.clientX - mouseX;
    mouseX = event.clientX;
    let tentativeDegree = currentDegree + 0.5 * distanceMoved;
    let degreeChange = tentativeDegree - currentDegree;
    currentDegree = tentativeDegree;
    lastEventTime = currentTime;
    if (currentDegree > 75) currentDegree = 75;
    else if (currentDegree < -75) currentDegree = -75;
    window.steerSpeed = Math.abs((degreeChange / (timeDiff / 1000)).toFixed(2));
    window.steerDegree = currentDegree;
});

(function animate() {
    requestAnimationFrame(animate);
    if (Math.abs(lastDegree - currentDegree) > 0.1 || isDragging) {
        steeringWheel.style.transform = `rotate(${currentDegree}deg)`;
        lastDegree = currentDegree;
    }
    if (!isDragging && currentDegree !== 0 && Math.abs(currentDegree *= 0.95) < 0.1) {
        currentDegree = 0;
        window.steerSpeed = 0;
        window.steerDegree = 0;
    }
})();
//# sourceMappingURL=index.9b3616ad.js.map
