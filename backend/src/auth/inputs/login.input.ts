import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'Nombre de usuario' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field(() => String, { description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

