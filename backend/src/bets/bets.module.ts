import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsService } from './bets.service';
import { BetsController } from './bets.controller';
import { BetsResolver } from './bets.resolver';
import { Bet } from './entities/bet.entity';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet]),
    UsersModule,
    forwardRef(() => EventsModule),
    AuthModule,
  ],
  providers: [BetsService, BetsResolver],
  controllers: [BetsController],
  exports: [BetsService],
})
export class BetsModule {}
