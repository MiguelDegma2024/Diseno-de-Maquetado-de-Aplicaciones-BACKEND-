import {
    Table,
    Model,
    Column,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Unique,
    HasMany,
    CreatedAt,
    UpdatedAt,
  } from "sequelize-typescript";
  import { Branch } from "./branch";
  
  @Table({ tableName: "Managers" })
  export class Manager extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @Column(DataType.STRING)
    name!: string;
  
    @Unique
    @Column(DataType.STRING)
    email!: string;
  
    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  
    @HasMany(() => Branch)
    branches!: Branch[];
  }
  