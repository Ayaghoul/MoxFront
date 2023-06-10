import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {CartOverviewComponent} from 'src/app/shared/cart-overview/cart-overview.component';
import {ReservationDialogComponent} from 'src/app/shared/reservation-dialog/reservation-dialog.component';
import {UsersService} from "../../../admin/users/users.service";
import {AuthService} from "../../../core/authentication/auth.service";

@Component({
    selector: 'app-toolbar1',
    templateUrl: './toolbar1.component.html'
})
export class Toolbar1Component implements OnInit, OnDestroy {
    @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
    favorites: any;

    constructor(public appService: AppService,
                public authService:AuthService,
                public usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getFavorites().subscribe(res => {
            this.favorites = res;
        });
    }

    public sidenavToggle() {
        this.onMenuIconClick.emit();
    }

    public openCart() {
        this.appService.openCart(CartOverviewComponent)
    }

    public reservation() {
        this.appService.makeReservation(ReservationDialogComponent, null, true);
    }

    ngOnDestroy() {
        this.usersService.favoritesSubject.unsubscribe();

    }
}
