import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateBetInput } from './create-bet.input';

@InputType()
export class UpdateBetInput extends PartialType(CreateBetInput) {
  @Field(() => String, { nullable: true })
  id?: string;
}
