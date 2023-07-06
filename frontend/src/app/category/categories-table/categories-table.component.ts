import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'app/models/category.model';
import { CategoryService } from 'app/shared/services/category.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {
  categories: Array<Category> = new Array<Category>();

  tableDataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();

  displayedColumns: Array<string> = ['Name','Actions'];

  constructor(private categoryService: CategoryService){
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().pipe(take(1)).subscribe((retrievedCategories: Array<Category>) => {
      this.categories = retrievedCategories;
      this.setTable();
    })
  }

  setTable(): void {
    if (this.categories == null || !this.categories.length)
      return;
    
    this.tableDataSource = new MatTableDataSource(this.categories);
  }



}
