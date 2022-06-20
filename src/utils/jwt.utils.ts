import jwt from "jsonwebtoken"
import config from 'config'

const privateKey : string = process.env.PRIVATE_KEY
const publicKey : string = process.env.PUBLIC_KEY

export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
}

const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}