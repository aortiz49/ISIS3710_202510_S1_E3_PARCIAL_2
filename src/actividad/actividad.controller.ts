import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto/create-actividad.dto';
import { Actividad } from './actividad.entity';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  async crearActividad(@Body() dto: CreateActividadDto): Promise<Actividad> {
    return await this.actividadService.crearActividad(dto);
  }

  @Get(':date')
  async findActividadById(
    @Param('date') date: string,
  ): Promise<Actividad[] | null> {
    return await this.actividadService.findAllActividadesByDate(date);
  }

  @Patch(':id/estado/:estado_id')
  async cambiarEstado(
    @Param('id') id: number,
    @Param('estado_id') estado_id: number,
  ): Promise<Actividad> {
    return await this.actividadService.cambiarEstado(id, estado_id);
  }
}
