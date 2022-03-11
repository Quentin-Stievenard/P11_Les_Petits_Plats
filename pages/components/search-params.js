/**
 * An imput used for the search
 */
export class SearchParams extends HTMLElement {
  constructor() {
    super();
    this.lastSearch = [];
  }

  /**
   * Insert a input template used by the search
   */
  connectedCallback() {
    const template = document.createElement("template");
    template.innerHTML = `
            <div class="searchParams">

            </div>
      `;
    this.appendChild(template.content);
    this.render();
  }

  render() {
    this.lastSearch = getLastSearch();
    const foundRecipes = this.lastSearch[3] || [];
    let ingredients = [];
    for (const recipe of foundRecipes) {
      console.log(recipe);
      for (const ingredient of recipe.ingredients) {
        ingredients.push(ingredient);
      }
    }

    let appliances = [];
    for (const recipe of foundRecipes) {
      console.log(recipe);
      for (const appliance of recipe.appliance) {
        appliances.push(appliance);
      }
    }

    const ingredientSelect = new IngredientsSelect();
    ingredientSelect.renderWithFoundIngredients(ingredients);
    // console.log(ingredients);
    this.querySelector("div").innerHTML = "";
    if (this.lastSearch[2]) {
      let ingredients = this.lastSearch[2];
      ingredients.forEach((ingredient) => {
        this.querySelector("div").insertAdjacentHTML(
          "beforeEnd",
          `
                <span class="ingredient">` +
            ingredient +
            `</span>
                `
        );
      });
    }

    const applianceSelect = new ApplianceSelect();
    applianceSelect.renderWithFoundAppliance(appliances);
    if (this.lastSearch[0]) {
      let appliances = this.lastSearch[2];
      appliances.forEach((appliance) => {
        this.querySelector("div").insertAdjacentHTML(
          "beforeEnd",
          `
                  <span class="ingredient">` +
            appliance +
            `</span>
                  `
        );
      });
    }
    if (this.lastSearch[1]) {
      this.querySelector("div").insertAdjacentHTML(
        "beforeEnd",
        `
            <span class="ustensil">` +
          this.lastSearch[1] +
          `</span>
            `
      );
    }
    this.listeners();
  }

  listeners() {
    window.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("ul.ingredients li").forEach((ingredient) => {
        ingredient.addEventListener("click", () => {
          this.render();
        });
      });
      document
        .querySelector("input.ingredient")
        .addEventListener("change", () => {
          document
            .querySelectorAll("ul.ingredients li")
            .forEach((ingredient) => {
              ingredient.addEventListener("click", (event) => {
                this.render();
              });
            });
        });
      document.querySelectorAll("ul.appliances li").forEach((appliance) => {
        appliance.addEventListener("click", () => {
          this.render();
        });
      });
      document
        .querySelector("input.appliance")
        .addEventListener("change", () => {
          document.querySelectorAll("ul.appliances li").forEach((appliance) => {
            appliance.addEventListener("click", (event) => {
              this.render();
            });
          });
        });
      document.querySelectorAll("ul.ustensils li").forEach((ustensil) => {
        ustensil.addEventListener("click", () => {
          this.render();
        });
      });
      document
        .querySelector("input.ustensil")
        .addEventListener("change", () => {
          document.querySelectorAll("ul.ustensils li").forEach((ustensil) => {
            ustensil.addEventListener("click", (event) => {
              this.render();
            });
          });
        });
    });
  }
}

// Import the search function
import { getLastSearch } from "../../search.js";
import { IngredientsSelect } from "./ingredients-select.js";
import { ApplianceSelect } from "./appliance-select.js";
