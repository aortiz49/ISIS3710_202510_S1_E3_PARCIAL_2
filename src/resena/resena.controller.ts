import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { CreateResenaDto } from './dto/create-resena.dto/create-resena.dto';
import { Resena } from './resena.entity';

@Controller('resena')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post()
  async crearResena(@Body() dto: CreateResenaDto): Promise<Resena> {
    return await this.resenaService.agregarResena(dto);
  }

  @Get(':id')
  async findResenaById(@Param('id') id: number): Promise<Resena | null> {
    return await this.resenaService.findResenaById(id);
  }
}
