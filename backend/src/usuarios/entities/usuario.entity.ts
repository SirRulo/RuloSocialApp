import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({ timestamps: true })
export class Usuario {
  @Prop({ required: [true, 'El nombre es obligatorio'] })
  nombre: string;

  @Prop({ required: [true, 'El apellido es obligatorio'] })
  apellido: string;

  @Prop({ required: [true, 'El correo es obligatorio'], unique: true })
  correo: string;

  @Prop({
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
  })
  nombreUsuario: string;

  @Prop({ required: [true, 'La contraseña es obligatoria'] })
  password: string;

  @Prop({ required: [true, 'La fecha de nacimiento es obligatoria'] })
  fechaNacimiento: Date;

  @Prop({ default: '' })
  descripcion: string;

  @Prop({ default: '' })
  imagenUrl: string;

  @Prop({ enum: ['usuario', 'administrador'], default: 'usuario' })
  perfil: string;

  @Prop({ default: true })
  habilitado: boolean;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
