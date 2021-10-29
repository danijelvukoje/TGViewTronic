const mainTemplate = initialState => `
  <header class="header">
    <h1 class="header__text">${initialState.title}</h1>
  </header>
  <div class="page-wrapper">
    <section class="search-wrapper">
      <div class="search">
        <input type="text" list="search-suggestions" class="search__field">
        <button class="search__button">Search</button>
      </div>
      <datalist class="search-suggestions" id="search-suggestions"></datalist>
    </section>
    <main class="image-wrapper">
    </main>
    <section class="pagination">
      <div class="button-prev-container">
        <button class="pagination__button--hidden" id="previous-button">Prev</button>
      </div>
      <div class="button-next-container">
        <button class="pagination__button--hidden" id="next-button">Next</button>
      </div>
    </section>
    <footer class="footer">
      <p class="footer__text">Built by TGV 2021</p>
      <a href="${initialState.githubLink}">
        <img class="footer__github" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="The github octocat logo in silhouette">
      </a>
    </footer>
  </div>
  `;

const imageTemplate = imageState => `
    <figure class="flip-card">
      <div class="flip-card__inner">
        <div class="flip-card__front">
          <img src="${imageState.url}" alt="${imageState.description}" class="flip-card__img">
        </div>
        <div class="flip-card__back">
          <h3 class="flip-card__artist">${imageState.artist}</h3>
          <p class="flip-card__description">${imageState.description}</p>
        </div>
      </div>
    </figure>
  `;

const galleryTemplate = imageArray => {
  let galleryHTML = '';
  imageArray.forEach(img => {
    galleryHTML += imageTemplate(img);
  });
  return galleryHTML;
};

const paginationTemplate = galleryState => {
  const prevButton = document.querySelector('#previous-button');
  const nextButton = document.querySelector('#next-button');

  if (galleryState.currentPage > 1) {
    prevButton.className = 'pagination__button';
  } else {
    prevButton.className = 'pagination__button--hidden';
  }
  if (galleryState.currentPage < galleryState.maxPage) {
    nextButton.className = 'pagination__button';
  } else {
    nextButton.className = 'pagination__button--hidden';
  }
};

export {
  mainTemplate,
  galleryTemplate,
  paginationTemplate,
};
