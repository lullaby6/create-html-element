import {createHTMLElement, HTMLElementAddEventListener} from "./esm.js";

function TodoList({todos}) {
    todos = JSON.parse(todos);

    const formRef = crypto.randomUUID();

    HTMLElementAddEventListener(formRef, "submit", (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);

        todos.push({id: crypto.randomUUID(), text: formProps["todo"]})

        this.setAttribute("todos", JSON.stringify(todos));
    })

    todos.forEach(todo => {
        HTMLElementAddEventListener(todo.id, "click", (event) => {
            todos.splice(todos.findIndex(todo => todo.id === event.target.id), 1);

            this.setAttribute("todos", JSON.stringify(todos));
        })
    })

    return `
        <div>
            <form id="${formRef}">
                <input type="text" placeholder="todo" name="todo">
                <input type="submit" value="add todo">
            </form>
            <ul>
                ${todos.map(todo => `
                    <li id="${todo.id}">${todo.text}</li>`
                ).join("")}
            </ul>
        </div>
    `
}

createHTMLElement(TodoList)

function MyCounter({count}){
    const ref = crypto.randomUUID();

    HTMLElementAddEventListener(ref, "click", () => {
        this.setAttribute("count", parseInt(count) + 1);
    })

    return `
        <button id="${ref}">${count}</button>
    `
}

createHTMLElement(MyCounter)