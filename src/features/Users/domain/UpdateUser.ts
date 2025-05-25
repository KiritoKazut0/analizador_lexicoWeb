import { UserDto } from "../data/models/user.dto";
import { UserRepository } from "../data/repositories/userRepository";
import { User } from "../data/models/user";

export class UpdateUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async run (user: User): Promise<UserDto | null> {
        try {
            return await this.userRepository.update(user)
        } catch (error) {
            throw new Error("Error updating user: " + (error as Error).message);
        }
    }
}