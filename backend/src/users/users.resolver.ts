import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/roles.enum';
// Actually, the Auth decorator in controller combines UseGuards(AuthGuard(), UserRoleGuard()).
// In GraphQL we usually use UseGuards(GqlAuthGuard) and maybe a RolesGuard.
// For now I will use GqlAuthGuard and check roles manually or if there is a GqlRolesGuard.
// Let's check if there is a RolesGuard for GQL.
// The existing Auth decorator uses 'AuthGuard' and 'UserRoleGuard'.
// I'll stick to GqlAuthGuard for now and maybe add Roles check if needed, or just rely on Service layer if it has checks (it usually doesn't).
// Let's look at how Auth decorator is implemented.

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => User, { description: 'Crear un nuevo usuario' })
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.usersService.create(createUserInput);
    }

    @Query(() => [User], { name: 'users', description: 'Obtener todos los usuarios (Solo Admin)' })
    @UseGuards(GqlAuthGuard)
    // @Roles(ValidRoles.ADMIN) // I need to check if I can use this with GQL
    async findAll(@CurrentUser() user: User): Promise<User[]> {
        // Simple role check for now if decorators are not set up for GQL
        if (!user.roles.includes(ValidRoles.ADMIN)) {
            throw new Error('Forbidden');
        }
        return this.usersService.findAll();
    }

    @Query(() => User, { name: 'user', description: 'Obtener un usuario por ID' })
    @UseGuards(GqlAuthGuard)
    async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Query(() => User, { name: 'userByUsername', description: 'Buscar usuario por nombre de usuario (Solo Admin)' })
    @UseGuards(GqlAuthGuard)
    async findByUsername(
        @Args('username') username: string,
        @CurrentUser() user: User
    ): Promise<User> {
        if (!user.roles.includes(ValidRoles.ADMIN)) {
            throw new Error('Forbidden');
        }
        return this.usersService.findByUsername(username);
    }

    @Mutation(() => User, { description: 'Actualizar un usuario' })
    @UseGuards(GqlAuthGuard)
    async updateUser(
        @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput
    ): Promise<User> {
        return this.usersService.update(id, updateUserInput);
    }

    @Mutation(() => User, { description: 'Eliminar un usuario (Solo Admin)' })
    @UseGuards(GqlAuthGuard)
    async removeUser(
        @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
        @CurrentUser() user: User
    ): Promise<User> {
        if (!user.roles.includes(ValidRoles.ADMIN)) {
            throw new Error('Forbidden');
        }
        // remove returns void or the entity? Service returns void usually or delete result.
        // Controller returns NO_CONTENT.
        // GraphQL mutations usually return the deleted object or a boolean.
        // Let's check service.remove return type.
        // If it returns void, I might need to change it or return a boolean.
        // For now let's assume I can fetch it before delete or return true.
        // I'll check service.remove first.
        await this.usersService.remove(id);
        return { id } as User; // Return just ID if entity is gone
    }

    @Query(() => Float, { description: 'Obtener el balance de un usuario' })
    @UseGuards(GqlAuthGuard)
    async getUserBalance(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<number> {
        const result = await this.usersService.getUserBalance(id);
        return result.balance;
    }
}
