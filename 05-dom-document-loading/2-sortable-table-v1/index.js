export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
    this.subElements = this.getSubElements(); 
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createBaseTemplate();
    return element.firstElementChild;
  }

  createItemsTemplate() {
    return this.data.map(item => {
        return `
          <a href="/products/${item.id}" class="sortable-table__row">
            ${this.headerConfig.map(({ id, template }) => {
              if (template) {
                return template(item[id]);
              }
              return `<div class="sortable-table__cell">${item[id]}</div>`;
            }).join('')}
          </a>
        `;
      }).join('');
  }

  createHeaderConfigTemplate() {
    return this.headerConfig.map(({ id, title, sortable }) => {
      return `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
          <span>${title}</span>
        </div>
      `;
    }).join('');
  }

  createBaseTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createHeaderConfigTemplate()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.createItemsTemplate()}
          </div>
        </div>
      </div>
    `;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  sort(field, order) {
    const column = this.headerConfig.find(item => item.id === field);

    const sortType = column.sortType;
    const direction = order === 'asc' ? 1 : -1;

    this.data = [...this.data].sort((a, b) => {
      if (sortType === 'number') {
        return direction * (a[field] - b[field]);
      } 
      return direction * a[field].localeCompare(b[field]);
    });
    
    this.subElements.body.innerHTML = this.createItemsTemplate(this.data);
  }

  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}