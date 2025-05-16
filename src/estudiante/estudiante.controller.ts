import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto/create-estudiante.dto';
import { Estudiante } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Get(':id')
  async findEstudianteById(
    @Param('id') id: number,
  ): Promise<Estudiante | null> {
    return await this.estudianteService.findEstudianteById(id);
  }

  @Post()
  async crearEstudiante(@Body() dto: CreateEstudianteDto): Promise<Estudiante> {
    return await this.estudianteService.crearEstudiante(dto);
  }
}
