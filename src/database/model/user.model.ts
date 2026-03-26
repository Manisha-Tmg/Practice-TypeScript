import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UserAttributes, UserCreationAttributes } from "../../types/user.types";

@Table({
  tableName: "users",
  modelName: "User",
  timestamps: true,
})
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.ENUM("user", "admin", "superAdmin"),
    allowNull: false,
  })
  declare role: "user" | "admin" | "superAdmin";
}
