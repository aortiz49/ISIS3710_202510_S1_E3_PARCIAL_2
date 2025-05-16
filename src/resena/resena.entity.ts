import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Estudiante } from 'src/estudiante/estudiante.entity';

@Entity()
export class Resena extends BaseEntity {
  @Column()
  comentario: string;

  @Column()
  calificacion: number;

  @Column()
  fecha: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.resenas)
  estudiante: Estudiante;
}
