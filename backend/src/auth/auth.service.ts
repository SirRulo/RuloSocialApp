import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UsuarioDocument } from '../usuarios/entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { AuthenticationDto } from './dto/authentication.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async registro(createUsuarioDto: CreateUsuarioDto) {
    if (await this.usuariosService.findByCorreo(createUsuarioDto.correo)) {
      throw new ConflictException('El correo ya está registrado');
    }

    if (
      await this.usuariosService.findByNombreUsuario(
        createUsuarioDto.nombreUsuario,
      )
    ) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    createUsuarioDto.password = await this.passwordHasher.hash(
      createUsuarioDto.password,
    );

    const usuario = await this.usuariosService.create(createUsuarioDto);

    return this.sinPassword(usuario);
  }

  async login(authenticationDto: AuthenticationDto) {
    const usuario = await this.usuariosService.findByNombreUsuario(
      authenticationDto.nombreUsuario,
    );

    if (
      !usuario ||
      !(await this.passwordHasher.verify(
        authenticationDto.password,
        usuario.password,
      ))
    ) {
      throw new UnauthorizedException('Las credenciales no son correctas');
    }

    if (!usuario.habilitado) {
      throw new ForbiddenException('Tu usuario está deshabilitado');
    }

    return this.sinPassword(usuario);
  }

  private sinPassword(usuario: UsuarioDocument) {
    const { password, ...datos } = usuario.toObject();
    return datos;
  }
}
