import { mainTemplate } from './app/templating';
import { executeSearch } from './app/search';
import './styles/main.scss'

let initialState = { 
  title: 'TGViewTronic', 
  githubLink: 'https://github.com/danijelvukoje/TGViewTronic'
}

function render(htmlString, elem) { 
  elem.innerHTML = htmlString; 
}

(function initalLoad() { 
  render(mainTemplate(initialState), document.querySelector('#root')); 
})();

let galleryState = {};

const galleryUpdate = (newGalleryState) => {
  galleryState = { ...galleryState, ...newGalleryState };
  window.dispatchEvent(new Event('galleryUpdate'));
}

window.addEventListener('galleryUpdate', () => {
  const imageWrapperNode = document.querySelector('.image-wrapper');
  const paginationNode = document.querySelector('.pagination');
  render(galleryState.html, imageWrapperNode);
  render(galleryState.paginationHtml, paginationNode);
});

executeSearch(galleryUpdate);






/** Might work ? It probably does! */
// function stateCreator(initVal, eventName, element, template) {
//   let val = initVal;
//   window.addEventListener(eventName, () => {
//     render(template(val), element)
//   })
//   function updater(newState) {
//       val = newState;
//       window.dispatchEvent(new Event(eventName));
//       return val;
//     }

//   return[val , updater]
// }