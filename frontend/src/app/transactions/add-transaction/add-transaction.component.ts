import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { Transaction } from 'app/models/transaction.model';
import { CategoryService } from 'app/shared/services/category.service';
import { TransactionService } from 'app/shared/services/transaction.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnDestroy{
  addTransactionForm: FormGroup = this.formBuilder.group({});

  category: Category;

  destroy$: Subject<boolean> = new Subject<boolean>();

  categories: Array<Category> = new Array<Category>();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private router: Router,
  ){ 
    this.category = new Category('',0);
    this.createForm();
    this.getCategories();
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  createForm(): void {
    this.addTransactionForm = this.formBuilder.group({
      transactionValue: this.formBuilder.control<string>('', [Validators.required]),
      description: this.formBuilder.control<string>('',[Validators.maxLength(200)]),
      category: this.formBuilder.control<Category>(this.category),
    });
  }

  onCreateClick(): void {
    const current: Date = new Date();
    const transaction: Transaction = new Transaction(
      parseFloat(this.addTransactionForm.value.transactionValue.replace(',','.')),
      this.addTransactionForm.value.description,
      current,
      this.addTransactionForm.value.category.id > 0 ? this.addTransactionForm.value.category.id : null);
    console.log(transaction);
    this.transactionService
      .postTransaction(transaction)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['transactions']);
      });
  }

  getCategories(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((retrievedCategories: Array<Category>) => {
      this.categories = retrievedCategories;
      this.categories.unshift(new Category('None',0));
    })
  }
}
