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
        return this.http.get<MenuItem[]>(`${environment.apiUrl}${environment.menuItems}/get-all-menuItem`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }

    public deleteMenu(menuItem: MenuItem): Observable<MenuItem> {
        return this.http.delete<MenuItem>(`${environment.apiUrl}${environment.menuItems}/delete-menu-item/${menuItem?.id}`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }
}
