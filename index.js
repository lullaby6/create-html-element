export function createHTMLElement(callback) {
    const name = (/function ([^(]*)/.exec( callback+"" )[1]).replace(/[A-Z]/g, match => `-${match.toLowerCase()}`).slice(1);

    class HTMLElementClass extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.html = this.innerHTML;
            this.callback = callback;

            this.observerCallback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "attributes") this.render()
                }
            };
            this.observer = new MutationObserver(this.observerCallback);
            this.observer.observe(this, { attributes: true });

            this.render();
        }

        render(){
            const attributes = Array.from(this.attributes).reduce((atributos, { name, value }) => ({ ...atributos, [name]: value }), {});
            const html = this.callback(attributes);

            this.innerHTML = html;

            const slot = this.querySelector('slot');
            if(slot) slot.innerHTML = this.html;

            window.HTMLElementAddEventListeners.forEach(({id, event, callback}) => {
                const element = document.getElementById(id);
                if(element) {
                    element.removeEventListener(event, callback);
                    element.addEventListener(event, callback);
                }
            });
        }
    }

    customElements.define(name, HTMLElementClass);
}

window.HTMLElementAddEventListeners = []

export function HTMLElementAddEventListener(id, event, callback) {
    window.HTMLElementAddEventListeners.push({id, event, callback});
}