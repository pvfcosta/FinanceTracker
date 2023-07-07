import { Injectable } from "@angular/core";
import { Category } from "app/models/category.model";
import { Transaction } from "app/models/transaction.model";
import { Subject } from "rxjs";

@Injectable()
export class TransactionManagerService {
    public categorySubject: Subject<Category> = new Subject<Category>();

    public transactionSubject: Subject<Transaction> = new Subject<Transaction>();
}