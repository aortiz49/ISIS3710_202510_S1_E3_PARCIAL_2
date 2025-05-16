import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Resena extends BaseEntity {
  @Column()
  comentario: string;

  @Column()
  calificacion: number;

  @Column()
  fecha: string;
}
