import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { PickupRequest } from '../pickup_request/pickup_request.entity';
@Table
export class NGOPickup extends Model<NGOPickup> {
  @ForeignKey(() => PickupRequest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pickup_request_id: number;

  @BelongsTo(() => PickupRequest)
  pickup_request: PickupRequest;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
