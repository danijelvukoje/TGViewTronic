import { mainTemplate, galleryTemplate, paginationTemplate } from './templating.js';
import { JSDOM } from 'jsdom';

const { document } = (new JSDOM(`<div class="test"></div>`)).window;
const testNode = document.querySelector('.test');
console.log(testNode);

describe('testing templates', () => {

  beforeEach(() => {
    testNode.innerHTML = '';
  });
  const dummyInitState = {title: 'Mock Title', githubLink: 'google.com'}
  const mainTemplateHTML = mainTemplate(dummyInitState);
  
  test('main template should render state', () => {
    testNode.innerHTML = mainTemplateHTML;
    console.log(testNode.innerHTML);
    const title = document.querySelector('.header__text');
    console.log(title);
    expect(title.textContent).toBe('Mock Title');
  });
});
