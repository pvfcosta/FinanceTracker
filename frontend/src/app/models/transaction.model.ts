import { Category } from "./category.model";

export class Transaction {
    public value: number;

    public description: string;

    public transactionDate?: Date;

    public categoryId?: number

    public id?: number;

    public category?: Category;
    
    constructor(
        value: number, 
        description: string, 
        transactionDate?: Date, 
        categoryId?: number, 
        id?: number,
        category?: Category){
        this.value = value;
        this.description = description;
        this.transactionDate = transactionDate;
        this.categoryId = categoryId;
        this.id = id;
        this.category = category;
    }
}