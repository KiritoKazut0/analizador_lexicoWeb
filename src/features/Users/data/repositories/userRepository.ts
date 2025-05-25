import { PaginatedUserDto } from "../models/PaginatedUser.dto";
import { User } from "../models/user";
import { UserDto } from "../models/user.dto";

export class UserRepository {
  private readonly baseUrl: string;

  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error("API URL is not defined");
    }

    this.baseUrl = `${apiUrl}/users`;
  }

  async create(user: User): Promise<UserDto> {
    const response = await fetch(`${this.baseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Clave: user.Clave,
        Nombre: user.Nombre,
        Correo: user.Correo,
        Telefono: user.Telefono
      })
    });

    const result = await this.handleResponse(response);
    return new UserDto(
      result.data.Clave,
      result.data.Nombre,
      result.data.Correo,
      result.data.Telefono
    );
  }

  async createUsersBatch(users: User[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/lotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ users })
    });

    await this.handleResponse(response);

  }

  async getUsersPaginated(page: number, perPage: number): Promise<PaginatedUserDto> {
    const response = await fetch(`${this.baseUrl}/paginated?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await this.handleResponse(response);
    const data = result.data;

    const users = data.users.map((user: any) => new UserDto(
      user.Clave,
      user.Nombre,
      user.Correo,
      user.Telefono
    ));

    return new PaginatedUserDto(
      users,
      data.total_count,
      data.per_page,
      data.current_page,
      data.total_pages
    );
  }


  async getAll(): Promise<UserDto[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await this.handleResponse(response);
    return result.map((user: any) => new UserDto(
      user.Clave,
      user.Nombre,
      user.Correo,
      user.Telefono
    ));

  }

  async getById(id: string): Promise<UserDto> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await this.handleResponse(response);
    return new UserDto(
      result.data.Clave,
      result.data.Nombre,
      result.data.Correo,
      result.data.Telefono
    );

  }

  async update(user: User): Promise<UserDto> {
    const response = await fetch(`${this.baseUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Clave: user.Clave,
        Nombre: user.Nombre,
        Correo: user.Correo,
        Telefono: user.Telefono
      })
    });


    const result = await this.handleResponse(response);
    return new UserDto(
      result.Clave,
      result.Nombre,
      result.Correo,
      result.Telefono
    )
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });

    await this.handleResponse(response);
  }


  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en la solicitud");
    }
    return response.json();
  }
}
