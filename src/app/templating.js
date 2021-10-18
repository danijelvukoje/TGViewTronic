const mainTemplate = (initialState) => { 
  return `
  <header class="header">
  <h1>${initialState.title}</h1>
  </header>
  <div class="page-wrapper">
    <section class="search">
      <input type="text" class="search__field">
      <button class="search__button">Search</button>
      <div class="search-suggestions"></div>
    </section>
    <main class="image-wrapper">
    </main>
    <section class="pagination">
    </section>
    <footer class="footer">
      <p class="footer__text">Built by TGV 2021</p>
      <a href="${initialState.githubLink}">
        <img class="footer__github" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="The github octocat logo in silhouette">
      </a>
    </footer>
  </div>
  `;
}

const imageTemplate = (imageState) => {
  return `
    <figure class="flip-card">
      <div class="flip-card__inner">
        <div class="flip-card__front">
          <img src="${imageState.url}" alt="${imageState.description}">
        </div>
        <div class="flip-card__back">
          <h3 class="flip-card__artist">${imageState.artist}</h3>
          <p class="flip-card__description">${imageState.description}</p>
        </div>
      </div>
    </figure>
  `;
}

const galleryTemplate = (imageArray) => {
  let galleryHTML = '';
  imageArray.forEach(img => {
    galleryHTML += imageTemplate(img);
  });
  return galleryHTML;
}

const paginationTemplate = (galleryState) => {
  let paginationHTML = '';
  if (galleryState.currentPage > 1) {
    paginationHTML += '<button class="pagination__button" id="previous-button">Prev</button>';
  }
  if (galleryState.currentPage < galleryState.maxPage) {
    paginationHTML += '<button class="pagination__button" id="next-button">Next</button>';
  }
  return paginationHTML;
}

export {
  mainTemplate,
  galleryTemplate,
  paginationTemplate
}
