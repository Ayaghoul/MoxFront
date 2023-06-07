import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../authentication/auth.service';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptors implements HttpInterceptor {

    constructor(public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(environment.token);
        console.log(token)
        if (token)
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`;
                    } else if (error?.error?.stack?.startsWith('JsonWebTokenError') || error?.error?.stack?.startsWith('TokenExpiredError') ) {
                        console.log('Votre session est expirée');
                        this.auth.logout();
                        errorMsg = `Error: ${error.error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                })
            )
    }
}


