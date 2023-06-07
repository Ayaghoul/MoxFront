import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../app.models";

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) {
    }

    public addCategory(categories: any) {
        return this.http.post(`${environment.apiUrl}${environment.categories}/`, categories)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${environment.apiUrl}${environment.categories}/get-all-categories`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }
}
