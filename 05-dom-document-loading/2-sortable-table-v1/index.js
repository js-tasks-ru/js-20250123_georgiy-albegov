export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTableTemplate());
    this.selectSubElements();
    this.createArrowElement();
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTableTemplate() {
    return `
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.createHeaderTemplate(this.headerConfig)}
        </div>
        <div data-element="body" class="sortable-table__body">
          ${this.createBodyTemplate(this.data)}
        </div>
        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>
      </div>
    `;
  }

  createHeaderTemplate(headerConfig) {
    return `
      ${headerConfig.map(({id, title, sortable}) => this.createHeaderCellTemplate(id, title, sortable)).join('')}
    `;
  }

  createHeaderCellTemplate(id, title, sortable) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
      </div>
    `;
  }

  createArrowElement() {
    const headerCellArrowTemplate = `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;

    const element = document.createElement('div');
    element.innerHTML = headerCellArrowTemplate;
    this.arrowElement = element.firstElementChild;
  }

  createBodyTemplate(data) {
    return `
      ${data.map((item) => this.createBodyRowTemplate(item)).join('')}
    `;
  }

  createBodyRowTemplate(item) {
    return `
      <a href="#" class="sortable-table__row">
        ${this.createBodyCellTemplate(item)}
      </a>
    `;
  }

  createBodyCellTemplate(dataItem) {
    return this.headerConfig.map(({id, template}) => {
      return template ? `${template(dataItem[id])}` : `<div class="sortable-table__cell">${dataItem[id]}</div>`;
    }).join('');
  }

  sort(field, direction) {
    const {sortable, sortType} = this.headerConfig.find(config => config.id === field);

    if (!sortable) return;
    
    const d = direction === 'asc' ? 1 : -1;

    if (sortType === 'string') {
      this.data.sort((a, b) => d * a[field].localeCompare(b[field], ["ru", "eng"], { caseFirst: 'upper' }));
      this.setDataOrder(field, direction);
    } else if (sortType === 'number') {
      this.data.sort((a, b) => d * a[field] - d * b[field]);
      this.setDataOrder(field, direction);
    }

    this.update(this.data);
  }

  setDataOrder(field, direction) {
    const prevElements = this.element.querySelectorAll(`.sortable-table__cell[data-order][data-sortable="true"]`);
    const currentElement = this.element.querySelector(`.sortable-table__cell[data-id=${field}][data-sortable="true"]`);

    prevElements.forEach(element => element.dataset.order = '');

    if (!currentElement) return;

    currentElement.append(this.arrowElement);
    currentElement.dataset.order = direction;
  }

  update(newData) {
    this.data = newData;
    this.element.querySelector('[data-element="body"]').innerHTML = this.createBodyTemplate(this.data);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}