import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '@nestjs/authentication';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { PublicacionesModule } from './publicaciones/publicaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule.forRoot({
      globalGuard: false, // por defecto es true y bloquea todas las rutas
      session: {},
    }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING!),
    UsuariosModule,
    AuthModule,
    PublicacionesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
