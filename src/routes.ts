import { Express, Request, Response } from "express"
import { createUserSessionHandler, deleteSessionHandler } from "./controller/session.controller"
import { createUserHandler } from "./controller/user.controller"
import validate from "./middleware/validateResource"
import { createSessionSchema } from "./schema/session.schema"
import { createUserSchema } from "./schema/user.schema"
import { getUserSessionsHandler } from "./controller/session.controller"
import requireUser from "./middleware/requireUser"
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema"
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller"
import validateResource from "./middleware/validateResource"

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  app.post('/api/users', validate(createUserSchema), createUserHandler)

  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler)

  app.get('/api/sessions', requireUser, getUserSessionsHandler)

  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}

export default routes