const dictionaryGuessNote = {
    ru: {
        title: `Угадай<br>ноту`,
        inst_p: `После нажатия на кнопку "Начать" вы услышите звук ноты. Ваша задача - угадать, какая нота была сыграна. Также вы можете настроить длительность воспроизведения.`,
        inst_p_A: `После нажатия на кнопку "Начать" вы услышите для настройки слуха ноту Ля(А). Затем сосредоточьтесь на играющей неизвестной ноте. Ваша задача - угадать, какая нота была сыграна. Также вы можете настроить длительность воспроизведения.`,
        counter: `Длительность<br>воспроизведения: `,
        counter_value: `сек`,
        start_button_p: `Начать`,
        note: ['До', 'До#/Ре♭', 'Ре', 'Ре#/Ми♭', 'Ми', 'Фа', 'Фа#/Соль♭', 'Соль', 'Соль#/Ля♭', 'Ля', 'Ля#/Си♭', 'Си'],
        check: `Проверить`,
        correct_note: `Правильная нота<br>`,
        continue: `Продолжить`,
        restart: `Попробовать ещё раз`
    },

    uk: {
        title: `Вгадай<br>ноту`,
        inst_p: `Після натискання на кнопку "Почати" ви почуєте звук ноти. Ваше завдання – вгадати, яка нота була зіграна. Також можна налаштувати тривалість відтворення.`,
        inst_p_A: `Після натискання на кнопку "Почати" ви почуєте для налаштування слуху ноту Ля(А). Потім зосередьтеся на невідомій ноті, що грає. Ваше завдання – вгадати, яка нота була зіграна. Також можна налаштувати тривалість відтворення.`,
        counter: `Тривалість<br>відтворення: `,
        counter_value: `сек`,
        start_button_p: `Почати`,
        note: ['До', 'До#/Ре♭', 'Ре', 'Ре#/Ми♭', 'Ми', 'Фа', 'Фа#/Соль♭', 'Соль', 'Соль#/Ля♭', 'Ля', 'Ля#/Си♭', 'Си'],
        check: `Перевірити`,
        correct_note: `Правильна нота<br>`,
        continue: `Продовжити`,
        restart: `Спробувати ще раз`
    },

    en: {
        title: `Guess<br>the note`,
        inst_p: `After clicking the "Start" button, you'll hear a note sound. Your task is to guess which note was played. You can also adjust the playback duration.`,
        inst_p_A: `After clicking the "Start" button, you'll hear an A note to help you tune your hearing. Then, focus on the unknown note being played. Your task is to guess which note was played. You can also adjust the playback duration.`,
        counter: `Playback<br>duration: `,
        counter_value: `s`,
        start_button_p: `Start`,
        note: ['C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/B♭', 'B'],
        check: `Check`,
        correct_note: `Correct note<br>`,
        continue: `Continue`,
        restart: `Try again`
    }
};

const fortepianoNotes = {
    latin: ['C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/B♭', 'B'],
    localRu: ['До', 'До#/Ре♭', 'Ре', 'Ре#/Ми♭', 'Ми', 'Фа', 'Фа#/Соль♭', 'Соль', 'Соль#/Ля♭', 'Ля', 'Ля#/Си♭', 'Си'],
    localUk: ['До', 'До#/Ре♭', 'Ре', 'Ре#/Мі♭', 'Мі', 'Фа', 'Фа#/Соль♭', 'Соль', 'Соль#/Ля♭', 'Ля', 'Ля#/Сі♭', 'Сі']
}

/*
const successMessages = {
    ru: [
        `Отлично! Вы угадали ноту!`,
        `Превосходно! Ваш слух вас не подвёл!`,
        `Верно! Так держать!`,
        `Браво! Вы отлично справились!`,
        `Правильный ответ! Продолжайте в том же духе!`
    ],

    uk: [
        `Чудово! Ви вгадали ноту!`,
        `Прекрасно! Ваш слух вас не підвів!`,
        `Правильно! Так тримати!`,
        `Браво! Ви чудово впоралися!`,
        `Правильна відповідь! Продовжуйте в тому ж дусі!`
    ],

    en: [
        `Excellent! You guessed the note!`,
        `Great! Your ear didn't let you down!`,
        `Correct! Keep it up!`,
        `Bravo! You did a great job!`,
        `That's right! Keep up the good work!`
    ]
};

const failMessages = {
    ru: [
        `Пока не получилось. Попробуйте ещё раз!`,
        `Ничего страшного, слух развивается с практикой!`,
        `Почти! Следующая попытка может быть удачной.`,
        `Не сдавайтесь! Каждая попытка делает вас лучше.`,
        `Ошибки — это часть обучения. Попробуйте снова!`
    ],

    uk: [
        `Поки не вийшло. Спробуйте ще раз!`,
        `Нічого страшного, слух розвивається з практикою!`,
        `Майже! Наступна спроба може бути вдалою.`,
        `Не здавайтеся! Кожна спроба робить вас кращими.`,
        `Помилки — це частина навчання. Спробуйте знову!`
    ],

    en: [
        `Not quite. Try again!`,
        `Don't worry, your ear improves with practice!`,
        `Almost! Your next attempt might be the right one.`,
        `Don't give up! Every attempt makes you better.`,
        `Mistakes are part of learning. Try again!`
    ]
}; */