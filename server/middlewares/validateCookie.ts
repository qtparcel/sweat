import Express from "express";
import User from "../schemas/user";

export const  validateCookie = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  // check if cookie is present
  const cookie = req.cookies;

  if (!cookie.AUTH_COOKIE) {
    return res.status(401).send({ message: "User is not authorized." });
  }

  const userExistsWithAccessToken = await User.findOne(
    {"authentication.access_token": cookie.AUTH_COOKIE}
  )

  if (!userExistsWithAccessToken) {
    return res.status(401).send({ message: "User is not authorized." });
  }
  next();
};
