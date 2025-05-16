import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './resena.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resena])],
})
export class ResenaModule {}
