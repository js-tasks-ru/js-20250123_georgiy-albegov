import ColumnChart from '../../04-oop-basic-intro-to-dom/1-column-chart/index.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChartV2 extends ColumnChart {
  url;

  constructor({
    url = '',
    range = {},
    label = '',
    link = '',
    formatHeading = value => value
  } = {}) {
    super({ label, link, formatHeading });
    this.url = url;
    this.data = []; 
    const { from, to } = range;
    this.fetchData(from, to);
    this.subElements = this.getSubElements();
  }

  createUrl(from, to) {
    const url = new URL(this.url, BACKEND_URL);
    url.searchParams.append('from', from);
    url.searchParams.append('to', to);
    return url.toString();
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

  async fetchData(from, to) {
    try {
      const response = await fetch(this.createUrl(from, to));
      const data = await response.json();
      this.data = Object.values(data);
      super.update(this.data);
      return data; 
    } catch (err) {
      console.error(err);
      return null; 
    }
  }

  async update(from, to) {
    const data = await this.fetchData(from, to);
    return data; 
  }


}