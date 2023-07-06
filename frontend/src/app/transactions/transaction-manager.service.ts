import { Injectable } from "@angular/core";
import { Category } from "app/models/category.model";
import { Subject } from "rxjs";

@Injectable()
export class TransactionManagerService {
    public categorySubject: Subject<Category> = new Subject<Category>();
}