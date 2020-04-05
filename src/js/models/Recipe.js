import axios from "axios";
import { apiURL } from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`${apiURL}get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.imgURL = res.data.recipe.image_url;
      this.srcURL = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  calcTime() {
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);

    // Estimation of time for 1 ingredient = 15 min
    this.time = periods * 15;
  }

  calcServings() {
    const numIngredients = this.ingredients.length;
    const weightOfIngredients = numIngredients * 5; // 1=100 grams

    // Estimation of time for 1 ingredient = 15 min
    this.servings = Math.ceil(weightOfIngredients / 10);
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounce",
      "ounces",
      "teaspoon",
      "teaspoons",
      "cups",
      "pounds"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];

    const newIngredients = this.ingredients.map(ing => {
      // 1. Uniform Units
      let ingredient = ing.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2. Remove unwanted paranthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, "");

      // 3. Parse ingredients into count, unit and ingredient
    });
    this.ingredients = newIngredients;
  }
}
