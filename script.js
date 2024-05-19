const originalConsoleLog = console.log;

console.log = function() {
    if (arguments[0].includes('[AutoClicker]') || arguments[0].includes('github.com')) {
        originalConsoleLog.apply(console, arguments);
    }
};

console.error = function() {};
console.warn = function() {};
console.info = function() {};
console.debug = function() {};

const consoleYellow = 'font-weight: bold; color: yellow;';
const consoleRed = 'font-weight: bold; color: red;';
const consoleGreen = 'font-weight: bold; color: green;';
const consolePrefix = '%c [AutoClicker] ';

console.log(`${consolePrefix}Injecting...`, consoleGreen);

if (!storedParams) {
    console.log(`${consolePrefix}An error occurred, the BrakePoint is set incorrectly!`, consoleRed);
    console.log(`${consolePrefix}Please follow the instructions, and you will succeed :*`, consoleRed);
    console.log('https://github.com/');
}
storedParams.tgWebAppPlatform = 'ios';

let autoClickActive = false;
let autoClickInterval;
let count = 0;

async function click() {
    const element = document.querySelector('#__nuxt > div > main > div > div.user-tap.has-gap > button');
    const pointerUpEvent = new PointerEvent('pointerup', {
        bubbles: true,
        cancelable: true,
        pointerType: 'mouse'
    });
    element.dispatchEvent(pointerUpEvent);
    count++;
    const balance = document.querySelector('#__nuxt > div > main > div > div.user-balance-large > div > p').textContent
    console.log(`${consolePrefix}Success clicked (${count})`, consoleGreen);
    console.log(`${consolePrefix}Balance: ${balance}`, consoleYellow);
    if (autoClickActive) {
        setTimeout(click, Math.random() * (347.7 - 451.2) + 451.2); // Исправлено на миллисекунды
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.clear()
    function addLinkToNav() {
        const navElement = document.querySelector('.app-bar-nav');
        if (navElement) {
            const newLink = document.createElement('a');
            
            newLink.href = '#';
            newLink.innerHTML  = '<div class="app-bar-item-image"><img src="/images/boost-multitap.png?v=1" style="filter: grayscale(100%);"></div><p>Auto Click</p>';
            newLink.className = 'app-bar-item no-select';
            
            newLink.addEventListener('click', function(event) {
                event.preventDefault();
                autoClickActive = !autoClickActive;
                console.log(`${consolePrefix}${autoClickActive ? 'Activated' : 'Deactivated'}`, autoClickActive ? consoleGreen : consoleRed);
                const img = newLink.querySelector('img');
                
                if (autoClickActive) {
                    img.style.filter = 'none';
                    click(); // Запускаем функцию click
                } else {
                    img.style.filter = 'grayscale(100%)';
                    clearTimeout(autoClickInterval); // Останавливаем автоклик
                }
            });
            
            navElement.appendChild(newLink);
            console.clear()
            console.log(`${consolePrefix}Script loaded`, consoleGreen);
            console.log(`${consolePrefix}Code by @clqkx`, consoleGreen);
        } else {
            setTimeout(addLinkToNav, 1000); // Повторяем попытку через 1 секунду
        }
    }

    addLinkToNav();
});
