import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { Transaction } from 'app/models/transaction.model';
import { CategoryService } from 'app/shared/services/category.service';
import { TransactionService } from 'app/shared/services/transaction.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.scss']
})
export class EditTransactionComponent implements OnDestroy {
  id: number = 0;
  
  transaction: Transaction = new Transaction(0, '');

  editTransactionForm: FormGroup = this.formBuilder.group({});

  destroy$: Subject<boolean> = new Subject<boolean>();

  categories: Array<Category> = new Array<Category>();

  private subscribe: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute,
  ){ 
    this.listenToParam();
  }
  
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  listenToParam(): void {
    this.subscribe= this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getCategories();
   });
  }

  getTransaction(): void {
    this.transactionService.getTransactionById(this.id).pipe(take(1)).subscribe((editTransaction: Transaction) => {
      this.transaction = editTransaction;
      this.createForm();
    })
  }

  createForm(): void {
    this.editTransactionForm = this.formBuilder.group({
      transactionValue: this.formBuilder.control<string>(this.transaction.value.toFixed(2), [Validators.required, Validators.pattern(/^(?:[0-9]{1,9}(?:[.,][0-9]{0,2})?|[0-9]{0,9}[.,][0-9]{1,2})$/)]),
      description: this.formBuilder.control<string>(this.transaction.description,[Validators.maxLength(200)]),
      category: this.formBuilder.control<Category>(new Category('')),
    });
    var cat = this.categories.find(cat => cat.id == this.transaction.categoryId);
    if (cat) this.editTransactionForm.controls['category'].setValue(cat);
  }

  onEditClick(): void {
    this.transaction = new Transaction(
      parseFloat(this.editTransactionForm.value.transactionValue.replace(',','.')),
      this.editTransactionForm.value.description,
      this.transaction.transactionDate,
      this.editTransactionForm.value.category.id > 0 ? this.editTransactionForm.value.category.id : null,
      this.id);
    this.transactionService
      .editTransaction(this.transaction)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate(['transactions']);
      });
  }

  getCategories(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((retrievedCategories: Array<Category>) => {
      this.categories = retrievedCategories;
      this.categories.unshift(new Category('None',0));
      this.getTransaction();
    })
  }

  isButtonDisabled(): boolean {
    this.editTransactionForm.updateValueAndValidity();
    return !!this.editTransactionForm.controls['transactionValue']?.errors || 
    !!this.editTransactionForm.controls['description']?.errors ||
    !!this.editTransactionForm.controls['category']?.errors;
  }
}
