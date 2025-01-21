"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../routes/authentication"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
const port = 3000;
app.listen(port, () => {
    console.log("Server is running on port: 3000");
});
app.use("/auth", authentication_1.default);
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    console.log("Connected to mongodb successfully");
})
    .catch((err) => {
    console.log(err);
});
