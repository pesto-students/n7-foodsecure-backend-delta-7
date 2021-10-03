import { IsNotEmpty } from 'class-validator';

export class FirebaseUserDto {
  @IsNotEmpty()
  readonly token: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  readonly lat: number;

  @IsNotEmpty()
  readonly lng: number;
}
