import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => (elements.searchInput.value = "");

export const clearResults = () => {
  elements.searchResultsList.innerHTML = "";
  elements.paginationButtons.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // Return the result (newTitle)
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;
  elements.searchResultsList.insertAdjacentHTML("beforeend", markup);
};

const createPaginationButtons = (page, type) => {
  return `
    <button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
    <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${
          type === "prev" ? "left" : "right"
        }"></use>
    </svg>
    </button>
  `;
};

const renderPaginationButtons = (page, numResults, resultsPerPage) => {
  const pages = Math.ceil(numResults / resultsPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // Only Button to go to next page
    button = createPaginationButtons(page, "next");
  } else if (page < pages) {
    // Both buttons to prev and next page
    button = `${createPaginationButtons(page, "prev")}
    ${createPaginationButtons(page, "next")}
    `;
  } else if (page === pages) {
    // Only Button to go to prev page
    button = createPaginationButtons(page, "prev");
  }

  elements.paginationButtons.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
  // Render results of current page
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // Render pagination buttons
  renderPaginationButtons(page, recipes.length, resultsPerPage);
};
