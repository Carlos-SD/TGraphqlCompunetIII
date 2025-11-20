import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class CloseEventInput {
  @Field(() => String, { description: 'Resultado final del evento (debe coincidir con una de las opciones)' })
  @IsString()
  @IsNotEmpty()
  finalResult: string;
}
