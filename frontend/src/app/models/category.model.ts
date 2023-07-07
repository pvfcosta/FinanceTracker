export class Category {
    public name: string;
    public id?: number;
    public creationDate?: Date;
    
    constructor(name: string, id?: number, creationDate?: Date){
        this.name = name;
        this.id = id;
        this.creationDate = creationDate;
    }
}