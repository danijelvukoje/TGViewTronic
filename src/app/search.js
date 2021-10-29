import imageAPI from './api.js';
import { galleryTemplate } from './templating.js';

const readLocalSearches = () => JSON.parse(window.localStorage.getItem('searchHistory'));
const writeLocalSearches = (arr) => window.localStorage.setItem('searchHistory', JSON.stringify(arr));

const updateHistory = (string, readLocalSearches, writeLocalSearches) => {
  const localSearches = readLocalSearches() || [];
  const stringIndex = localSearches.indexOf(string);
  if (stringIndex === -1) { 
    localSearches.unshift(string);
    if(localSearches.length > 5){
      localSearches.pop();
    }
    return writeLocalSearches(localSearches);
  } 

  localSearches.splice(stringIndex, 1);
  localSearches.unshift(string);
  writeLocalSearches(localSearches);
};

const buildHistoryHTML = (array) => {
  let htmlStr = '';
  array.forEach((elem, i) => {
    htmlStr += `<option class="search-suggestions__term" id="search-term${i}" value="${elem}">`;
  })
  return htmlStr;
}


const executeSearch = galleryUpdate => {
  const searchButton = document.querySelector('.search__button');
  const searchInput = document.querySelector('.search__field');

  searchButton.addEventListener('click', async () => {
    const searchText = searchInput.value;
    if (searchText !== '') {
      const resObj = await imageAPI(searchText, 1);
      const newGalleryState = {
        searchText,
        currentPage: 1,
        maxPage: resObj.total_pages,
        images: [],
      };
      resObj.results.forEach(elem => {
        newGalleryState.images.push({
          artist: elem.user.name,
          description: elem.description,
          url: elem.urls.small,
        });
      });
      updateHistory(searchText, readLocalSearches, writeLocalSearches);
      newGalleryState.html = galleryTemplate(newGalleryState.images);
      // newGalleryState.paginationHtml = paginationTemplate(newGalleryState);
      galleryUpdate(newGalleryState);
    }
  });
};

export {
  executeSearch,
  updateHistory,
  buildHistoryHTML,
  readLocalSearches
};
