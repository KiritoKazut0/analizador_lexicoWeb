import { User } from "../data/models/user";
import { UserDto } from "../data/models/user.dto";
import { UserRepository } from "../data/repositories/userRepository";


export class CreateUserUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async run (user: User): Promise<UserDto | null> {
        try {
            const response = await this.userRepository.create(user);
            return response ? new UserDto(
                response.Clave,
                response.Nombre,
                response.Correo,
                response.Telefono    
            ) : null;

        } catch (error) {
            throw new Error("Error creating user: " + (error as Error).message);
        }
    }

}