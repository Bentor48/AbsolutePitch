const logoSVGForSettings = {
    sun: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" /></svg>`
};

const windowSetting = document.getElementById('settings-container');

let activeTheme
if(localStorage.getItem('theme') === null) {
    activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('theme', activeTheme ? 'dark' : 'light');
} else {
    if( localStorage.getItem('theme') === 'dark') activeTheme = true
    else activeTheme = false
}

function addSettingForWindow() {
    windowSetting.innerHTML = 
    `<div id="settings">
        <button class="setBTN" id="language">${logoSVGForSettings.globe}</button>
        <button class="setBTN" id="theme">${activeTheme ? logoSVGForSettings.moon : logoSVGForSettings.sun}</button>
    </div>
    <dialog id="languageDialog">
        <h2>Выберите язык</h2>
        <button class="languageButton" data-language="en">English</button>
        <button class="languageButton" data-language="uk">Українська</button>
        <button class="languageButton" data-language="ru">Русский</button>
    </dialog>`
};

addSettingForWindow();

const themeBTN = document.getElementById('theme');
const logo = document.getElementById('logo');

function forLightColor () {
    document.documentElement.setAttribute('data-theme', 'light');
    logo.src = 'image/LogoAPDark.svg';
}

if(localStorage.getItem('theme') === 'light') {
    forLightColor();
}

themeBTN.addEventListener('click', () => {
    activeTheme = !activeTheme;

    if (activeTheme) {
        themeBTN.innerHTML = logoSVGForSettings.moon;
        document.documentElement.setAttribute('data-theme', 'dark');
        logo.src = 'image/LogoAPLight.svg';
    } else {
        themeBTN.innerHTML = logoSVGForSettings.sun;
        forLightColor ()
    }

    localStorage.setItem('theme', activeTheme ? 'dark' : 'light');
})

// Выбор языка
// Определить язык пользователя и найти запись в памяти
window.languageUser = localStorage.getItem('language');
const htmlElement = document.documentElement;

if (!languageUser) {
    const systemLanguage = navigator.language.toLowerCase();

    if (systemLanguage.startsWith("ru")) {
        languageUser = "ru";
    } else if (systemLanguage.startsWith("uk")) {
        languageUser = "uk";
    } else {
        languageUser = "en";
    }
} else {
    htmlElement.lang = languageUser;
}

const languageBTN = document.getElementById('language');
const dialog = document.getElementById("languageDialog");
const languageButtons = document.querySelectorAll(".languageButton");

languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        languageUser = button.dataset.language;
        console.log(`Выбран язык: ${languageUser}`);
        setLanguage();
        closeDialog();
    });
});

console.log(localStorage.getItem('language'));

function setLanguage() {
    htmlElement.lang = languageUser;
    localStorage.setItem('language', languageUser);
    setHeaderAlt();
    setFooterText();
};

languageBTN.addEventListener('click', () => {
    dialog.showModal();

    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
    history.pushState({ dialog: true }, "");
});

// Закрытие диалога при нажатии на кнопку "Закрыть"

function closeDialog() {
    dialog.close();

    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
}

window.addEventListener("popstate", () => {
    if (dialog.open) {
        closeDialog();
    }
});

// Header
const header = document.querySelector('header');

function setHeaderAlt() {
    header.innerHTML = `<a href="#"><img id="logo" src="image/LogoAPLight.svg" alt="${window.headerAlt[languageUser]}"></a>`;
}

setHeaderAlt()

// Footer
const footer = document.querySelector('footer');

function setFooterText() {
    footer.innerHTML = `<p class="footer">
            © 2026 ${window.footerText[languageUser].name}
            <span class="dot">·</span>
            ${window.footerText[languageUser].githubText} —
            <a href="https://github.com/Bentor48"
            target="_blank"
            rel="noopener noreferrer"
            class="github-link"
            aria-label="Мой GitHub">

            <svg id="svgGitHub" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.45 7.86 10.98.58.11.79-.25.79-.56
                0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54
                -.53-1.36-1.3-1.72-1.3-1.72
                -1.06-.73.08-.72.08-.72
                1.17.08 1.79 1.2 1.79 1.2
                1.04 1.78 2.73 1.27 3.4.97
                .11-.75.41-1.27.74-1.56
                -2.56-.29-5.26-1.28-5.26-5.69
                0-1.26.45-2.29 1.19-3.1
                -.12-.29-.52-1.46.11-3.05
                0 0 .97-.31 3.18 1.18
                .92-.26 1.9-.39 2.88-.39
                .98 0 1.96.13 2.88.39
                2.2-1.49 3.18-1.18 3.18-1.18
                .63 1.59.23 2.76.11 3.05
                .74.81 1.19 1.84 1.19 3.1
                0 4.42-2.7 5.39-5.27 5.67
                .42.36.8 1.08.8 2.18
                0 1.57-.01 2.84-.01 3.23
                0 .31.21.68.8.56
                4.57-1.53 7.85-5.87 7.85-10.98
                C23.5 5.74 18.27.5 12 .5z"/>
            </svg>
            </a>
        </p>`;
}

setFooterText();