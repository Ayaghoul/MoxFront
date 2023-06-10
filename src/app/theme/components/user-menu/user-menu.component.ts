import {AfterViewInit, ChangeDetectionStrategy, Component, NgZone, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {AuthService} from "../../../core/authentication/auth.service";

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserMenuComponent implements OnInit, AfterViewInit {
    isConnected = false;
    user: any

    constructor(public appService: AppService,
                public authService: AuthService) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        if (this.authService.getUser()) {
            this.user = this.authService.getUser()
            this.isConnected = true;
        }
    }

    signOut() {
        this.authService.logout();
    }
}
