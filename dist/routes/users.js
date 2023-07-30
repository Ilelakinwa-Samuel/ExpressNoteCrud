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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../model/user");
const uuid_1 = require("uuid");
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource from users");
});
router.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newId = (0, uuid_1.v4)();
        const { username, email, password } = req.body;
        const newUser = yield user_1.User.create({
            id: newId,
            username,
            email,
            password,
        });
        console.log(newUser);
        res.status(201).json({
            data: {
                newUser,
            },
        });
    });
});
exports.default = router;
