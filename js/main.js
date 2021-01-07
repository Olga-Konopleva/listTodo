const dataTodo = {
    listTodo: [],
    addTodo(text) {
        const todo = {
            id: Date.now(),
            text,
        };
        this.listTodo = [...this.listTodo, todo];
        return todo;
    },
    deleteTodo(deleteId) {
        this.listTodo = this.listTodo.filter( todo => todo.id !== deleteId);
        return {status: 201};
    }
};

const templateTodo = ({id, text}) => {
    return `
    <li data-idx="${id}">
        <h2>${text}</h2>
        <button type="button">Delete</button>
    </li>
    `
}

const formRef = document.querySelector('.js_form');
const ulRef = document.querySelector('.list_todo');

formRef.addEventListener('submit', sendTodo);
ulRef.addEventListener('click', clickUl);

function sendTodo (event) {
    event.preventDefault();
    const formNow = event.currentTarget;
    
    const input = formNow.elements.todo;
    const todo = dataTodo.addTodo(input.value);
    const murkupLi = templateTodo(todo);
    ulRef.insertAdjacentHTML('beforeend', murkupLi);
    input.value = '';
};

function clickUl (event) {
    if (event.target.nodeName !== "BUTTON") {
        return;  
    }
    const parentLi = event.target.closest('li');
    const info = dataTodo.deleteTodo(parentLi.dataset.idx);
    if (info.status === 201) {
        parentLi.remove();
    }
}