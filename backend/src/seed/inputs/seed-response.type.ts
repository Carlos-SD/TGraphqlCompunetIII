import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SeedResponse {
    @Field(() => String)
    message: string;
}
