import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The age of a user',
    minimum: 10,
  })
  @IsInt()
  @Min(10)
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty()
  @IsBoolean()
  problems: boolean;
}

export class UpdateUserDto {
  @ApiProperty()
  problems: boolean;
}
