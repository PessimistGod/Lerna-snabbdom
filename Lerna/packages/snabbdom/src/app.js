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

function createCounterApp(containerId, initialState = 0) {
    let container = document.getElementById(containerId);
    let count = initialState;
    let intervalId = null;

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

    function view(count) {
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

    const initialVnode = view(count);

    function mount() {
        console.log("Component Mounted");
        container = patch(container, initialVnode);
    }

    function update() {
        console.log("Updating Component");
        const newVnode = view(count);
        container = patch(container, newVnode);
    }


    return {
        mount,
        update,
    };
}

const counterApp = createCounterApp("app");

counterApp.mount();
