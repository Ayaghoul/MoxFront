import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';  
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; 
import { MenuItem } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit { 
  displayedColumns: string[] = ['id', 'image', 'categoryId', 'name', 'price', 'discount', 'availibilityCount', 'isVegetarian', 'actions'];
  dataSource!: MatTableDataSource<MenuItem>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(public appService:AppService,public http:HttpClient) { }
  menuItem: MenuItem[];
  ngOnInit(): void {
    this.getCategories();
    this.appService.getMenuItems().subscribe((menuItems:MenuItem[]) => {
      this.initDataSource(menuItems); 
    })
    this.getMenu();
    }

  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }  

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 


  public remove(menuItem:MenuItem) {
    const index: number = this.dataSource.data.indexOf(menuItem);    
    if (index !== -1) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
			let dialogRef = this.appService.openConfirmDialog('', message!);
			dialogRef.afterClosed().subscribe(dialogResult => {
				if(dialogResult){ 
          this.dataSource.data.splice(index,1);
          this.initDataSource(this.dataSource.data); 
				}
			});  
    } 
  }
  getImagebased64(img: string): string {
      if (img) {
        return `data:image/png;base64,${img}`;
      } else return '';
  
  }
  

  public getMenu(): void {
    this.http.get<MenuItem[]>('http://localhost:9922/restau/getmenu').subscribe(
      (menuItems: MenuItem[]) => {
        // Handle the response data
        this.menuItem = menuItems;
        console.log(menuItems);
        // Process the menu items as needed
      },
      (error) => {
        // Handle errors
        console.error(error);
      }
    );
  
    }
  

}
