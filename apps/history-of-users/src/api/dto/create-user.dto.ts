import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsInt()
  age: number;
  @IsString()
  @IsNotEmpty()
  gender: string;
  @IsBoolean()
  problems: boolean;
}
