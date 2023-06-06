import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/app.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  private apiUrl = 'http://localhost:9922/restau'; // Remplacez par l'URL de votre API

  public form!: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category,
              public fb: UntypedFormBuilder, private http:HttpClient) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      description: null 
    }); 

    if(this.category){
      this.form.patchValue(this.category); 
    };
  }

  public onSubmit(){ 
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      this.addCategory(this.form.value).subscribe(
        (response) => {
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
  addCategory(category: any) {
    return this.http.post('http://localhost:9922/restau/addC', category);
  }
}
  



