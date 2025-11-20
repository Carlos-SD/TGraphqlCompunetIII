import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEventOptionInput } from './create-event-option.input';

@InputType()
export class UpdateEventInput {
    @Field(() => String, { description: 'Nombre del evento', nullable: true })
    @IsString()
    @IsOptional()
    name?: string;

    @Field(() => String, { description: 'Descripción del evento', nullable: true })
    @IsString()
    @IsOptional()
    description?: string;

    @Field(() => [CreateEventOptionInput], { description: 'Opciones de apuesta para actualizar', nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateEventOptionInput)
    options?: CreateEventOptionInput[];
}
