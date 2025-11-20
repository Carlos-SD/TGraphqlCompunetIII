import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

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
}
