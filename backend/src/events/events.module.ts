import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';

import { EventsResolver } from './events.resolver';
import { Event } from './entities/event.entity';
import { EventOption } from './entities/event-option.entity';
import { BetsModule } from '../bets/bets.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, EventOption]),
    forwardRef(() => BetsModule),
    UsersModule,
    AuthModule,
  ],
  providers: [EventsService, EventsResolver],
  controllers: [],
  exports: [EventsService],
})
export class EventsModule { }
