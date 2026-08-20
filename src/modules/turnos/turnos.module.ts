import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosController } from './infraestructura/turno.controller';
import { AgendarTurnoUseCase } from './app/agendar-turno-us';
import { TurnoOrmRepository } from './infraestructura/turno.orm-repository';
import { TURNO_REPOSITORY } from './dominio/turno.repository';
import { TurnoOrmEntity } from './infraestructura/turno.orm-entity';
import { ObtenerTurnosUseCase } from './app/obtener-turnos-us';
import { ActualizarEstadoUseCase } from './app/actualizar-turno.us';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoOrmEntity])], //Registro de la tabla
  controllers: [TurnosController], //Registro del recepcionista
  providers: [
    AgendarTurnoUseCase, //Registro de turno
    ObtenerTurnosUseCase, //Visualización de turno
    ActualizarEstadoUseCase, //Actualizar estado del turno
    {
      //Se conecta la interface con la implementación real (MySQL)
      provide: TURNO_REPOSITORY,
      useClass: TurnoOrmRepository,
    },
  ],
})
export class TurnosModule {}
