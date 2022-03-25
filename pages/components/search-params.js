export class SearchParams extends HTMLElement {
  constructor() {
    super();
    this.lastSearch = [];
    this.ingredientSelect = new IngredientsSelect();
  }

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
    if (this.lastSearch[0]) {
      let appliances = this.lastSearch[0];
      this.querySelector("div").insertAdjacentHTML(
        "beforeEnd",
        `
        <span class="appliance">` +
          appliances +
          `</span>
        `
      );
    }
    if (this.lastSearch[1]) {
      let ustensils = this.lastSearch[1];
      this.querySelector("div").insertAdjacentHTML(
        "beforeEnd",
        `
        <span class="ustensil">` +
          ustensils +
          `</span>
        `
      );
    }
    this.listeners();
    const foundRecipes = this.lastSearch[3] || [];

    let ingredients = [];
    let ustensils = [];
    let appliances = Array.from(
      new Set(foundRecipes.map((recipe) => recipe.appliance))
    );

    for (const recipe of foundRecipes) {
      for (const ingredient of recipe.ingredients) {
        ingredients.push(ingredient);
      }
      for (const ustensil of recipe.ustensils) {
        ustensils.push(ustensil);
      }
    }

    if (this.lastSearch[2]) {
      const ingredientsList = document.getElementById("ingredients-select");
      ingredientsList.innerHTML = ``;
      ingredients.forEach((ingredient) => {
        ingredientsList.innerHTML += `
                  <li class="leading-normal w-full md:w-48 py-2 px-4 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer hover:bg-blue-700">${ingredient.ingredient}</li>
                `;
      });

      const applianceSelect = document.getElementById("appliance-select");
      applianceSelect.innerHTML = "";
      appliances.forEach((appliance) => {
        applianceSelect.innerHTML += `
                  <li class="leading-normal w-full md:w-48 py-2 px-4 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer hover:bg-blue-700">${appliance}</li>
              `;
      });

      const ustensilList = document.getElementById("ustensil-select");
      ustensilList.innerHTML = "";
      ustensils.forEach((ustensil) => {
        ustensilList.innerHTML += `
                    <li class="leading-normal w-full md:w-48 py-2 px-4 overflow-ellipsis whitespace-nowrap overflow-hidden cursor-pointer hover:bg-blue-700">${ustensil}</li>
              `;
      });
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
