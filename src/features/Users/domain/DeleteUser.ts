import { UserRepository } from "../data/repositories/userRepository";

export class DeleteUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async run (id: string): Promise<void> {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new Error("Error deleting user: " + (error as Error).message);
        }
    }
}