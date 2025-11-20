import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { SeedResponse } from './inputs/seed-response.type';

@Resolver()
export class SeedResolver {
    constructor(private readonly seedService: SeedService) { }

    @Mutation(() => SeedResponse, { description: 'Ejecutar seed de datos (poblar BD)' })
    async executeSeed(): Promise<SeedResponse> {
        const result = await this.seedService.seedAll();
        return { message: result.message };
    }

    @Mutation(() => SeedResponse, { description: 'Limpiar todos los datos de la base de datos' })
    async clearDatabase(): Promise<SeedResponse> {
        const result = await this.seedService.clearAll();
        return { message: result.message };
    }
}
