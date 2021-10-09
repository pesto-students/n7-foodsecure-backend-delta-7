import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
@Table
export class PickupRequest extends Model<PickupRequest> {
  @Column({
    type: DataType.INTEGER,
    // allowNull: false,
  })
  number_of_meals: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  prepared_time: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiry_time: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  food_items: Text[];

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
