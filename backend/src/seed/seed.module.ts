import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeedService } from './seed.service';
import { User } from '../auth/entities/user.entity';
import { Event } from '../events/entities/event.entity';
import { EventOption } from '../events/entities/event-option.entity';
import { Bet } from '../bets/entities/bet.entity';
import { SeedResolver } from './seed.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event, EventOption, Bet]),
  ],
  controllers: [],
  providers: [SeedService, SeedResolver],
})
export class SeedModule { }

