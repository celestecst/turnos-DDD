import { Controller, Post, Body } from '@nestjs/common';
import { RegistrarUsuarioUseCase } from '../app/registrar-us';
import { LoginUsuarioUseCase } from '../app/login-us';
import { RegistroDto } from './DTOs/registro.dto';
import { LoginDto } from './DTOs/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly registrarUsuario: RegistrarUsuarioUseCase,
    private readonly loginUsuario: LoginUsuarioUseCase,
  ) {}

  @Post('registro')
  registrar(@Body() body: RegistroDto) {
    return this.registrarUsuario.ejecutar(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.loginUsuario.ejecutar(body.email, body.password);
  }
}
