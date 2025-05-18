import { Test, TestingModule } from '@nestjs/testing';
import { ActividadService } from './actividad.service';
import { Actividad } from './actividad.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Estudiante } from '../estudiante/estudiante.entity';
import { CreateActividadDto } from './dto/create-actividad.dto/create-actividad.dto';

describe('ActividadService', () => {
  let service: ActividadService;

  const mockActividadRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadService,
        {
          provide: getRepositoryToken(Actividad),
          useValue: mockActividadRepository,
        },
      ],
    }).compile();

    service = module.get<ActividadService>(ActividadService);
    jest.clearAllMocks();
  });

  describe('cambiarEstado', () => {
    it('should change estado to 1 when at least 80% of cupo is filled', async () => {
      const actividad = {
        id: 1,
        estado: 0,
        estudiantes: Array(8) as Estudiante[],
        cupoMaximo: 10,
      } as Actividad;

      mockActividadRepository.findOne.mockResolvedValue(actividad);
      mockActividadRepository.create.mockReturnValue(actividad);
      mockActividadRepository.save.mockResolvedValue({
        ...actividad,
        estado: 1,
      });

      const result = await service.cambiarEstado(1, 1);

      expect(mockActividadRepository.save).toHaveBeenCalled();
      expect(result.estado).toBe(1);
    });

    it('should throw BadRequestException when cupo is less than 80%', async () => {
      const actividad = {
        id: 2,
        estado: 0,
        estudiantes: Array(6) as Estudiante[],
        cupoMaximo: 10,
      } as Actividad;

      mockActividadRepository.findOne.mockResolvedValue(actividad);

      await expect(service.cambiarEstado(2, 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException when actividad does not exist', async () => {
      mockActividadRepository.findOne.mockResolvedValue(null);

      await expect(service.cambiarEstado(999, 1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('crearActividad', () => {
    it('should create actividad with valid data', async () => {
      const dto: CreateActividadDto = {
        titulo: 'Actividad muy interesante',
        fecha: '2025-05-18',
        cupoMaximo: 20,
        estado: 0,
      };

      const actividad = {
        ...dto,
      } as Actividad;

      mockActividadRepository.create.mockReturnValue(actividad);
      mockActividadRepository.save.mockResolvedValue({ ...actividad, id: 1 });

      const result = await service.crearActividad(dto);

      expect(mockActividadRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(dto),
      );
      expect(mockActividadRepository.save).toHaveBeenCalled();
      expect(result.estado).toBe(0);
    });

    it('should throw BadRequestException if titulo is too short', async () => {
      const dto: CreateActividadDto = {
        titulo: 'Muy corto',
        fecha: '2025-05-18',
        cupoMaximo: 20,
        estado: 0,
      };

      await expect(service.crearActividad(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAllActividadesByDate', () => {
    it('should return actividades for a given date', async () => {
      const mockDate = '2025-05-18';

      const actividades = [
        { id: 1, titulo: 'Act 1', fecha: mockDate },
        { id: 2, titulo: 'Act 2', fecha: mockDate },
      ] as Actividad[];

      mockActividadRepository.find.mockResolvedValue(actividades);

      const result = await service.findAllActividadesByDate(mockDate);

      expect(mockActividadRepository.find).toHaveBeenCalledWith({
        where: { fecha: mockDate },
      });
      expect(result).toHaveLength(2);
      expect(result[0].fecha).toBe(mockDate);
    });
  });
});
