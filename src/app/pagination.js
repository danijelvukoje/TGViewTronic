import imageAPI from './api.js';
import { galleryTemplate } from './templating.js';

const executePagination = (galleryUpdate, getGallery) => {
  const prevButton = document.querySelector('#previous-button');
  prevButton.addEventListener('click', async () => {
    const galleryState = getGallery();
    let prevPage = galleryState.currentPage;
    prevPage -= 1;

    const resObj = await imageAPI(galleryState.searchText, prevPage);
    const newGalleryState = {
      currentPage: prevPage,
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
    galleryUpdate(newGalleryState);
  });

  const nextButton = document.querySelector('#next-button');
  nextButton.addEventListener('click', async () => {
    const galleryState = getGallery();
    let nextPage = galleryState.currentPage;
    nextPage += 1;
    const resObj = await imageAPI(galleryState.searchText, nextPage);
    const newGalleryState = {
      currentPage: nextPage,
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
    galleryUpdate(newGalleryState);
  });
};

export default executePagination;
