import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoachService } from 'src/app/Views/core/services/coach.service';
import { MemberService } from 'src/app/Views/core/services/member.service';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss'],
})
export class CreateUpdateMemberDialogComponent implements OnInit {
  memberForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.initializeMemberForm();
  }

  initializeMemberForm(): void {
    this.memberForm = this.fb.group({
      email: [this.data?.email || ''],
      name: [this.data?.name || ''],
      phone: [this.data?.phone || ''],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.data ? this.updateMember() : this.addMember();
  }

  addMember(): void {
    this._memberService.addMember(this.memberForm.value).subscribe(() => {
      this.dialogRef.close(false);
    });
  }
  updateMember(): void {
    const updateCoachModel = {
      id: this.data.id,
      ...this.memberForm.value,
    };
    this._memberService
      .updateMember(this.data.id, updateCoachModel)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }
}
