"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCookie = void 0;
const user_1 = __importDefault(require("../schemas/user"));
const validateCookie = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // check if cookie is present
    const cookie = req.cookies;
    if (!cookie.AUTH_COOKIE) {
        return res.status(401).send({ message: "User is not authorized." });
    }
    const userExistsWithAccessToken = yield user_1.default.findOne({ "authentication.access_token": cookie.AUTH_COOKIE });
    if (!userExistsWithAccessToken) {
        return res.status(401).send({ message: "User is not authorized." });
    }
    next();
});
exports.validateCookie = validateCookie;
