import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from 'src/app/Views/core/services/member.service';
import { ActivityService } from 'src/app/Views/core/services/activity.service';
import { Observable } from 'rxjs';
import { SubscriptionService } from 'src/app/Views/core/services/subsciption.service';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss'],
})
export class CreateUpdateMemberDialogComponent implements OnInit {
  memberForm!: FormGroup;
  activities$!: Observable<any>;
  subscriptions$!: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _memberService: MemberService,
    private _activitiesService: ActivityService,
    private _subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.initializeMemberForm();
    this._activitiesService.getAllactivities();
    this._subscriptionService.getAllsubscriptions();
    this.activities$ = this._activitiesService.activities$;
    this.subscriptions$ = this._subscriptionService.subscriptions$;
  }

  initializeMemberForm(): void {
    console.log(this.data?.subscription.subscriptionDetails);

    this.memberForm = this.fb.group({
      email: [this.data?.email || ''],
      name: [this.data?.name || ''],
      phone: [this.data?.phone || ''],
      activityIds: [this.data?.activities.map((activity: { id: any; })=> activity.id) || ''],
      startDate: [this.data?.subscription.startDate || Date.now()],
      subscriptionDetails: [this.data?.subscription.subscriptionDetails || ''],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.data ? this.updateMember() : this.addMember();
  }

  addMember(): void {
    const addMemberModel = {
      ...this.memberForm.value,
      subscriptionDTO: {
        startDate: this.memberForm.get('startDate')?.value,
        subscriptionDetails: this.memberForm.get('subscriptionDetails')?.value,
      },
    };
    this._memberService.addMember(addMemberModel).subscribe(() => {
      this.dialogRef.close(false);
    });
  }
  updateMember(): void {
    const updateMemberModel = {
      id: this.data.id,
      ...this.memberForm.value,
      subscriptionDTO: {
        startDate: this.memberForm.get('startDate')?.value,
        subscriptionDetails: this.memberForm.get('subscriptionDetails')?.value,
      },
    };
    this._memberService
      .updateMember(this.data.id, updateMemberModel)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }
}
