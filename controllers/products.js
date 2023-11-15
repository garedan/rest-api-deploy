import { ProductModel } from "../models/product.js";
import { validateMovie, validatePartialMovie } from "../schemas/products.js";

export class ProductController {
  static async getAll(req, res) {
    const { title } = req.query;
    const products = await ProductModel.getAll({ title });
    res.json(products);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const product = await ProductModel.getById({ id });
    if (product) return res.json(product);
    res.status(404).json({ message: "Product not found" });
  }

  static async create(req, res) {
    const result = validateMovie(req.body);

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create(result.data);

    res.status(201).json(newProduct);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await ProductModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ message: "Product deleted" });
  }

  static async update(req, res) {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedProduct = await ProductModel.update({
      id,
      input: result.data,
    });

    return res.json(updatedProduct);
  }
}
