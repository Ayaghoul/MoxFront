import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {AuthService} from "../../core/authentication/auth.service";
import {User} from "../../app.models";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    @ViewChild('sidenav') sidenav: any;
    public sidenavOpen: boolean = true;
    public links = [
        {name: 'Dashboard', href: 'dashboard', icon: 'dashboard'},
        {name: 'Profile', href: 'profile', icon: 'person'},
        {name: 'Password Change', href: 'password-change', icon: 'vpn_key'},
        {name: 'Addresses', href: 'addresses', icon: 'location_on'},
        {name: 'Favorites', href: 'favorites', icon: 'favorite'},
        {name: 'Reservations', href: 'reservations', icon: 'event'},
        {name: 'Orders', href: 'orders', icon: 'list_alt'},
        {name: 'Logout', href: '/login', icon: 'power_settings_new'},
    ];
    user: any = {};

    constructor(public router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getUser();
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    }

    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (window.innerWidth < 960) {
                    this.sidenav.close();
                }
            }
        });
    }


}
