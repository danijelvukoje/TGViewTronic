import { mainTemplate, paginationTemplate } from './app/templating.js';
import { executeSearch, readLocalSearches, buildHistoryHTML } from './app/search.js';
import executePagination from './app/pagination.js';
import './styles/main.scss';

const initialState = {
  title: 'TGViewTronic',
  githubLink: 'https://github.com/danijelvukoje/TGViewTronic',
};

function render(htmlString, elem) {
  const element = elem;
  element.innerHTML = htmlString;
}

(function initalLoad() {
  render(mainTemplate(initialState), document.querySelector('#root'));
  const searchField = document.querySelector('.search__field');
  const searchSuggestions = document.querySelector('#search-suggestions');
  searchField.addEventListener('focus', () => {
    const localSearches = readLocalSearches();
    searchSuggestions.innerHTML = buildHistoryHTML(localSearches);
  });
}());

let galleryState = { currentPage: 0, maxPage: 0 };
// Define a function that returns galleryState, passes in as a callbacck in executePagaination,
const galleryUpdate = newGalleryState => {
  galleryState = { ...galleryState, ...newGalleryState };
  window.dispatchEvent(new Event('galleryUpdate'));
};

window.addEventListener('galleryUpdate', () => {
  const imageWrapperNode = document.querySelector('.image-wrapper');
  render(galleryState.html, imageWrapperNode);
  paginationTemplate(galleryState);
});

executeSearch(galleryUpdate);
executePagination(galleryUpdate, () => galleryState);
