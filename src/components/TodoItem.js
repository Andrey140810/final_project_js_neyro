import { Component } from '../core/Component';

export class TodoItem extends Component {
  setup(props) {
    function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0')
      let month = (date.getMonth() + 1)
      month = String(month).padStart(2, '0')
      const year = date.getFullYear()
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`
    }
    this.state = {
      id: Date.now(),
      date: formatDate(new Date()),
      text: props.text,
      completed: props.completed
    }
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'todo-item';

    const $textContainer = document.createElement('div')
    $textContainer.className = 'todo-item__text-container'

    const $date = document.createElement('small')
    $date.className = 'todo-item__date'
    $date.textContent = this.state.date

    const $checkbox = document.createElement('input')
    $checkbox.type = 'checkbox'

    const $text = document.createElement('span')
    $text.textContent = this.state.text

    const $deleteButton = document.createElement('button')
    $deleteButton.className = 'delete-button'
    $deleteButton.textContent = 'Удалить'

    this.$rootElement.appendChild($checkbox)
    this.$rootElement.appendChild($textContainer)
    $textContainer.appendChild($date)
    $textContainer.appendChild($text)
    this.$rootElement.appendChild($deleteButton)

    this.$deleteButton = $deleteButton
    this.$checkbox = $checkbox

    this.$deleteButton.addEventListener('click', this.handleDelete.bind(this))    
    this.$checkbox.addEventListener('change', this.flagCheckbox.bind(this))
  }

  handleDelete() {
    this.props.onDelete(this.state.id)
  }

  flagCheckbox() {
    this.props.onCheckbox(this.state.id)
    if (this.state.completed === true) {
      this.$rootElement.classList.toggle('completed', this.state.completed)
      this.$checkbox.checked = true
    } else {
      this.$rootElement.classList.toggle('completed', this.state.completed)
      this.$checkbox.checked = false
    }
  }
}
