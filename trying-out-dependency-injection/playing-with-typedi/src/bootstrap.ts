import Container from "typedi";
import { USER_SERVICE_KEY, UserServiceImpl } from "./features/user/service";
import {
	InMemoryUserRespository,
	USER_REPOSITORY_KEY,
} from "./features/user/repository";

Container.set(USER_REPOSITORY_KEY, InMemoryUserRespository);
Container.set(USER_SERVICE_KEY, UserServiceImpl);

console.log('Registered Dependencies')
