export class Category {
    public name: string;
    public id?: number;
    
    constructor(name: string, id?: number){
        this.name = name;
        this.id = id;
    }
}