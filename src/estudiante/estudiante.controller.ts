import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto/create-estudiante.dto';
import { Estudiante } from './estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crearEstudiante(@Body() dto: CreateEstudianteDto): Promise<Estudiante> {
    return await this.estudianteService.crearEstudiante(dto);
  }

  @Get(':id')
  async findEstudianteById(
    @Param('id') id: number,
  ): Promise<Estudiante | null> {
    return await this.estudianteService.findEstudianteById(id);
  }

  @Patch('inscribirse/:id/actividad/:actividadId')
  async inscribirseEnActividad(
    @Param('id') id: number,
    @Param('actividadId') actividadId: number,
  ): Promise<Estudiante> {
    return await this.estudianteService.inscribirseActivdad(id, actividadId);
  }
}
