import { mainTemplate, paginationTemplate } from './app/templating';
import { executeSearch } from './app/search';
import { executePagination } from './app/pagination';
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

let galleryState = { currentPage: 0, maxPage: 0 };
//Define a function that returns gallerState, passes in as aa callbacck in executePagaination, 
const galleryUpdate = (newGalleryState) => {
  console.log(newGalleryState);
  console.log(galleryState);
  galleryState = { ...galleryState, ...newGalleryState };
  console.log(galleryState);
  window.dispatchEvent(new Event('galleryUpdate'));
}

window.addEventListener('galleryUpdate', () => {
  const imageWrapperNode = document.querySelector('.image-wrapper');
  render(galleryState.html, imageWrapperNode);
  paginationTemplate(galleryState);
});

executeSearch(galleryUpdate);
executePagination(galleryUpdate, () => galleryState);






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