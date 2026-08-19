import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosModule } from './modules/turnos/turnos.module';
import { TurnoOrmEntity } from './modules/turnos/infraestructura/turno.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //variables en cualquier parte del proyecto
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [TurnoOrmEntity],
      synchronize: true, //Una vez en producción debe ir false
    }),
    TurnosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
