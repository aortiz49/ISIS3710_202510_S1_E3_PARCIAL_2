import { Test, TestingModule } from '@nestjs/testing';
import { ResenaService } from './resena.service';
import { Resena } from './resena.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateResenaDto } from './dto/create-resena.dto/create-resena.dto';

describe('ResenaService', () => {
  let service: ResenaService;

  const mockResenaRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResenaService,
        {
          provide: getRepositoryToken(Resena),
          useValue: mockResenaRepository,
        },
      ],
    }).compile();

    service = module.get<ResenaService>(ResenaService);
    jest.clearAllMocks();
  });

  describe('agregarResena', () => {
    it('should create and save a new resena', async () => {
      const dto: CreateResenaDto = {
        comentario: 'Muy buena actividad',
        calificacion: 5,
        fecha: '2025-05-18',
      };

      const resena = { ...dto } as Resena;

      mockResenaRepository.create.mockReturnValue(resena);
      mockResenaRepository.save.mockResolvedValue({ ...resena, id: 1 });

      const result = await service.agregarResena(dto);

      expect(mockResenaRepository.create).toHaveBeenCalledWith(
        expect.objectContaining(dto),
      );
      expect(mockResenaRepository.save).toHaveBeenCalledWith(resena);
      expect(result.id).toBe(1);
    });
  });

  describe('findResenaById', () => {
    it('should return resena if found', async () => {
      const resena = {
        id: 1,
        comentario: 'Excelente',
        calificacion: 5,
        fecha: '2025-05-18',
      };

      mockResenaRepository.findOne.mockResolvedValue(resena);

      const result = await service.findResenaById(1);

      expect(result).toEqual(resena);
    });

    it('should return null if resena not found', async () => {
      mockResenaRepository.findOne.mockResolvedValue(null);

      const result = await service.findResenaById(99);

      expect(result).toBeNull();
    });
  });
});
