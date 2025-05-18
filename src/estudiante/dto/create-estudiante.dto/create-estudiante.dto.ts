import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  Min,
  Max,
} from 'class-validator';

export class CreateEstudianteDto {
  @IsNotEmpty()
  @IsNumber()
  cedula: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Email no es válido' })
  correo: string;

  @IsNotEmpty()
  @IsString()
  programa: string;

  @IsNumber()
  @Min(1, { message: 'Semestre debe ser mínimo 1' })
  @Max(10, { message: 'Semestre no puede ser mayor a 10' })
  semestre: number;
}
