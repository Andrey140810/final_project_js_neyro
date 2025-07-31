import { Component } from '../core/Component';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';

export class App extends Component {
  setup(props) {
    this.state = {
      total: 0,
      completed: 0,
      tasks: []
    }
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const $heading = document.createElement('h1')
    $heading.textContent = 'Список дел'

    const $status = document.createElement('div')
    $status.className = 'stats'

    $status.innerHTML = `Всего: <span>${this.state.total}</span>, Выполнено: <span>${this.state.completed}</span>`
    this.$statusSpanTotal = $status.querySelector('span:nth-child(1)')
    this.$statusSpanCompleted = $status.querySelector('span:nth-child(2)')

    this.$rootElement.appendChild($heading)
    this.$rootElement.appendChild($status)
    
    const todoForm = new TodoForm({onSubmit: this.onItemCreate.bind(this)});
    this.$rootElement.appendChild(todoForm.$rootElement);
    const todoList = new TodoList({
      tasks: this.state.tasks
    });
    this.todoList = todoList
    this.$rootElement.appendChild(todoList.$rootElement);
  }
  
  onItemCreate(text) {
    const item = new TodoItem({
      text,
      completed: false,
      onDelete: this.onDeleteItem.bind(this),
      onCheckbox: this.onToggleCompleted.bind(this)
    })
    this.state.tasks.push(item)
    this.todoList.addItem(item)
    this.state.total++
    this.$statusSpanTotal.textContent = this.state.total
  }

  onDeleteItem(itemId) {
    const taskDeleteItem = this.state.tasks.find(item => itemId === item.state.id)?.state.text
    if (taskDeleteItem !== undefined) {
      this.state.tasks = this.state.tasks.filter(item => item.state.id !== itemId)
      this.state.total--
      this.$statusSpanTotal.textContent = this.state.total
      this.todoList.updateTasks(this.state.tasks)
    }
  }

  onToggleCompleted(itemId) {
    const taskCompletedItem = this.state.tasks.find(item => itemId === item.state.id)
    if (taskCompletedItem !== undefined) {
      taskCompletedItem.state.completed = !taskCompletedItem.state.completed
      if (taskCompletedItem.state.completed === true) {
        this.state.completed++
        this.$statusSpanCompleted.textContent = this.state.completed
        this.todoList.updateTasks(this.state.tasks)
      } else {
        this.state.completed--
        this.$statusSpanCompleted.textContent = this.state.completed
        this.todoList.updateTasks(this.state.tasks)
      }
    }
  }
}
