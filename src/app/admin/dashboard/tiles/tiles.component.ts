import {Component, OnInit} from '@angular/core';
import {forkJoin} from "rxjs";
import {UsersService} from "../../users/users.service";
import {CartService} from "../../../core/services/cart.service";
import {ReservationService} from "../../../core/services/reservation.service";
import {CategoriesService} from "../../../core/services/categories.service";

@Component({
    selector: 'app-tiles',
    templateUrl: './tiles.component.html',
    styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
    users: any;
    carts: any;
    reservations: any;
    categories: any;

    constructor(
        private usersService: UsersService,
        private cartService:CartService,
        private reservationService:ReservationService,
        private categoriesService:CategoriesService,
        ) {
    }

    ngOnInit(): void {
        forkJoin([
            this.usersService.getUsers(),
            this.cartService.getAllCarts(),
            this.reservationService.getAllReservations(),
            this.categoriesService.getAllCategories(),

        ]).subscribe(res => {
            this.users = res[0]
            this.carts = res[1]
            this.reservations = res[2]
            this.categories = res[3]
        })
    }

}
