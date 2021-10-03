import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firebase_user_id: string;
  @Column({
    type: DataType.STRING,
    unique: true,
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
