import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {MenuItem} from 'src/app/app.models';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UsersService} from "../../../admin/users/users.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'image', 'name', 'actions'];
    dataSource!: MatTableDataSource<MenuItem>;
    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort!: MatSort;
    apiImg = environment.apiImg;

    constructor(public appService: AppService,
                private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService.getFavorites().subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    public remove(menuItem: MenuItem) {
        const index: number = this.dataSource.data.indexOf(menuItem);
        if (index !== -1) {
            this.usersService.removeMenuItemFromFavoris(menuItem).subscribe(res => {

                const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
                let dialogRef = this.appService.openConfirmDialog('', message!);
                dialogRef.afterClosed().subscribe(dialogResult => {
                    if (dialogResult) {
                        this.dataSource.data.splice(index, 1);
                        this.dataSource = new MatTableDataSource<MenuItem>(this.dataSource.data);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }
                });
            })
        }
    }

    public applyFilter(event: any) {
        let filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
