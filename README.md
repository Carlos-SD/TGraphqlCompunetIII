# TGraphqlCompunetIII

## GraphQL Migration
Se ha iniciado la transición de una arquitectura REST a GraphQL para mejorar la flexibilidad y eficiencia en el consumo de datos.

### Módulos Migrados
#### 1. Configuración Base
- Implementación de **Apollo Server** con NestJS (Code First approach).
- Configuración de `GqlAuthGuard` para proteger endpoints mediante JWT.

#### 2. Entidades & Tipos
- Las entidades `Bet`, `Event`, `EventOption` y `User` ahora son también `ObjectTypes` de GraphQL.
- Se han añadido decoradores `@Field` para exponer propiedades específicas al esquema.

#### 3. Auth Module
- **Resolvers**: `register`, `login`, `profile`.
- **Inputs**: Validación de datos de entrada mediante `LoginInput` y `RegisterInput`.

#### 4. Users Module
- **CRUD Completo**: Implementación de `UsersResolver` para gestionar usuarios.
- **Seguridad**: Endpoints críticos (como `users` y `removeUser`) protegidos para rol ADMIN.
- **Operaciones**:
  - `createUser`: Registro de nuevos usuarios.
  - `users`: Listado general (Admin).
  - `user`: Búsqueda por ID.
  - `userByUsername`: Búsqueda por nombre de usuario (Admin).
  - `updateUser`: Actualización de perfil.
  - `removeUser`: Eliminación lógica/física (Admin).
  - `getUserBalance`: Consulta de saldo.

### Stack Tecnológico
- **NestJS + GraphQL**: Framework principal.
- **Apollo Server**: Servidor GraphQL robusto que facilita la definición de esquemas, la ejecución de consultas y proporciona herramientas esenciales como el Playground para pruebas y documentación interactiva. (@nestjs/apollo)
- **TypeORM**: ORM para interacción con base de datos Postgres.
- **JWT**: Autenticación segura.
