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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const jwtsecret = process.env.JWT_SECRET;
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // using - req.headers.authorization;
            const authorization = req.headers.authorization;
            if (!authorization) {
                return res.status(401).json({ error: "Kindly sign in as a user" });
            }
            const token = authorization.slice(7, authorization.length);
            let verified = jsonwebtoken_1.default.verify(token, jwtsecret);
            if (!verified) {
                return res
                    .status(401)
                    .json({ error: "Token invalid, you can't access this route" });
            }
            const { id } = verified;
            //find user by id - mongoosse, change this...
            const user = yield user_1.User.findOne({ where: { id } });
            if (!user) {
                return res.status(401).json({ error: "User not found, kindly Register" });
            }
            req.user = verified;
            next();
        }
        catch (err) {
            res.status(401).json({ error: "User not logged In" });
        }
    });
}
exports.auth = auth;
