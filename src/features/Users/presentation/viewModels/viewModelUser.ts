import { makeAutoObservable, runInAction } from "mobx";
import { CreateUserUseCase } from "../../domain/CreateUser";
import { User } from "../../data/models/user";
import { UserDto } from "../../data/models/user.dto";
import { UserRepository } from "../../data/repositories/userRepository";
import { UpdateUserUseCase } from "../../domain/UpdateUser";
import { GetUsersUseCase } from "../../domain/GetUsers";


export class UserViewModel {
    Nombre: string = "";
    Clave: string = "";
    Correo: string = "";
    Telefono: string = "";
    UserToEdit: UserDto | null = null;
    error: string | null = null;
    isValid: boolean = false;
    isSubmitting: boolean = false;
    users: UserDto[] = [];


    private createUserUseCase: CreateUserUseCase;
    private updateUserUseCase: UpdateUserUseCase;
    private getUsersUseCase: GetUsersUseCase;
    private userRepository: UserRepository;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.createUserUseCase = new CreateUserUseCase();
        this.updateUserUseCase = new UpdateUserUseCase();
        this.getUsersUseCase = new GetUsersUseCase();
        this.userRepository = new UserRepository();

    }

    onchangeNombre = (nombre: string) => (this.Nombre = nombre);
    onchangeClave = (clave: string) => (this.Clave = clave);
    onchangeCorreo = (correo: string) => (this.Correo = correo);
    onchangeTelefono = (telefono: string) => (this.Telefono = telefono);

    async createUser() {
        this.error = null;
        this.isValid = false;
        this.isSubmitting = true;

        try {
            if (this.Nombre === "" || this.Clave === "" || this.Correo === "" || this.Telefono === "") {
                throw new Error("Todos los campos son obligatorios");
                return;
            }

            const user = new User(this.Nombre, this.Clave, this.Correo, this.Telefono);
            const result = await this.createUserUseCase.run(user);

            if (result) {
                runInAction(() => {
                    this.isValid = true;
                    this.Nombre = "";
                    this.Clave = "";
                    this.Correo = "";
                    this.Telefono = "";
                });
                await this.loadUsers();
            }
        } catch (error) {
            runInAction(() => this.error = (error as Error).message);
        } finally {
            runInAction(() => this.isSubmitting = false);
        }

    }


    async loadUsers() {
        this.error = null;
        try {
            const result = await this.getUsersUseCase.run();
            runInAction(() => (this.users = result || []));

        } catch (error) {
            runInAction(() => (this.error = (error as Error).message));
        }
    }

    async deleteUser(clave: string) {
        this.error = null;
        try {

            await this.userRepository.delete(clave);
            runInAction(() => {
                this.users = this.users.filter((user) => user.Clave !== clave);
            });

        } catch (error) {
            runInAction(() => (this.error = (error as Error).message));
        }
    }

    editUser = async (user: UserDto) => {
        this.UserToEdit = user;
        this.Nombre = user.Nombre;
        this.Clave = user.Clave;
        this.Correo = user.Correo;
        this.Telefono = user.Telefono;
    }

    async UpdateUser(updateUserDto: UserDto) {
        try {
            if (!updateUserDto.Clave.trim() || !updateUserDto.Nombre.trim() || !updateUserDto.Correo.trim() || !updateUserDto.Telefono.trim()) {
                this.error = "Todos los campos son obligatorios";
                return;
            }

            const result = await this.updateUserUseCase.run(updateUserDto);
            if (result) {
                runInAction(() => {
                    this.users = this.users.map((user) =>
                        user.Clave === result.Clave ? result : user
                    );
                    this.Clave = "";
                    this.Nombre = "";
                    this.Correo = "";
                    this.Telefono = "";
                    this.UserToEdit = null;
                    this.isValid = true;
                });
            }

        } catch (error) {
            runInAction(() => (this.error = (error as Error).message));
        } finally {
            runInAction(() => (this.isSubmitting = false));
        }

    }

    setUserField(field: keyof UserDto, value: string) {
        if (this.UserToEdit && field === "Clave") {
            this.UserToEdit = {
                ...this.UserToEdit,
                [field]: value
            };
        }
    }

    async saveEditedUser(onSuccess: () => void) {
        if (this.UserToEdit) {
            try {
                await this.UpdateUser(this.UserToEdit);
               alert("Usuario actualizado correctamente");
                onSuccess();
            } catch (error) {
                this.error = (error as Error).message;
            }
        }

    }

}


