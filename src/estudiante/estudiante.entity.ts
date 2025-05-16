import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Resena } from 'src/resena/resena.entity';

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
}
