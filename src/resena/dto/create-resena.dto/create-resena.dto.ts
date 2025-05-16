import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateResenaDto {
  @IsNotEmpty()
  @IsString()
  comentario: string;

  @IsNotEmpty()
  @IsNumber()
  calificacion: number;

  @IsNotEmpty()
  @IsString()
  fecha: string;
}
