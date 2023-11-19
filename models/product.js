import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const products = require("../data.json");
import { randomUUID } from "node:crypto";

export class ProductModel {
  static async getAll({ title }) {
    if (title) {
      return products.filter((product) =>
        product.title.some((t) => t.toLowerCase() === title.toLowerCase())
      );
    }
    return products;
  }

  static async getById({ id }) {
    const product = products.find((product) => product.id === id);
    return product;
  }

  static async getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  static async create(input) {
    // en base de datos
    const newProduct = {
      id: randomUUID(), // uuid v4
      ...input,
    };

    // Esto no sería REST, porque estamos guardando
    // el estado de la aplicación en memoria
    products.push(newProduct);

    return newProduct;
  }

  static async delete({ id }) {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return false;
    }
    products.splice(productIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) return false;
    products[productIndex] = {
      ...products[productIndex],
      ...input,
    };

    return products[productIndex];
  }
}
