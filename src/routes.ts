import { Express, Request, Response } from "express"
import { createUserSessionHandler } from "./controller/session.controller"
import { createUserHandler } from "./controller/user.controller"
import validate from "./middleware/validateResource"
import { createSessionSchema } from "./schema/session.schema"
import { createUserSchema } from "./schema/user.schema"
import { getUserSessionsHandler } from "./controller/session.controller"
import requireUser from "./middleware/requireUser"

const routes = (app: Express) => {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200)
  })

  app.post('/api/users', validate(createUserSchema), createUserHandler)

  app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler)

  app.get('/api/sessions', requireUser, getUserSessionsHandler)
}

export default routes