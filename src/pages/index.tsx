import Head from 'next/head'
import widgets from "@/lib/widgetLoader";

let currentWindowIndex = 0;
let maxWindowIndex = widgets.length;
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
    newElem3.classList.add("game-display-background", "d-flex", "shadow", "position-relative");
    newElem3.style.background = `radial-gradient(circle, hsla(0, 0%, 50%, 0.8), hsla(0, 0%, 0%, 0.85)), ${widgets[currentWindowIndex - 1].colour ? widgets[currentWindowIndex - 1].colour : "#2f2f2f"}`;

    // Adding spinner loader

    let spinnerDiv = document.createElement("div");
    spinnerDiv.classList.add("d-flex", "justify-content-center", "position-absolute", "h-100", "w-100");

    let spinnerElem = document.createElement("div");
    spinnerElem.classList.add("spinner-border", "m-auto", "text-light");
    spinnerElem.role = "status";

    let spinnerSpan = document.createElement("span");
    spinnerSpan.classList.add("visually-hidden");
    spinnerSpan.innerText = "Loading...";

    spinnerDiv.appendChild(spinnerElem);
    spinnerElem.appendChild(spinnerSpan);
    newElem3.appendChild(spinnerDiv);


    // Adding logo
    let widgetLogo = widgets[currentWindowIndex - 1].logo;
    let logoDiv = document.createElement("div");
    logoDiv.classList.add("position-absolute", "w-100", "p-5", "mt-5", "text-center");
    if (widgetLogo) {
        let logoImg = document.createElement("img");
        logoImg.classList.add("mx-auto", "w-100");
        logoImg.style.maxWidth = "300px";
        logoImg.src = "/widget_logos/" + widgetLogo;
        logoDiv.appendChild(logoImg);
    } else {
        let logoText = document.createElement("h2");
        logoText.classList.add("mx-auto", "w-100", "text-light", "fw-bold");
        logoText.style.maxWidth = "300px";
        logoText.innerText = widgets[currentWindowIndex - 1].name;
        logoDiv.appendChild(logoText);
    }
    newElem3.appendChild(logoDiv);


    let newElem4 = document.createElement("iframe");
    newElem4.classList.add("flex-grow-1", "game-display", "fade-in");
    newElem4.src = widgets[currentWindowIndex - 1].path;
    newElem4.style.opacity = "0";
    newElem4.onload = () => {
        newElem4.style.opacity = "1";
    }
    newElem4.title = widgets[currentWindowIndex - 1].name;
    newElem4.style.zIndex = "100";

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
            {/*<Script id={"setWindowCSSProperties-script"} strategy="lazyOnload">*/}
            {/*    {`*/}
            {/*        // First we get the viewport height, and we multiply it by 1% to get a value for a vh unit*/}
            {/*        vh = window.innerHeight * 0.01;*/}
            {/*        // Then we set the value in the --vh custom property to the root of the document*/}
            {/*        document.documentElement.style.setProperty('--vh', vh + "px");*/}
            {/*    `}*/}
            {/*</Script>*/}
            <main>
                <div id={"button-bar"}
                     className={"bg-primary bg-opacity-25 position-fixed vw-100 d-flex p-2 justify-content-between"}>
                    <button className={"btn btn-warning"} onClick={handleMoveLeft}>
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </button>
                    <button className={"btn btn-warning"} onClick={handleMoveRight}>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </button>
                </div>
            </main>
            <style jsx>{`
              main {
                overflow: hidden;
                background: ${darkMode ? "radial-gradient(circle, #1b1b38, black)" : "radial-gradient(circle, white, lightgrey)"};
              }
              body {
                overflow-y: hidden;
              }
            `}</style>
        </>
    )
}
