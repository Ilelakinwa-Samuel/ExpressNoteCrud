import { DataTypes, Model } from "sequelize";
import { db } from "../config";
import { Notes } from "./notes";

export interface UserAttributes {
  id: string;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: db,
    tableName: "user",
  }
);

User.hasMany(Notes, { foreignKey: "userId", as: "note" });
Notes.belongsTo(User, { foreignKey: "userId", as: "user" });
