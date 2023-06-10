import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/authentication/auth.service";

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
    public userImage = 'assets/images/others/admin.jpg';
    user: any;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
    }

    logout() {
        this.authService.logout()
    }
}
