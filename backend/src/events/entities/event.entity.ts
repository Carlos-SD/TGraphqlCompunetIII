import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EventOption } from './event-option.entity';
import { Bet } from '../../bets/entities/bet.entity';

export enum EventStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => ID, { description: 'ID único del evento' })
  @ApiProperty({
    description: 'ID único del evento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Nombre del evento' })
  @ApiProperty({
    description: 'Nombre del evento',
    example: 'Final Copa del Mundo 2024',
    maxLength: 200,
  })
  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Field(() => String, { description: 'Descripción detallada del evento', nullable: true })
  @ApiProperty({
    description: 'Descripción detallada del evento',
    example: 'Partido final entre Argentina y Brasil',
    required: false,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Field(() => String, { description: 'Estado actual del evento' })
  @ApiProperty({
    description: 'Estado actual del evento',
    enum: EventStatus,
    example: EventStatus.OPEN,
    default: EventStatus.OPEN,
  })
  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.OPEN,
  })
  status: EventStatus;

  @Field(() => String, { description: 'Resultado final del evento', nullable: true })
  @ApiProperty({
    description: 'Resultado final del evento',
    example: 'Argentina',
    required: false,
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  finalResult: string;

  @Field(() => Date, { description: 'Fecha de creación del evento' })
  @ApiProperty({
    description: 'Fecha de creación del evento',
    example: '2024-01-15T10:30:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'Fecha de última actualización del evento' })
  @ApiProperty({
    description: 'Fecha de última actualización del evento',
    example: '2024-01-20T15:45:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [EventOption], { description: 'Opciones de apuesta disponibles para el evento' })
  @ApiProperty({
    description: 'Opciones de apuesta disponibles para el evento',
    type: () => [EventOption],
  })
  @OneToMany(() => EventOption, (option) => option.event, { cascade: true })
  options: EventOption[];

  @Field(() => [Bet], { description: 'Apuestas realizadas en este evento' })
  @ApiProperty({
    description: 'Apuestas realizadas en este evento',
    type: () => [Bet],
  })
  @OneToMany(() => Bet, (bet) => bet.event)
  bets: Bet[];
}

