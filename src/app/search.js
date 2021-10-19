import * as imageAPI from './api';
import { galleryTemplate } from './templating';

const executeSearch = galleryUpdate => {
  const searchButton = document.querySelector('.search__button');
  const searchInput = document.querySelector('.search__field');

  searchButton.addEventListener('click', async () => {
    const searchText = searchInput.value;
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
    newGalleryState.html = galleryTemplate(newGalleryState.images);
    // newGalleryState.paginationHtml = paginationTemplate(newGalleryState);
    galleryUpdate(newGalleryState);
  });
};

export default executeSearch;
