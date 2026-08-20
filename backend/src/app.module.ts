import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnosModule } from './modules/turnos/turnos.module';
import { TurnoOrmEntity } from './modules/turnos/infraestructura/turno.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //variables en cualquier parte del proyecto
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT', 3306),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DB'),
        entities: [TurnoOrmEntity],
        synchronize: true,
      }),
    }),
    TurnosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
