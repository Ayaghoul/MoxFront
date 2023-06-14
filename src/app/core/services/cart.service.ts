import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Cart, MenuItem} from "../../app.models";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) {
    }

    public addCart(carts: any) {
        return this.http.post(`${environment.apiUrl}${environment.carts}/`, carts)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }
    getAllChefs() {
        return this.http.get(`${environment.apiUrl}${environment.chefs}/get-all-chefs`)
    }
    public editCart(id: number, carts: any) {
        return this.http.patch(`${environment.apiUrl}${environment.carts}/update-cart/${id}`, carts)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public getAllCarts(): Observable<Cart[]> {
        return this.http.get<Cart[]>(`${environment.apiUrl}${environment.carts}/get-all-carts`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }

    public deleteCart(cart: Cart): Observable<Cart> {
        return this.http.delete<Cart>(`${environment.apiUrl}${environment.carts}/deletecart/${cart?.id}`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }

    public addMenuItemToCart(items: number[]): Observable<Cart> {
        return this.http.patch<Cart>
        (`${environment.apiUrl}${environment.carts}/add-menu-item-cart`, items)
            .pipe(catchError(err => {
                console.log(err)
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
