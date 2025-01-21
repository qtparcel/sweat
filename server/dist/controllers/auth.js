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
exports.getAllUsers = exports.logout = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../schemas/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // check valid status of email
    const userExists = yield user_1.default.findOne({ email });
    // if exists raise error
    if (userExists) {
        return res.status(400).send({
            message: "User with this email already exists. Try another email.",
        });
    }
    // encrypt password
    const hashedPassword = bcrypt_1.default.hashSync(password, 12);
    // save user info in mongodb
    const newUser = new user_1.default({
        name,
        email,
        authentication: {
            password: hashedPassword,
        },
    });
    yield newUser.save();
    // return status code 201 with user information in resposne
    res
        .status(201)
        .send({ message: "User account has been created", user: newUser });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password } = req.body;
    // validate user
    const userExists = yield user_1.default.findOne({ email }).select("+authentication.password");
    if (!userExists)
        return res
            .status(400)
            .send({ message: "User with this email does not exists." });
    // validate password
    const validPassword = bcrypt_1.default.compareSync(password, (_a = userExists.authentication) === null || _a === void 0 ? void 0 : _a.password);
    if (!validPassword) {
        return res.status(401).send({ message: "Login Failed." });
    }
    // set unique token signature
    const token = jsonwebtoken_1.default.sign({ id: userExists._id }, process.env.APP_SECRET, { algorithm: "HS256" });
    // set access token in cookie
    res.cookie("AUTH_COOKIE", token, { httpOnly: true });
    // userExists = User.findOne()
    if (userExists.authentication) {
        userExists.authentication.access_token = token;
    }
    yield userExists.save();
    // send status code 200 with the user info along with access token
    res.status(200).send({ message: "Login Success!", accessToken: token });
});
exports.loginUser = loginUser;
const logout = (req, res) => {
    // delete cookie or make cookie empty
    res.cookie("AUTH_COOKIE", "");
    // send status 200 code
    return res.status(200).send({ message: "User logged out successfully!" });
};
exports.logout = logout;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_1.default.find();
    return res.status(200).send({ "Users:": allUsers });
});
exports.getAllUsers = getAllUsers;
