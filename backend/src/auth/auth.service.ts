import { ConflictException, Injectable } from '@nestjs/common';
import { PasswordHasher } from '@nestjs/authentication';
import { UsuariosService } from '../usuarios/usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

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

    const { password, ...datos } = usuario.toObject();
    return datos;
  }
}
