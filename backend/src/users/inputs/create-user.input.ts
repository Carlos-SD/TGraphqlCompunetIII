import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsArray, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
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

    @Field(() => [String], { description: 'Roles del usuario en el sistema', nullable: true })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    roles?: string[];

    @Field(() => Float, { description: 'Balance inicial del usuario', nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    balance?: number;
}
