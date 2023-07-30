import { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
interface NotesAttributes {
  id: string;
  title: string;
  description: string;
}
export class Notes extends Model<NotesAttributes> {}
Notes.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "Notes",
  }
);
