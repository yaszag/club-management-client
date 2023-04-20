import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivityService } from 'src/app/Views/core/services/activity.service';
import { markInvalidControls } from 'src/app/Views/core/utils/form.util';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss'],
})
export class CreateUpdateActivityDialogComponent implements OnInit {
  activityForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.initializeActivityForm();
  }

  initializeActivityForm(): void {
    this.activityForm = this.fb.group({
      description: [this.data?.description || '', [Validators.required]],
      name: [
        this.data?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      price: [this.data?.price || '', [Validators.required]],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    if (this.activityForm.valid) {
      this.data ? this.updateActivity() : this.addActivity();
    } else {
      markInvalidControls(this.activityForm);
    }
  }

  addActivity(): void {
    this._activityService.addActivity(this.activityForm.value).subscribe(() => {
      this.dialogRef.close(false);
    });
  }
  updateActivity(): void {
    const updateActivityModel = {
      id: this.data.id,
      ...this.activityForm.value,
    };
    this._activityService
      .updateActivity(this.data.id, updateActivityModel)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }
}
