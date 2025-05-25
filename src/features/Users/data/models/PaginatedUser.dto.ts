import { UserDto } from "./user.dto";
export class PaginatedUserDto {
  constructor(
    public readonly users: UserDto[],
    public readonly totalCount: number,
    public readonly pageSize: number,
    public readonly currentPage: number,
    public readonly totalPages: number
  ) {}
}
