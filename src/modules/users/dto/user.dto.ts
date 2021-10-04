import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  firebase_user_id: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;
}
