import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AgendarTurnoUseCase } from '../app/agendar-turno-us';
import { AgendarTurnoDto } from './DTOs/agendar-turno.dto';
import { ObtenerTurnosUseCase } from '../app/obtener-turnos-us';
import { ActualizarEstadoUseCase } from '../app/actualizar-turno.us';

//Controlador que solo coordina la entrada y salida de datos. Lo demás lo delega.
@ApiTags('Turnos')
@Controller('turnos')
export class TurnosController {
  constructor(
    private readonly agendarTurnoUseCase: AgendarTurnoUseCase,
    private readonly obtenerTurnosUseCase: ObtenerTurnosUseCase,
    private readonly actualizarEstadoUseCase: ActualizarEstadoUseCase,
  ) {}

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
  @Get()
  @ApiOperation({ summary: 'Obtiene todos los turnos agendados' })
  @ApiResponse({ status: 200, description: 'Lista de turnos' })
  async obtenerTodos() {
    return await this.obtenerTurnosUseCase.ejecutar();
  }

  @Patch(':id/estado')
  @ApiOperation({
    summary: 'Actualiza el estado de un turno (CONFIRMADO O CANCELADO)',
  })
  async actualizarEstado(
    @Param('id') id: string,
    @Body('estado') estado: 'CONFIRMADO' | 'CANCELADO',
  ) {
    try {
      await this.actualizarEstadoUseCase.ejecutar(id, estado);
      return { mensaje: `Turno ${estado.toLowerCase()} con éxito` };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error al actualizar el estado');
    }
  }
}
