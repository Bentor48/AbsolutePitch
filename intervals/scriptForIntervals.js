// Высота шрифта ползунка

const containerSlider = document.getElementById('conteinerSlider');
const pIntervalsName = document.querySelectorAll('.pIntervalsName');

function fontSizeInterval() {
    pIntervalsName.forEach(text => {
        text.style.fontSize = `${containerSlider.offsetHeight * 0.044}px`;
    })
};

fontSizeInterval();

// Скрипт ползунка

const sliderTrack = document.getElementById('sliderTrack');
const sliderThumb = document.getElementById('sliderThumb');

// Активный указатель
let activePointer = null;

// массив координат

const steps = document.querySelectorAll(".step.right");
let stepPositions = [];
let minY;
let maxY;

function updateStepPositions() {
    stepPositions = [];

    const trackRect = sliderTrack.getBoundingClientRect();

    steps.forEach((step) => {
        const rect = step.getBoundingClientRect();
        stepPositions.push({
            value: stepPositions.length + 1,
            position: rect.top + rect.height / 2 - trackRect.top
        }
        );
    });

    const positions = stepPositions.map(step => step.position);
    minY = Math.min(...positions);
    maxY = Math.max(...positions);
}

updateStepPositions();

// обновление при повороте страницы

window.addEventListener("resize", () => {
    fontSizeInterval();
    updateStepPositions();
});

console.log(stepPositions);

// выбранный интервал
let intervalValue = 1;

// скрипт ползунка

sliderThumb.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    activePointer = event.pointerId;
    sliderThumb.setPointerCapture(event.pointerId);
});

sliderThumb.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointer) return;

    if(event.pointerType === "touch" || event.pointerType === "pen") {
        document.body.style.overflow = 'hidden';
    }
    const rect = sliderTrack.getBoundingClientRect();
    let y = event.clientY - rect.top;
    const thumbHalf = sliderThumb.offsetHeight / 2;

    y = Math.max(minY, Math.min(y, maxY));

    let nearestPosition = stepPositions[0];
    let minDistance = Math.abs(y - nearestPosition.position);

    stepPositions.forEach((position) => {
        const distance = Math.abs(y - position.position);

        if (distance < minDistance) {
            minDistance = distance;
            nearestPosition = position;
        }
    });

    intervalValue = nearestPosition.value;
    console.log(intervalValue);

    sliderThumb.style.top = `${sliderTrack.offsetTop + nearestPosition.position - thumbHalf}px`;
});

sliderThumb.addEventListener("pointerup", (event) => {
    if(event.pointerType === "touch" || event.pointerType === "pen") {
        document.body.style.overflow = 'auto';
    }

    sliderThumb.releasePointerCapture(event.pointerId);
    activePointer = null;
});

sliderThumb.addEventListener("pointercancel", () => {
    document.body.style.overflow = "auto";
    activePointer = null;
});