import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { CategoryService } from 'app/shared/services/category.service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnDestroy {
  categories: Array<Category> = new Array<Category>();

  tableDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();

  displayedColumns: Array<string> = ['Name','Actions'];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoryService: CategoryService,
    private router: Router){
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getCategories(): void {
    this.categoryService.getCategories().pipe(take(1)).subscribe((retrievedCategories: Array<Category>) => {
      this.categories = retrievedCategories;
      this.setTable();
    })
  }

  setTable(): void {
    if (this.categories == null || !this.categories.length){
      this.tableDataSource = new MatTableDataSource();
      return;
    }      
    
    this.tableDataSource = new MatTableDataSource(this.categories);
  }

  editCategory(category: Category): void {
    this.router.navigate(['categories/edit/', category.id]);
  }

  deleteCategory(category: Category): void {
    if (category.id)
      this.categoryService.deleteCategory(category.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const index: number = this.categories.indexOf(category);
        this.categories.splice(index, 1);
        this.setTable();
      })
  }
}
