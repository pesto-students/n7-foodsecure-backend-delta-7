import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  firebase_user_id: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  lat: number;
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  lng: number;
}
