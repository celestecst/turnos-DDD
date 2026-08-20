import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioOrmEntity } from './infraestructura/usuario.orm-entity';
import { UsuariosController } from './infraestructura/usuarios.controller';
import { RegistrarUsuarioUseCase } from './app/registrar-us';
import { LoginUsuarioUseCase } from './app/login-us';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioOrmEntity])],
  controllers: [UsuariosController],
  providers: [RegistrarUsuarioUseCase, LoginUsuarioUseCase],
})
export class UsuariosModule {}
