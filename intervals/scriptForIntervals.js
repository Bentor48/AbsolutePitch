// Сменяющиеся окна
const windowIntervals1 = document.getElementById('windowIntervals1');
const windowIntervals2 = document.getElementById('windowIntervals2');

//Размер шрифта
function fontSizeText(text) {
    if (!NodeList.prototype.isPrototypeOf(text) && !Array.isArray(text)) {
        text = [text];
    }

    let smallText = parseFloat(getComputedStyle(text[0]).fontSize);
    text.forEach((element) => {
        let size = parseFloat(getComputedStyle(element).fontSize);

        while (
            (element.scrollWidth > element.clientWidth ||
            element.scrollHeight > element.clientHeight) &&
            size > 8
        ) {
            size--;
            element.style.fontSize = size + "px";
        }

        if(size < smallText) {
            smallText = size;
        }
    })

    text.forEach((element) => {
        element.style.fontSize = smallText + 'px';
    })
}

//h1 страниц
const h1Window1 = document.getElementById('titel1');
const h1Window2 = document.getElementById('titel2');

// выбор типа интервалов
let startBTNmh = document.querySelectorAll('.startBTNmh');
let typeInterval;

fontSizeText(h1Window1);
fontSizeText(startBTNmh);

startBTNmh.forEach((button) => {
    button.addEventListener('click', () => {
        typeInterval = button.id;
        windowIntervals1.style.display = 'none';
        windowIntervals2.style.display = 'flex';

        updateStepsPositionsTime();
        updatePositionThumb();
        fontSizeText(h1Window2);
    })
});

// Полтзунок для измиенения времени интервала
// Время по умолчанию
let time
if(!localStorage.getItem("time")) {
    time = 2000;
} else {
    time = Number(localStorage.getItem("time"))
}
 

let activePointerTime = null;

const stepsTime = document.querySelectorAll(".stepTime.rightTime");
const stepsAllTime = document.querySelectorAll(".stepTime");

const sliderTrackTime = document.getElementById('sliderTrackTime');
const sliderThumbTime = document.getElementById('sliderThumbTime');
const sliderTrackTimeFill = document.getElementById('sliderTrackTimeFill');

const valueTimeText = document.getElementById('valueTimeText');

let stepsPositionsTime = [];

let minYTime;
let maxYTime;

// Создать массив позиций для времени
function updateStepsPositionsTime() {
    stepsPositionsTime = [];

    trackTimeRect = sliderTrackTime.getBoundingClientRect();

    stepsTime.forEach((step) => {
        rectTime = step.getBoundingClientRect();

        stepsPositionsTime.push({
            value: Number(step.dataset.value),
            position: rectTime.top + rectTime.height / 2 - trackTimeRect.top
        })
    })

    const positionsTime = stepsPositionsTime.map(step => step.position);
    minYTime = Math.min(...positionsTime);
    maxYTime = Math.max(...positionsTime);
}

// выставить начальную позицию времени относительно памяти 
function updatePositionThumb() {
    for (const char of stepsPositionsTime) {
        if(char.value === time) {
            sliderThumbTime.style.top = `${char.position - sliderThumbTime.offsetHeight / 2}px`;
            valueTimeText.innerText = String(char.value)[0];
            return
        }
    }
}

// определить палец
sliderThumbTime.addEventListener("pointerdown", (event) => {
    event.preventDefault();

    activePointerTime = event.pointerId;
    sliderThumbTime.setPointerCapture(event.pointerId);
});

// скрипт для измениния позиции ходунка
sliderThumbTime.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerTime) return;

    if(event.pointerType === "touch" || event.pointerType === "pen") document.body.style.overflow = 'hidden';

    let y = event.clientY - sliderTrackTime.getBoundingClientRect().top;
    const thumbHalfTime = sliderThumbTime.offsetHeight / 2;

    y = Math.max(minYTime, Math.min(y, maxYTime));

    let nearestPosition = stepsPositionsTime[0];
    let minDistance = Math.abs(y - nearestPosition.position);

    stepsPositionsTime.forEach((position) => {
        const distance = Math.abs(y - position.position);

        if(distance < minDistance) {
            minDistance = distance;
            nearestPosition = position;
        }
    })

    time = nearestPosition.value;
    console.log(time);
    valueTimeText.innerText = String(time)[0];

    sliderThumbTime.style.top = `${nearestPosition.position - thumbHalfTime}px`;
})

sliderThumbTime.addEventListener("pointerup", (event) => {
    if(event.pointerType === "touch" || event.pointerType === "pen") {
        document.body.style.overflow = 'auto';
    }

    sliderThumbTime.releasePointerCapture(event.pointerId);
    activePointerTime = null;
});

sliderThumbTime.addEventListener("pointercancel", () => {
    document.body.style.overflow = "auto";
    activePointerTime = null;
});

const startBTN = document.getElementById('start-btn');
startBTN.addEventListener('click', () => {
    localStorage.setItem("time", time);
})

// ползунок для выбобора интервалов
// Высота шрифта ползунка для интервалов
const containerSlider = document.getElementById('conteinerSlider');
const pIntervalsName = document.querySelectorAll('.pIntervalsName');

function fontSizeInterval() {
    pIntervalsName.forEach(text => {
        text.style.fontSize = `${containerSlider.offsetHeight * 0.044}px`;
    })
};

fontSizeInterval();

// Скрипт ползунка для интервалов

const sliderTrack = document.getElementById('sliderTrack');
const sliderThumb = document.getElementById('sliderThumb');

// Активный указатель интервалов
let activePointer = null;

// массив координат интервалов

const steps = document.querySelectorAll(".step.right");
const stepsAll = document.querySelectorAll(".step");

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

console.log(stepPositions);

// выбранный интервал
let intervalValue = 1;

// скрипт ползунка интервалов

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

// перемещение по нажатию интервалов

stepsAll.forEach((step, index) => {
    step.addEventListener("click", () => {

        const thumbHalf = sliderThumb.offsetHeight / 2;

        sliderThumb.style.top =
            `${sliderTrack.offsetTop + stepPositions[Math.floor(index / 2)].position - thumbHalf}px`;

        intervalValue = stepPositions[Math.floor(index / 2)].value;
    });
});

// обновление при повороте страницы

window.addEventListener("resize", () => {
    fontSizeInterval();
    updateStepPositions();

    intervalValue = 1;

    const thumbHalf = sliderThumb.offsetHeight / 2;

    sliderThumb.style.top = `${sliderTrack.offsetTop + stepPositions[0].position - thumbHalf}px`;  
});