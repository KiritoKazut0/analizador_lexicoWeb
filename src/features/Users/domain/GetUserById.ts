import { UserDto } from "../data/models/user.dto";
import { UserRepository } from "../data/repositories/userRepository";

export class GetUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async run(id: string): Promise<UserDto | null> {
        try {
            return await this.userRepository.getById(id);
        } catch (error) {
            throw new Error("Error getting user: " + (error as Error).message);
        }
    }

}