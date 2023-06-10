import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {matchingPasswords, emailValidator} from 'src/app/theme/utils/app-validators';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from "../../core/authentication/auth.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public registerForm!: UntypedFormGroup;
    public hide = true;
    public bgImage: any;

    constructor(public fb: UntypedFormBuilder,
                private authService: AuthService,
                public router: Router, public snackBar: MatSnackBar, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/register.jpg)');
        this.registerForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        }, {validator: matchingPasswords('password', 'confirmPassword')});
    }

    public onRegisterFormSubmit(): void {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
            this.authService.addUser(this.registerForm.value).subscribe(res => {
                    console.log(res);
                    this.showToasts('success', 'You registered successfully! Vous pouvez se connecter');
                    this.router.navigateByUrl("/login");
                },
                err => {
                    console.log(err)
                    this.showToasts('error', err?.error?.message);

                });
        }
    }

    private showToasts(status: string, message: string) {
        this.snackBar.open(message, '×', {
            panelClass: status,
            verticalPosition: 'top',
            duration: 3000
        });

    }
}
