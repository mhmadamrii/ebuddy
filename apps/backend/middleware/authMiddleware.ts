import {Request, Response, NextFunction} from "express";

/**
 * Middleware to validate the request token.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({message: "Authorization token missing."});
    return;
  }

  // Dummy token validation logic
  if (token === "Bearer dummy-token") {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({message: "Invalid token."});
  }
};
