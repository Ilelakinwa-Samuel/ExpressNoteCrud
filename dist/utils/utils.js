"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatenoteschema = exports.updateUserSchema = exports.loginUserSchema = exports.create_NoteSchema = exports.options = exports.signupSchema = void 0;
const joi_1 = __importStar(require("joi"));
exports.signupSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    gender: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    address: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{5,20}$/)
        .required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "{{#label}} does not match" }),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.create_NoteSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase().required(),
    duedate: joi_1.default.number().required(),
    status: joi_1.default.string().required(),
});
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{5,20}$/)
        .required(),
});
exports.updateUserSchema = joi_1.default.object().keys({
    fullname: joi_1.default.string().lowercase(),
    email: joi_1.default.string().trim().lowercase(),
    gender: joi_1.default.string().lowercase(),
    phone: joi_1.default.string().trim(),
    address: joi_1.default.string().lowercase(),
});
exports.updatenoteschema = joi_1.default.object().keys({
    Title: joi_1.default.string().lowercase(),
    description: joi_1.default.string().trim().lowercase(),
    DueDate: joi_1.default.string().trim().lowercase(),
    status: joi_1.boolean,
});
