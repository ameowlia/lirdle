import View from './view.js';
import Model from './model.js';

let view = null;
let model = view;

function initialize() {
    console.log(`ready are we initing`);
    view = new View();
    model = new Model(view);
    model.initialize();
    view.setModel(model);
    if (!model.allDone) {
        const keyboard = document.getElementById("keyboard-cont");
        document.addEventListener("keyup", (e) => {
            if (view) view.keyHandler(e);
            else console.log(`Not handling key ${e.key}`);
        });
        keyboard.addEventListener("click", (e) => {
            if (!view) {
                console.log(`Not handling click event on ${ e.target.nodeName }`);
            } else if (e.target.nodeName === "BUTTON") {
                const command = e.target.textContent;
                if (command) {
                    e.key = command;
                    view.keyHandler(e);
                } else {
                    console.log(`Clicked button has no textContent`);
                }
            }
            console.log(`Ignoring click on non-button ${ e.target.nodeName }`);
        });
        keyboard.addEventListener('dblclick', (e) => {
            e.stopPropagation();
        });
    }
    const button = document.getElementById('shareResults');
    button.addEventListener('click', async (e) => {
        const shareText = model.getShareText();
        try {
            await navigator.clipboard.writeText(shareText);
        } catch(e) {
            console.log(`Trying to share failed; ${e}`);
        }
    })
}
window.addEventListener('load', () => {
    initialize();
});
