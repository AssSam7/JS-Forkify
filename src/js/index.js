import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

/**  Global State of the App
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. Create a new search object and add it to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);

    try {
      // 4. Search for recipes
      await state.search.getResults();

      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      console.log(state.search.result);
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

const search = new Search("kiwifruit");
search.getResults();

// Event Listeners for Pagination
elements.paginationButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto);

    // Clear results before going to next page
    searchView.clearResults();

    searchView.renderResults(state.search.result, gotoPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  const id = window.location.hash.replace("#", "");
  if (id) {
    // Prepare UI for changes

    // Create a new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get the recipe data
      await state.recipe.getRecipe();

      // Calculate servings and time
      state.recipe.calcServings();
      state.recipe.calcTime();

      // Render the recipe
      console.log(state.recipe);
    } catch (error) {
      console.log("Error processing recipe!");
    }
  }
};

// Same Event Listener for 2 events
["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
