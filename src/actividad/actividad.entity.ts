import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Resena } from 'src/resena/resena.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity';

@Entity()
export class Actividad extends BaseEntity {
  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column()
  cupoMaximo: number;

  @Column()
  estado: number;

  @OneToMany(() => Resena, (resena) => resena.actividad)
  resenas: Resena[];

  @ManyToMany(() => Estudiante, (estudiante) => estudiante.actividades)
  estudiantes: Estudiante[];
}
