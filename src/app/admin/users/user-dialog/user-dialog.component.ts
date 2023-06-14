import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {User, UserProfile, UserWork, UserContacts, UserSocial, UserSettings} from '../user.model';
import {ChefsService} from "../../../core/services/chefs.service";

@Component({
    selector: 'app-user-dialog',
    templateUrl: './user-dialog.component.html',
    styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
    public form: UntypedFormGroup;
    public passwordHide: boolean = true;

    constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public user: User,
                private chefsService: ChefsService,
                public fb: UntypedFormBuilder) {
        this.form = this.fb.group({
            id: null,
            chefName: null,
            description: null,
            email: null,
            phoneNumber: null,
        });
    }

    ngOnInit() {
        if (this.user) {
            this.form.setValue(this.user);
        } else {
            this.user = new User();
            this.user.profile = new UserProfile();
            this.user.work = new UserWork();
            this.user.contacts = new UserContacts();
            this.user.social = new UserSocial();
            this.user.settings = new UserSettings();
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    addChef() {
        this.chefsService.addChef(this.form.value).subscribe(res => {
            console.log(res)
        })
    }
}
