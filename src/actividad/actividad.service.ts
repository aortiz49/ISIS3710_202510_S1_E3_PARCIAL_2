import { BadRequestException, Injectable } from '@nestjs/common';
import { Actividad } from './actividad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActividadDto } from './dto/create-actividad.dto/create-actividad.dto';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async crearActividad(actividadDTO: CreateActividadDto): Promise<Actividad> {
    const actividad: Actividad = plainToInstance(Actividad, actividadDTO);

    if (actividadDTO.titulo.length < 15) {
      throw new BadRequestException('Titulo debe tener al menos 15 caracteres');
    }

    actividad.estado = 0; // default to abierta

    const createdActividad = this.actividadRepository.create(actividad);
    return this.actividadRepository.save(createdActividad);
  }

  async findActividadById(id: number): Promise<Actividad | null> {
    const actividad = await this.getActividadHelperId(id);

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada');
    }

    return actividad;
  }

  async findAllActividadesByDate(date: string): Promise<Actividad[]> {
    const actividades = await this.actividadRepository.find({
      where: { fecha: date },
    });

    return actividades;
  }

  async cambiarEstado(id: number, estado: number) {
    const MAX = 0.8;
    const actividad = await this.getActividadHelperId(id);

    if (!actividad) {
      throw new NotFoundException('Actividad no encontrada');
    }

    // solo cambiar estado a cerrada si hay 80% de cupo
    if (estado === 1) {
      if (actividad.estudiantes?.length / actividad.cupoMaximo === MAX) {
        actividad.estado = 1;
      }
    }

    // solo cambiar estado a cerrada si esta llena

    if (estado === 2) {
      if (actividad.estudiantes?.length === actividad.cupoMaximo) {
        actividad.estado = 2;
      }
    }

    const updatedActividad = this.actividadRepository.create(actividad);
    return this.actividadRepository.save(updatedActividad);
  }

  // helpers

  private async getActividadHelperId(id: number): Promise<Actividad | null> {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
      relations: ['estudiantes'],
    });

    return actividad;
  }
}
