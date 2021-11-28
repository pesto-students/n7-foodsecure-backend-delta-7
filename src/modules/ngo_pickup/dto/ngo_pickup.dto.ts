import { IsNotEmpty } from 'class-validator';

export class NGOPickupDto {
  @IsNotEmpty()
  pickup_request_id: number;

  @IsNotEmpty()
  userId: number;
}
