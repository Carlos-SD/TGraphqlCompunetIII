import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './inputs/create-event.input';
import { UpdateEventInput } from './inputs/update-event.input';
import { CloseEventInput } from './inputs/close-event.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql-roles.guard';
import { RoleProtected } from '../auth/decorators/role-protected.decorator';
import { ValidRoles } from '../auth/enums/roles.enum';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) { }

  @Mutation(() => Event, { description: 'Crear un nuevo evento (Solo Admin)' })
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @RoleProtected(ValidRoles.ADMIN)
  async createEvent(
    @Args('createEventInput') createEventInput: CreateEventInput,
  ): Promise<Event> {
    // Convertir Input a DTO para el servicio
    const createEventDto = {
      name: createEventInput.name,
      description: createEventInput.description,
      options: createEventInput.options.map(opt => ({
        name: opt.name,
        odds: opt.odds,
      })),
    };
    return this.eventsService.create(createEventDto);
  }

  @Query(() => [Event], { name: 'events', description: 'Obtener todos los eventos' })
  async findAllEvents(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Query(() => [Event], { name: 'eventsOpen', description: 'Obtener eventos abiertos disponibles para apostar' })
  async findOpenEvents(): Promise<Event[]> {
    return this.eventsService.findAllOpen();
  }

  @Query(() => Event, { name: 'event', description: 'Obtener un evento por ID' })
  async findOneEvent(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Mutation(() => Event, { description: 'Actualizar un evento (Solo Admin)' })
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @RoleProtected(ValidRoles.ADMIN)
  async updateEvent(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ): Promise<Event> {
    const updateEventDto = {
      name: updateEventInput.name,
      description: updateEventInput.description,
    };
    return this.eventsService.update(id, updateEventDto);
  }

  @Mutation(() => Event, { description: 'Cerrar un evento y procesar resultados (Solo Admin)' })
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @RoleProtected(ValidRoles.ADMIN)
  async closeEvent(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Args('closeEventInput') closeEventInput: CloseEventInput,
  ): Promise<Event> {
    const closeEventDto = {
      finalResult: closeEventInput.finalResult,
    };
    return this.eventsService.closeEvent(id, closeEventDto);
  }

  @Mutation(() => Boolean, { description: 'Eliminar un evento (Solo Admin)' })
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @RoleProtected(ValidRoles.ADMIN)
  async removeEvent(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    await this.eventsService.remove(id);
    return true;
  }
}
