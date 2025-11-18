import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsArray } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String, { description: 'Nombre de usuario único' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @Field(() => String, { description: 'Contraseña del usuario' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => [String], { description: 'Roles del usuario', nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}

