import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {Reservation} from "../../app.models";

@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(private http: HttpClient) {
    }

    public addReservation(reservations: any): Observable<Reservation> {
        return this.http.post<Reservation>
        (`${environment.apiUrl}${environment.reservations}/add-reservation`, reservations)
            .pipe(
                map(res => res),
                catchError(err => {
                    return throwError(err);
                }))
    }

    public editReservation(id: number, reservations: any) {
        return this.http.patch
        (`${environment.apiUrl}${environment.reservations}/update-reservation/${id}`, reservations)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }
    public changeReservationStatus(id: number, status: string) {
        return this.http.patch
        (`${environment.apiUrl}${environment.reservations}/change-reservation-status/${id}`, status)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }
    public changeReservationTable(id: number, table: string) {
        return this.http.patch
        (`${environment.apiUrl}${environment.reservations}/change-reservation-table/${id}`, table)
            .pipe(catchError(err => {
                return throwError(err);
            }))
    }

    public getAllReservations(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>
        (`${environment.apiUrl}${environment.reservations}/get-all-reservations`)
            .pipe(
                map(res=>res),
                catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }

    public getAllReservationsByUser(): Observable<Reservation[]> {
        return this.http.get<Reservation[]>
        (`${environment.apiUrl}${environment.reservations}/get-reservation-by-user-id`)
            .pipe(
                map(res=>res),
                catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }

    public getReservationById(id: number): Observable<Reservation> {
        return this.http.get<Reservation>
        (`${environment.apiUrl}${environment.reservations}/get-reservation--by-id/${id}`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }

    public deleteReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.delete<Reservation>
        (`${environment.apiUrl}${environment.reservations}/delete-reservation/${reservation?.id}`)
            .pipe(catchError(err => {
                console.log(err)
                return throwError(err);
            }))
    }
}
