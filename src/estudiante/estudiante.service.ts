import { Injectable } from '@nestjs/common';
import { Estudiante } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEstudianteDto } from './dto/create-estudiante.dto/create-estudiante.dto';
import { plainToInstance } from 'class-transformer';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Actividad } from 'src/actividad/actividad.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async crearEstudiante(
    estudianteDTO: CreateEstudianteDto,
  ): Promise<Estudiante> {
    const estudiante: Estudiante = plainToInstance(Estudiante, estudianteDTO);

    const estudianteExistente = await this.getEstudianteHelperCedula(
      estudiante.cedula,
    );

    if (estudianteExistente) {
      throw new ConflictException('Estudiante ya existe con esta cedula');
    }

    const createdEstudiante = this.estudianteRepository.create(estudiante);
    return this.estudianteRepository.save(createdEstudiante);
  }

  async findEstudianteById(id: number): Promise<Estudiante | null> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
    });

    if (!estudiante) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return estudiante;
  }

  async inscribirseActivdad(
    id: number,
    actividadId: number,
  ): Promise<Estudiante> {
    const estudiante = await this.getEstudianteHelperId(id);
    const actividad = await this.actividadRepository.findOne({
      where: { id: actividadId },
    });

    if (!estudiante || !actividad) {
      throw new NotFoundException('Estudiante o actividad no encontrada');
    }

    if (actividad.estado == 0) {
      estudiante.actividades.push(actividad);
    }
    return this.estudianteRepository.save(estudiante);
  }

  // helpers

  private async getEstudianteHelperId(id: number): Promise<Estudiante | null> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
    });

    return estudiante;
  }

  private async getEstudianteHelperCedula(
    cedula: number,
  ): Promise<Estudiante | null> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { cedula },
    });

    return estudiante;
  }
}
