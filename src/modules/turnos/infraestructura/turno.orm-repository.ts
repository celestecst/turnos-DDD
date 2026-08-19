import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from '../dominio/turno.entity';
import type { TurnoRepository } from '../dominio/turno.repository';
import { TurnoOrmEntity } from './turno.orm-entity';

@Injectable()
export class TurnoOrmRepository implements TurnoRepository {
  constructor(
    @InjectRepository(TurnoOrmEntity)
    private readonly ormRepository: Repository<TurnoOrmEntity>,
  ) {}

  async guardar(turno: Turno): Promise<void> {
    const ormEntity = this.ormRepository.create({
      id: turno.getId(),
      clienteId: turno.getClienteId(),
      profesionalId: turno.getProfesionalId(),
      fechaHora: turno.getFechaHora(),
      estado: turno.getEstado(),
    });

    await this.ormRepository.save(ormEntity);
  }

  async buscarPorId(id: string): Promise<Turno | null> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    if (!ormEntity) return null;

    return Turno.reconstruir(
      ormEntity.id,
      ormEntity.clienteId,
      ormEntity.profesionalId,
      ormEntity.fechaHora,
      ormEntity.estado as 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO',
    );
  }
}
