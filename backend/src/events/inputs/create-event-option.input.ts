import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateEventOptionInput {
  @Field(() => String, { description: 'Nombre de la opción de apuesta' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Float, { description: 'Cuota/probabilidad de la opción' })
  @IsNumber()
  @Min(1.01)
  odds: number;
}
