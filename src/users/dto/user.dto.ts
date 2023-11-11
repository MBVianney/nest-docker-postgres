import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  // @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @Length(1, 50)
  firstName: string;

  @IsNotEmpty()
  @Length(1, 50)
  lastName: string;

  @IsNotEmpty()
  isActive: boolean;
}
