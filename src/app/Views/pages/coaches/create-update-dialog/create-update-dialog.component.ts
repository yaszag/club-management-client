import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActivityService } from 'src/app/Views/core/services/activity.service';
import { CoachService } from 'src/app/Views/core/services/coach.service';
import { markInvalidControls } from 'src/app/Views/core/utils/form.util';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss'],
})
export class CreateUpdateCoachDialogComponent implements OnInit {
  coachForm: FormGroup;
  activities$: Observable<any>;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateCoachDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _coachesService: CoachService,
    private _activitiesService: ActivityService
  ) {}

  ngOnInit(): void {
    this.initializeCoachForm();
    this._activitiesService.getAllactivities();
    this.activities$ = this._activitiesService.activities$;
  }

  initializeCoachForm(): void {
    this.coachForm = this.fb.group({
      email: [this.data?.email || '', [Validators.required]],
      name: [
        this.data?.name || '',
        [Validators.required, Validators.minLength(3)],
      ],
      phone: [this.data?.phone || '', [Validators.required]],
      specialization: [this.data?.specialization || '', [Validators.required]],
      activities: [''],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    if (this.coachForm.valid) {
      this.data ? this.updateCoach() : this.addCoach();
    } else {
      markInvalidControls(this.coachForm);
    }
  }

  addCoach(): void {
    this._coachesService.addCoach(this.coachForm.value).subscribe(() => {
      this.dialogRef.close(false);
    });
  }
  updateCoach(): void {
    const updateCoachModel = {
      id: this.data.id,
      ...this.coachForm.value,
    };
    this._coachesService
      .updateCoach(this.data.id, updateCoachModel)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }
}
