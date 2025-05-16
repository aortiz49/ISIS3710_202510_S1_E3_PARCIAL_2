import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateActividadDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  fecha: string;

  @IsNotEmpty()
  @IsNumber()
  cupoMaximo: number;

  @IsNotEmpty()
  @IsNumber()
  estado: number;
}
