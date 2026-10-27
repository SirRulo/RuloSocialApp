import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosService } from './usuarios.service';
import { Usuario, UsuarioSchema } from './entities/usuario.entity';
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema }]),
  ],
  providers: [UsuariosService],
  exports: [UsuariosService],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
