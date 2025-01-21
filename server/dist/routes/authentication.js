"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validateCookie_1 = require("../middlewares/validateCookie");
const authRouter = express_1.default.Router();
authRouter.post("/signup", auth_1.registerUser);
authRouter.post("/login", auth_1.loginUser);
authRouter.post("/logout", auth_1.logout);
authRouter.get("/getAllUsers", validateCookie_1.validateCookie, auth_1.getAllUsers);
exports.default = authRouter;
