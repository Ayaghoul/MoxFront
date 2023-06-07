import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as moment from 'moment';
import {BehaviorSubject, throwError} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';

const helper = new JwtHelperService();

const api = environment.apiUrl;

@Injectable()
export class AuthService {
    role: any;
    isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    constructor(private http: HttpClient,
                private router: Router) {
    }

    login(user: any) {
        // console.log(JSON.stringify(user))
        return this.http.post(`${api}login`, user).pipe(map((res: any) => {
            console.log(res);
            const decodedToken = helper.decodeToken(res.token);
            console.log(decodedToken)
            this.setSession(res);
            this.getMe(decodedToken.sub);
            this.isLoggedInSubject.next(true);

            return res;
        }, (err: { message: any; }) => {
            console.error(err)
        }));
    }


    isAuthenticated(): boolean {
        // here you can check if user is authenticated or not through his token
        // console.log(this.getRole())

        return this.isLoggedIn()
    }

    private setSession(authResult: { expiredIn: moment.DurationInputArg1; id: string; token: string; }) {
        console.log(authResult)
        const expiresAt = moment().add(authResult.expiredIn, 'second');
        localStorage.setItem(environment.token, authResult.token);
        localStorage.setItem(environment.ExpiresIn, JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.clear();
        this.router.navigate([('/login')]);
    }

    public isLoggedIn() {
        // console.log(moment().isBefore(this.getExpiration()));
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration(): moment.Moment {
        const expiration = localStorage.getItem(environment.ExpiresIn);
        // console.log('expiresat', moment(expiresAt));
        return moment(expiration);
    }

    public getMe(username: string) {
        return this.http.get(`${environment.apiUrl}${environment.users}/${username}`).subscribe((res: any) => {
            console.log('getuser', res)
            localStorage.setItem(environment.connectedUser, JSON.stringify(res))
            return res
        })
    }

    public addUser(user: any) {
        return this.http.post(`${environment.apiUrl}${environment.users}/signup`, user)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public getUser(): string | null {
        // @ts-ignore
        return JSON.parse(localStorage.getItem(environment.connectedUser));
    }


    public getRole(): string | null {

        // @ts-ignore
        this.role = JSON.parse(localStorage.getItem(environment.currentAdmin));
        if (this.role) {
            this.role = this.role.role
        }
        // console.log(this.role)
        return this.role
    }
}
