"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
// enveloping
const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};
router.get("/", function (req, res, next) {
    res.json({
        msg: "from get request",
    });
});
router.put("/", function (req, res, next) {
    res.json({
        msg: "from put request",
    });
});
router.post("/", function (req, res, next) {
    res.json({
        msg: "from post request",
    });
});
router.delete("/", function (req, res, next) {
    res.json({
        msg: "from delete request",
    });
});
exports.default = router;
