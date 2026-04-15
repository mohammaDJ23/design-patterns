import { DIContainer } from './DI';
import { UserService } from './user-service';

const diContainer = new DIContainer();

const userService = diContainer.resolve(UserService);

userService.getUsers();
