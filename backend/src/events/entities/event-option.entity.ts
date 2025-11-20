import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Event } from './event.entity';

@ObjectType()
@Entity('event_options')
export class EventOption {
  @Field(() => ID, { description: 'ID único de la opción' })
  @ApiProperty({
    description: 'ID único de la opción',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Nombre de la opción de apuesta' })
  @ApiProperty({
    description: 'Nombre de la opción de apuesta',
    example: 'Argentina gana',
    maxLength: 200,
  })
  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Field(() => Float, { description: 'Cuota/probabilidad de la opción' })
  @ApiProperty({
    description: 'Cuota/probabilidad de la opción',
    example: 2.50,
    minimum: 1.01,
  })
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  odds: number;

  @Field(() => Event, { description: 'Evento al que pertenece la opción' })
  @ApiProperty({
    description: 'Evento al que pertenece la opción',
    type: () => Event,
  })
  @ManyToOne(() => Event, (event) => event.options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Field(() => String, { description: 'ID del evento asociado' })
  @ApiProperty({
    description: 'ID del evento asociado',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Column()
  eventId: string;
}

