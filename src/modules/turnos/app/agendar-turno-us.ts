//El caso de uso de agendar turno. Cumple con el principio de Responsabilidad única, pq solo agenda turnos.
import { Inject, Injectable } from '@nestjs/common';
import { Turno } from '../dominio/turno.entity';
import type { TurnoRepository } from '../dominio/turno.repository';
import { TURNO_REPOSITORY } from '../dominio/turno.repository';

@Injectable()
export class AgendarTurnoUseCase {
  constructor(
    @Inject(TURNO_REPOSITORY)
    private readonly turnoRepository: TurnoRepository,
  ) {}

  async ejecutar(
    clienteId: string,
    profesionalId: string,
    fechaStr: string,
  ): Promise<Turno> {
    const fechaHora = new Date(fechaStr);

    // 1. Generamos un ID único (necesitaremos instalar uuid en un momento)
    const turnoId = crypto.randomUUID();

    // 2. Usamos nuestra Entidad para validar y crear el turno
    const nuevoTurno = Turno.agendar(
      turnoId,
      clienteId,
      profesionalId,
      fechaHora,
    );

    // 3. Guardamos el turno usando el contrato (el repositorio)
    await this.turnoRepository.guardar(nuevoTurno);

    // 4. Retornamos el resultado
    return nuevoTurno;
  }
}
