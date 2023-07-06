import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'app/models/category.model';
import { CategoryService } from 'app/shared/services/category.service';
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
      transactionValue: this.formBuilder.control<number>(0, [Validators.required]),
      description: this.formBuilder.control<string>('',[Validators.maxLength(200)]),
      category: this.formBuilder.control<Category>(this.category),
    });
  }

  onCreateClick(): void {

  }

  getCategories(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((retrievedCategories: Array<Category>) => {
      this.categories = retrievedCategories;
      this.categories.push(new Category('',0));
    })
  }
}