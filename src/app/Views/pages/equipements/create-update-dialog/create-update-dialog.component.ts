import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipementService } from 'src/app/Views/core/services/equipement.service';

@Component({
  selector: 'app-create-update-dialog',
  templateUrl: './create-update-dialog.component.html',
  styleUrls: ['./create-update-dialog.component.scss'],
})
export class CreateUpdateEquipementDialogComponent implements OnInit {
  equipementForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUpdateEquipementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _equipementesService: EquipementService
  ) {}

  ngOnInit(): void {
    this.initializeEquipementForm();
  }

  initializeEquipementForm(): void {
    this.equipementForm = this.fb.group({
      description: [this.data?.description || ''],
      name: [this.data?.name || ''],
      quantity: [this.data?.quantity || ''],
    });
  }
  onDismiss(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.data ? this.updateEquipement() : this.addEquipement();
  }

  addEquipement(): void {
    this._equipementesService
      .addEquipement(this.equipementForm.value)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }
  updateEquipement(): void {
    const updateEquipementModel = {
      id: this.data.id,
      ...this.equipementForm.value,
    };
    this._equipementesService
      .updateEquipement(this.data.id, updateEquipementModel)
      .subscribe(() => {
        this.dialogRef.close(false);
      });
  }
}
