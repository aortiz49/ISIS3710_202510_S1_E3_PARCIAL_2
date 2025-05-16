import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Resena } from 'src/resena/resena.entity';

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
}
