export class UserDto {
    constructor(
        public readonly Clave: string,
        public readonly Nombre: string,
        public readonly Correo: string,
        public readonly Telefono: string
    ) { }
}