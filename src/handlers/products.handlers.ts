import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Products } from "../types/products.type.ts";

const DB_PRODUCTS: Products[] = [];

export const findAllProducts = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        ctx.response.body = await { code: '00', data: DB_PRODUCTS };
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = { code: '99', msg: error };
    }
}

export const getById = async (ctx: Context) => {
    try {
        const { id } = helpers.getQuery(ctx, { mergeParams: true });
        const product = await DB_PRODUCTS.find((u) => u.id == id);

        if (product) {
            ctx.response.body = await { code: "00", data: product };
        } else {
            ctx.response.body = await {
                code: "01",
                msg: `Producto con id ${id} no encontrado.`,
            };
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = { code: "99", msg: error };
    }
};

export const create = async (ctx: Context) => {
    try {
        ctx.response.status = 201;
        logger.debug(`status: ${ctx.response.status} method: create handler`);

        const { title, price, stock, thumbnail } = await ctx.request.body().value;

        const newId = Number(DB_PRODUCTS[DB_PRODUCTS.length - 1].id) + 1;
        const product: Products = {
            id: newId.toString(),
            title: title,
            price: price,
            stock: stock,
            thumbnail: thumbnail,
            timestamp: new Date(),
        };
        DB_PRODUCTS.push(product);

        ctx.response.body = await { code: "00", data: product };
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = { code: "99", msg: error };
    }
};

export const UpdateProduct = async (ctx: Context) => {
    try {
      ctx.response.status = 202;
      logger.debug(`status: ${ctx.response.status} method: updateProduct handler`);
  
      const { id } = helpers.getQuery(ctx, { mergeParams: true });
      const productIndex = await DB_PRODUCTS.findIndex((u) => u.id == id);
  
      if (productIndex) {
        const { title, price, stock, thumbnail } = await ctx.request.body().value;
        DB_PRODUCTS.splice(productIndex, 1, {
          id,
          title,
          price: parseInt(price),
          stock: parseInt(stock),
          thumbnail,
          timestamp: new Date(),
        });
  
        ctx.response.body = {
          code: "00",
          data: { id, title, price, stock, thumbnail },
        };
      } else {
        ctx.response.body = {
          code: "01",
          msg: `Usuario con id ${id} no encontrado.`,
        };
      }
    } catch (error) {
      ctx.response.status = 500;
  
      logger.error(`status: ${ctx.response.status} ${error}`);
      ctx.response.body = { msg: error };
    }
  };

  export const deleteProduct = async (ctx: Context) => {
    try {
      ctx.response.status = 200;
      logger.debug(`status: ${ctx.response.status} method: deleteProduct handler`);
  
      const { id } = helpers.getQuery(ctx, { mergeParams: true });
      const productIndex = await DB_PRODUCTS.findIndex((u) => u.id == id);
  
      if (productIndex) {
        DB_PRODUCTS.splice(productIndex, 1);
  
        ctx.response.body = {
          code: "00",
          msg: `Producto con id ${id} eliminado`,
        };
      } else {
        ctx.response.body = {
          code: "01",
          msg: `Producto con id ${id} no encontrado.`,
        };
      }
    } catch (error) {
      ctx.response.status = 500;
  
      logger.error(`status: ${ctx.response.status} ${error}`);
      ctx.response.body = { msg: error };
    }
  };