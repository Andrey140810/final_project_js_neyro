import { Component } from '../core/Component';

export class TodoForm extends Component {
  constructor(props) {
    super()
    this.onSubmit = props.onSubmit
  }

  get isValid() {
    const value = this.state.text
    return value !== ''
  }

  setup(props) {
    this.state = {
      text: ''
    }

    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'todo-form';

    const $formInput = document.createElement('input')
    $formInput.type = 'text'
    $formInput.placeholder = 'Введите задачу'

    const $formButton = document.createElement('button')
    $formButton.type = 'submit'
    $formButton.textContent = 'Добавить'

    this.$rootElement.appendChild($formInput)
    this.$rootElement.appendChild($formButton)

    this.$input = $formInput
    this.$button = $formButton

    this.$input.addEventListener('input', this.handleInput.bind(this))
    this.$rootElement.addEventListener('submit', this.handleSubmit.bind(this))

  }

  handleInput(event) {
    const { target } = event
    this.state.text = target.value
    if(!this.isValid) {
      this.$button.disabled = true
    } else {
      this.$button.disabled = false
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.isValid) {
      const text = this.state.text
      this.onSubmit(text)
      this.state.text = ''
      this.$input.value = ''
    }
  }
}
