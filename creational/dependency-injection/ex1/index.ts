// setup.ts
import { DIContainer } from './DI';
import { Database } from './database';
import { UserService } from './user-service';

const container = new DIContainer();

container.register(Database);
container.register(UserService, [Database]);

const userService = container.resolve(UserService);

userService.getUsers();
