import { Component } from '../core/Component';

export class TodoList extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'todos';
  }

  addItem(item) {
    this.$rootElement.appendChild(item.$rootElement)
  }

  render() {
    this.$rootElement.innerHTML = ''
    this.props.tasks.forEach(item => {
      this.$rootElement.appendChild(item.$rootElement)
    });
  } 

  updateTasks(tasks) {
    this.props.tasks = tasks
    this.render()
  }
}