# create-html-element

Create reusable and reactive Web Components using Custom Element API.

# Installation

Using NPM:

```sh
npm install create-html-element
```

Using the CDN:

```html
<script defer src="https://cdn.jsdelivr.net/npm/create-html-element/dist/cdn.js"></script>
```

# Usage

## Let's create a simple button counter

JavaScript:

```js
// if you are using the CDN, you don't need import anything
import {createHTMLElement, HTMLElementAddEventListener} from "create-html-element";

function MyCounter({count}){
    // creating a reference to hit the button
    const ref = crypto.randomUUID();

    // use the HTMLElementAddEventListener method for add event listener to elements inside custom elements
    HTMLElementAddEventListener(ref, "click", () => {

        // when any attribute of the custom element is updated, it will be re-rendered
        this.setAttribute("count", parseInt(count) + 1);
    })

    return `
        <button id="${ref}">${count}</button>
    `
}

// use the createHTMLElement method to define the custom element
createHTMLElement(MyCounter)
```

HTML:

```html
<!-- you need to specify the attributes to be used in the custom element function, otherwise it will throw an error -->
<my-counter count="0"></my-counter>
```