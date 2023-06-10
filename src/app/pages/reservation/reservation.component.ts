import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {AuthService} from "../../core/authentication/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReservationService} from "../../core/services/reservation.service";

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

    constructor(public appService: AppService,
                private router: Router,
                private snackBar: MatSnackBar,
                private fb: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        if (!this.authService.getUser()) {

            this.showToasts('warn', 'Vous devez se connecter d\'abord');
            this.router.navigateByUrl('/login');
        }

    }

    public onMakeReservation(event: any) {
        this.appService.makeReservation(null, event.value, false);
    }

    private showToasts(status: string, message: string) {
        this.snackBar.open(message, '×', {
            panelClass: status,
            verticalPosition: 'top',
            duration: 3000
        });

    }
}
