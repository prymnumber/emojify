'use babel';

export default class IreneEmojifyView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('irene-emojify');

    // Create message element
    this.message = document.createElement('div');
    this.message.textContent = '';
    this.message.classList.add('message');
    this.element.appendChild(this.message);

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
