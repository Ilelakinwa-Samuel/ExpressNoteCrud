import { DataTypes, Model } from "sequelize";
import { db } from "../config";

export interface NoteAttributes {
  id: string;
  Title: string;
  description: string;
  DueDate: string;
  status: string;
  userId: string;
}
export class Notes extends Model<NoteAttributes> {}
Notes.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4, // Use UUIDv4 as the default value for the primary key
    },
    Title: {
      type: DataTypes.TINYINT,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUIDV4,
    },
  },
  {
    sequelize: db,
    tableName: "note",
  }
);
