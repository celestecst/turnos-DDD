import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioOrmEntity } from '../infraestructura/usuario.orm-entity';
import { RegistroDto } from '../infraestructura/DTOs/registro.dto';

@Injectable()
export class RegistrarUsuarioUseCase {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuariosRepository: Repository<UsuarioOrmEntity>,
  ) {}

  async ejecutar(datos: RegistroDto) {
    const nuevoUsuario = this.usuariosRepository.create(datos);
    return await this.usuariosRepository.save(nuevoUsuario);
  }
}
