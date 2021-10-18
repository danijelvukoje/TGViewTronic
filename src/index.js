import { mainTemplate, galleryTemplate } from './app/templating';

import './styles/main.scss'

/**
 * In react, we use const [state, setState] = useState('default value');
 * 
 */


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

const mockImages = [{url: '#', description: 'nice1', artist: 'caj'}, {url: '#', description: 'nice2', artist: 'danijel'}, {url: '#', description: 'nice3', artist: 'poul'}]

let galleryState = {};

const galleryUpdate = (newGalleryState) => {
  galleryState = { ...galleryState, ...newGalleryState };
  window.dispatchEvent(new Event('galleryUpdate'));
}


window.addEventListener('galleryUpdate', () => {
  const imageWrapperNode = document.querySelector('.image-wrapper')
  render(galleryTemplate(galleryState.html), imageWrapperNode)
})


galleryUpdate({html: mockImages});

// window.dispatchEvent(new Event('initialLoad')); 

// window.addEventListener('initialLoad', () => { 
//   render(mainTemplate(initialState), document.querySelector('#root')); 
// });


/** Might work ?  */
// function stateCreator(initVal, eventName, element) {
//   let val = initVal;
//   window.addEventListener(eventName, () => {
//     render(galleryTemplate(val), element)
//   })
//   function updater(newState, eventName) {
//       val = newState;
//       window.dispatchEvent(new Event(eventName));
//       return val;
//     }

//   return[val , updater]
// }