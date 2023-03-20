export class Task{
    id: number;
    nombre: string;
    estado: boolean;
    constructor(id:number,nombre:string){
        this.id=id;
        this.nombre=nombre;
        this.estado=false;
    }

  
    toString():string{
        return `this.id ->${this.nombre} esta ${this.estado})`
    }
}
