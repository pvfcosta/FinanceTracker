import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { CategoryService } from 'app/shared/services/category.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  addCategoryForm: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) { 
    this.createForm()
  }

  createForm(): void {
    this.addCategoryForm = this.formBuilder.group({
      name: this.formBuilder.control<string>('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  onCreateClick(): void {
    const name: string = this.addCategoryForm.value.name
    const category: Category = new Category(name);
    this.categoryService.postCategory(category).pipe(take(1)).subscribe(() => {
      this.router.navigate(['categories']);
    })
  }

}
