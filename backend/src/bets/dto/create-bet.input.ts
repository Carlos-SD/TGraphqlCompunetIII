import { InputType, Field, Float } from '@nestjs/graphql';
import { IsUUID, IsNumber, Min, IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBetInput {
  @Field(() => String, { description: 'UUID del evento sobre el que se apuesta' })
  @IsUUID()
  eventId: string;

  @Field(() => String, { description: 'Opción seleccionada para la apuesta' })
  @IsString()
  @IsNotEmpty()
  selectedOption: string;

  @Field(() => Float, { description: 'Monto a apostar' })
  @IsNumber()
  @Min(1)
  amount: number;
}
