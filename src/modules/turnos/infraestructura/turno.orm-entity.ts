import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('turnos')
export class TurnoOrmEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  clienteId!: string;

  @Column()
  profesionalId!: string;

  @Column('datatime ')
  fechaHora!: Date;

  @Column()
  estado!: string;
}
