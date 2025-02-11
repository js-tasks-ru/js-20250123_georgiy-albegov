import SortableTable from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTableV2 extends SortableTable {
  constructor(headersConfig, {
    data = [],
    sorted = {
      id: headersConfig.find(item => item.sortable).id, 
      order: 'asc' 
    }
  } = {}) {
    super(headersConfig, data); 
    this.sorted = sorted;
    this.sort(this.sorted.id, this.sorted.order);
    this.createArrowElement();
    this.createListeners();
    this.setDefaultArrow();
  }

  setDefaultArrow() {
    const defaultHeader = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);
    if (defaultHeader) {
      defaultHeader.dataset.order = this.sorted.order;
      defaultHeader.append(this.arrowElement);
    }
  }

  createArrowElement() {
    const arrowElement = document.createElement('div');
    arrowElement.innerHTML = `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
    this.arrowElement = arrowElement.firstElementChild;
  }

  handleHeaderCellClick = (event) => {
    const cellElement = event.target.closest('.sortable-table__cell');

    if (!cellElement) {
      return;
    }
    
    const sortField = cellElement.dataset.id;
    const sortOrder = cellElement.dataset.order === 'asc' ? 'desc' : 'asc';
    cellElement.dataset.order = sortOrder;

    this.sort(sortField, sortOrder);

    cellElement.append(this.arrowElement);
  };
  

  createListeners() {
    const header = this.subElements.header;
    header.addEventListener('click', this.handleHeaderCellClick);
  }

  destroyListeners() {
    const header = this.subElements.header;
    header.removeEventListener('click', this.handleHeaderCellClick);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}