import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {MenuItem} from "../../app.models";

@Injectable({
    providedIn: 'root'
})
export class MenuItemService {

    constructor(private http: HttpClient) {
    }

    public addMenu(menuItem: any) {
        return this.http.post(`${environment.apiUrl}${environment.menuItems}/add-menu-item`, menuItem)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public editMenu(id: number, menuItem: any) {
        return this.http.patch(`${environment.apiUrl}${environment.menuItems}/update-menuItem/${id}`, menuItem)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public getAllMenuItems(): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${environment.apiUrl}${environment.menuItems}/get-all-menu-items`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }
    public getMenuItemById(id: number): Observable<MenuItem> {
        return this.http.get<MenuItem>(`${environment.apiUrl}${environment.menuItems}/menu-item-by-id/${id}`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }
    public rateMenuItem(id: number,rating): Observable<MenuItem> {
        return this.http.patch<MenuItem>(`${environment.apiUrl}${environment.menuItems}/rate-menu-item/${id}?rating=${rating}`,null)

    }

    public deleteMenu(menuItem: MenuItem): Observable<MenuItem> {
        return this.http.delete<MenuItem>(`${environment.apiUrl}${environment.menuItems}/delete-menu-item/${menuItem?.id}`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }
}
