import { LightningElement, track } from 'lwc';

export default class TaskManager extends LightningElement {
    @track todos = [];
    @track time = ""; // Store the current time
    @track greeting = ""; // Store the greeting message

    connectedCallback() {
        this.updateTime();
        setInterval(() => {
            this.updateTime();
        }, 1000); // Update every second
    }

    updateTime() {
        const now = new Date();
        this.time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const hour = now.getHours();
        if (hour < 12) {
            this.greeting = "Good Morning";
        } else if (hour < 18) {
            this.greeting = "Good Afternoon";
        } else {
            this.greeting = "Good Evening";
        }
    }

    addTodoHandler() {
        const inputBox = this.template.querySelector(".todo-input");
        if (inputBox && inputBox.value.trim()) {
            this.todos = [
                ...this.todos,
                { id: Date.now(), name: inputBox.value, completed: false }
            ];
            inputBox.value = "";
        }
    }

    updateHandler(event) {
        const todoId = event.target.dataset.id;
        this.todos = this.todos.map(todo => {
            if (todo.id == todoId) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
    }

    deleteHandler(event) {
        const todoId = event.target.dataset.id;
        this.todos = this.todos.filter(todo => todo.id != todoId);
    }

    deleteAllCompletedHandler() {
        this.todos = this.todos.filter(todo => !todo.completed);
    }
}