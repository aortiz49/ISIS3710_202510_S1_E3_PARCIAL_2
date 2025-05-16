import { CreateEstudianteDto } from 'src/estudiante/dto/create-estudiante.dto/create-estudiante.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateEstudianteDto extends PartialType(CreateEstudianteDto) {}
