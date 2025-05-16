import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad])],
})
export class ActividadModule {}
