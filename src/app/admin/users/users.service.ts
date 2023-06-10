import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from './user.model';
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {MenuItem} from "../../app.models";

@Injectable()
export class UsersService {
    public url = "api/users";
    favoritesSubject = new BehaviorSubject<number>(0);

    constructor(public http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}${environment.users}/`);
    }

    getFavorites(): Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}${environment.users}/favoris`)
            .pipe(map(res => {
                this.favoritesSubject.next(res.length)
                return res;
            }));
    }

    addUser(user: User) {
        return this.http.post(this.url, user);
    }

    updateUser(user: User) {
        return this.http.put(this.url, user);
    }

    addMenuItemToFavoris(menuItem: MenuItem) {
        return this.http.patch
        (`${environment.apiUrl}${environment.users}/add-menu-item-favoris/${menuItem.id}`, null)
            .pipe(
                map((res: any) => {
                    const currentValue = this.favoritesSubject.getValue();
                    const newValue = currentValue + 1;
                    this.favoritesSubject.next(newValue);
                })

                , catchError(err => {
                    return throwError(err);
                }))
    }

    removeMenuItemFromFavoris(menuItem: MenuItem) {
        return this.http.delete
        (`${environment.apiUrl}${environment.users}/remove-favoris/${menuItem.id}`)
            .pipe(
                map(response => {
                        const currentValue = this.favoritesSubject.getValue();
                        const newValue = currentValue - 1;
                        this.favoritesSubject.next(newValue);
                        return response
                    },
                    catchError(err => {
                        return throwError(err);
                    })
                )
            )
    }

    deleteUser(id: number) {
        return this.http.delete(this.url + "/" + id);
    }
} 
