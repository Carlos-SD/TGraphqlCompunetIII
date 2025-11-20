# TGraphqlCompunetIII

## 🚀 Endpoint GraphQL

El backend está desplegado en Render y el endpoint GraphQL está disponible en:

**https://tgraphqlcompunetiii.onrender.com/graphql**

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

#### 5. Events Module
- **Resolver Completo**: Gestión de eventos deportivos para apuestas.
- **Seguridad**: Operaciones de creación, actualización, cierre y eliminación protegidas para rol ADMIN.
- **Operaciones**:
  - `createEvent`: Crear nuevos eventos con opciones de apuesta (Admin).
  - `events`: Listar todos los eventos.
  - `eventsOpen`: Listar eventos abiertos disponibles para apostar.
  - `event`: Obtener un evento por ID.
  - `updateEvent`: Actualizar información del evento (Admin).
  - `closeEvent`: Cerrar evento y procesar resultados (Admin).
  - `removeEvent`: Eliminar un evento (Admin).

#### 6. Bets Module
- **Resolver Completo**: Sistema de apuestas con validaciones y seguridad.
- **Seguridad**: Control de acceso basado en propiedad y roles.
- **Operaciones**:
  - `createBet`: Crear una nueva apuesta (usuario autenticado).
  - `bets`: Listar todas las apuestas (Admin).
  - `bet`: Obtener una apuesta por ID (propietario o Admin).
  - `betsByUser`: Obtener apuestas de un usuario específico (propietario o Admin).
  - `myBets`: Obtener las apuestas del usuario autenticado.
  - `betsByEvent`: Obtener apuestas de un evento específico (Admin).
  - `removeBet`: Eliminar una apuesta pendiente (propietario o Admin).
- **Validaciones**:
  - Verificación de saldo suficiente.
  - Validación de estado del evento (solo eventos abiertos).
  - Prevención de apuestas duplicadas por evento.
  - Solo se pueden eliminar apuestas pendientes.

### Tests de Postman
Se ha creado una colección completa de tests GraphQL en `backend/postman/`:
- **19 tests** organizados en 5 módulos: Seed, Auth, Users, Events, Bets.
- **Variables de entorno**: `url_graphql`, tokens de autenticación, y IDs de recursos se manejan automáticamente.
- **Flujos completos**: Pruebas de CRUD, autenticación, autorización y validaciones de negocio.

**Uso**: Importar `Sports Bet GraphQL.postman_collection.json` y `Sports Bet GraphQL.postman_environment.json` en Postman.

### Stack Tecnológico
- **NestJS + GraphQL**: Framework principal.
- **Apollo Server**: Servidor GraphQL robusto que facilita la definición de esquemas, la ejecución de consultas y proporciona herramientas esenciales como el Playground para pruebas y documentación interactiva. (@nestjs/apollo)
- **TypeORM**: ORM para interacción con base de datos Postgres.
- **JWT**: Autenticación segura.
