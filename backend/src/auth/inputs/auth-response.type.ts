import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => User, { description: 'Usuario autenticado' })
  user: User;

  @Field(() => String, { description: 'Token JWT de autenticación' })
  token: string;
}

