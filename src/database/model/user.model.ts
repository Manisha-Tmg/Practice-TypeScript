import { DataTypes, Model } from "sequelize";
import { Column, Table } from "sequelize-typescript";
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
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare password: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare address: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  declare phone: string;
}
