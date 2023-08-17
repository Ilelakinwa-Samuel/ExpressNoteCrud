"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.post("/", controller_1.signup);
router.post("/login", controller_1.Login);
router.get("/read", controller_1.get_users);
router.put("/update/:id", controller_1.update_User);
router.delete("/delete/:id", controller_1.delete_User);
router.get("/users/:id", controller_1.get_User);
router.get("/logout", controller_1.Logout);
exports.default = router;
