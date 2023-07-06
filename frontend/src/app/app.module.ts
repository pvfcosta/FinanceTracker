import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoriesTableComponent } from './category/categories-table/categories-table.component';
import { CategoriesViewComponent } from './category/categories-view/categories-view.component';
import { HeaderComponent } from './core/header/header.component';
import { CategoryService } from './shared/services/category.service';
import { AddTransactionComponent } from './transactions/add-transaction/add-transaction.component';
import { TransactionsTableComponent } from './transactions/transactions-table/transactions-table.component';
import { TransactionsViewComponent } from './transactions/transactions-view/transactions-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsTableComponent,
    TransactionsViewComponent,
    AddTransactionComponent,
    AddCategoryComponent,
    CategoriesTableComponent,
    CategoriesViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
