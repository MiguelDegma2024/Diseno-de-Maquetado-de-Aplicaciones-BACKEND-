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
import { Category } from "./category";

interface ProductAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  categoryId: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

@Table({
  tableName: "Products",
})
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  // Here, TS infers Data Type from the JS Type
  // The ! means that the variable title wont be null or undefine.

  @Column
  title!: string;
  // Here, we set the Data Type explicity
  // The ? means the variable can be null or undefined

  @Column({
    type: DataType.STRING,
  })
  description?: string;

  @Column
  price!: number;

  @Column
  discountPercentage!: number;

  @Column
  rating!: number;

  @Column
  stock!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;

}
