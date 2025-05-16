import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from './resena.entity';
import { ResenaService } from './resena.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resena])],
  providers: [ResenaService],
})
export class ResenaModule {}
