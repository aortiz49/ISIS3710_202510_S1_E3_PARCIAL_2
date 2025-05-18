import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './actividad.entity';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad])],
  providers: [ActividadService],
  controllers: [ActividadController],
  exports: [ActividadService],
})
export class ActividadModule {}
