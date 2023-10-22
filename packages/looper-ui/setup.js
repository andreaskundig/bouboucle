/**
 * 
 * @param {HTMLElement} targetElement target dom element for ui instance (defaults to document.body)
 * @param htmlTemplate function producing the ui 
 */
export default function setupDom(targetElement = document.body, htmlTemplate, buttonOrder=undefined){
    targetElement.innerHTML += htmlTemplate(buttonOrder);
}

/**
 * 
 * @param {string} cssStr string in css injected in document's head
 */
export function injectCSS(cssStr){
    const styleSheet = document.createElement("style");
    styleSheet.innerText = cssStr;
    document.head.appendChild(styleSheet);
}
