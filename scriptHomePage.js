const h1Home = document.getElementById('h1Home');
const pHome = document.getElementById('pHome');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

function translateHomePage() {
    const dict = window.dictionaryHomePage[languageUser];

    h1Home.innerText = dict.h1Home;
    pHome.innerText = dict.pHome;
    btn1.innerText = dict.btn1;
    btn2.innerText = dict.btn2;
    btn3.innerText = dict.btn3;
    btn4.innerText = dict.btn4;
}

translateHomePage();

languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        translateHomePage();
    });
});

function updateFont() {
    if (
        window.matchMedia("(min-width: 700px)").matches ||
        window.matchMedia("(orientation: landscape) and (pointer: coarse)").matches
    ) {
        h1Home.style.fontSize = `${window.innerWidth / 15}px`;
    } else h1Home.style.fontSize = '';
}

updateFont()

// Изменение разрешения и ориентации экрана
window.addEventListener("resize", updateFont);
window.addEventListener("orientationchange", updateFont);