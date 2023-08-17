"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
class Notes extends sequelize_1.Model {
}
exports.Notes = Notes;
Notes.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4, // Use UUIDv4 as the default value for the primary key
    },
    Title: {
        type: sequelize_1.DataTypes.TINYINT,
        unique: true,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    DueDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
    },
}, {
    sequelize: config_1.db,
    tableName: "note",
});
