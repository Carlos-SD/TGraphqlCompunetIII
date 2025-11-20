import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEventOptionInput } from './create-event-option.input';

@InputType()
export class CreateEventInput {
  @Field(() => String, { description: 'Nombre del evento' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'Descripción detallada del evento', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => [CreateEventOptionInput], { description: 'Opciones de apuesta para el evento (mínimo 2)' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEventOptionInput)
  @ArrayMinSize(2)
  options: CreateEventOptionInput[];
}
