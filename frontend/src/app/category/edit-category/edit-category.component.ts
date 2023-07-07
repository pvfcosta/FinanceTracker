import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { CategoryService } from 'app/shared/services/category.service';
import { Subject, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnDestroy  {
  id: number = 0;
  
  category: Category = new Category('');

  editCategoryForm: FormGroup = this.formBuilder.group({});

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  private subscribe: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
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
      this.getCategory();
   });
  }

  getCategory(): void {
    this.categoryService.getCategoryById(this.id).pipe(take(1)).subscribe((editCategory: Category) => {
      this.category = editCategory;
      this.createForm();
    })
  }

  createForm(): void {
    this.editCategoryForm = this.formBuilder.group({
      name: this.formBuilder.control<string>(this.category.name, [Validators.required, Validators.maxLength(50)]),
    });
  }

  onEditClick(): void {
    const name: string = this.editCategoryForm.value.name
    const category: Category = new Category(name,this.category.id, this.category.creationDate);
    this.categoryService.editCategory(category).pipe(take(1)).subscribe(() => {
      this.router.navigate(['categories']);
    })
  }
}
