import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoriesViewComponent } from './category/categories-view/categories-view.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddTransactionComponent } from './transactions/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './transactions/edit-transaction/edit-transaction.component';
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
    path:'transactions/edit/:id',
    component: EditTransactionComponent,    
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
  },
  {
    path:'categories/edit/:id',
    component:EditCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs: true})],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
