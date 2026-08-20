import { Injectable, Inject } from '@nestjs/common';
import {
  type TurnoRepository,
  TURNO_REPOSITORY,
} from '../dominio/turno.repository';

@Injectable()
export class ObtenerTurnosUseCase {
  constructor(
    @Inject(TURNO_REPOSITORY)
    private readonly turnoRepository: TurnoRepository,
  ) {}

  async ejecutar() {
    const turnos = await this.turnoRepository.buscarTodos();

    return turnos.map((turnos) => ({
      id: turnos.getId(),
      estado: turnos.getEstado(),
      fechaHora: turnos.getFechaHora(),
    }));
  }
}
