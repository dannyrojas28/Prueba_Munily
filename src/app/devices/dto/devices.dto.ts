import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidationArguments,
} from 'class-validator';
import { ApiError } from '../schema/responses/api-error';

export class DevicesDto {
  @IsString()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  ip: string;

  @IsString()
  @IsNotEmpty()
  os: string;

  @IsString()
  @IsNotEmpty()
  ram: string;

  @IsString()
  @IsNotEmpty()
  cpu: string;

  @IsString()
  @IsNotEmpty({
    message: (args: ValidationArguments) =>
      ApiError.parse('validations.not_empty', args),
  })
  disk: string;
}
