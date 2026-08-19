import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgendarTurnoUseCase } from '../app/agendar-turno-us';
import { AgendarTurnoDto } from './DTOs/agendar-turno.dto';

//Controlador que solo coordina la entrada y salida de datos. Lo demás lo delega.
@ApiTags('Turnos')
@Controller('turnos')
export class TurnosController {
  constructor(private readonly agendarTurnoUseCase: AgendarTurnoUseCase) {}

  @Post('agendar')
  @ApiOperation({ summary: 'Agenda un nuevo turno' })
  @ApiResponse({ status: 201, description: 'Turno creado con éxito' })
  async agendarTurno(@Body() body: AgendarTurnoDto) {
    try {
      const turno = await this.agendarTurnoUseCase.ejecutar(
        body.clienteId,
        body.profesionalId,
        body.fechaHora,
      );

      return {
        mensaje: 'Turno agendado correctamente',
        turno: {
          id: turno.getId(),
          estado: turno.getEstado(),
          fechaHora: turno.getFechaHora(),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Ocurrió un error inesperado al agendar el turno',
      );
    }
  }
}
