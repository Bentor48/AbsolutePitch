const changeLanguageBTN = document.querySelectorAll('.languageButton');

changeLanguageBTN.forEach((btn) => {
    btn.addEventListener('click', () => {
    changeHTMLLanguage()
    });
});

// Нота Ля старт
let noteA = false;
const textP = document.getElementById('welcome-containerp');
const checkboxButton = document.getElementById('noteA');
const svgForStart = document.getElementById('svgForStart');

// Рандомная нота

let randomNoteNumber;
let randomNoteName;

// результат выбора
let keyForResult;

// длинна ноты ля
const noteADuration = 1200;
// параграф дял подсказки
const timerP = document.getElementById('timer');

console.log(textP.innerText);
console.log(checkboxButton.checked);

checkboxButton.addEventListener('click', forNoteA);

function forNoteA() {
    if(!noteA) {
        textP.innerText = window.dictionaryGuessNote[languageUser].inst_p_A;
        noteA = true;
    } else {
        textP.innerText = window.dictionaryGuessNote[languageUser].inst_p;
        noteA = false;
    }
};

function playNoteA() {
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // форма волны
    oscillator.frequency.value = 440; // Ля первой октавы
    gainNode.gain.value = 0.2;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    
    svgForStart.alt = window.dictionaryGuessNote[languageUser].noteAAlt;
    timerP.innerText = window.dictionaryGuessNote[languageUser].noteA;
    if (localStorage.getItem('theme') === 'dark') svgForStart.src = 'image/forkLight.svg';
    else svgForStart.src = 'image/forkDark.svg';
        
    setTimeout(() => {
        oscillator.stop();
        audioContext.close();
    }, noteADuration);
}

// значение ползунка

const counter = document.getElementById('counter');
const counterTimer = document.getElementById('counter-value');
const savedCounter = localStorage.getItem('counter');

if (savedCounter !== null) {
    counter.value = savedCounter;
    counterTimer.innerText = savedCounter;
}

counter.addEventListener('input', () => {
    counterTimer.innerText = counter.value;
    localStorage.setItem('counter', counter.value);
})

// переход от первого окна ко второму, обратный отсчёт

const startBNT = document.getElementById('start-btn');
const window1 = document.getElementById('window1ForStart');
const window2 = document.getElementById('window2ForTimer');

//Массив нот

const notes = [
    { name: window.fortepianoNotes[languageUser][0], file: "music/c.mp3", number: 0},
    { name: window.fortepianoNotes[languageUser][1], file: "music/cSharp.mp3", number: 1},
    { name: window.fortepianoNotes[languageUser][2], file: "music/d.mp3", number: 2},
    { name: window.fortepianoNotes[languageUser][3], file: "music/eFlat.mp3", number: 3},
    { name: window.fortepianoNotes[languageUser][4], file: "music/e.mp3", number: 4},
    { name: window.fortepianoNotes[languageUser][5], file: "music/f.mp3", number: 5},
    { name: window.fortepianoNotes[languageUser][6], file: "music/fSharp.mp3", number: 6},
    { name: window.fortepianoNotes[languageUser][7], file: "music/g.mp3", number: 7},
    { name: window.fortepianoNotes[languageUser][8], file: "music/gSharp.mp3", number: 8},
    { name: window.fortepianoNotes[languageUser][9], file: "music/a.mp3", number: 9},
    { name: window.fortepianoNotes[languageUser][10], file: "music/bFlat.mp3", number: 10},
    { name: window.fortepianoNotes[languageUser][11], file: "music/b.mp3", number: 11}
];

startBNT.addEventListener('click', () => {
    window1.style.display = 'none';
    window2.style.display = 'flex';

    let timeLeftForStart = 3;

    if(noteA) {
        playNoteA();
        setTimeout(startTimer, noteADuration); 
    } else {
        startTimer();
    }

    setTimeout(startRandomNote, 4000);

    function startTimer() {

        svgForStart.style.display = 'none';
        timerP.innerText = timeLeftForStart;

        const intervalId = setInterval(() => {
            timeLeftForStart--

            timerP.innerText = timeLeftForStart;

            if (timeLeftForStart > 0) {
                timerP.innerText = timeLeftForStart
            } 
            
            else if(timeLeftForStart === 0){
                timerP.innerText = window.dictionaryGuessNote[languageUser].start_button_p;
            }

            else {
                clearInterval(intervalId);
            }
        }, 1000);

    }

    function startRandomNote() {

        if (localStorage.getItem('theme') === 'dark') svgForStart.src = 'image/ListenLight.svg';
        else svgForStart.src = 'image/ListenDark.svg';
        svgForStart.alt = window.dictionaryGuessNote[languageUser].ear;
        svgForStart.style.display = 'flex';
        timerP.style.display = 'none';
        
        function playRandomNote() {
            const randomIndex = Math.floor(Math.random() * notes.length);

            console.log(notes[randomIndex].name);
            randomNoteNumber = notes[randomIndex].number;
            randomNoteName = notes[randomIndex].number;

            const audio = new Audio(
                notes[randomIndex].file
            );

            const audioContext = new AudioContext();
            const source = audioContext.createMediaElementSource(audio)


            const gainNode = audioContext.createGain();
            gainNode.gain.value = 4;

            source.connect(gainNode);
            gainNode.connect(audioContext.destination);

            audio.play()

            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                startPiano()
            }, Number(counter.value) * 1000);
        }

        playRandomNote();
    }
})

function startPiano() {
    window2ForTimer.style.display = 'none';
    window3ForPiano.style.display = 'flex';
    
    // кнопки фо-но
    const whiteBtn = document.querySelectorAll('.white-btn');
    const blackBtn = document.querySelectorAll('.black-btn');

    // Белые клавиши активные

    whiteBtn.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Пользователь нажал белую кнопку' + button.dataset.note);
            // Стандартный стиль

            whiteBtn.forEach(button => {
                button.style.backgroundColor = 'var(--white)';
                button.style.color = "";
            });
                
            blackBtn.forEach(button => {
                button.style.backgroundColor = 'var(--black)';
                button.style.color = "";
            });

            if (localStorage.getItem('theme') === 'light') button.style.color = 'var(--white)';

            button.style.backgroundColor = 'var(--whiteForFocus)';
            keyForResult = button.dataset.note;
        });
    });

    blackBtn.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Пользователь нажал черную кнопку' + button.dataset.note);
            // Стандартный стиль

            whiteBtn.forEach(button => {
                button.style.backgroundColor = 'var(--white)';
                button.style.color = "";
            });
                
            blackBtn.forEach(button => {
                button.style.backgroundColor = 'var(--black)';
                button.style.color = "";
            });

            if (localStorage.getItem('theme') === 'light') button.style.color = 'var(--black)';
            button.style.backgroundColor = 'var(--blackForFocus)';
            keyForResult = button.dataset.note;
        });
    });
}

// кнопка проверить
const resultBNT = document.getElementById('resultButton');

resultBNT.addEventListener('click', () => {
    if(!keyForResult) {
        alert('Выберите вариант ответа');
    } else {
        checkResuit()
    }
})

function checkResuit () {
    window3ForPiano.style.display = 'none';

    if(window.matchMedia("(orientation: landscape) and (pointer: coarse)").matches || window.matchMedia("(min-width: 1024px)").matches) {
        window4ForResult.style.display = 'grid';
    } else {
        window4ForResult.style.display = 'flex';
    }

    // Параграф результата
    const textForResult = document.getElementById('textForResult');

    // парвильная нота
    const correctNote = document.getElementById('correctNote');
    correctNote.innerHTML = `${window.dictionaryGuessNote[languageUser].correct_note}${window.fortepianoNotes[languageUser][randomNoteName]}`;


    const randomNumberForMessages = Math.floor(Math.random() * window.successMessages[languageUser].length);

    if(randomNoteNumber === Number(keyForResult)) {
        textForResult.innerText = window.successMessages[languageUser][randomNumberForMessages];
    } else {
        textForResult.innerText = window.failMessages[languageUser][randomNumberForMessages];
    }
}

function changeHTMLLanguage() {
    const dict = window.dictionaryGuessNote[languageUser];
    const dictF = window.fortepianoNotes[languageUser];

    document.title = dict.title;
    const welcome_containerh1 = document.getElementById('welcome-containerh1');
    welcome_containerh1.innerHTML = dict.titleh1;
    const welcome_containerp = document.getElementById('welcome-containerp');
    welcome_containerp.innerText = dict.inst_p;
    const noteALabel = document.getElementById('noteALabel');
    noteALabel.innerText = dict.Listen;
    const counterText = document.getElementById('counterText');
    counterText.innerHTML = dict.counter;
    const counterNameTime = document.getElementById('counterNameTime');
    counterNameTime.innerHTML = dict.counter_value;
    const startbtn = document.getElementById('start-btn');
    startbtn.innerText = dict.start_button_p;
    const doNote = document.getElementById('do');
    doNote.innerText = dictF[0];
    const doSharpNote = document.getElementById('do-sharp');
    doSharpNote.innerText = dictF[1];
    const reNote = document.getElementById('re');
    reNote.innerText = dictF[2];
    const reSharpNote = document.getElementById('mi-flat');
    reSharpNote.innerText = dictF[3];
    const miNote = document.getElementById('mi');
    miNote.innerText = dictF[4];
    const faNote = document.getElementById('fa');
    faNote.innerText = dictF[5];
    const faSharpNote = document.getElementById('fa-sharp');
    faSharpNote.innerText = dictF[6];
    const solNote = document.getElementById('sol');
    solNote.innerText = dictF[7];
    const solSharpNote = document.getElementById('sol-sharp');
    solSharpNote.innerText = dictF[8];
    const laNote = document.getElementById('la');
    laNote.innerText = dictF[9];
    const laSharpNote = document.getElementById('si-flat');
    laSharpNote.innerText = dictF[10];
    const siNote = document.getElementById('si');
    siNote.innerText = dictF[11];
    const checkButton = document.getElementById('resultButton');
    checkButton.innerText = dict.check;
    const restartBNT = document.getElementById('restartBNT');
    restartBNT.innerText = dict.restart;
}

changeHTMLLanguage();