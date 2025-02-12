class Tooltip {
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize() {
    this.createElement();
    this.createListeners();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('tooltip');
    this.element = element;
  }

  createListeners() {
    document.addEventListener('pointerover', this.handlePointerOver);
    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerout', this.handlePointerOut);
  }

  destroyListeners() {
    document.removeEventListener('pointerover', this.handlePointerOver);
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerout', this.handlePointerOut);
  }

  handlePointerOver = e => {
    const target = e.target.closest('[data-tooltip]');

    if (!target) return;

    const toolText = target.dataset.tooltip;
    this.render(toolText);
  }

  handlePointerMove = e => {
    this.element.style.left = `${e.clientX + 8}px`;
    this.element.style.top = `${e.clientY + 8}px`;
  }

  handlePointerOut = () => {
    this.remove();
  }

  render(text = '') {
    this.element.textContent = text;
    document.body.append(this.element);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.destroyListeners();
  }
}

export default Tooltip;