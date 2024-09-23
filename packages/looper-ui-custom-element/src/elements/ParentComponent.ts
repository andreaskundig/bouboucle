class ParentComponent extends HTMLElement{
    connectedCallback(){
        const newDiv = document.createElement('div');
        newDiv.style.backgroundColor = 'pink';

        // Move existing children into the new div
        while (this.firstChild) {
            newDiv.appendChild(this.firstChild);
        }

        // Append the new div back to the parent
        this.appendChild(newDiv)
    }
}
class ChildComponent extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
            <p>youpi</p>
        `;
    }
}

customElements.define("child-component", ChildComponent);

customElements.define("parent-component", ParentComponent);