export const elements = {
  searchInput: document.querySelector(".search__field"),
  searchForm: document.querySelector(".search"),
  searchResults: document.querySelector(".results"),
  searchResultsList: document.querySelector(".results__list"),
  paginationButtons: document.querySelector(".results__pages")
};

const elementStrings = {
  loaderClass: "loader"
};

export const renderLoader = parent => {
  const loaderHTML = `
    <div class="loader">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", loaderHTML);
};

export const clearLoader = () => {
  const loaderEl = document.querySelector(`.${elementStrings.loaderClass}`);
  if (loaderEl) {
    loaderEl.parentNode.removeChild(loaderEl);
  }
};
