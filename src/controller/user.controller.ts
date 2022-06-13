import { Request, Response } from 'express'
import { createUser } from '../service/user.service'
import logger from '../utils/logger'

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    return user
  } catch (error:any ) {
    logger.error(error)
    res.status(409).send(error.message)
  }

}