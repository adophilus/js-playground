import Container from "@n8n/di";
import { UserService, UserServiceImpl } from "./features/user/service";
import {
	InMemoryUserRespository,
	UserRepository,
} from "./features/user/repository";

const userRepository = new InMemoryUserRespository();
const userService = new UserServiceImpl(userRepository);

Container.set(UserRepository, UserRepository);
Container.set(UserService, userService);

console.log("Registered Dependencies");
