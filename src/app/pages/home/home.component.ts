import {Component, OnInit} from '@angular/core';
import {Settings, AppSettings} from 'src/app/app.settings';
import {AppService} from 'src/app/app.service';
import {MenuItem} from 'src/app/app.models';
import {MenuItemService} from "../../core/services/menu-item.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public slides = [];
    public specialMenuItems: Array<MenuItem> = [];
    public bestMenuItems: Array<MenuItem> = [];
    public menuItems: Array<MenuItem> = [];
    public todayMenu!: MenuItem;

    public settings: Settings;

    constructor(public appSettings: AppSettings, public appService: AppService,
                private menuItemService: MenuItemService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit(): void {
        this.menuItemService.getAllMenuItems().subscribe(res => {
            this.menuItems = res;
            this.specialMenuItems = this.menuItems.filter(item => item.isVegetarian);
            console.log(this.specialMenuItems)
            this.bestMenuItems = this.menuItems.filter(item => item.weight > 100);
            console.log(this.bestMenuItems)
            this.todayMenu = this.menuItems.filter(item => item.weight > 100)[0];
            console.log(this.todayMenu)

        })
        this.getSlides();
    }

    public getSlides() {
        this.appService.getHomeCarouselSlides().subscribe((res: any) => {
            this.slides = res;
        });
    }


}
