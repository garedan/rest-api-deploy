import { Router } from "express";
import { randomUUID } from "node:crypto";
import { validateMovie, validatePartialMovie } from "../schemas/products.js";
import { createRequire } from "node:module";
import { ProductModel } from "../models/product.js";
const require = createRequire(import.meta.url);
const movies = require("../data.json");
import { ProductController } from "../controllers/products.js";

export const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);
productsRouter.post("/", ProductController.create);

productsRouter.get("/:id", ProductController.getById);
productsRouter.delete("/:id", ProductController.delete);
productsRouter.patch("/:id", ProductController.update);
