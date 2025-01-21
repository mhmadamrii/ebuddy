import { Request, Response, NextFunction } from 'express'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ message: 'Authorization token missing.' })
    return
  }

  if (token === 'Bearer dummy-token') {
    next()
  } else {
    res.status(403).json({ message: 'Invalid token.' })
  }
}
