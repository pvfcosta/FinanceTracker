import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/models/category.model';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class CategoryService extends BaseService {
    constructor(http: HttpClient, router: Router){
        super(http, router);
    }
    
    postCategory(category: Category): Observable<Category> {
        return this.post<Category>('category', category);
    }

    getCategories(): Observable<Array<Category>> {
        return this.get<Array<Category>>('category');
    }

}