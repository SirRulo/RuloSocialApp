import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Error as MongooseError, Model } from 'mongoose';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from '../auth/dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.usuarioModel.create(createUsuarioDto);
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw new BadRequestException(
          Object.values(error.errors).map((error) => error.message),
        );
      }

      throw error;
    }
  }

  async findByCorreo(correo: string) {
    return this.usuarioModel.findOne({ correo }).exec();
  }

  async findByNombreUsuario(nombreUsuario: string) {
    return this.usuarioModel.findOne({ nombreUsuario }).exec();
  }
}
