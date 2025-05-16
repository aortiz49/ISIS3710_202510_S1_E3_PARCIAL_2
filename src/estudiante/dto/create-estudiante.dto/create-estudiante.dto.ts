import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsNumber()
  cedula: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  correo: string;

  @IsNotEmpty()
  @IsString()
  programa: string;

  @IsNotEmpty()
  @IsNumber()
  semestre: number;
}
