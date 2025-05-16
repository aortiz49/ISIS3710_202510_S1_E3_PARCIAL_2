import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

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
}
