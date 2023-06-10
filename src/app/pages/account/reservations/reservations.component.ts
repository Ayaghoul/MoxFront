import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Reservation, ReservationStatus} from 'src/app/app.models';
import {AppService} from 'src/app/app.service';
import {ReservationService} from "../../../core/services/reservation.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
    displayedColumns: string[] = ['id', 'date', 'time', 'guests', 'tableNumber', 'status.name', 'actions', 'annulation'];
    dataSource!: MatTableDataSource<Reservation>;
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(public appService: AppService,
                private snackBar: MatSnackBar,
                private reservationService: ReservationService) {
    }

    ngOnInit(): void {
        this.getAllReservationsByUser();
    }

    getAllReservationsByUser() {
        this.reservationService.getAllReservationsByUser().subscribe(res => {
            this.initDataSource(res);
        })
    }

    public initDataSource(data: any) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        (this.dataSource.sortingDataAccessor as any) = (data: any, sortHeaderId: string) => {
            return this.getPropertyByPath(data, sortHeaderId);
        };
    }

    getPropertyByPath(obj: Object, pathString: string) {
        return pathString.split('.').reduce((o: any, i) => o[i], obj);
    }

    public remove(reservation: Reservation) {
        const index: number = this.dataSource.data.indexOf(reservation);
        if (index !== -1) {
            this.reservationService.deleteReservation(reservation).subscribe(res => {
                    const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
                    let dialogRef = this.appService.openConfirmDialog('', message!);
                    dialogRef.afterClosed().subscribe(dialogResult => {
                        if (dialogResult) {
                            this.dataSource.data.splice(index, 1);
                            this.initDataSource(this.dataSource.data);
                        }
                    });
                }
            )
            ;
        }
    }

    cancel(reservation) {
        const status: ReservationStatus = {
            id: 1,
            name: 'Cancelled'
        }
        if (reservation) {
            const index: number = this.dataSource.data.indexOf(reservation);
            if (index !== -1) {
                this.reservationService.changeReservationStatus(reservation.id, 'Cancelled')
                    .subscribe(res => {
                        this.dataSource.data.find(item => item.id == reservation.id)!.status = status;
                        console.log(this.dataSource.data)
                        this.initDataSource(this.dataSource.data);
                        this.showToast('Table assigned successfully!', 'success');
                    })
            }
        }

    }

    showToast(message
                  :
                  string, status
                  :
                  string
    ) {
        this.snackBar.open(message, '×', {
            panelClass: status,
            verticalPosition: 'top',
            duration: 3000
        });
    }

}
