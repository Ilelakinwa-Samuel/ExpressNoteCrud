"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = require("../controller/notes");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", auth_1.auth, notes_1.create_Note);
router.get("/", auth_1.auth, notes_1.getAllNotes);
router.put("/update/:id", notes_1.update_Note);
router.delete("/delete/:id", notes_1.delete_Note);
router.get("/notes/id", notes_1.get_Note);
exports.default = router;
