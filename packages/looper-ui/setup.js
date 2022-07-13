/**
 * 
 * @param {HTMLElement} targetElement target dom element for ui instance (defaults to document.body)
 * @param {string} htmlTemplateStr ui dom tree represented as a string
 */
export default function setupDom(targetElement = document.body, htmlTemplateStr){
    targetElement.innerHTML += htmlTemplateStr;
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