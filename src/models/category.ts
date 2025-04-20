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
  import { Product } from "./product";
  
  @Table({ tableName: "Categories" })
  export class Category extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
  
    @Unique
    @Column(DataType.STRING)
    name!: string;
  
    @Unique
    @Column(DataType.STRING)
    key!: string; // Clave única como 'ELEC', 'HOME', 'SPORTS'

    @CreatedAt
    @Column
    createdAt!: Date;
  
    @UpdatedAt
    @Column
    updatedAt!: Date;
  
    @HasMany(() => Product)
    products!: Product[];
  }
  