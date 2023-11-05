import {
    init,
    classModule,
    styleModule,
    eventListenersModule,
    h,
} from "snabbdom";

import { stylesMain } from "./style";
const patch = init([
    classModule,
    styleModule,
    eventListenersModule,
]);

let container = document.getElementById("app");
let count = 0;
let intervalId = null;



// Lifecycle hooks
const lifecycleHooks = {
    onMount: () => {
        console.log("Component mounted");
    },
    onStateChange: () => {
        console.log("State changed");
    },
};

function updateState() {
    count++;
    update();
}

function startIncrement() {
    if (intervalId === null) {
        intervalId = setInterval(() => {
            count++;
            update();
        }, 1000);
    }
}

function stopIncrement() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function resetCounter() {
    count = 0;
    update();
}

function view() {
    return h("div#container", { style: { ...stylesMain.container, ...stylesMain.flexCenter } }, [
        h("h1", { style: { ...stylesMain.h1Style } }, `${count}`),
        h("div.child1", { style: { ...stylesMain.flexCenter } }, [
            h("button", { on: { click: updateState }, style: { ...stylesMain.button } }, "Add"),
            h("div.child2", { style: { ...stylesMain.divChild2 } }, [
                h("button", { on: { click: startIncrement }, style: { ...stylesMain.startStopButton } }, "Start"),
                h("button", { on: { click: stopIncrement }, style: { ...stylesMain.startStopButton } }, "Stop"),
            ]),
            h("button", { on: { click: resetCounter }, style: { ...stylesMain.resetButton } }, "Reset"),
        ]),
    ]);
}

const oldVnode = h("div#container", { style: { ...stylesMain.container, ...stylesMain.flexCenter } }, [
    h("h1", { style: { ...stylesMain.h1Style } }, `${count}`),
    h("div.child1", { style: { ...stylesMain.flexCenter } }, [
        h("button", { on: { click: updateState }, style: { ...stylesMain.button } }, "Add"),
        h("div.child2", { style: { ...stylesMain.divChild2 } }, [
            h("button", { on: { click: startIncrement }, style: { ...stylesMain.startStopButton } }, "Start"),
            h("button", { on: { click: stopIncrement }, style: { ...stylesMain.startStopButton } }, "Stop"),
        ]),
        h("button", { on: { click: resetCounter }, style: { ...stylesMain.resetButton } }, "Reset"),
    ]),
]);

lifecycleHooks.onMount();

container = patch(container, oldVnode);

function update() {
    lifecycleHooks.onStateChange();
    const newVnode = view();
    container = patch(container, newVnode);
}
