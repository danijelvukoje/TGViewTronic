import { imageAPI } from './api.js'
import { galleryTemplate, paginationTemplate } from './templating';

const executePagination = (galleryUpdate, galleryState) => {
  if (galleryState.currentPage > 1) {
    const prevButton = document.querySelector('#previous-button');

    prevButton.addEventListener('click', () => {
      
    })
  }
  if(galleryState.currentPage < galleryState.maxPage) {
    const nextButton = document.querySelector('#next-button');

  }
}