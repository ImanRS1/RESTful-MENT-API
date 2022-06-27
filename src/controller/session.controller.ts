import { Request, Response } from 'express'
import { validatePassword } from '../service/user.service'
import { createSession } from '../service/session.service'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'
import { request } from 'http'

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate the users password
  const user = await validatePassword(req.body)

  if(!user) {
    return res.status(401).send("Invalid email or password.");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt(
    {...user, 
      session: session._id},
    {expiresIn: config.get('accessTokenTtl')}
  )

  // create a refresh token
  const refreshToken = signJwt(
    {...user, 
      session: session._id},
    {expiresIn: config.get('refreshTokenTtl')}
  )

  // return access & refresh tokens
  return res.send({accessToken, refreshToken})
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const user = req.
 }