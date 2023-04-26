import Head from 'next/head'
import Script from "next/script";

let currentWindowIndex = 0;
let maxWindowIndex = 100;
let minWindowIndex = 0;
let timeoutId: any;
let buttonClickDelay = 500;

let darkMode = true;

function handleAddWindow(invert: boolean) {
    let mainContainer = document.getElementsByTagName("main")[0];

    let newElem1 = document.createElement("div");
    newElem1.classList.add("game-window", "d-flex", "vh-100", "overflow-hidden", "position-absolute", "vw-100");
    newElem1.classList.add(invert ? "move-off-left" : "move-off-right");

    let newElem2 = document.createElement("div");
    newElem2.classList.add("m-auto", "overflow-visible");

    let newElem3 = document.createElement("div");
    newElem3.classList.add("game-display-background", "d-flex", "shadow");

    let newElem4 = document.createElement("iframe");
    newElem4.classList.add("flex-grow-1", "game-display", "fade-in");
    newElem4.src = `http${process.env.NODE_ENV === "production" ? "s" : ""}://${process.env.NEXT_PUBLIC_HOST}/widgets/test/${currentWindowIndex}`;
    newElem4.style.opacity = "0";
    newElem4.onload = () => {
        newElem4.style.opacity = "1";
    }
    newElem4.title = "W3Schools Free Online Web Tutorials";

    newElem1.appendChild(newElem2);
    newElem2.appendChild(newElem3);
    newElem3.appendChild(newElem4);
    mainContainer.appendChild(newElem1);

    return newElem1;
}

function handleMoveRight(e: any) {
    e.preventDefault();

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (currentWindowIndex === maxWindowIndex) return;

        currentWindowIndex++;

        let currentWindow = document.getElementsByClassName("current-window")[0];
        if (currentWindow) {
            currentWindow.classList.remove("current-window");
            currentWindow.classList.add("move-off-left");
        }

        if (currentWindowIndex !== 0) {
            let newWindow = handleAddWindow(false);

            // TODO think of a cleaner solution to remove the move-off-right class ONLY when the DOM has loaded element
            setTimeout(function () {
                newWindow.classList.remove("move-off-right");
                newWindow.classList.add("current-window")
            }, 10);
        }

        setTimeout(function() {
            if (currentWindow) currentWindow.remove();
        }, 1000);
    }, buttonClickDelay);
}

function handleMoveLeft(e: any) {
    e.preventDefault();

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        if (currentWindowIndex === minWindowIndex) return;

        currentWindowIndex--;

        let currentWindow = document.getElementsByClassName("current-window")[0];
        if (currentWindow) {
            currentWindow.classList.remove("current-window");
            currentWindow.classList.add("move-off-right");
        }

        if (currentWindowIndex !== 0) {
            let newWindow = handleAddWindow(true);

            // TODO think of a cleaner solution to remove the move-off-right class ONLY when the DOM has loaded element
            setTimeout(function() {
                newWindow.classList.remove("move-off-left");
                newWindow.classList.add("current-window")
            }, 10);
        }

        setTimeout(function() {
            if (currentWindow) currentWindow.remove();
        }, 1000);
    }, buttonClickDelay);

}

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Script id={"setWindowCSSProperties-script"} strategy="lazyOnload">
                {`
                    // First we get the viewport height, and we multiply it by 1% to get a value for a vh unit
                    vh = window.innerHeight * 0.01;
                    // Then we set the value in the --vh custom property to the root of the document
                    document.documentElement.style.setProperty('--vh', vh + "px");
                `}
            </Script>
            <main>
                <div id={"button-bar"}
                     className={"bg-primary bg-opacity-25 position-absolute vw-100 bottom-0 d-flex p-2 justify-content-evenly"}>
                    <button className={"btn btn-info"} onClick={handleMoveLeft}>Left</button>
                    <button className={"btn btn-secondary"} onClick={handleMoveRight}>Right</button>
                </div>
            </main>
            <style jsx>{`
              main {
                overflow: hidden;
                background: ${darkMode ? "radial-gradient(circle, #1b1b38, black)" : "radial-gradient(circle, white, lightgrey)"};
              }

              .vh-100 {
                height: 100vh; /* Fallback for browsers that do not support Custom Properties */
                height: calc(var(--vh, 1vh) * 100);
              }
            `
            }</style>
        </>
    )
}
