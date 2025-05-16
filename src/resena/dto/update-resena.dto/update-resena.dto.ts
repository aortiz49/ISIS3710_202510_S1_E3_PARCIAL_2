import { CreateResenaDto } from 'src/resena/dto/create-resena.dto/create-resena.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateResenaDto extends PartialType(CreateResenaDto) {}
