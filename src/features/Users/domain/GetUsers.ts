import { UserDto } from "../data/models/user.dto";
import { UserRepository } from "../data/repositories/userRepository";

export class GetUsersUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async run (): Promise<UserDto[] | null> {
        try {
            
            return await this.userRepository.getAll()
        } catch (error) {
            throw new Error("Error getting user: " + (error as Error).message);
        }
    }

}