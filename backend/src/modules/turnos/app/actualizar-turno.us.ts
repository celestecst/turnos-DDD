import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  type TurnoRepository,
  TURNO_REPOSITORY,
} from '../dominio/turno.repository';

@Injectable()
export class ActualizarEstadoUseCase {
  constructor(
    @Inject(TURNO_REPOSITORY)
    private readonly turnoRepository: TurnoRepository,
  ) {}

  async ejecutar(
    id: string,
    nuevoEstado: 'CONFIRMADO' | 'CANCELADO',
  ): Promise<void> {
    const turno = await this.turnoRepository.buscarPorId(id);
    if (!turno) {
      throw new NotFoundException(`El turno con id ${id} no existe`);
    }
    if (nuevoEstado === 'CONFIRMADO') {
      turno.confirmar();
    } else if (nuevoEstado === 'CANCELADO') {
      turno.cancelar();
    }
    await this.turnoRepository.guardar(turno);
  }
}
