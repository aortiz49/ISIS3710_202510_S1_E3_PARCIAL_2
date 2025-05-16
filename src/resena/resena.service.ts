import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResenaDto } from './dto/create-resena.dto/create-resena.dto';
import { plainToInstance } from 'class-transformer';
import { Resena } from './resena.entity';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(Resena)
    private readonly resenaRepository: Repository<Resena>,
  ) {}

  async agregarResena(resenaDTO: CreateResenaDto): Promise<Resena> {
    const resena: Resena = plainToInstance(Resena, resenaDTO);

    const createdResena = this.resenaRepository.create(resena);
    return this.resenaRepository.save(createdResena);
  }
}
