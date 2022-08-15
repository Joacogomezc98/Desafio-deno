import { Router } from "../../deps.ts";

import { create, deleteProduct, findAllProducts, getById, UpdateProduct } from "../handlers/products.handlers.ts";

export const router = new Router()
  .get("/api/products", findAllProducts)
  .get("/api/products/:id", getById)
  .post("/api/products", create)
  .put("/api/products/:id", UpdateProduct)
  .delete("/api/products/:id", deleteProduct);