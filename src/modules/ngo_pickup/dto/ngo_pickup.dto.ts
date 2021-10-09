import { IsNotEmpty } from 'class-validator';

export class NGOPickupDto {
  @IsNotEmpty()
  readonly pickup_request_id: number;

  @IsNotEmpty()
  readonly userId: number;
}
