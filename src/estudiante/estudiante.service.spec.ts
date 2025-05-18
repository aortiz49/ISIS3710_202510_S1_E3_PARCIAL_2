import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from './estudiante.entity';
import { Actividad } from '../actividad/actividad.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto/create-estudiante.dto';

describe('EstudianteService', () => {
  let service: EstudianteService;

  const mockEstudianteRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockActividadRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useValue: mockEstudianteRepository,
        },
        {
          provide: getRepositoryToken(Actividad),
          useValue: mockActividadRepository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    jest.clearAllMocks();
  });

  describe('crearEstudiante', () => {
    it('should create a new estudiante', async () => {
      const dto: CreateEstudianteDto = {
        nombre: 'Juan Pérez',
        correo: 'juan@example.com',
        semestre: 3,
        cedula: 123456,
        programa: 'Ingeniería de Software',
      };

      const estudiante = { ...dto } as Estudiante;

      mockEstudianteRepository.findOne.mockResolvedValue(null);
      mockEstudianteRepository.create.mockReturnValue(estudiante);
      mockEstudianteRepository.save.mockResolvedValue({
        ...estudiante,
        id: 1,
      });

      const result = await service.crearEstudiante(dto);

      expect(result.id).toBe(1);
      expect(mockEstudianteRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if cedula exists', async () => {
      const dto: CreateEstudianteDto = {
        nombre: 'Ana López',
        correo: 'ana@example.com',
        semestre: 2,
        cedula: 999999,
        programa: 'Ingeniería de Software',
      };

      mockEstudianteRepository.findOne.mockResolvedValue({ id: 1 });

      await expect(service.crearEstudiante(dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findEstudianteById', () => {
    it('should return estudiante when found', async () => {
      const estudiante = { id: 1, nombre: 'Carlos' } as Estudiante;

      mockEstudianteRepository.findOne.mockResolvedValue(estudiante);

      const result = await service.findEstudianteById(1);

      expect(result).toEqual(estudiante);
    });

    it('should throw NotFoundException when not found', async () => {
      mockEstudianteRepository.findOne.mockResolvedValue(null);

      await expect(service.findEstudianteById(123)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('inscribirseActivdad', () => {
    it('should add actividad if open', async () => {
      const actividad = { id: 10, estado: 0 } as Actividad;
      const estudiante = {
        id: 1,
        nombre: 'Lucas',
        cedula: 123456,
        correo: 'lucas@example.com',
        programa: 'Ingeniería de Software',
        semestre: 3,
        resenas: [],
        actividades: [],
      };

      mockEstudianteRepository.findOne.mockResolvedValueOnce(estudiante); // from helper
      mockActividadRepository.findOne.mockResolvedValueOnce(actividad);
      mockEstudianteRepository.save.mockResolvedValue({
        ...estudiante,
        actividades: [actividad],
      });

      const result = await service.inscribirseActivdad(1, 10);

      expect(result.actividades.length).toBe(1);
      expect(result.actividades[0]).toEqual(actividad);
    });

    it('should throw NotFoundException if student or actividad is missing', async () => {
      mockEstudianteRepository.findOne.mockResolvedValue(null);
      mockActividadRepository.findOne.mockResolvedValue(null);

      await expect(service.inscribirseActivdad(99, 99)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
