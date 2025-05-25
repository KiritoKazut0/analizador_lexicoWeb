export class User {
    Clave: string;
    Nombre: string;
    Correo: string;
    Telefono: string;

    constructor(clave: string, nombre: string, correo: string, telefono: string) {
        this.Clave = clave;
        this.Nombre = nombre;
        this.Correo = correo;
        this.Telefono = telefono;
    }

}