import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'app/models/transaction.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class TransactionService extends BaseService {
    constructor(http: HttpClient, router: Router){
        super(http, router);
    }
    
    postTransaction(transaction: Transaction): Observable<Transaction> {
        return this.post<Transaction>('transaction', transaction);
    }

    getTransactions(): Observable<Array<Transaction>> {
        return this.get<Array<Transaction>>('transaction');
    }

    deleteTransaction(id: number): Observable<void> {
        const route: string = `transaction/${id}`;
        return this.delete<void>(route);
    }

    editTransaction(transaction: Transaction): Observable<Transaction> {
        return this.put<Transaction>('transaction',transaction);
    }

    getTransactionById(id: number): Observable<Transaction> {
        return this.get<Transaction>(`transaction/${id}`);
    }
}