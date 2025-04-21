import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import { Manager } from "./manager";


interface BranchAttributes {
  id: number;
  name: string;
  location: string;
  managerId: number;
}

interface BranchCreationAttributes extends Optional<BranchAttributes, "id"> {}

@Table({
  tableName: "Branches",
})
export class Branch extends Model<BranchAttributes, BranchCreationAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location!: string;

  @ForeignKey(() => Manager)
  @Column(DataType.INTEGER)
  managerId!: number;

  @BelongsTo(() => Manager)
  manager!: Manager;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
