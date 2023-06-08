import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Category} from 'src/app/app.models';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoriesService} from "../../../../core/services/categories.service";

@Component({
    selector: 'app-category-dialog',
    templateUrl: './category-dialog.component.html',
    styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

    public form!: UntypedFormGroup;

    constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public category: Category,
                private categoriesService: CategoriesService,
                public fb: UntypedFormBuilder, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, Validators.required],
            description: null
        });

        if (this.category) {
            this.form.patchValue(this.category);
        }
    }

    public onSubmit() {
        if (this.form.valid) {
            this.categoriesService.addCategory(this.form.value).subscribe(
                (response) => {
                    this.dialogRef.close(response);
                    // La catégorie a été ajoutée avec succès
                    console.log(response);
                },
                (error) => {
                    // Une erreur s'est produite lors de l'ajout de la catégorie
                    console.error(error);
                }
            );

        }
    }
    public onEdit() {
        if (this.form.valid) {
            this.categoriesService.editCategory(this.category.id, this.form.value ).subscribe(
                (response) => {
                    this.dialogRef.close(response);
                    // La catégorie a été ajoutée avec succès
                    console.log(response);
                },
                (error) => {
                    // Une erreur s'est produite lors de l'ajout de la catégorie
                    console.error(error);
                }
            );

        }
    }

}
  



