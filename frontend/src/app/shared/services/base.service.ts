import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class BaseService {
    private apiUrl: string = "http://localhost:8000/api";
    
    constructor(
        private http: HttpClient,
        protected router: Router,
    ){

    }

    protected post<T>(route: string, body: Object|null = null, parameters: { [key: string]: any } = {}) {
        const url = this.getRoute(route);
        const httpParams: HttpParams = new HttpParams({ fromObject: parameters });
        const httpHeader = this.createHttpHeader();
        return <Observable<T>>this.http.post(url, body, {
            params: httpParams,
            headers: httpHeader
        })
        .pipe(catchError((error) => this.error(error)))

    }

    protected get<T>(route: string, parameters: { [key: string]: any } = {}, responseTypeName: string = 'json', concatArrayParams: boolean = false) {
        const url = this.getRoute(route);
        const httpHeader = this.createHttpHeader();
        const httpParams = this.createHttpParams(parameters, concatArrayParams);
        const responseType: { [key: string]: any } = { responseType: responseTypeName };

        const options = {
            params: httpParams,
            headers: httpHeader,
            ...responseType
        };

        return <Observable<T>>(this.http.get<T>(url, options).pipe(catchError((error) => this.error(error))));

    }

    protected put<T>(route: string, body: Object|null = null, parameters: { [key: string]: any } = {}){
        const url = this.getRoute(route);
        const httpParams: HttpParams = new HttpParams({ fromObject: parameters });
        const httpHeader = this.createHttpHeader();
        return <Observable<T>>this.http.put(url, body, {
            params: httpParams,
            headers: httpHeader
        })
        .pipe(catchError((error) => this.error(error)))
    }

    protected delete<T>(route: string, parameters: { [key: string]: any } = {}) {
        const url = this.getRoute(route);
        const httpParams: HttpParams = new HttpParams({ fromObject: parameters });
        const httpHeader = this.createHttpHeader();
        return <Observable<T>>this.http.delete(url, {
            params: httpParams,
            headers: httpHeader
        })
        .pipe(catchError((error) => this.error(error)))
    }

    private createHttpParams(params: { [key: string]: any } = {}, concatArrayParams: boolean): HttpParams {
        let httpParams: HttpParams = new HttpParams();
        Object.keys(params).forEach((param: string) => {
            if (this.verifyParamValidity(params, param) && Array.isArray(params[param]) && !concatArrayParams) {
                params[param].forEach((paramValue: any) => {
                    httpParams = httpParams.append(param, paramValue);
                });
            } else {
                httpParams = httpParams.set(param, params[param]);
            }
        });

        return httpParams;
    }

    private verifyParamValidity(params: { [key: string]: any[] } = {}, param: string): boolean {
        return (
            params[param] != null && ((Array.isArray(params[param] && params[param].length)) || !Array.isArray(params[param]))
        );
    }
    
    private error(error: any): Observable<any> {
        return throwError(() => Error(error.toString()));
    }

    private createHttpHeader() {
        const language = 'en-US';
        let httpHeader: HttpHeaders = new HttpHeaders();
        httpHeader = httpHeader.set('Accept-Language', language).append('UtcOffset', new Date().getTimezoneOffset().toString());
        return httpHeader;
    }

    private getRoute(route: string): string {
        return `${this.apiUrl}/${route}`;
    }
    
}