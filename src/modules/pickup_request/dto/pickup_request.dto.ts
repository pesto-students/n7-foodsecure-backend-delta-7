import { IsNotEmpty } from 'class-validator';

export class PickupRequestDto {
  @IsNotEmpty()
  number_of_meals: number;

  @IsNotEmpty()
  prepared_time: Date;

  @IsNotEmpty()
  expiry_time: Date;

  @IsNotEmpty()
  price: number;

  userId: number;

  food_items: Text[];
}
