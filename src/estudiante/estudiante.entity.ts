import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Resena } from 'src/resena/resena.entity';
import { Actividad } from 'src/actividad/actividad.entity';

@Entity()
export class Estudiante extends BaseEntity {
  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column()
  semestre: number;

  @OneToMany(() => Resena, (resena) => resena.estudiante)
  resenas: Resena[];

  @ManyToMany(() => Actividad, (actividad) => actividad.estudiantes)
  @JoinTable()
  actividades: Actividad[];
}
