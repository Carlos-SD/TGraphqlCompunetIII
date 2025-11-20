import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../auth/entities/user.entity';
import { Bet } from '../bets/entities/bet.entity';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Bet]),
    AuthModule
  ],
  providers: [UsersService, UsersResolver],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
