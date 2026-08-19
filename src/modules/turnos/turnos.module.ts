import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosController } from './infraestructura/turno.controller';
import { AgendarTurnoUseCase } from './app/agendar-turno-us';
import { TurnoOrmRepository } from './infraestructura/turno.orm-repository';
import { TURNO_REPOSITORY } from './dominio/turno.repository';
import { TurnoOrmEntity } from './infraestructura/turno.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TurnoOrmEntity])], //Registro de la tabla
  controllers: [TurnosController], //Registro del recepcionista
  providers: [
    AgendarTurnoUseCase, //Registro del caso de uso
    {
      //Se conecta la interface con la implementación real (MySQL)
      provide: TURNO_REPOSITORY,
      useClass: TurnoOrmRepository,
    },
  ],
})
export class TurnosModule {}
