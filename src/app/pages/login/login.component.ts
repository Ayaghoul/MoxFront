import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {AppSettings, Settings} from 'src/app/app.settings';
import {AuthService} from "../../core/authentication/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm!: UntypedFormGroup;
    public hide = true;
    public bgImage: any;
    public settings: Settings;

    constructor(public fb: UntypedFormBuilder, public router: Router, private sanitizer: DomSanitizer,
                private authService: AuthService,
                public appSettings: AppSettings) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit(): void {
        this.bgImage = this.sanitizer.bypassSecurityTrustStyle('url(assets/images/others/login.jpg)');
        this.loginForm = this.fb.group({
            email: [null, Validators.compose([Validators.required])],
            password: [null, Validators.compose([Validators.required])],
        });
    }

    public onLoginFormSubmit(): void {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value)
            this.authService.login(this.loginForm.value).subscribe(res => {

                this.router.navigate(['/']);
            })
        }
    }

}
