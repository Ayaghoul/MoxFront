import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppSettings, Settings } from '../../app.settings';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {ChefsService} from "../../core/services/chefs.service";
import {Chef} from "../../app.models";
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ ChefsService ]
})
export class ChefsComponent implements OnInit {
    public users: any = [];
    public searchText: string = '';
    public page:any;
    public settings: Settings;
    public maxSize:number = 5;
    public autoHide:boolean = true;
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,
                public cartService:CartService,
                public chefsService:ChefsService){
        this.settings = this.appSettings.settings; 
    }

    ngOnInit() {
        this.getChefs();

    }

    public getChefs() {
        // this.users = []; //for show spinner each time
       return  this.cartService.getAllChefs().subscribe(chefs => {
           console.log(chefs)
           return  this.users = chefs
        });
    }
    public addChef(chef:Chef){
        this.chefsService.addChef(chef).subscribe(chef => this.getChefs());
    }
    public updateChef(chef:Chef){
        this.chefsService.updateChef(chef).subscribe(chef => this.getChefs());
    }
    public deleteChef(chef:Chef){
       this.cartService.deleteChef(chef).subscribe(chef => this.getChefs());
    }


    public onPageChanged(event:any){
        this.page = event;
        this.getChefs();
        window.scrollTo(0,0);
        // if(this.settings.fixedHeader){      
        //     document.getElementById('main-content').scrollTop = 0;
        // }
        // else{
        //     document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        // }
    }

    public openChefDialog(chef:Chef | null){
        let dialogRef = this.dialog.open(UserDialogComponent, {
            data: chef,
            panelClass: ['theme-dialog']
        });

        dialogRef.afterClosed().subscribe(chef => {
            if(chef){
                (chef.id) ? this.updateChef(chef) : this.addChef(chef);
            }
        });
    }


}
