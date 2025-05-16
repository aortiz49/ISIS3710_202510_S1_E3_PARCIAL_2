import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './actividad.entity';
import { ActividadService } from './actividad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad])],
  providers: [ActividadService],
})
export class ActividadModule {}
