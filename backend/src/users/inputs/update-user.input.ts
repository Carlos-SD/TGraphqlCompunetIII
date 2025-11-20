import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => Boolean, { description: 'Estado de activación del usuario', nullable: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
