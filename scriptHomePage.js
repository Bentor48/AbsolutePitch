const h2Home = document.getElementById('h2Home');
const pHome = document.getElementById('pHome');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

function translateHomePage() {
    const dict = window.dictionaryHomePage[languageUser];

    h2Home.innerText = dict.h2Home;
    pHome.innerHTML = dict.pHome;
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