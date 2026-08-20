import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../infraestructura/usuario.orm-entity';

@Injectable()
export class LoginUsuarioUseCase {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuariosRepository: Repository<UsuarioOrmEntity>,
  ) {}

  async ejecutar(email: string, password: string) {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });

    if (!usuario || usuario.password !== password) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    return {
      mensaje: 'Login exitoso',
      usuarioId: usuario.id,
      rol: usuario.rol,
    };
  }
}
