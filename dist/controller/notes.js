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
exports.delete_Note = exports.update_Note = exports.get_Note = exports.getAllNotes = exports.create_Note = void 0;
const uuid_1 = require("uuid");
const notes_1 = require("../model/notes");
const utils_1 = require("../utils/utils");
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.config)();
const jwtsecret = process.env.JWT_SECRET;
//CREATE NOTES
const create_Note = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1] || req.cookie.token;
        console.log(token);
        const verified = jsonwebtoken_1.default.verify(token, jwtsecret);
        console.log(verified);
        const id = (0, uuid_1.v4)();
        //const { title, description, duedate, status } = req.body; instead of this...
        const noteRecord = yield notes_1.Notes.create(Object.assign(Object.assign({ id }, req.body), { userId: verified.id }));
        return res.status(201).json({
            msg: "Note successfully created",
            noteRecord,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "something went wrong",
        });
    }
});
exports.create_Note = create_Note;
// GET notes
const getAllNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Find all notes
        // sequelize, its findAll or findAndCountAll
        //Using findAll
        // const getAllnotes = await Notes.findAll();
        //   return res.status(200).json({
        //     msg: "You have successfully retrieved all data",
        //     getAllnotes
        //   })
        const limit = (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit;
        const offset = (_b = req.query) === null || _b === void 0 ? void 0 : _b.offset;
        //Using findAllCountAll
        const getAllnotes = yield notes_1.Notes.findAndCountAll({
            limit: limit,
            offset: offset,
        });
        return res.status(200).json({
            msg: "You have successfully retrieved all data",
            count: getAllnotes.count,
            notes: getAllnotes.rows,
        });
        // if (notes) {
        //   return res.status(200).json({
        //     message: notes,
        //   });
        // }
        // return res.status(404).json({
        //   message: "Notes does not exist",
        // });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: "error message",
        });
    }
});
exports.getAllNotes = getAllNotes;
//GET NOTE
function get_Note(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body.id);
            const user = yield notes_1.Notes.findByPk(req.body.id);
            console.log({ user });
            console.log(req.body);
            return res.status(200).json({
                user,
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({
                msg: "No note found",
            });
        }
    });
}
exports.get_Note = get_Note;
// UPDATE NOTE
const update_Note = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.params;
        const id = req.params.id;
        const { title, description, duedate, status } = req.body;
        //validate with joi
        const validatedResult = utils_1.updatenoteschema.validate(req.body, utils_1.options);
        if (validatedResult.error) {
            return res.status(400).json({
                Error: validatedResult.error.details[0].message,
            });
        }
        const noteUpdate = yield notes_1.Notes.findOne({ where: { id } });
        if (!noteUpdate) {
            res.status(400).json({
                error: "Cannot find existing note",
            });
        }
        const correct = yield (noteUpdate === null || noteUpdate === void 0 ? void 0 : noteUpdate.update(Object.assign({ id }, req.body)));
        return res.status(200).json({
            msg: "You have successfully updated your results",
            correct,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "something went wrong",
        });
    }
});
exports.update_Note = update_Note;
// DELETE NOTE
const delete_Note = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const record = yield notes_1.Notes.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({ error: "Cannot find existing note" });
        }
        yield record.destroy();
        return res.status(204).json({ msg: "Note deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
exports.delete_Note = delete_Note;
