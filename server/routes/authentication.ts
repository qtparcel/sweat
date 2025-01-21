
import Express from "express";

import { getAllUsers, loginUser, logout, registerUser } from "../controllers/auth";
import { validateCookie } from "../middlewares/validateCookie"

const authRouter = Express.Router();

authRouter.get('/', (req, res) => {
    res.status(200).send({message: "hello world"});
})
authRouter.post("/signup", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logout);

authRouter.get("/getAllUsers", validateCookie , getAllUsers);

export default authRouter;