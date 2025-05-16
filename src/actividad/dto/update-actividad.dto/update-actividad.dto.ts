import { CreateActividadDto } from 'src/actividad/dto/create-actividad.dto/create-actividad.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateActividadDto extends PartialType(CreateActividadDto) {}
