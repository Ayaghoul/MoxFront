import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {AppService} from 'src/app/app.service';
import {MenuItem} from 'src/app/app.models';
import {ActivatedRoute} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {CategoriesService} from "../../../core/services/categories.service";
import {MenuItemService} from "../../../core/services/menu-item.service";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    public form!: UntypedFormGroup;
    private sub: any;
    public id: any;
    public showImage: boolean = false;
    public selectedImage: File | null = null;

    constructor(
        public appService: AppService,
        public categoriesService: CategoriesService,
        public menuItemService: MenuItemService,
        public formBuilder: UntypedFormBuilder,
        private activatedRoute: ActivatedRoute,
        private http: HttpClient) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            "id": 0,
            "name": [null, Validators.compose([Validators.required, Validators.minLength(4)])],
            "description": null,
            "price": [null, Validators.required],
            "image": null,
            "discount": null,
            "availibilityCount": null,
            "weight": null,
            "isVegetarian": false,
            "categoryId": [null, Validators.required]
        });
        this.getCategories();
        this.sub = this.activatedRoute.params.subscribe(params => {
            if (params['id']) {
                this.id = params['id'];
                //     this.getMenuItemById();
            } else {
                this.showImage = true;
            }
        });


    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public getCategories() {
        this.categoriesService.getAllCategories().subscribe(categories => {
            this.appService.Data.categories = categories;
        });
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
        if (file) {
            this.selectedImage = file;
        }
    }


    public onSubmit() {
        const fd = new FormData();
        fd.append("photo", this.selectedImage);
        fd.append("category", this.form.get('categoryId').value);
        fd.append("name", this.form.get('name').value);
        fd.append("description", this.form.get('description').value);
        fd.append("price", this.form.get('price').value);
        fd.append("discount", this.form.get('discount').value);
        fd.append("name", this.form.get('name').value);

        if (this.selectedImage) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                const base64Content = base64String.split(',')[1];
                this.menuItemService.addMenu(fd).subscribe(
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
