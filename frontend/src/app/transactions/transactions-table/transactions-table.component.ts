import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Transaction } from 'app/models/transaction.model';
import { TransactionService } from 'app/shared/services/transaction.service';
import { Subject, takeUntil } from 'rxjs';
import { TransactionManagerService } from '../transaction-manager.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
})
export class TransactionsTableComponent implements OnDestroy {
  transactions: Array<Transaction> = new Array<Transaction>();

  tableDataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>();

  displayedColumns: Array<string> = ['Value','Description','Date','Category', 'Actions'];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private transactionService: TransactionService, 
    private transactionManagerService: TransactionManagerService,
    private router: Router){
    this.getTransactions();
  }

  ngOnDestroy(): void {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
    .pipe(takeUntil(this.destroy$))
    .subscribe((retrievedTransactions: Array<Transaction>) => {
      this.transactions = retrievedTransactions;
      this.setTable();
    })
  }

  setTable(): void {
    if (this.transactions == null || !this.transactions.length) {
      this.tableDataSource = new MatTableDataSource();
      return;
    }
      
    this.tableDataSource = new MatTableDataSource(this.transactions);
  }

  deleteTransaction(transaction: Transaction): void {
    if (transaction.id)
      this.transactionService.deleteTransaction(transaction.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const index: number = this.transactions.indexOf(transaction);
        this.transactions.splice(index, 1);
        this.setTable();
      })
  }

  editTransaction(transaction: Transaction): void {
    this.router.navigate(['transactions', transaction.id]);
    this.transactionManagerService.transactionSubject.next(transaction);
  }
}
