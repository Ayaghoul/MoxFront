import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cart, Chef} from "../../app.models";
import {environment} from "../../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ChefsService {

    constructor(private http: HttpClient) {
    }

    placeChef(chef: Chef, chefId: number) {
        return this.http.patch(`${environment.apiUrl}${environment.chefs}/place-chef/${chefId}`, chef);
    }
    getAllChefs() {
        return this.http.get(`${environment.apiUrl}${environment.chefs}/get-all-chef`)
    }

    changeChefStatus(id: number, status: string) {
        return this.http.patch(`${environment.apiUrl}${environment.chefs}/change-chef-status/${id}`, status);
    }

    getChefByUserId(): Observable<Chef[]> {
        return this.http.get<Chef[]>(`${environment.apiUrl}${environment.chefs}/get-chef-by-user-id`);
    }

    public addChef(chef: any) {
        return this.http.post(`${environment.apiUrl}${environment.chefs}/add-chef`, chef)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public updateChef(chef: any) {
        return this.http.patch(`${environment.apiUrl}${environment.chefs}/update-chef/${chef?.id}`, chef)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public deleteChef(chef: any) {
        return this.http.delete(`${environment.apiUrl}${environment.chefs}/delete-chef/${chef?.id}`)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }
}
