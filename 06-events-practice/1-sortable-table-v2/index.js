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
    this.isSortLocally = true;
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
    const sortOrder = cellElement.dataset.order === 'desc' ? 'asc' : 'desc';
    cellElement.dataset.order = sortOrder;

    cellElement.append(this.arrowElement);

    this.sort(sortField, sortOrder);
  };

  sort(field, order) {
    if (this.isSortLocally) {
      this.sortOnClient(field, order);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(field, order) {
    super.sort(field, order);
  }

  sortOnServer() {
    // TODO
  }
  

  createListeners() {
    const header = this.subElements.header;
    header.addEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroyListeners() {
    const header = this.subElements.header;
    header.removeEventListener('pointerdown', this.handleHeaderCellClick);
  }

  destroy() {
    super.destroy();
    this.destroyListeners();
  }
}