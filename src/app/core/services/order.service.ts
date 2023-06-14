import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Cart, Order} from "../../app.models";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient: HttpClient) {
    }

    placeOrder(order: Order, cartId: number) {
       return  this.httpClient.patch(`${environment.apiUrl}${environment.carts}/place-order/${cartId}`, order);
    }
    getAllOrders() {
       return  this.httpClient.get(`${environment.apiUrl}${environment.orders}/get-all-orders`);
    }
    changeOrderStatus(id:number, status:string) {
       return  this.httpClient.patch(`${environment.apiUrl}${environment.orders}/change-order-status/${id}`, status);
    }
    getOrderByUserId():Observable<Order[]> {
       return  this.httpClient.get<Order[]>(`${environment.apiUrl}${environment.orders}/get-order-by-user-id`);
    }
}
