import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MenuItem } from 'src/app/app.models';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public form!: UntypedFormGroup;
  private sub: any;
  public id:any;
  public showImage:boolean = false;
  public selectedImage : File |null=null;

  constructor(public appService:AppService, 
              public formBuilder: UntypedFormBuilder, 
              private activatedRoute: ActivatedRoute,
              private http:HttpClient) { }

  ngOnInit(): void {  
    this.form = this.formBuilder.group({ 
      "id": 0,
      "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      "description": null,
      "price": [null, Validators.required ], 
      "image": null, 
      "discount": null, 
      "availibilityCount": null, 
      "weight": null,
      "isVegetarian": false,
      "categoryId": [null, Validators.required ]   
    }); 
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe(params => {  
      if(params['id']){
        this.id = params['id'];
   //     this.getMenuItemById(); 
      } 
      else{
        this.showImage = true;
      }
    }); 

   

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public getCategories(){
    if(!this.appService.Data.categories.length){
      this.appService.getCategories().subscribe(categories=>{ 
        this.appService.Data.categories = categories;
      });
    } 
  } 
 
 /*  public getMenuItemById(){
    this.appService.getMenuItemById(this.id).subscribe((menuItem:MenuItem)=>{ 
      this.form.patchValue(menuItem); 
      if (isPlatformBrowser(this.platformId)) {
        this.appService.convertImgToBase64(menuItem.image.medium, (dataUrl:string) => { 
          this.showImage = true;
          this.form.controls.image.patchValue(dataUrl.toString());
        }) 
      }  
    });
  }
*/

  public onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(file){
      this.selectedImage = file;
    }
  }




  public onSubmit() {
    const category = this.form.get('categoryId')?.value;
    const cat =this.form.get('categoryId').value;
    const menuItem: MenuItem = new MenuItem(
      null,
      this.form.get('name')?.value,
      this.form.get('description')?.value,
      this.form.get('price')?.value,
      null,
      this.form.get('discount')?.value,
      null,
      null,
      this.form.get('discount')?.value,
      null,
      this.form.get('discount')?.value,
      this.form.get('isVegetarian')?.value,
      null
    );
  
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        menuItem.image = base64Content;
        console.log(menuItem.image);
  
        this.http.post(`http://localhost:9922/restau/addMC/${category}`, menuItem).subscribe(
          (response) => {
            // The MenuItem was successfully added
            console.log(response);
          },
          (error) => {
            // An error occurred while adding the MenuItem
            console.error(error);
          }
        );
      };
  
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.http.post(`http://localhost:9922/restau/addMC/${category}`, menuItem).subscribe(
        (response) => {
          // The MenuItem was successfully added
          console.log(response);
        },
        (error) => {
          // An error occurred while adding the MenuItem
          console.error(error);
        }
      );
    }
  }
  

  
 /* uploadMenuItem(menu: MenuItem, image: File): void {
    const formData = new FormData();
    formData.append('menu', JSON.stringify(menu));
    formData.append('im', image, image.name);
  
    this.http.post<MenuItem>('/api/addMCC/' + menu, formData)
      .subscribe(
        response => {
          // Traitement de la réponse du serveur
          console.log('Menu item ajouté avec succès', response);
        },
        error => {
          // Gestion des erreurs
          console.error('Erreur lors de l\'ajout du menu item', error);
        }
      );
  }
 */ 

} 