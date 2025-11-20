import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';
import { CreateBetInput } from './inputs/create-bet.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GqlRolesGuard } from '../auth/guards/gql-roles.guard';
import { RoleProtected } from '../auth/decorators/role-protected.decorator';
import { ValidRoles } from '../auth/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';

@Resolver(() => Bet)
export class BetsResolver {
  constructor(private readonly betsService: BetsService) { }

  @Mutation(() => Bet, { description: 'Crear una nueva apuesta' })
  @UseGuards(GqlAuthGuard)
  async createBet(
    @Args('createBetInput') createBetInput: CreateBetInput,
    @CurrentUser() user: User,
  ): Promise<Bet> {
    // El usuario autenticado realiza la apuesta automáticamente
    // Se ignora el userId del input y se usa el del token JWT
    createBetInput.userId = user.id;
    return this.betsService.create(createBetInput);
  }

  @Query(() => [Bet], { name: 'bets', description: 'Obtener todas las apuestas (Solo Admin)' })
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @RoleProtected(ValidRoles.ADMIN)
  async findAllBets(): Promise<Bet[]> {
    return this.betsService.findAll();
  }

  @Query(() => Bet, { name: 'bet', description: 'Obtener una apuesta por ID' })
  @UseGuards(GqlAuthGuard)
  async findOneBet(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Bet> {
    const bet = await this.betsService.findOne(id);
    // Verificar que el usuario solo pueda ver sus propias apuestas, o sea admin
    if (bet.userId !== user.id && !user.roles.includes(ValidRoles.ADMIN)) {
      throw new Error('No tienes permiso para ver esta apuesta');
    }
    return bet;
  }

  @Query(() => [Bet], { name: 'betsByUser', description: 'Obtener apuestas de un usuario específico' })
  @UseGuards(GqlAuthGuard)
  async findBetsByUser(
    @Args('userId', { type: () => ID }, ParseUUIDPipe) userId: string,
    @CurrentUser() user: User,
  ): Promise<Bet[]> {
    // Solo el propio usuario o un admin puede ver las apuestas
    if (userId !== user.id && !user.roles.includes(ValidRoles.ADMIN)) {
      throw new Error('No tienes permiso para ver las apuestas de este usuario');
    }
    return this.betsService.findByUser(userId);
  }

  @Query(() => [Bet], { name: 'myBets', description: 'Obtener las apuestas del usuario autenticado' })
  @UseGuards(GqlAuthGuard)
  async findMyBets(@CurrentUser() user: User): Promise<Bet[]> {
    return this.betsService.findByUser(user.id);
  }

  @Query(() => [Bet], { name: 'betsByEvent', description: 'Obtener apuestas de un evento específico (Solo Admin)' })
  @UseGuards(GqlAuthGuard, GqlRolesGuard)
  @RoleProtected(ValidRoles.ADMIN)
  async findBetsByEvent(
    @Args('eventId', { type: () => ID }, ParseUUIDPipe) eventId: string,
  ): Promise<Bet[]> {
    return this.betsService.findByEvent(eventId);
  }

  @Mutation(() => Boolean, { description: 'Eliminar una apuesta (Solo apuestas pendientes)' })
  @UseGuards(GqlAuthGuard)
  async removeBet(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    const bet = await this.betsService.findOne(id);
    // Solo el propio usuario o un admin puede eliminar la apuesta
    if (bet.userId !== user.id && !user.roles.includes(ValidRoles.ADMIN)) {
      throw new Error('No tienes permiso para eliminar esta apuesta');
    }
    await this.betsService.remove(id);
    return true;
  }
}
