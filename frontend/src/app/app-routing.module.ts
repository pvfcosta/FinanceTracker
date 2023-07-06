import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoriesViewComponent } from './category/categories-view/categories-view.component';
import { AddTransactionComponent } from './transactions/add-transaction/add-transaction.component';
import { TransactionsViewComponent } from './transactions/transactions-view/transactions-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/transactions',
    pathMatch: 'full'
  },
  {
    path:'transactions',
    component: TransactionsViewComponent,    
  },
  {
    path:'transactions/add',
    component: AddTransactionComponent,
  },
  {
    path:'categories/add',
    component: AddCategoryComponent,
  },
  {
    path:'categories',
    component:CategoriesViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
