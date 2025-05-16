import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ResenaModule } from './resena/resena.module';
import { Estudiante } from './estudiante/estudiante.entity';
import { Actividad } from './actividad/actividad.entity';
import { Resena } from './resena/resena.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'renegade',
      database: 'eventos-culturales',
      entities: [Estudiante, Actividad, Resena],
      autoLoadEntities: true,
      synchronize: true,
    }),
    EstudianteModule,
    ActividadModule,
    ResenaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
