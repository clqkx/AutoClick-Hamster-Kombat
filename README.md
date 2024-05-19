<br>

<div align="center">

[<img src="./resources/hamster-logo.jpg" width="144"/>](https://t.me/hamster_kombat_bot)

  <h1 align="center">Auto Click for Hamster Kombat</h1>
  
  <p align="center">
    <strong>Bot for automatic clicking in the Telegram game Hamster Kombat.</strong>
  </p>

</div>

## Enable Debug Mode for Mini Apps

### Android
- **[Enable USB-Debugging](https://developer.chrome.com/docs/devtools/remote-debugging/)** on your device.
- In Telegram Settings, scroll all the way down, press and hold on the version number two times.
- Choose Enable WebView Debug in the Debug Settings.
- Connect your phone to your computer and open chrome://inspect/#devices in Chrome – you will see your Mini App there when you launch it on your phone.

### Telegram Desktop on Windows and Linux
- Download and launch the **[Beta Version](https://desktop.telegram.org/changelog#beta-version)** of Telegram Desktop on Windows or Linux (not supported on Telegram Desktop for macOS yet).
- Go to Settings > Advanced > Experimental settings > Enable webview inspection.
- Right click in the WebView and choose Inspect.

### Telegram macOS
- Download and launch the **[Beta Version](https://telegram.org/dl/macos/beta)** of Telegram macOS.
- Quickly click 5 times on the Settings icon to open the debug menu and enable “Debug Mini Apps”.

## Launch script

Follow the steps below to launch script:

1. Open the game in Telegram Web App and the web inspector of your browser. You can do this by right-clicking on the page and selecting **"Inspect"** or **"Inspect Element"** (depending on the browser).

2. Go to the **"Sources"** tab in the web inspector.

3. Find the file **"telegram-web-app.js"**. It is located in the **"js"** folder.

4. Open the file **"telegram-web-app.js"** and locate the line with the condition **"if (storedParams) {"**. This should be approximately on the 12th line of the code.

5. Set a Brake Point at this line. You can do this by clicking on the line number to the left of the code or by pressing the **F9** key on your keyboard.

6. Reload the page by pressing **F5** on your keyboard.

7. Switch to the **"Console"** tab. In the console at the bottom of the page, enter the copied script and press the **Enter** key.

```
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
    console.log('https://github.com/clqkx/AutoClick-Hamster-Kombat');
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
```

8. To disable the debugger, go back to the **"Sources"** tab and click on the Brake Point to remove it. You can also press the **F9** key again to remove the Brake Point.

### That's it! Now you can use this script for automatic clicking in the Hamster Kombat game on Telegram.

## Author

Telegram: [@clqkx](https://t.me/clqkx)
Telegram Channel: [@clqkxdev](https://t.me/clqkxdev)
